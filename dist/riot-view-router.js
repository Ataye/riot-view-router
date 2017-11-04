!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Router",[],e):"object"==typeof exports?exports.Router=e():t.Router=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="dist/",e(e.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){return{$router:new r.Router(t,e)}};var r=n(1);t.exports=e.default},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Router=void 0;var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(2),i=n(3),u=n(4),s=n(5);e.Router=function(){function t(e,n){r(this,t);var o=this;o.version=a.version,o.$constants=i.Constants,o.$tools=new s.Tools(o),o.$utils=new u.Utils(o),Object.defineProperty(o,"location",{get:function(){return window.location.href},set:function(t){window.location.href=t}}),o.running=!1;var c=["defaultState"],l=["debugging","href","fallbackState","onBeforeStateChange","onStateChange"],f=c.concat(l);for(var d in e)if(-1==f.indexOf(d))throw Error('Unknown option "'+d+'" is not supported');o=Object.assign(o,e),o.debugging=o.debugging||!1,o.href=o.href||o.location,o.href.endsWith("/")||(o.href=o.href+"/");var m=["name","route","tag"];if(n=Array.isArray(n)?n.map(function(t){return Object.assign({},t)}):[Object.assign({},state)],n.forEach(function(t){if(!t.name.match(o.$constants.regex.stateName))throw Error('Invalid state name "'+t.name+'",        state names must be a valid alphanumeric string.')}),m.forEach(function(t){n.forEach(function(e){if(!e[t])throw ReferenceError('Required state option "'+t+'" not specified')})}),n.forEach(function(t){t.route=o.$utils.splitRoute(t.route)}),o.states=n,!o.defaultState)throw ReferenceError("Default state must be specified");if(o.defaultState.indexOf(":")>-1)throw Error("Default state route cannot take variable parameters");if(!o.$utils.stateByName(o.defaultState))throw Error('State "'+o.defaultState+'" not found in specified states');if(o.fallbackState){if(!o.$utils.stateByName(o.fallbackState))throw Error('Fallback state "'+o.fallbackState+'" not found in specified states')}else o.debugging&&console.warn('Fallback state not specified, defaulting to "'+o.defaultState+'"'),o.fallbackState=o.defaultState;o.marker?o.marker.match(o.$constants.regex.marker)||(debugging&&(console.warn('Marker "'+o.marker+'" contains unsupported characters'),console.warn('Defaulting to "'+o.$constants.defaults.marker+'"')),o.marker=o.$constants.defaults.marker):o.marker=o.$constants.defaults.marker,o.marker=o.marker||o.$constants.defaults.marker}return o(t,[{key:"navigate",value:function(t){var e=this;return new Promise(function(n){e.location=e.href+e.$constants.defaults.hash+t,n()})}},{key:"push",value:function(t,e){var n=this;return new Promise(function(r){var o=n.$utils.stateByName(t);n.location.split(n.$constants.defaults.hash)[1]!==o.route.route&&(o.route.variables.length?n.debugging&&(console.warn('State "'+t+'" does not match current route.'),console.warn("Could not re-route due to route variables.")):(n.navigate(o.route.route),r())),n.onBeforeStateChange&&n.onBeforeStateChange(o),n.$state&&n.$state.onLeave&&n.$state.onLeave(o),n.$tools.transition(o,e),n.onStateChange&&n.onStateChange(o),o.onEnter&&o.onEnter(o),n.$state=o,r()})}},{key:"start",value:function(){var t=this;return new Promise(function(e,n){if(t.running)t.debugging&&console.warn("Router was already running"),n();else{t.location||t.navigate(t.$utils.stateByName(t.defaultState).route.route);var r=window.setInterval(function(){var n=document.querySelector(t.marker)||document.querySelector("["+t.marker+"]");n&&(t.context=n,t.push(t.$utils.stateByRoute().name),window.onhashchange=function(){var e=t.$utils.stateByRoute(),n=t.$utils.extractRouteVars(e);t.push(e.name,n)},window.clearInterval(r),e())},500)}})}},{key:"stop",value:function(){var t=this;return new Promise(function(e,n){t.running?(t.running=!1,delete window.onhashchange,e()):(t.debugging&&console.warn("Router was not running"),n())})}}]),t}()},function(t,e){t.exports={name:"riot-view-router",version:"0.0.2",description:"Lightweight, extensive riot.js router for tag views.",main:"dist/riot-view-router.js",scripts:{build:"node_modules/.bin/cross-env NODE_ENV=production node_modules/.bin/webpack --config build/webpack.conf.js","build:dev":"node_modules/.bin/webpack --config build/webpack.conf.js",lint:"node_modules/.bin/eslint src/**.js","test:unit":"node_modules/.bin/jasmine --config=test/jasmine.unit.json","test:e2e":"node_modules/.bin/karma start test/karma.conf.js",test:"npm run lint && npm run test:unit"},repository:{type:"git",url:"git+https://github.com/neetjn/riot-view-router.git"},keywords:["riot","riot.js","javascript","route","tag"],author:"John Nolette",license:"MIT",bugs:{url:"https://github.com/neetjn/riot-view-router/issues"},homepage:"https://github.com/neetjn/riot-view-router#readme",devDependencies:{"babel-core":"^6.26.0","babel-eslint":"^7.2.3","babel-loader":"^7.1.2","babel-plugin-add-module-exports":"^0.2.1","babel-preset-env":"^1.6.1","cross-env":"^5.1.0",electron:"^1.7.9",eslint:"^4.9.0","eslint-plugin-riot":"^0.1.7",jasmine:"^2.8.0",karma:"^1.7.1","karma-electron":"^5.2.1","karma-jasmine":"^1.1.0","karma-riot":"^2.0.0","random-js":"1.0.8",riot:"^3.7.3",webpack:"^3.8.1"},dependencies:{}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Constants={defaults:{hash:"#!",marker:"r-view",anchorMarker:"r-sref"},regex:{marker:/[a-zA-Z\-]*/g,stateName:/[a-zA-Z0-9]/g,routeFormat:/^\/(?::?[a-zA-Z0-9]+\/?)*$/g,routeVariable:/(:[a-zA-Z]*)/g}}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.Utils=function(){function t(e){r(this,t),this.$router=e}return a(t,[{key:"stateByName",value:function(t){return this.$router.states.find(function(e){return t==e.name})}},{key:"splitRoute",value:function(t){var e=this.$router;if(!t.match(e.$constants.regex.routeFormat))throw Error('Route "'+t+'" did not match expected route format');var n=t.split("/").slice(1),r=n.filter(function(t){return t.match(e.$constants.regex.routeVariable)}).map(function(t){return{name:t.split("").slice(1).join(""),position:n.indexOf(t)}});return r.forEach(function(e){if(r.filter(function(t){return t==e}).length>1)throw Error('Found duplicate route variable pattern\n\t "'+t+'"')}),{route:t,pattern:n,variables:r}}},{key:"stateByRoute",value:function(){var t=this.$router,e=t.location.split(t.$constants.defaults.hash);e=e.length>1?e[1].split("/").slice(1):["/"];var n=t.states.find(function(t){var n=t.route;if(e.length==n.pattern.length){for(var r in e){var a=function(t){if(e[t]!==n.pattern[t]&&"*"!==n.pattern[t]&&!n.variables.find(function(e){return e.position==t}))return{v:!1}}(r);if("object"===(void 0===a?"undefined":o(a)))return a.v}return!0}});return n||(t.debugging&&console.warn("Route was not matched, defaulting to fallback state"),this.stateByName(t.fallbackState))}},{key:"extractRouteVars",value:function(t){var e=this.$router,n=e.location.split(e.$constants.defaults.hash);n.length>1&&(n=n[1].split("/").slice(1));var r=t.route.variables;return r.forEach(function(t){t.value=n[t.position]}),r}}]),t}()},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.Tools=function(){function t(e){r(this,t),this.$router=e}return o(t,[{key:"transition",value:function(t,e){var n=this.$router;return new Promise(function(r){if(n.$state){var o=riot.util.vdom.find(function(t){return t.root.localName==n.$state.tag});if(!o)throw Error("Could not find a matching tag to unmount");o.unmount()}var a=document.createElement(t.tag);if(n.context.appendChild(a),e){var i={};if(e.forEach(function(t){i[t.name]=t.value}),riot.mount(t.tag,i),t.title){var u=t.title;e.forEach(function(t){return u=u.replace("<"+t.name+">",t.value)}),document.title=u}}else riot.mount(t.tag);r()})}}]),t}()}])});