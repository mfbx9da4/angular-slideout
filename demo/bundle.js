/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular_slideout = __webpack_require__(1);
	var demo = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	module.exports = 'ng-slideout';


/***/ },
/* 2 */
/***/ function(module, exports) {

	!function(e){function t(o){if(i[o])return i[o].exports;var n=i[o]={exports:{},id:o,loaded:!1};return e[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){i(1),angular.module("angular-slideout",["ng"]).directive("slideout",["$document","$window","$timeout",function(e,t,i){var o=angular.element(document.createElement("div"));o.addClass("slideout-overlay"),e[0].body.appendChild(o[0]);var n=[];return{restrict:"A",scope:!1,link:function(t,r,s){var a=s.slideout;o.on("click",function(){t.$apply(function(){t[s.slideout]=!1})});var l=[];r.data("slideout_id",n.length),n.push(0);var d=s.slideoutDirection;"from-left"===d?r.addClass("slideout-from-left"):(d="from-right",r.addClass("slideout-from-right")),r.addClass("slideout"),r.addClass("slideout-closed");var u=function(){if(!r.data("is_animating")){var e=l.shift();e&&(c(e),i(function(){r.data("is_animating",!1),u(),"close"===e&&r.addClass("slideout-closed")},1e3*(s.slideout_duration||.5)))}},f=function(i){n[r.data("slideout_id")]=i;for(var s=0,a=0;a<n.length;a++){var l=n[a];s+=l}s?(t.slideout_open=!0,o.addClass("slideout-overlay-show"),e.find("body").addClass("slideout-prevent-scroll")):(t.slideout_open=!1,o.removeClass("slideout-overlay-show"),e.find("body").removeClass("slideout-prevent-scroll"))},c=function(e){"open"===e?(r.data("is_animating",!0),"from-right"===d?(r.addClass("slideLeft"),r.removeClass("slideRight")):"from-left"===d&&(r.removeClass("slideLeft"),r.addClass("slideRight")),r.addClass("slideout-open"),r.removeClass("slideout-closed"),f(1)):"close"===e&&(r.data("is_animating",!0),"from-right"===d?(r.removeClass("slideLeft"),r.addClass("slideRight")):"from-left"===d&&(r.addClass("slideLeft"),r.removeClass("slideRight")),r.removeClass("slideout-open"),f(0))},p=function(e){l.push(e),u()};t.$eval(a)&&p("close"),t.$watch(a,function(e,i){"object"!=typeof t[s.slideout]&&"function"!=typeof t[s.slideout]||(console.error("Slideout value should not be a function or object"),console.log("Slideout value should not be a function or object")),e!==i&&p(e?"open":"close")})}}}])},function(e,t,i){var o=i(2);"string"==typeof o&&(o=[[e.id,o,""]]);i(4)(o,{});o.locals&&(e.exports=o.locals)},function(e,t,i){t=e.exports=i(3)(),t.push([e.id,"*,:after,:before{box-sizing:border-box}.slideLeft{animation-name:slideLeft;-webkit-animation-name:slideLeft;animation-duration:.5s;-webkit-animation-duration:.5s;-webkit-transition-timing-function:cubic-bezier(.215,.61,.355,1);transition-timing-function:cubic-bezier(.215,.61,.355,1);visibility:visible!important}@keyframes slideLeft{0%{transform:translateX(100%)}to{transform:translateX(0)}}@-webkit-keyframes slideLeft{0%{-webkit-transform:translateX(100%)}to{-webkit-transform:translateX(0)}}.slideRight{animation-name:slideRight;-webkit-animation-name:slideRight;animation-duration:.5s;-webkit-animation-duration:.5s;-webkit-transition-timing-function:cubic-bezier(.215,.61,.355,1);transition-timing-function:cubic-bezier(.215,.61,.355,1);visibility:visible!important}@keyframes slideRight{0%{transform:translateX(-100%)}to{transform:translateX(0)}}@-webkit-keyframes slideRight{0%{-webkit-transform:translateX(-100%)}to{-webkit-transform:translateX(0)}}.slideout-overlay{z-index:10;position:absolute;top:0;right:0;background:rgba(0,0,0,.2);content:'';-webkit-transition:opacity .5s;transition:opacity .5s;width:0;height:0;opacity:0}.slideout-overlay-show{width:100%;height:100%;opacity:1}.slideout-prevent-scroll{overflow:hidden;height:100%;position:absolute}.slideout{position:fixed;top:0;bottom:0;z-index:0;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:11}.slideout.slideout-from-right{left:100%}.slideout.slideout-from-left{left:-100%}.slideout{width:90%}.slideout-open.slideout-from-right{left:10%}.slideout-open.slideout-from-left{left:0}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var i=this[t];i[2]?e.push("@media "+i[2]+"{"+i[1]+"}"):e.push(i[1])}return e.join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},n=0;n<this.length;n++){var r=this[n][0];"number"==typeof r&&(o[r]=!0)}for(n=0;n<t.length;n++){var s=t[n];"number"==typeof s[0]&&o[s[0]]||(i&&!s[2]?s[2]=i:i&&(s[2]="("+s[2]+") and ("+i+")"),e.push(s))}},e}},function(e,t,i){function o(e,t){for(var i=0;i<e.length;i++){var o=e[i],n=p[o.id];if(n){n.refs++;for(var r=0;r<n.parts.length;r++)n.parts[r](o.parts[r]);for(;r<o.parts.length;r++)n.parts.push(d(o.parts[r],t))}else{for(var s=[],r=0;r<o.parts.length;r++)s.push(d(o.parts[r],t));p[o.id]={id:o.id,refs:1,parts:s}}}}function n(e){for(var t=[],i={},o=0;o<e.length;o++){var n=e[o],r=n[0],s=n[1],a=n[2],l=n[3],d={css:s,media:a,sourceMap:l};i[r]?i[r].parts.push(d):t.push(i[r]={id:r,parts:[d]})}return t}function r(e,t){var i=v(),o=y[y.length-1];if("top"===e.insertAt)o?o.nextSibling?i.insertBefore(t,o.nextSibling):i.appendChild(t):i.insertBefore(t,i.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");i.appendChild(t)}}function s(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function a(e){var t=document.createElement("style");return t.type="text/css",r(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",r(e,t),t}function d(e,t){var i,o,n;if(t.singleton){var r=g++;i=b||(b=a(t)),o=u.bind(null,i,r,!1),n=u.bind(null,i,r,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=l(t),o=c.bind(null,i),n=function(){s(i),i.href&&URL.revokeObjectURL(i.href)}):(i=a(t),o=f.bind(null,i),n=function(){s(i)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else n()}}function u(e,t,i,o){var n=i?"":o.css;if(e.styleSheet)e.styleSheet.cssText=C(t,n);else{var r=document.createTextNode(n),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function f(e,t){var i=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}function c(e,t){var i=t.css,o=t.sourceMap;o&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var n=new Blob([i],{type:"text/css"}),r=e.href;e.href=URL.createObjectURL(n),r&&URL.revokeObjectURL(r)}var p={},h=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),v=h(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,g=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var i=n(e);return o(i,t),function(e){for(var r=[],s=0;s<i.length;s++){var a=i[s],l=p[a.id];l.refs--,r.push(l)}if(e){var d=n(e);o(d,t)}for(var s=0;s<r.length;s++){var l=r[s];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete p[l.id]}}}};var C=function(){var e=[];return function(t,i){return e[t]=i,e.filter(Boolean).join("\n")}}()}]);

/***/ },
/* 3 */
/***/ function(module, exports) {

	if (!window.getComputedStyle) {
	    window.getComputedStyle = function(el, pseudo) {
	        this.el = el;
	        this.getPropertyValue = function(prop) {
	            var re = /(\-([a-z]){1})/g;
	            if (prop == 'float') prop = 'styleFloat';
	            if (re.test(prop)) {
	                prop = prop.replace(re, function() {
	                    return arguments[2].toUpperCase();
	                });
	            }
	            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
	        }
	        return this;
	    }
	}

	var app = angular.module('app', ['angular-slideout', 'ngTouch']);
	app.controller('main', function($scope) {
	    $scope.log = function () {
	        console.log('hi');
	    }
	    $scope.randomBool = function () {
	        return Math.random() > 0.5;
	    }
	    window.sc = $scope;
	});
	document.querySelector('.loader').remove();

	module.exports = "main.js";


/***/ }
/******/ ]);