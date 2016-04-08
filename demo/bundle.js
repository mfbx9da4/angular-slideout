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

		__webpack_require__(1)
		/**
		 * Slideout directive.
		 * Controls animation of slideout menu.
		 *
		 * @module slideout-module
		 */
		angular.module('angular-slideout', ['ng'])
		.directive('slideout', ['$document', '$window', '$timeout', function($document, $window, $timeout) {
		    /* Global setup */

		    // Create overlay element
		    var overlay_element = angular.element(document.createElement('div'));
		    overlay_element.addClass('slideout-overlay');
		    $document[0].body.appendChild(overlay_element[0]);

		    // Initialize global array to track of visible instance
		    var slideouts_visible = [];

		    return {
		        restrict: 'A',
		        scope: false,
		        link: function($scope, element, attrs) {
		            /* Instance setup */

		            // Boolean expression which determines slideout state
		            var expression = attrs.slideout;

		            // Set expression to false on click overlay
		            overlay_element.on('click', function () {
		                $scope.$apply(function () {
		                    $scope[attrs.slideout] = false;
		                });
		            });

		            // Animation queue
		            var queue = [];

		            // Update slideouts visible
		            element.data('slideout_id', slideouts_visible.length);
		            slideouts_visible.push(0);

		            // Initialize classes
		            var direction = attrs.slideoutDirection;
		            if (direction === 'from-left') {
		                element.addClass('slideout-from-left');
		            } else {
		                direction = 'from-right';
		                element.addClass('slideout-from-right');
		            }
		            element.addClass('slideout');
		            element.addClass('slideout-closed');


		            /**
		             * Ensures slideout is animated only after finished animating
		             */
		            var execute_next_in_queue = function () {
		                if (!element.data('is_animating')) {
		                    var type = queue.shift();

		                    if (type) {
		                        animate(type);

		                        /*
		                         * Timeout to notify end of animation.
		                         * Would prefer to use .on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd")
		                         * but couldn't get it to work consistently.
		                         */
		                        $timeout(function() {
		                            element.data('is_animating', false);
		                            execute_next_in_queue();
		                            if (type === 'close') {
		                                element.addClass('slideout-closed');
		                            }
		                        }, (attrs.slideout_duration || 0.5)*1000);
		                    }

		                }
		            };


		            /**
		             * Update number of slideouts visible. Parent scope can access
		             * variable `$scope.slideout_open` to check if any slideouts visible.
		             */
		            var updateSlideoutOpen = function (state) {
		                slideouts_visible[element.data('slideout_id')] = state;
		                var count = 0;

		                for (var i = 0; i < slideouts_visible.length; i ++) {
		                    var is_visible = slideouts_visible[i];
		                    count += is_visible;
		                }

		                if (count) {
		                    $scope.slideout_open = true;
		                    overlay_element.addClass('slideout-overlay-show');
		                    $document.find('body').addClass('slideout-prevent-scroll')
		                } else {
		                    $scope.slideout_open = false;
		                    overlay_element.removeClass('slideout-overlay-show');
		                    $document.find('body').removeClass('slideout-prevent-scroll')
		                }
		            };

		            /**
		             * Add relevant classes for animation of slideout.
		             */
		            var animate = function (type) {
		                if (type === 'open') {
		                    element.data('is_animating', true);
		                    if (direction === 'from-right') {
		                        element.addClass('slideLeft');
		                        element.removeClass('slideRight');
		                    } else if (direction === 'from-left') {
		                        element.removeClass('slideLeft');
		                        element.addClass('slideRight');
		                    }
		                    element.addClass('slideout-open');
		                    element.removeClass('slideout-closed');
		                    updateSlideoutOpen(1);

		                } else if (type === 'close') {
		                    element.data('is_animating', true);
		                    if (direction === 'from-right') {
		                        element.removeClass('slideLeft');
		                        element.addClass('slideRight');
		                    } else if (direction === 'from-left') {
		                        element.addClass('slideLeft');
		                        element.removeClass('slideRight');
		                    }
		                    element.removeClass('slideout-open');
		                    updateSlideoutOpen(0);
		                }
		            }

		            /**
		             * Queue for animating.
		             */
		            var addToQueue = function(type) {
		                queue.push(type);
		                execute_next_in_queue();
		            };

		            if ($scope.$eval(expression)) {
		                addToQueue('close')
		            }

		            /**
		             * Watch for changes to expression and animate accordingly.
		             */
		            $scope.$watch(expression, function(new_val, old_val) {
		                if (typeof($scope[attrs.slideout]) === 'object' || typeof($scope[attrs.slideout]) === 'function') {
		                    // Required to be a variable so that the overlay can reset it upon to close all.
		                    console.error('Slideout value should not be a function or object');
		                    console.log('Slideout value should not be a function or object');
		                }

		                if (new_val === old_val) {
		                    return;
		                } else if (new_val) {
		                    addToQueue('open')
		                } else {
		                    addToQueue('close');
		                }
		            });
		        }
		    }
		}]);


	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		// style-loader: Adds some css to the DOM by adding a <style> tag

		// load the styles
		var content = __webpack_require__(2);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(4)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./slideout.css", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./slideout.css");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		exports = module.exports = __webpack_require__(3)();
		// imports


		// module
		exports.push([module.id, "*, *:after, *:before {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.slideLeft{\n  animation-name: slideLeft;\n  -webkit-animation-name: slideLeft;\n\n  animation-duration: 0.5s;\n  -webkit-animation-duration: 0.5s;\n\n  -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n     -moz-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n       -o-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n          transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); /* easeOutCubic */\n\n  visibility: visible !important;\n}\n\n@keyframes slideLeft {\n  0% {\n    transform: translateX(100%);\n  }\n  100% {\n    transform: translateX(0%);\n  }\n}\n\n@-webkit-keyframes slideLeft {\n  0% {\n    -webkit-transform: translateX(100%);\n  }\n  100% {\n    -webkit-transform: translateX(0%);\n  }\n}\n\n.slideRight{\n  animation-name: slideRight;\n  -webkit-animation-name: slideRight;\n\n  animation-duration: 0.5s;\n  -webkit-animation-duration: 0.5s;\n\n  -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n     -moz-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n       -o-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n          transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); /* easeOutCubic */\n\n\n  visibility: visible !important;\n}\n\n@keyframes slideRight {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(0%);\n  }\n}\n\n@-webkit-keyframes slideRight {\n  0% {\n    -webkit-transform: translateX(-100%);\n  }\n  100% {\n    -webkit-transform: translateX(0%);\n  }\n}\n\n/**\n*\n* Overlay\n*\n**/\n\n.slideout-overlay {\n  z-index: 10;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: rgba(0,0,0,0.2);\n  content: '';\n  -webkit-transition: opacity 0.5s;\n  transition: opacity 0.5s;\n  width: 0px;\n  height: 0px;\n  opacity: 0;\n}\n\n.slideout-overlay-show {\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n}\n\n/**\n*\n* Prevent scroll of body when open\n*\n**/\n.slideout-prevent-scroll {\n  overflow: hidden;\n  height: 100%;\n  position: absolute;\n}\n\n/**\n*\n* Default slideout styles.\n*\n**/\n\n.slideout {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  z-index: 0;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  z-index: 11;\n}\n\n.slideout.slideout-from-right {\n  left: 100%;\n}\n.slideout.slideout-from-left {\n  left: -100%;\n}\n\n/* Variables to control slideout width */\n.slideout {\n  width: 90%;\n}\n.slideout-open.slideout-from-right {\n  left: 10%;\n}\n.slideout-open.slideout-from-left {\n  left: -0%;\n}\n/* END: Variables to control slideout width */\n", ""]);

		// exports


	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		/*
			MIT License http://www.opensource.org/licenses/mit-license.php
			Author Tobias Koppers @sokra
		*/
		// css base code, injected by the css-loader
		module.exports = function() {
			var list = [];

			// return the list of modules as css string
			list.toString = function toString() {
				var result = [];
				for(var i = 0; i < this.length; i++) {
					var item = this[i];
					if(item[2]) {
						result.push("@media " + item[2] + "{" + item[1] + "}");
					} else {
						result.push(item[1]);
					}
				}
				return result.join("");
			};

			// import a list of modules into the list
			list.i = function(modules, mediaQuery) {
				if(typeof modules === "string")
					modules = [[null, modules, ""]];
				var alreadyImportedModules = {};
				for(var i = 0; i < this.length; i++) {
					var id = this[i][0];
					if(typeof id === "number")
						alreadyImportedModules[id] = true;
				}
				for(i = 0; i < modules.length; i++) {
					var item = modules[i];
					// skip already imported module
					// this implementation is not 100% perfect for weird media query combinations
					//  when a module is imported multiple times with different media queries.
					//  I hope this will never occur (Hey this way we have smaller bundles)
					if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
						if(mediaQuery && !item[2]) {
							item[2] = mediaQuery;
						} else if(mediaQuery) {
							item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
						}
						list.push(item);
					}
				}
			};
			return list;
		};


	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		/*
			MIT License http://www.opensource.org/licenses/mit-license.php
			Author Tobias Koppers @sokra
		*/
		var stylesInDom = {},
			memoize = function(fn) {
				var memo;
				return function () {
					if (typeof memo === "undefined") memo = fn.apply(this, arguments);
					return memo;
				};
			},
			isOldIE = memoize(function() {
				return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
			}),
			getHeadElement = memoize(function () {
				return document.head || document.getElementsByTagName("head")[0];
			}),
			singletonElement = null,
			singletonCounter = 0,
			styleElementsInsertedAtTop = [];

		module.exports = function(list, options) {
			if(false) {
				if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
			}

			options = options || {};
			// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
			// tags it will allow on a page
			if (typeof options.singleton === "undefined") options.singleton = isOldIE();

			// By default, add <style> tags to the bottom of <head>.
			if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

			var styles = listToStyles(list);
			addStylesToDom(styles, options);

			return function update(newList) {
				var mayRemove = [];
				for(var i = 0; i < styles.length; i++) {
					var item = styles[i];
					var domStyle = stylesInDom[item.id];
					domStyle.refs--;
					mayRemove.push(domStyle);
				}
				if(newList) {
					var newStyles = listToStyles(newList);
					addStylesToDom(newStyles, options);
				}
				for(var i = 0; i < mayRemove.length; i++) {
					var domStyle = mayRemove[i];
					if(domStyle.refs === 0) {
						for(var j = 0; j < domStyle.parts.length; j++)
							domStyle.parts[j]();
						delete stylesInDom[domStyle.id];
					}
				}
			};
		}

		function addStylesToDom(styles, options) {
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				if(domStyle) {
					domStyle.refs++;
					for(var j = 0; j < domStyle.parts.length; j++) {
						domStyle.parts[j](item.parts[j]);
					}
					for(; j < item.parts.length; j++) {
						domStyle.parts.push(addStyle(item.parts[j], options));
					}
				} else {
					var parts = [];
					for(var j = 0; j < item.parts.length; j++) {
						parts.push(addStyle(item.parts[j], options));
					}
					stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
				}
			}
		}

		function listToStyles(list) {
			var styles = [];
			var newStyles = {};
			for(var i = 0; i < list.length; i++) {
				var item = list[i];
				var id = item[0];
				var css = item[1];
				var media = item[2];
				var sourceMap = item[3];
				var part = {css: css, media: media, sourceMap: sourceMap};
				if(!newStyles[id])
					styles.push(newStyles[id] = {id: id, parts: [part]});
				else
					newStyles[id].parts.push(part);
			}
			return styles;
		}

		function insertStyleElement(options, styleElement) {
			var head = getHeadElement();
			var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
			if (options.insertAt === "top") {
				if(!lastStyleElementInsertedAtTop) {
					head.insertBefore(styleElement, head.firstChild);
				} else if(lastStyleElementInsertedAtTop.nextSibling) {
					head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
				} else {
					head.appendChild(styleElement);
				}
				styleElementsInsertedAtTop.push(styleElement);
			} else if (options.insertAt === "bottom") {
				head.appendChild(styleElement);
			} else {
				throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
			}
		}

		function removeStyleElement(styleElement) {
			styleElement.parentNode.removeChild(styleElement);
			var idx = styleElementsInsertedAtTop.indexOf(styleElement);
			if(idx >= 0) {
				styleElementsInsertedAtTop.splice(idx, 1);
			}
		}

		function createStyleElement(options) {
			var styleElement = document.createElement("style");
			styleElement.type = "text/css";
			insertStyleElement(options, styleElement);
			return styleElement;
		}

		function createLinkElement(options) {
			var linkElement = document.createElement("link");
			linkElement.rel = "stylesheet";
			insertStyleElement(options, linkElement);
			return linkElement;
		}

		function addStyle(obj, options) {
			var styleElement, update, remove;

			if (options.singleton) {
				var styleIndex = singletonCounter++;
				styleElement = singletonElement || (singletonElement = createStyleElement(options));
				update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
				remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
			} else if(obj.sourceMap &&
				typeof URL === "function" &&
				typeof URL.createObjectURL === "function" &&
				typeof URL.revokeObjectURL === "function" &&
				typeof Blob === "function" &&
				typeof btoa === "function") {
				styleElement = createLinkElement(options);
				update = updateLink.bind(null, styleElement);
				remove = function() {
					removeStyleElement(styleElement);
					if(styleElement.href)
						URL.revokeObjectURL(styleElement.href);
				};
			} else {
				styleElement = createStyleElement(options);
				update = applyToTag.bind(null, styleElement);
				remove = function() {
					removeStyleElement(styleElement);
				};
			}

			update(obj);

			return function updateStyle(newObj) {
				if(newObj) {
					if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
						return;
					update(obj = newObj);
				} else {
					remove();
				}
			};
		}

		var replaceText = (function () {
			var textStore = [];

			return function (index, replacement) {
				textStore[index] = replacement;
				return textStore.filter(Boolean).join('\n');
			};
		})();

		function applyToSingletonTag(styleElement, index, remove, obj) {
			var css = remove ? "" : obj.css;

			if (styleElement.styleSheet) {
				styleElement.styleSheet.cssText = replaceText(index, css);
			} else {
				var cssNode = document.createTextNode(css);
				var childNodes = styleElement.childNodes;
				if (childNodes[index]) styleElement.removeChild(childNodes[index]);
				if (childNodes.length) {
					styleElement.insertBefore(cssNode, childNodes[index]);
				} else {
					styleElement.appendChild(cssNode);
				}
			}
		}

		function applyToTag(styleElement, obj) {
			var css = obj.css;
			var media = obj.media;

			if(media) {
				styleElement.setAttribute("media", media)
			}

			if(styleElement.styleSheet) {
				styleElement.styleSheet.cssText = css;
			} else {
				while(styleElement.firstChild) {
					styleElement.removeChild(styleElement.firstChild);
				}
				styleElement.appendChild(document.createTextNode(css));
			}
		}

		function updateLink(linkElement, obj) {
			var css = obj.css;
			var sourceMap = obj.sourceMap;

			if(sourceMap) {
				// http://stackoverflow.com/a/26603875
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
			}

			var blob = new Blob([css], { type: "text/css" });

			var oldSrc = linkElement.href;

			linkElement.href = URL.createObjectURL(blob);

			if(oldSrc)
				URL.revokeObjectURL(oldSrc);
		}


	/***/ }
	/******/ ]);

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