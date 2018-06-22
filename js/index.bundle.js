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

/***/ "./src/js/_behance.js":
/*!****************************!*\
  !*** ./src/js/_behance.js ***!
  \****************************/
/*! exports provided: behanceUser, behanceProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"behanceUser\", function() { return behanceUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"behanceProject\", function() { return behanceProject; });\nvar apiKey = '5AGtA6uAQot7srZlfWYtj1kZUXSuHx0S';\n\n/*-------------------------------------------------------------------------------\r\n\tBehance User\r\n-------------------------------------------------------------------------------*/\nfunction behanceUser() {\n\n\t// Define Variables\n\tvar userID = 'ayumitk';\n\tvar perPage = 6;\n\tvar behanceUserAPI = 'http://www.behance.net/v2/users/' + userID + '/projects?callback=?&api_key=' + apiKey + '&per_page=' + perPage + '&callback=callbackUser';\n\tvar sessionName = 'projectUser';\n\tvar projectTitle = ['SoySauce', 'OliveCode', 'PetRibbon', 'Anysense Inc.', 'TERRASS'];\n\n\t// If sessionStorage has a json data, use it.\n\t// If not, get data form Behance API and set it to sessionStorage.\n\t// Behance limits the API by 150 requests per hour.\n\tif (sessionStorage.getItem(sessionName)) {\n\n\t\tprojectList();\n\t} else {\n\t\t// Create <script> tag\n\t\tvar script = document.createElement('script');\n\t\tscript.type = 'text/javascript';\n\t\tscript.src = behanceUserAPI;\n\t\tdocument.getElementsByTagName('head')[0].appendChild(script);\n\n\t\t// Callback function\n\t\tvar callback_user = function callback_user(data) {\n\t\t\t// Set data to sessionStorage\n\t\t\tvar sessionData = JSON.stringify(data.projects);\n\t\t\tsessionStorage.setItem(sessionName, sessionData);\n\n\t\t\tprojectList();\n\t\t};\n\n\t\t// to use as a global function\n\t\twindow.callbackUser = callback_user;\n\t}\n\n\tfunction projectList() {\n\t\t// Get json data\n\t\tvar behanceData = JSON.parse(sessionStorage.getItem(sessionName));\n\n\t\tvar resultHTML = '';\n\n\t\tfor (var i = 0, len = behanceData.length; i < len; i++) {\n\t\t\tresultHTML += '\\n\\t\\t\\t\\t<div class=\"col-4\">\\n\\t\\t\\t\\t\\t<a href=\"work.html?projectID=' + behanceData[i].id + '\">\\n\\t\\t\\t\\t\\t\\t<div><img src=\"' + behanceData[i].covers[404] + '\"></div>\\n\\t\\t\\t\\t\\t\\t<h3>' + projectTitle[i] + '</h3>\\n\\t\\t\\t\\t\\t\\t<p>' + behanceData[i].fields + '</p>\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</div>';\n\t\t}\n\n\t\t// // Set all project contents to html\n\t\tdocument.getElementById('behance-list').innerHTML = resultHTML;\n\t}\n}\n\n/*-------------------------------------------------------------------------------\r\n\tBehance Project\r\n-------------------------------------------------------------------------------*/\nfunction behanceProject() {\n\n\t// Define Variables\n\tvar projectID = location.search.replace('?projectID=', '');\n\tvar behanceProjectAPI = 'https://www.behance.net/v2/projects/' + projectID + '?api_key=' + apiKey + '&callback=callbackProject';\n\tvar sessionName = 'behanceProject_' + projectID;\n\n\t// If sessionStorage has a json data, use it.\n\t// If not, get data form Behance API and set it to sessionStorage.\n\t// Behance limits the API by 150 requests per hour.\n\tif (sessionStorage.getItem(sessionName)) {\n\n\t\tprojectContents();\n\t} else {\n\t\t// Create <script> tag\n\t\tvar script = document.createElement('script');\n\t\tscript.type = 'text/javascript';\n\t\tscript.src = behanceProjectAPI;\n\t\tdocument.getElementsByTagName('head')[0].appendChild(script);\n\n\t\t// Callback function\n\t\tvar callback_project = function callback_project(data) {\n\t\t\t// Set data to sessionStorage\n\t\t\tvar sessionData = JSON.stringify(data.project);\n\t\t\tsessionStorage.setItem(sessionName, sessionData);\n\n\t\t\tprojectContents();\n\t\t};\n\n\t\t// to use as a global function\n\t\twindow.callbackProject = callback_project;\n\t}\n\n\tfunction projectContents() {\n\t\t// Get json data\n\t\tvar behanceData = JSON.parse(sessionStorage.getItem(sessionName));\n\n\t\tvar resultHTML = '';\n\n\t\t// Title, Fields\n\t\tresultHTML += '\\n\\t\\t\\t<h1>' + behanceData.name + '</h1>\\n\\t\\t\\t<p>' + behanceData.fields + '</p>';\n\n\t\t// Tools\n\t\tvar tools = '';\n\t\tfor (var i = 0, len = behanceData.tools.length; i < len; i++) {\n\t\t\ttools += '<li>' + behanceData.tools[i].title + '</li>';\n\t\t}\n\t\tresultHTML += '\\n\\t\\t\\t<ul>' + tools + '</ul>';\n\n\t\t// Modules\n\t\tvar modules = '';\n\t\tfor (var _i = 0, _len = behanceData.modules.length; _i < _len; _i++) {\n\t\t\tif (behanceData.modules[_i].type == 'image') {\n\t\t\t\tmodules += '<div><img src=\"' + behanceData.modules[_i].sizes[1400] + '\"></div>';\n\t\t\t} else if (behanceData.modules[_i].type == 'text') {\n\t\t\t\tmodules += '' + behanceData.modules[_i].text;\n\t\t\t}\n\t\t}\n\t\tresultHTML += '\\n\\t\\t\\t<div>' + modules + '</div>';\n\n\t\t// Set all project contents to html\n\t\tdocument.getElementById('behance-project').innerHTML = resultHTML;\n\t}\n}\n\n//# sourceURL=webpack:///./src/js/_behance.js?");

/***/ }),

/***/ "./src/js/_svg.js":
/*!************************!*\
  !*** ./src/js/_svg.js ***!
  \************************/
/*! exports provided: svgInclude */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"svgInclude\", function() { return svgInclude; });\n/*-------------------------------------------------------------------------------\r\n\tSVG Include\r\n-------------------------------------------------------------------------------*/\n\nfunction svgInclude() {\n\n\tvar httpRequest = void 0;\n\tvar svgFile = 'images/symbol-defs.svg';\n\n\tif (window.XMLHttpRequest) {\n\t\t// Mozilla, Safari, ...\n\t\thttpRequest = new XMLHttpRequest();\n\t} else if (window.ActiveXObject) {\n\t\t// IE\n\t\ttry {\n\t\t\thttpRequest = new ActiveXObject(\"Msxml2.XMLHTTP\");\n\t\t} catch (e) {\n\t\t\ttry {\n\t\t\t\thttpRequest = new ActiveXObject(\"Microsoft.XMLHTTP\");\n\t\t\t} catch (e) {}\n\t\t}\n\t}\n\n\tif (!httpRequest) {\n\t\talert('Giving up :( Cannot create an XMLHTTP instance');\n\t\treturn false;\n\t}\n\n\thttpRequest.open('GET', svgFile, true);\n\n\thttpRequest.onload = function () {\n\t\tif (httpRequest.status >= 200 && httpRequest.status < 400) {\n\t\t\t// Success!\n\t\t\tvar div = document.createElement(\"div\");\n\t\t\tdiv.innerHTML = httpRequest.responseText;\n\t\t\tdocument.body.insertBefore(div, document.body.childNodes[0]);\n\t\t} else {\n\t\t\t// We reached our target server, but it returned an error\n\t\t};\n\t};\n\n\thttpRequest.onerror = function () {\n\t\t// There was a connection error of some sort\n\t};\n\n\thttpRequest.send();\n}\n\n//# sourceURL=webpack:///./src/js/_svg.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_svg */ \"./src/js/_svg.js\");\n/* harmony import */ var _behance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_behance */ \"./src/js/_behance.js\");\n// SVG Include\n\nObject(_svg__WEBPACK_IMPORTED_MODULE_0__[\"svgInclude\"])();\n\n// Formcarry\n// import {\n// \tformcarry\n// } from './_formcarry';\n// formcarry();\n\n// Behance User\n\nObject(_behance__WEBPACK_IMPORTED_MODULE_1__[\"behanceUser\"])();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });