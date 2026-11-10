import { LitElement, html, css, PropertyValueMap, nothing } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from "custom-card-helpers";
import "./tabbed-card-editor";

/**
 * Mushroom-styled fork of kinghat/tabbed-card.
 *
 * Upstream renders an `mwc-tab-bar` (Material tabs with an underline
 * indicator), which clashes with Mushroom dashboards. This fork keeps the
 * exact same YAML schema (`tabs`, `attributes`, `styles`, `options`) and the
 * same custom element name `tabbed-card`, but renders the tabs as rounded pill
 * buttons using Home Assistant / Mushroom theme variables instead.
 */

interface TabAttributes {
  label?: string;
  icon?: string;
  // Legacy mwc-tab attributes. Kept for config compatibility, ignored here.
  isFadingIndicator?: boolean;
  minWidth?: boolean;
  isMinWidthIndicator?: boolean;
  stacked?: boolean;
}

interface TabbedCardConfig extends LovelaceCardConfig {
  options?: {
    defaultTabIndex?: number;
  };
  styles?: Record<string, string>;
  attributes?: TabAttributes;
  tabs: Tab[];
}

interface Tab {
  styles?: Record<string, string>;
  attributes?: TabAttributes;
  card: LovelaceCardConfig;
}

@customElement("tabbed-card")
export class TabbedCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property() protected selectedTabIndex = 0;
  @property() private _helpers: any;

  @state() private _config!: TabbedCardConfig;
  @state() private _tabs!: Tab[];

  // `styles` from the YAML config is still applied to the tab bar so existing
  // dashboards that set CSS custom properties keep working.
  @property() protected _styles: Record<string, string> = {};

  private _initialTabApplied = false;

  static styles = css`
    :host {
      --tab-accent: var(--primary-color, #03a9f4);
      --tab-active-bg: rgba(var(--rgb-primary-color, 3, 169, 244), 0.18);
      --tab-container-bg: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
      --tab-radius: var(--chip-border-radius, 18px);
      --tab-inner-radius: 10px;
      --tab-bar-pad: 4px;
      --tab-text: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.7);
      --tab-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.12));
      display: block;
    }

    /* The whole strip is one rounded capsule (background + shadow on the
       container), with the buttons sitting inside as separate segments. */
    .tab-bar {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: var(--tab-bar-pad);
      width: fit-content;
      max-width: 100%;
      padding: var(--tab-bar-pad);
      background: var(--tab-container-bg);
      border-radius: var(--tab-radius);
      box-shadow: var(--tab-shadow);
    }

    .tab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 36px;
      padding: 6px 18px;
      border: none;
      border-radius: var(--tab-inner-radius);
      background: transparent;
      color: var(--tab-text);
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.2;
      letter-spacing: 0.01em;
      white-space: nowrap;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color 0.18s ease,
        color 0.18s ease,
        transform 0.18s ease;
    }

    /* Only the OUTER corners follow the capsule's big radius; the inner
       corners stay small, so the buttons read as separate segments while the
       strip still looks like one continuous pill. */
    .tab.first {
      border-top-left-radius: calc(var(--tab-radius) - var(--tab-bar-pad));
      border-bottom-left-radius: calc(var(--tab-radius) - var(--tab-bar-pad));
    }
    .tab.last {
      border-top-right-radius: calc(var(--tab-radius) - var(--tab-bar-pad));
      border-bottom-right-radius: calc(var(--tab-radius) - var(--tab-bar-pad));
    }

    .tab:hover {
      transform: translateY(-1px);
    }

    .tab:active {
      transform: translateY(0);
    }

    .tab.active {
      background: var(--tab-active-bg);
      color: var(--tab-accent);
    }

    .tab:focus-visible {
      outline: 2px solid var(--tab-accent);
      outline-offset: 2px;
    }

    .tab ha-icon {
      --mdc-icon-size: 18px;
      width: 18px;
      height: 18px;
      flex: 0 0 18px;
    }

    .label {
      display: inline-block;
    }

    section,
    article {
      display: block;
    }

    @media (max-width: 480px) {
      .tab {
        padding: 6px 12px;
        font-size: 13px;
      }
    }
  `;

  private async loadCardHelpers() {
    this._helpers = await (window as any).loadCardHelpers();
  }

  static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("tabbed-card-editor");
  }

  static getStubConfig() {
    return {
      options: {},
      tabs: [
        { card: { type: "entity", entity: "sun.sun" }, attributes: { label: "Sun" } },
      ],
    };
  }

  public setConfig(config: TabbedCardConfig) {
    if (!config) {
      throw new Error("No configuration.");
    }

    this._config = config;
    this._styles = { ...this._styles, ...(config.styles || {}) };

    // Upstream passed `defaultTabIndex` to mwc-tab-bar's activeIndex but still
    // rendered from `selectedTabIndex`, so the option never worked. Apply it
    // once on first config, then leave the user's current selection alone.
    if (!this._initialTabApplied) {
      const index = Number(config?.options?.defaultTabIndex ?? 0);
      if (
        Number.isInteger(index) &&
        index >= 0 &&
        index < (config.tabs?.length ?? 0)
      ) {
        this.selectedTabIndex = index;
      }
      this._initialTabApplied = true;
    }

    this.loadCardHelpers();
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    if (_changedProperties.has("_helpers")) {
      this._createTabs(this._config);
    }
    if (_changedProperties.has("hass") && this._tabs?.length) {
      this._tabs.forEach((tab) => (tab.card.hass = this.hass));
    }
  }

  async _createTabs(config: TabbedCardConfig) {
    const tabs = await Promise.all(
      config.tabs.map(async (tab) => {
        return {
          styles: tab?.styles,
          attributes: { ...config?.attributes, ...tab?.attributes },
          card: await this._createCard(tab.card),
        };
      }),
    );

    this._tabs = tabs;
  }

  async _createCard(cardConfig: LovelaceCardConfig) {
    const cardElement = await this._helpers.createCardElement(cardConfig);

    cardElement.hass = this.hass;

    cardElement.addEventListener(
      "ll-rebuild",
      (ev: Event) => {
        ev.stopPropagation();
        this._rebuildCard(cardElement, cardConfig);
      },
      { once: true },
    );

    return cardElement;
  }

  async _rebuildCard(cardElement: LovelaceCard, cardConfig: LovelaceCardConfig) {
    const newCardElement = await this._helpers.createCardElement(cardConfig);
    cardElement.replaceWith(newCardElement);
  }

  render() {
    if (!this.hass || !this._config || !this._helpers || !this._tabs?.length) {
      return html``;
    }

    return html`
      <div class="tab-bar" role="tablist" style=${styleMap(this._styles)}>
        ${this._tabs.map((tab, index) => {
          const active = index === this.selectedTabIndex;
          const attributes = tab?.attributes;
          const posClass =
            index === 0
              ? "first"
              : index === this._tabs.length - 1
                ? "last"
                : "";
          return html`
            <button
              type="button"
              role="tab"
              class="tab ${posClass} ${active ? "active" : ""}"
              style=${ifDefined(styleMap(tab?.styles || {}))}
              aria-selected=${active ? "true" : "false"}
              @click=${() => (this.selectedTabIndex = index)}
            >
              ${attributes?.icon
                ? html`<ha-icon .icon=${attributes.icon}></ha-icon>`
                : nothing}
              <span class="label">${attributes?.label || nothing}</span>
            </button>
          `;
        })}
      </div>
      <section>
        <article>
          ${this._tabs.find((_, index) => index == this.selectedTabIndex)?.card}
        </article>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tabbed-card": TabbedCard;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "tabbed-card",
  name: "Tabbed Card (Mushroom)",
  description: "Rounded button tabs for Mushroom dashboards.",
});
