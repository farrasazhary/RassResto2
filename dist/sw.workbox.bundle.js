if(!self.define){let t,e={};const s=(s,n)=>(s=new URL(s+".js",n).href,e[s]||new Promise((e=>{if("document"in self){const t=document.createElement("script");t.src=s,t.onload=e,document.head.appendChild(t)}else t=s,importScripts(s),e()})).then((()=>{let t=e[s];if(!t)throw new Error(`Module ${s} didn’t register its module`);return t})));self.define=(n,i)=>{const r=t||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let c={};const o=t=>s(t,r),a={module:{uri:r},exports:c,require:o};e[r]=Promise.all(n.map((t=>a[t]||o(t)))).then((t=>(i(...t),c)))}}define([],(function(){"use strict";try{self["workbox:core:6.5.3"]&&_()}catch(t){}const t=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class e extends Error{constructor(e,s){super(t(e,s)),this.name=e,this.details=s}}try{self["workbox:routing:6.5.3"]&&_()}catch(t){}const s=t=>t&&"object"==typeof t?t:{handle:t};class n{constructor(t,e,n="GET"){this.handler=s(e),this.match=t,this.method=n}setCatchHandler(t){this.catchHandler=s(t)}}class i extends n{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class r{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let c=r&&r.handler;const o=t.method;if(!c&&this.i.has(o)&&(c=this.i.get(o)),!c)return;let a;try{a=c.handle({url:s,request:t,event:e,params:i})}catch(t){a=Promise.reject(t)}const h=r&&r.catchHandler;return a instanceof Promise&&(this.o||h)&&(a=a.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:i})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),a}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const c=r.match({url:t,sameOrigin:e,request:s,event:n});if(c)return i=c,(Array.isArray(i)&&0===i.length||c.constructor===Object&&0===Object.keys(c).length||"boolean"==typeof c)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,s(t))}setCatchHandler(t){this.o=s(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this.t.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this.t.get(t.method).splice(s,1)}}let c;const o=()=>(c||(c=new r,c.addFetchListener(),c.addCacheListener()),c);function a(t,s,r){let c;if("string"==typeof t){const e=new URL(t,location.href);c=new n((({url:t})=>t.href===e.href),s,r)}else if(t instanceof RegExp)c=new i(t,s,r);else if("function"==typeof t)c=new n(t,s,r);else{if(!(t instanceof n))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=t}return o().registerRoute(c),c}try{self["workbox:cacheable-response:6.5.3"]&&_()}catch(t){}class h{constructor(t={}){this.h=t.statuses,this.l=t.headers}isResponseCacheable(t){let e=!0;return this.h&&(e=this.h.includes(t.status)),this.l&&e&&(e=Object.keys(this.l).some((e=>t.headers.get(e)===this.l[e]))),e}}try{self["workbox:strategies:6.5.3"]&&_()}catch(t){}const l={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null},u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=t=>[u.prefix,t,u.suffix].filter((t=>t&&t.length>0)).join("-"),d=t=>t||f(u.precache),w=t=>t||f(u.runtime);function p(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class y{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const g=new Set;function b(t){return"string"==typeof t?new Request(t):t}class m{constructor(t,e){this.u={},Object.assign(this,e),this.event=e.event,this.p=t,this.g=new y,this.m=[],this.v=[...t.plugins],this.R=new Map;for(const t of this.v)this.R.set(t,{});this.event.waitUntil(this.g.promise)}async fetch(t){const{event:s}=this;let n=b(t);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const t=await s.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.p.fetchOptions);for(const e of this.iterateCallbacks("fetchDidSucceed"))t=await e({event:s,request:r,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:s,originalRequest:i.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=b(t);let s;const{cacheName:n,matchOptions:i}=this.p,r=await this.getCacheKey(e,"read"),c=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,c);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const n=b(t);var i;await(i=0,new Promise((t=>setTimeout(t,i))));const r=await this.getCacheKey(n,"write");if(!s)throw new e("cache-put-with-no-response",{url:(c=r.url,new URL(String(c),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var c;const o=await this.q(s);if(!o)return!1;const{cacheName:a,matchOptions:h}=this.p,l=await self.caches.open(a),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(t,e,s,n){const i=p(e.url,s);if(e.url===i)return t.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),c=await t.keys(e,r);for(const e of c)if(i===p(e.url,s))return t.match(e,n)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?o.clone():o)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of g)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:a,oldResponse:f,newResponse:o.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.u[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=b(await t({mode:e,request:n,event:this.event,params:this.params}));this.u[s]=n}return this.u[s]}hasCallback(t){for(const e of this.p.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.p.plugins)if("function"==typeof e[t]){const s=this.R.get(e),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return e[t](i)};yield n}}waitUntil(t){return this.m.push(t),t}async doneWaiting(){let t;for(;t=this.m.shift();)await t}destroy(){this.g.resolve(null)}async q(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class v{constructor(t={}){this.cacheName=w(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new m(this,{event:e,request:s,params:n}),r=this.U(i,s,e);return[r,this.L(r,i,s,e)]}async U(t,s,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:s});try{if(i=await this._(s,t),!i||"error"===i.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(i=await r({error:e,event:n,request:s}),i)break;if(!i)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))i=await e({event:n,request:s,response:i});return i}async L(t,e,s,n){let i,r;try{i=await t}catch(r){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){t instanceof Error&&(r=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),e.destroy(),r)throw r}}function R(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.5.3"]&&_()}catch(t){}function q(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:n}=t;if(!n)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:r.href}}class U{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class L{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.C.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.C=t}}let x,E;async function C(t,s){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new e("cross-origin-copy-response",{origin:n});const i=t.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},c=s?s(r):r,o=function(){if(void 0===x){const t=new Response("");if("body"in t)try{new Response(t.body),x=!0}catch(t){x=!1}x=!1}return x}()?i.body:await i.blob();return new Response(o,c)}class N extends v{constructor(t={}){t.cacheName=d(t.cacheName),super(t),this.N=!1!==t.fallbackToNetwork,this.plugins.push(N.copyRedirectedCacheableResponsesPlugin)}async _(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.O(t,e):await this.j(t,e))}async j(t,s){let n;const i=s.params||{};if(!this.N)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=i.integrity,r=t.integrity,c=!r||r===e;n=await s.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||e:void 0})),e&&c&&"no-cors"!==t.mode&&(this.T(),await s.cachePut(t,n.clone()))}return n}async O(t,s){this.T();const n=await s.fetch(t);if(!await s.cachePut(t,n.clone()))throw new e("bad-precaching-response",{url:t.url,status:n.status});return n}T(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==N.copyRedirectedCacheableResponsesPlugin&&(n===N.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(N.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}N.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},N.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await C(t):t};class O{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.W=new Map,this.P=new Map,this.S=new Map,this.p=new N({cacheName:d(t),plugins:[...e,new L({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.p}precache(t){this.addToCacheList(t),this.K||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.K=!0)}addToCacheList(t){const s=[];for(const n of t){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:t,url:i}=q(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.W.has(i)&&this.W.get(i)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this.W.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.S.has(t)&&this.S.get(t)!==n.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:i});this.S.set(t,n.integrity)}if(this.W.set(i,t),this.P.set(i,r),s.length>0){const t=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return R(t,(async()=>{const e=new U;this.strategy.plugins.push(e);for(const[e,s]of this.W){const n=this.S.get(s),i=this.P.get(e),r=new Request(e,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return R(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.W.values()),n=[];for(const i of e)s.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.W}getCachedURLs(){return[...this.W.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.W.get(e.href)}getIntegrityForCacheKey(t){return this.S.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}const j=()=>(E||(E=new O),E);class T extends n{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const i of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(t,location.href);r.hash="",yield r.href;const c=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(r,e);if(yield c.href,s&&c.pathname.endsWith("/")){const t=new URL(c.href);t.pathname+=s,yield t.href}if(n){const t=new URL(c.href);t.pathname+=".html",yield t.href}if(i){const t=i({url:r});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(i);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}var W;self.addEventListener("message",(t=>{t.data&&"SKIP_WAITING"===t.data.type&&self.skipWaiting()})),W={},function(t){j().precache(t)}([{url:"5d982326781d6f8ea98b.jpg",revision:null},{url:"app.bundle.js",revision:"c4cf2d28c14ec90c1ccd159835ac8d4c"},{url:"app.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app.webmanifest",revision:"b84eea90091aa38c44b4eeb0f8a23dc3"},{url:"favicon.jpg",revision:"7fb9f2528dde8529882c37b5bea4df8e"},{url:"icons/icon-128x128.png",revision:"61245cc5d3cd03e9b1ada84097ee5b57"},{url:"icons/icon-144x144.png",revision:"547673a0b865bb154334ac77d92bc86b"},{url:"icons/icon-152x152.png",revision:"32a00de5a316f3eca300799360efc921"},{url:"icons/icon-192x192.png",revision:"c8544f4e048bdf5be62a37d911679c0a"},{url:"icons/icon-384x384.png",revision:"2eea77d942c08c97c16184bc5f5529e0"},{url:"icons/icon-512x512.png",revision:"8fe3aa3c380bbb8b049401e94806a0b8"},{url:"icons/icon-72x72.png",revision:"5f820dee91ea5985f55f4009c9dbd949"},{url:"icons/icon-96x96.png",revision:"c8994c5ac6af0b12004967d7c801ae37"},{url:"images/heros/hero-image_4.jpg",revision:"4ea98fe648a0b853ab379c928b5fd0bf"},{url:"index.html",revision:"fc1d41881aaf78b8bdf8be4f8da22d2f"}]),function(t){const e=j();a(new T(e,t))}(W),a(/^https:\/\/restaurant-api.dicoding.dev\//,new class extends v{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(l)}async _(t,s){const n=s.fetchAndCachePut(t).catch((()=>{}));s.waitUntil(n);let i,r=await s.cacheMatch(t);if(r);else try{r=await n}catch(t){t instanceof Error&&(i=t)}if(!r)throw new e("no-response",{url:t.url,error:i});return r}}({cacheName:"2023-11-12T13:45:33.804Z",plugins:[new class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.k.isResponseCacheable(t)?t:null,this.k=new h(t)}}({statuses:[200]})]}),"GET")}));
//# sourceMappingURL=sw.workbox.bundle.js.map
