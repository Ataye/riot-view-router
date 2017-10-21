!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var o in r)("object"==typeof exports?exports:t)[o]=r[o]}}(this,function(){return function(t){function e(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,o){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="dist/",e(e.s=0)}([function(t,e,r){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Router=void 0;var n=r(1),a=r(2),i=r(3);e.Router=function t(e,r){o(this,t);var u=this.$router={};u.$constants=n.Constants,u=Object.assign(u,a.Core),u.$utils=i.Utils,Object.defineProperty(u,"location",{get:function(){return window.location.hash},set:function(t){window.location.hash=t}});var s=["defaultState"],c=["debugging","fallbackState","onBeforeStateChange","onStateChange"],f=s.concat(c);for(var l in e)if(-1==f.indexOf(l))throw Error('Unknown option "'+l+" is not supported");u=Object.assign(u,e),u.debugging=u.debugging||!1;var h=["name","route","tag"];if(r=Array.isArray(r)?r:[r],r.forEach(function(t){if(!t.name.match(u.$constants.regex.stateName))throw Error('Invalid state name "'+t.name+'",        state names must be a valid alphanumeric string.')}),h.forEach(function(t){r.forEach(function(e){if(!e[t])throw Error('Required state option "'+t+'" not specified')})}),r.forEach(function(t){t.route=u.$utils.splitRoute(t.route)}),u.states=r,!u.defaultState)throw Error("Default state must be specified");if(u.defaultState.indexOf(":")>-1)throw Error("Default state route cannot take variable parameters");if(!u.$utils.stateByName(u.defaultState))throw Error('State "'+u.defaultState+'" not found in specified states');if(u.fallbackState){if(!u.$utils.stateByName(u.fallbackState))throw Error('Fallback state "'+u.fallbackState+'" not found in specified states')}else u.debugging&&console.warn('Fallback state not specified, dfaulting to "'+u.defaultState+'"'),u.fallbackState=u.defaultState;u.marker?u.marker.match(u.$constants.regex.marker)||(debugging&&(console.warn('Marker "'+u.marker+'" contains unsupported characters'),console.warn('Defaulting to "'+u.$constants.defaults.marker+'"')),u.marker=u.$constants.defaults.marker):u.marker=u.$constants.defaults.marker,u.marker=u.marker||u.$constants.defaults.marker,u.start()}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Constants={defaults:{marker:"r-view",anchorMarker:"r-sref"},regex:{marker:/[a-zA-Z\-]*/g,stateName:/[a-zA-Z0-9]/g,routeFormat:/^\/(?::?[a-zA-Z0-9]+\/?)*$/g,routeVariable:/(:[a-zA-Z]*)/g}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Core={navigate:function(t){this.$router.location="#!"+t},pushState:function(t){var e=this.$router.$utils.stateByName(t);if(this.$router.location.split("#!")[1]!==e.route.route){if(!e.route.variables.length)return void this.$router.navigate(e.route.route);this.$router.debugging&&(console.warn('State "'+t+'" does not match current route.'),console.warn("Could not re-route due to route variables."))}this.$router.onBeforeStateChange&&this.$router.onBeforeStateChange(e),this.$router.$state&&this.$router.$state.onLeave&&this.$router.$state.onLeave(e),this.$router.transition(e),this.$router.onStateChange&&this.$router.onStateChange(e),e.onEnter&&e.onEnter(e),this.$router.$state=e},transition:function(t){var e=this,r=this.$router.$utils.extractRouteVars(t);if(this.$router.$state){var o=riot.util.vdom.find(function(t){return t.root.localName==e.$router.$state.tag});if(!o)throw Error("Could not find a matching tag to unmount");o.unmount()}var n=document.createElement(t.tag),a={};r.forEach(function(t){a[t.name]=t.value}),this.$router.context.appendChild(n),riot.mount(t.tag,a);var i=t.title;r.forEach(function(t){return i=i.replace("<"+t.name+">",t.value)}),document.title=i},start:function(){console.log(this.$router),this.$router.location||(window.location.hash="#!"+this.$router.$utils.stateByName(this.$router.defaultState).route.route),this.$router.context_id="$"+(new Date).getTime().toString(),window[this.$router.context_id]=window.setInterval(function(){var t=document.querySelector(this.$router.marker)||document.querySelector("["+this.$router.marker+"]");t&&(this.$router.context=t,this.$router.pushState(this.$router.$utils.stateByRoute().name),window.onhashchange=function(){this.$router.pushState(this.$router.$utils.stateByRoute().name)},window.clearInterval(window[this.$router.context_id]))},250)}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.Utils={stateByName:function(t){return this.$router.states.find(function(e){return t==e.name})},splitRoute:function(t){var e=this;if(!t.match(this.$router.$constants.regex.routeFormat))throw Error('Route "'+t+'" did not match expected route format');var r=t.split("/").slice(1),o=r.filter(function(t){return t.match(e.$router.$constants.regex.routeVariable)}).map(function(t){return{name:t.split("").slice(1).join(""),position:r.indexOf(t)}});return o.forEach(function(e){if(o.filter(function(t){return e}).length>1)throw Error('Found duplicate route variable pattern\n\t "'+t+'"')}),{route:t,pattern:r,variables:o}},stateByRoute:function(){var t=this.$router.location.split("#!");t=t.length>1?t[1].split("/").slice(1):["/"];var e=this.$router.states.find(function(e){var r=e.route;if(t.length==r.pattern.length){for(var n in t){var a=function(e){if(t[e]!==r.pattern[e]&&"*"!==r.pattern[e]&&!r.variables.find(function(t){return t.position==e}))return{v:!1}}(n);if("object"===(void 0===a?"undefined":o(a)))return a.v}return!0}});return e||(this.$router.debugging&&console.warn("Route was not matched, defaulting to fallback state"),this.$router.$utils.stateByName(this.$router.fallbackState))},extractRouteVars:function(t){var e=this.$router.location.split("#!");e.length>1&&(e=e[1].split("/").slice(1));var r=t.route.variables;return r.forEach(function(t){t.value=e[t.position]}),r}}}])});