/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/_formcarry.js":
/*!******************************!*\
  !*** ./src/js/_formcarry.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return formcarry; });\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\n/*-------------------------------------------------------------------------------\r\n    formcarry.\r\n-------------------------------------------------------------------------------*/\n\nfunction formcarry() {\n  var contactForm = document.querySelector('#ajaxForm');\n\n  contactForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n\n    var submitText = document.querySelector('#submit-text');\n    var iconProcessing = document.querySelector('#submit-processing');\n    var iconSuccess = document.querySelector('#submit-success');\n    var iconError = document.querySelector('#submit-error');\n\n    iconSuccess.style.display = 'none';\n    iconError.style.display = 'none';\n    iconProcessing.style.display = 'block';\n    submitText.innerHTML = 'Sending...';\n\n    var url = 'https://formcarry.com/s/SyJGIGvZ7';\n    var form = document.forms.formcarry;\n    var formData = new FormData(form);\n    var data = {};\n\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = formData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var _ref = _step.value;\n\n        var _ref2 = _slicedToArray(_ref, 2);\n\n        var key = _ref2[0];\n        var prop = _ref2[1];\n\n        data[key] = prop;\n      }\n\n      /* Array.from(formData).forEach((key, prop) => {\r\n        data[key] = prop;\r\n      }); */\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator.return) {\n          _iterator.return();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n\n    var method = 'POST';\n    var headers = {\n      Accept: 'application/json',\n      'Content-Type': 'application/json'\n    };\n    var body = JSON.stringify(data);\n\n    fetch(url, {\n      method: method,\n      headers: headers,\n      body: body\n    }).then(function (res) {\n      return res.json();\n    })\n    // success!\n    .then(function (response) {\n      iconProcessing.style.display = 'none';\n      iconSuccess.style.display = 'block';\n      submitText.innerHTML = response.title + ' ' + response.message + '.';\n    })\n    // Error!\n    .catch(function (error) {\n      iconProcessing.style.display = 'none';\n      iconError.style.display = 'block';\n      submitText.innerHTML = 'An error occurred: ' + error.message + '.';\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/js/_formcarry.js?");

/***/ }),

/***/ "./src/js/_scroll.js":
/*!***************************!*\
  !*** ./src/js/_scroll.js ***!
  \***************************/
/*! exports provided: smoothScroll, scrollTop, scrollLead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"smoothScroll\", function() { return smoothScroll; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scrollTop\", function() { return scrollTop; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scrollLead\", function() { return scrollLead; });\n/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! smoothscroll-polyfill */ \"./node_modules/smoothscroll-polyfill/dist/smoothscroll.js\");\n/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n// Smooth Scroll\n\n\nsmoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0___default.a.polyfill();\n\n/*-------------------------------------------------------------------------------\r\n    Smooth Scroll\r\n-------------------------------------------------------------------------------*/\n// Scroll to section when nav is clicked\nfunction smoothScroll() {\n  var navLinks = document.querySelectorAll('header a');\n\n  Array.from(navLinks).forEach(function (el) {\n    el.addEventListener('click', function (e) {\n      e.preventDefault();\n\n      var heading = e.target.getAttribute('href');\n      document.querySelector(heading).scrollIntoView({\n        behavior: 'smooth'\n      });\n\n      // Hide the menu once clicked if mobile\n      var active = document.querySelector('header').classList.contains('active');\n      if (active) {\n        document.querySelectorAll('header, body').classList.remove('active');\n      }\n    });\n  });\n}\n\n// Scroll to top\nfunction scrollTop() {\n  document.querySelector('#to-top').addEventListener('click', function () {\n    window.scroll({\n      top: 0,\n      left: 0,\n      behavior: 'smooth'\n    });\n  });\n}\n\n// Scroll to first element\nfunction scrollLead() {\n  document.querySelector('#lead-down span').addEventListener('click', function () {\n    document.querySelector('#about').scrollIntoView({\n      behavior: 'smooth'\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/js/_scroll.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_svg */ \"./src/js/_svg.js\");\n/* harmony import */ var _behance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_behance */ \"./src/js/_behance.js\");\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_scroll */ \"./src/js/_scroll.js\");\n/* harmony import */ var _formcarry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_formcarry */ \"./src/js/_formcarry.js\");\n\n\n\n\n\n\n\n\nObject(_svg__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\nObject(_behance__WEBPACK_IMPORTED_MODULE_1__[\"behanceUser\"])();\n\nObject(_formcarry__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n\nObject(_scroll__WEBPACK_IMPORTED_MODULE_2__[\"smoothScroll\"])();\nObject(_scroll__WEBPACK_IMPORTED_MODULE_2__[\"scrollTop\"])();\nObject(_scroll__WEBPACK_IMPORTED_MODULE_2__[\"scrollLead\"])();\n\n/*-------------------------------------------------------------------------------\r\n    Mobile Nav\r\n-------------------------------------------------------------------------------*/\n// Open mobile menu\ndocument.querySelector('#mobile-menu-open').addEventListener('click', function () {\n  document.querySelectorAll('header, body').classList.add('active');\n});\n\n// Close mobile menu\ndocument.querySelector('#mobile-menu-close').addEventListener('click', function () {\n  document.querySelectorAll('header, body').classList.remove('active');\n});\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });