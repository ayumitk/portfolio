/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/behance.js":
/*!***************************!*\
  !*** ./src/js/behance.js ***!
  \***************************/
/*! exports provided: behanceProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"behanceProject\", function() { return behanceProject; });\n/*-------------------------------------------------------------------------------\r\n\tBehance User\r\n-------------------------------------------------------------------------------*/\n\n/*-------------------------------------------------------------------------------\r\n\tBehance Project\r\n-------------------------------------------------------------------------------*/\n\nfunction behanceProject() {\n\t//const projectID = location.search.replace('?projectID=', '');\n\tvar projectID = 59135529;\n\t//console.log(projectID);\n\tvar apiKey = '5AGtA6uAQot7srZlfWYtj1kZUXSuHx0S';\n\tvar behanceProjectAPI = 'https://www.behance.net/v2/projects/' + projectID + '?api_key=' + apiKey + '&callback=myCallbackFunction';\n\n\t//const sessionName = 'behanceProject_' + projectID;\n\n\n\tvar myCallbackFunction = function myCallbackFunction(data) {\n\t\tconsole.log(data.project);\n\t};\n\n\tvar script = document.createElement('script');\n\tscript.type = 'text/javascript';\n\tscript.src = behanceProjectAPI;\n\tdocument.getElementsByTagName('head')[0].appendChild(script);\n}\n\n//# sourceURL=webpack:///./src/js/behance.js?");

/***/ }),

/***/ "./src/js/formcarry.js":
/*!*****************************!*\
  !*** ./src/js/formcarry.js ***!
  \*****************************/
/*! exports provided: formcarry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formcarry\", function() { return formcarry; });\n/*-------------------------------------------------------------------------------\r\n\tformcarry.\r\n-------------------------------------------------------------------------------*/\n\nfunction formcarry() {\n\t//console.log('TODO: formcarry');\n}\n\n//# sourceURL=webpack:///./src/js/formcarry.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _svg_include__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svg_include */ \"./src/js/svg_include.js\");\n/* harmony import */ var _formcarry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formcarry */ \"./src/js/formcarry.js\");\n/* harmony import */ var _behance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./behance */ \"./src/js/behance.js\");\n// SVG Include\n\nObject(_svg_include__WEBPACK_IMPORTED_MODULE_0__[\"svgInclude\"])();\n\n// Formcarry\n\nObject(_formcarry__WEBPACK_IMPORTED_MODULE_1__[\"formcarry\"])();\n\n// Behance Project\n\nObject(_behance__WEBPACK_IMPORTED_MODULE_2__[\"behanceProject\"])();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/svg_include.js":
/*!*******************************!*\
  !*** ./src/js/svg_include.js ***!
  \*******************************/
/*! exports provided: svgInclude */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"svgInclude\", function() { return svgInclude; });\n/*-------------------------------------------------------------------------------\r\n\tSVG Include\r\n-------------------------------------------------------------------------------*/\n\nfunction svgInclude() {\n\n\tvar httpRequest = void 0;\n\tvar svgFile = 'images/symbol-defs.svg';\n\n\tif (window.XMLHttpRequest) {\n\t\t// Mozilla, Safari, ...\n\t\thttpRequest = new XMLHttpRequest();\n\t} else if (window.ActiveXObject) {\n\t\t// IE\n\t\ttry {\n\t\t\thttpRequest = new ActiveXObject(\"Msxml2.XMLHTTP\");\n\t\t} catch (e) {\n\t\t\ttry {\n\t\t\t\thttpRequest = new ActiveXObject(\"Microsoft.XMLHTTP\");\n\t\t\t} catch (e) {}\n\t\t}\n\t}\n\n\tif (!httpRequest) {\n\t\talert('Giving up :( Cannot create an XMLHTTP instance');\n\t\treturn false;\n\t}\n\n\thttpRequest.open('GET', svgFile, true);\n\n\thttpRequest.onload = function () {\n\t\tif (httpRequest.status >= 200 && httpRequest.status < 400) {\n\t\t\t// Success!\n\t\t\tvar div = document.createElement(\"div\");\n\t\t\tdiv.innerHTML = httpRequest.responseText;\n\t\t\tdocument.body.insertBefore(div, document.body.childNodes[0]);\n\t\t} else {\n\t\t\t// We reached our target server, but it returned an error\n\t\t};\n\t};\n\n\thttpRequest.onerror = function () {\n\t\t// There was a connection error of some sort\n\t};\n\n\thttpRequest.send();\n}\n\n//# sourceURL=webpack:///./src/js/svg_include.js?");

/***/ })

/******/ });