var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){t[e]=o},e.parcelRequired7c6=n);var r=n("eWCmQ");function i(e,o){return new Promise(((t,n)=>{setTimeout((()=>{Math.random()>.3?t({position:e,delay:o}):n({position:e,delay:o})}),o)}))}function l({position:e,delay:o}){r.Notify.success(`✅ Fulfilled promise ${e} in ${o}ms`,{timeout:4e3}),console.log(`✅ Fulfilled promise ${e} in ${o}ms`)}function u({position:e,delay:o}){r.Notify.failure(`❌ Rejected promise ${e} in ${o}ms`,{timeout:4e3}),console.log(`❌ Rejected promise ${e} in ${o}ms`)}({form:document.querySelector(".form")}).form.addEventListener("submit",(function(e){e.preventDefault();const o=Number(e.currentTarget.elements.delay.value),t=Number(e.currentTarget.elements.step.value),n=Number(e.currentTarget.elements.amount.value);for(let e=0;e<n;e++){i(e+1,o+e*t).then(l).catch(u)}}));
//# sourceMappingURL=03-promises.dd5d9271.js.map
