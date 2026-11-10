/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=window,F=k.ShadowRoot&&(k.ShadyCSS===void 0||k.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),X=new WeakMap;let pt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(F&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&X.set(e,t))}return t}toString(){return this.cssText}};const gt=i=>new pt(typeof i=="string"?i:i+"",void 0,G),At=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new pt(e,i,G)},Et=(i,t)=>{F?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),r=k.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)})},tt=F?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return gt(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;const M=window,et=M.trustedTypes,wt=et?et.emptyScript:"",st=M.reactiveElementPolyfillSupport,K={toAttribute(i,t){switch(t){case Boolean:i=i?wt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ut=(i,t)=>t!==i&&(t==t||i==i),D={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:ut},Y="finalized";let A=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const r=this._$Ep(s,e);r!==void 0&&(this._$Ev.set(r,s),t.push(r))}),t}static createProperty(t,e=D){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(r){const n=this[t];this[e]=r,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||D}static finalize(){if(this.hasOwnProperty(Y))return!1;this[Y]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of s)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(tt(r))}else t!==void 0&&e.push(tt(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Et(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=D){var r;const n=this.constructor._$Ep(t,s);if(n!==void 0&&s.reflect===!0){const o=(((r=s.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?s.converter:K).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var s;const r=this.constructor,n=r._$Ev.get(t);if(n!==void 0&&this._$El!==n){const o=r.getPropertyOptions(n),h=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:K;this._$El=n,this[n]=h.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let r=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ut)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((r,n)=>this[n]=r),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostUpdate)===null||n===void 0?void 0:n.call(r)}),this.update(s)):this._$Ek()}catch(r){throw e=!1,this._$Ek(),r}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var r;return(r=s.hostUpdated)===null||r===void 0?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};A[Y]=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},st==null||st({ReactiveElement:A}),((z=M.reactiveElementVersions)!==null&&z!==void 0?z:M.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const R=window,w=R.trustedTypes,it=w?w.createPolicy("lit-html",{createHTML:i=>i}):void 0,J="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,$t="?"+_,Ct=`<${$t}>`,b=document,S=()=>b.createComment(""),T=i=>i===null||typeof i!="object"&&typeof i!="function",vt=Array.isArray,xt=i=>vt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",V=`[ 	
\f\r]`,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rt=/-->/g,nt=/>/g,f=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,lt=/"/g,_t=/^(?:script|style|textarea|title)$/i,St=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),N=St(1),m=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),at=new WeakMap,y=b.createTreeWalker(b,129,null,!1);function ft(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return it!==void 0?it.createHTML(t):t}const Tt=(i,t)=>{const e=i.length-1,s=[];let r,n=t===2?"<svg>":"",o=x;for(let h=0;h<e;h++){const l=i[h];let a,d,c=-1,u=0;for(;u<l.length&&(o.lastIndex=u,d=o.exec(l),d!==null);)u=o.lastIndex,o===x?d[1]==="!--"?o=rt:d[1]!==void 0?o=nt:d[2]!==void 0?(_t.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=f):d[3]!==void 0&&(o=f):o===f?d[0]===">"?(o=r??x,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,a=d[1],o=d[3]===void 0?f:d[3]==='"'?lt:ot):o===lt||o===ot?o=f:o===rt||o===nt?o=x:(o=f,r=void 0);const $=o===f&&i[h+1].startsWith("/>")?" ":"";n+=o===x?l+Ct:c>=0?(s.push(a),l.slice(0,c)+J+l.slice(c)+_+$):l+_+(c===-2?(s.push(void 0),h):$)}return[ft(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]};class P{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0;const h=t.length-1,l=this.parts,[a,d]=Tt(t,e);if(this.el=P.createElement(a,s),y.currentNode=this.el.content,e===2){const c=this.el.content,u=c.firstChild;u.remove(),c.append(...u.childNodes)}for(;(r=y.nextNode())!==null&&l.length<h;){if(r.nodeType===1){if(r.hasAttributes()){const c=[];for(const u of r.getAttributeNames())if(u.endsWith(J)||u.startsWith(_)){const $=d[o++];if(c.push(u),$!==void 0){const mt=r.getAttribute($.toLowerCase()+J).split(_),O=/([.?@])?(.*)/.exec($);l.push({type:1,index:n,name:O[2],strings:mt,ctor:O[1]==="."?Ut:O[1]==="?"?Ot:O[1]==="@"?Nt:L})}else l.push({type:6,index:n})}for(const u of c)r.removeAttribute(u)}if(_t.test(r.tagName)){const c=r.textContent.split(_),u=c.length-1;if(u>0){r.textContent=w?w.emptyScript:"";for(let $=0;$<u;$++)r.append(c[$],S()),y.nextNode(),l.push({type:2,index:++n});r.append(c[u],S())}}}else if(r.nodeType===8)if(r.data===$t)l.push({type:2,index:n});else{let c=-1;for(;(c=r.data.indexOf(_,c+1))!==-1;)l.push({type:7,index:n}),c+=_.length-1}n++}}static createElement(t,e){const s=b.createElement("template");return s.innerHTML=t,s}}function C(i,t,e=i,s){var r,n,o,h;if(t===m)return t;let l=s!==void 0?(r=e._$Co)===null||r===void 0?void 0:r[s]:e._$Cl;const a=T(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(i),l._$AT(i,e,s)),s!==void 0?((o=(h=e)._$Co)!==null&&o!==void 0?o:h._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=C(i,l._$AS(i,t.values),l,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:r}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:b).importNode(s,!0);y.currentNode=n;let o=y.nextNode(),h=0,l=0,a=r[0];for(;a!==void 0;){if(h===a.index){let d;a.type===2?d=new U(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new kt(o,this,t)),this._$AV.push(d),a=r[++l]}h!==(a==null?void 0:a.index)&&(o=y.nextNode(),h++)}return y.currentNode=b,n}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class U{constructor(t,e,s,r){var n;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cp=(n=r==null?void 0:r.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),T(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==m&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):xt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==p&&T(this._$AH)?this._$AA.nextSibling.data=t:this.$(b.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=P.createElement(ft(r.h,r.h[0]),this.options)),r);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(s);else{const o=new Pt(n,this),h=o.u(this.options);o.v(s),this.$(h),this._$AH=o}}_$AC(t){let e=at.get(t.strings);return e===void 0&&at.set(t.strings,e=new P(t)),e}T(t){vt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const n of t)r===e.length?e.push(s=new U(this.k(S()),this.k(S()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class L{constructor(t,e,s,r,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,r){const n=this.strings;let o=!1;if(n===void 0)t=C(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==m,o&&(this._$AH=t);else{const h=t;let l,a;for(t=n[0],l=0;l<n.length-1;l++)a=C(this,h[s+l],e,l),a===m&&(a=this._$AH[l]),o||(o=!T(a)||a!==this._$AH[l]),a===p?t=p:t!==p&&(t+=(a??"")+n[l+1]),this._$AH[l]=a}o&&!r&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ut extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}const Ht=w?w.emptyScript:"";class Ot extends L{constructor(){super(...arguments),this.type=4}j(t){t&&t!==p?this.element.setAttribute(this.name,Ht):this.element.removeAttribute(this.name)}}class Nt extends L{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){var s;if((t=(s=C(this,t,e,0))!==null&&s!==void 0?s:p)===m)return;const r=this._$AH,n=t===p&&r!==p||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==p&&(r===p||n);n&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class kt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const ht=R.litHtmlPolyfillSupport;ht==null||ht(P,U),((B=R.litHtmlVersions)!==null&&B!==void 0?B:R.litHtmlVersions=[]).push("2.8.0");const Mt=(i,t,e)=>{var s,r;const n=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let o=n._$litPart$;if(o===void 0){const h=(r=e==null?void 0:e.renderBefore)!==null&&r!==void 0?r:null;n._$litPart$=o=new U(t.insertBefore(S(),h),h,void 0,e??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W,Z;class E extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return m}}E.finalized=!0,E._$litElement$=!0,(W=globalThis.litElementHydrateSupport)===null||W===void 0||W.call(globalThis,{LitElement:E});const dt=globalThis.litElementPolyfillSupport;dt==null||dt({LitElement:E});((Z=globalThis.litElementVersions)!==null&&Z!==void 0?Z:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=i=>t=>typeof t=="function"?((e,s)=>(customElements.define(e,s),s))(i,t):((e,s)=>{const{kind:r,elements:n}=s;return{kind:r,elements:n,finisher(o){customElements.define(e,o)}}})(i,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt=(i,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,i)}},It=(i,t,e)=>{t.constructor.createProperty(e,i)};function H(i){return(t,e)=>e!==void 0?It(i,t,e):Rt(i,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(i){return H({...i,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var q;((q=window.HTMLSlotElement)===null||q===void 0?void 0:q.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},jt=i=>(...t)=>({_$litDirective$:i,values:t});let zt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt="important",Dt=" !"+bt,ct=jt(class extends zt{constructor(i){var t;if(super(i),i.type!==Lt.ATTRIBUTE||i.name!=="style"||((t=i.strings)===null||t===void 0?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{const s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){const{style:e}=i.element;if(this.ht===void 0){this.ht=new Set;for(const s in t)this.ht.add(s);return this.render(t)}this.ht.forEach(s=>{t[s]==null&&(this.ht.delete(s),s.includes("-")?e.removeProperty(s):e[s]="")});for(const s in t){const r=t[s];if(r!=null){this.ht.add(s);const n=typeof r=="string"&&r.endsWith(Dt);s.includes("-")||n?e.setProperty(s,n?r.slice(0,-11):r,n?bt:""):e[s]=r}}return m}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=i=>i??p;var Vt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,Q=(i,t,e,s)=>{for(var r=s>1?void 0:s?Wt(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&Vt(t,e,r),r};let I=class extends E{setConfig(i){this._config=i,this.loadCardHelpers()}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}};Q([j()],I.prototype,"_config",2);Q([j()],I.prototype,"_helpers",2);I=Q([yt("tabbed-card-editor")],I);var Zt=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,g=(i,t,e,s)=>{for(var r=s>1?void 0:s?qt(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&Zt(t,e,r),r};let v=class extends E{constructor(){super(...arguments),this.selectedTabIndex=0,this._styles={},this._initialTabApplied=!1}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}static async getConfigElement(){return document.createElement("tabbed-card-editor")}static getStubConfig(){return{options:{},tabs:[{card:{type:"entity",entity:"sun.sun"},attributes:{label:"Sun"}}]}}setConfig(i){var t,e;if(!i)throw new Error("No configuration.");if(this._config=i,this._styles={...this._styles,...i.styles||{}},!this._initialTabApplied){const s=Number(((t=i==null?void 0:i.options)==null?void 0:t.defaultTabIndex)??0);Number.isInteger(s)&&s>=0&&s<(((e=i.tabs)==null?void 0:e.length)??0)&&(this.selectedTabIndex=s),this._initialTabApplied=!0}this.loadCardHelpers()}willUpdate(i){var t;i.has("_helpers")&&this._createTabs(this._config),i.has("hass")&&((t=this._tabs)!=null&&t.length)&&this._tabs.forEach(e=>e.card.hass=this.hass)}async _createTabs(i){const t=await Promise.all(i.tabs.map(async e=>({styles:e==null?void 0:e.styles,attributes:{...i==null?void 0:i.attributes,...e==null?void 0:e.attributes},card:await this._createCard(e.card)})));this._tabs=t}async _createCard(i){const t=await this._helpers.createCardElement(i);return t.hass=this.hass,t.addEventListener("ll-rebuild",e=>{e.stopPropagation(),this._rebuildCard(t,i)},{once:!0}),t}async _rebuildCard(i,t){const e=await this._helpers.createCardElement(t);i.replaceWith(e)}render(){var i,t;return!this.hass||!this._config||!this._helpers||!((i=this._tabs)!=null&&i.length)?N``:N`
      <div class="tab-bar" role="tablist" style=${ct(this._styles)}>
        ${this._tabs.map((e,s)=>{const r=s===this.selectedTabIndex,n=e==null?void 0:e.attributes;return N`
            <button
              type="button"
              role="tab"
              class="tab ${r?"active":""}"
              style=${Bt(ct((e==null?void 0:e.styles)||{}))}
              aria-selected=${r?"true":"false"}
              @click=${()=>this.selectedTabIndex=s}
            >
              ${n!=null&&n.icon?N`<ha-icon .icon=${n.icon}></ha-icon>`:p}
              <span class="label">${(n==null?void 0:n.label)||p}</span>
            </button>
          `})}
      </div>
      <section>
        <article>
          ${(t=this._tabs.find((e,s)=>s==this.selectedTabIndex))==null?void 0:t.card}
        </article>
      </section>
    `}};v.styles=At`
    :host {
      --tab-accent: var(--primary-color, #03a9f4);
      --tab-active-bg: rgba(var(--rgb-primary-color, 3, 169, 244), 0.16);
      --tab-bg: var(
        --ha-card-background,
        var(--card-background-color, #ffffff)
      );
      --tab-radius: var(--chip-border-radius, 18px);
      --tab-text: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.7);
      --tab-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.12));
      display: block;
    }

    .tab-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      padding: 2px 0 14px;
    }

    .tab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 36px;
      padding: 6px 18px;
      border: none;
      border-radius: var(--tab-radius);
      background: var(--tab-bg);
      color: var(--tab-text);
      box-shadow: var(--tab-shadow);
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
        box-shadow 0.18s ease,
        transform 0.18s ease;
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
      box-shadow: none;
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
      .tab-bar {
        gap: 6px;
      }
      .tab {
        padding: 6px 12px;
        font-size: 13px;
      }
    }
  `;g([H({attribute:!1})],v.prototype,"hass",2);g([H()],v.prototype,"selectedTabIndex",2);g([H()],v.prototype,"_helpers",2);g([j()],v.prototype,"_config",2);g([j()],v.prototype,"_tabs",2);g([H()],v.prototype,"_styles",2);v=g([yt("tabbed-card")],v);window.customCards=window.customCards||[];window.customCards.push({type:"tabbed-card",name:"Tabbed Card (Mushroom)",description:"Rounded button tabs for Mushroom dashboards."});
