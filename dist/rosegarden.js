function r(t,e=[]){return(...n)=>{return(o=[...e,...n]).length>=t.length?t(...o):r(t,o);var o}}const t=Array.isArray;function e(r){return"string"==typeof r?r.slice(0,-1):r.length?function(r,t,e){let n=-1,{length:o}=r;(e=e>o?o:e)<0&&(e+=o),o=t>e?0:e-t>>>0,t>>>=0;const i=Array(o);for(;++n<o;)i[n]=r[n+t];return i}(r,0,-1):[]}function n(r,t){if(1===arguments.length)return t=>n(r,t);if("string"==typeof r)throw new TypeError(`‘test’ requires a value of type RegExp as its first argument; received "${r}"`);return-1!==t.search(r)}function o(r){return(...t)=>new Promise(((e,n)=>{try{r(...t,e)}catch(r){n(r)}}))}function i(r){return function(...t){const o="string"==typeof(i=t)?i[i.length-1]||"":i[i.length-1];var i;const s=e(t);r(...s,(function(...r){const t=chrome.runtime.lastError,e=n(/^Tabs cannot be \w+ right now \(user may be dragging a tab\)\.$/);if(t){if(e(t.message))return void setTimeout((()=>{o(...r)}),500);throw new Error(t.message)}o(...r)}))}}if(r((function(r,e,n){if(!t(n))throw new TypeError("reduce: list must be array or iterable");let o=0;const i=n.length;for(;o<i;)e=r(e,n[o],o,n),o++;return e}))((function r(t,e){return 1===arguments.length?e=>r(t,e):t*e}),1),globalThis.chrome&&!globalThis.browser){const r=globalThis.chrome,t=c(r),e=Object.assign({},r,t);globalThis.browser=e}const s=globalThis.browser;function c(r){const t={};for(const e in r){const n=r[e];switch(typeof n){case"function":t[e]=u(n);break;case"object":if("on"===e.slice(0,2))continue;t[e]=c(n)}}return t}function u(t){return function(...r){if(0===r.length)throw new Error("compose requires at least one argument");return(...t)=>{const e=r.slice();if(e.length>0){let r=e.pop()(...t);for(;e.length>0;)r=e.pop()(r);return r}}}(o,i,r)(t)}export{s as browser,c as promised,u as toPromise};