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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"behanceUser\", function() { return behanceUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"behanceProject\", function() { return behanceProject; });\nvar apiKey = '5AGtA6uAQot7srZlfWYtj1kZUXSuHx0S';\n\n/*-------------------------------------------------------------------------------\r\n\tBehance User\r\n-------------------------------------------------------------------------------*/\nfunction behanceUser() {\n\n  // Define Variables\n  var userID = 'ayumitk';\n  var perPage = 6;\n  var behanceUserAPI = 'https://www.behance.net/v2/users/' + userID + '/projects?callback=?&api_key=' + apiKey + '&per_page=' + perPage + '&callback=callbackUser';\n  var sessionName = 'projectUser';\n  var projectTitle = ['SoySauce', 'OliveCode', 'PetRibbon', 'Anysense Inc.', 'TERRASS'];\n\n  // If sessionStorage has a json data, use it.\n  // If not, get data form Behance API and set it to sessionStorage.\n  // Behance limits the API by 150 requests per hour.\n  if (sessionStorage.getItem(sessionName)) {\n\n    projectList();\n  } else {\n    // Create <script> tag\n    var script = document.createElement('script');\n    script.type = 'text/javascript';\n    script.src = behanceUserAPI;\n    document.getElementsByTagName('head')[0].appendChild(script);\n\n    // Callback function\n    var callback_user = function callback_user(data) {\n      // Set data to sessionStorage\n      var sessionData = JSON.stringify(data.projects);\n      sessionStorage.setItem(sessionName, sessionData);\n\n      projectList();\n    };\n\n    // to use as a global function\n    window.callbackUser = callback_user;\n  }\n\n  function projectList() {\n    // Get json data\n    var behanceData = JSON.parse(sessionStorage.getItem(sessionName));\n\n    var resultHTML = '';\n\n    for (var i = 0, len = behanceData.length; i < len; i++) {\n      resultHTML += '\\n\\t\\t\\t\\t<div class=\"col-4\">\\n\\t\\t\\t\\t\\t<a href=\"work.html?projectID=' + behanceData[i].id + '\">\\n\\t\\t\\t\\t\\t\\t<div><img src=\"' + behanceData[i].covers[404] + '\"></div>\\n\\t\\t\\t\\t\\t\\t<h3>' + projectTitle[i] + '</h3>\\n\\t\\t\\t\\t\\t\\t<p>' + behanceData[i].fields + '</p>\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</div>';\n    }\n\n    // // Set all project contents to html\n    document.getElementById('behance-list').innerHTML = resultHTML;\n  }\n}\n\n/*-------------------------------------------------------------------------------\r\n\tBehance Project\r\n-------------------------------------------------------------------------------*/\nfunction behanceProject() {\n\n  // Define Variables\n  var url = location.search;\n  var projectID = '59135529';\n  if (url.includes('?projectID=')) {\n    projectID = url.replace('?projectID=', '');\n  }\n\n  var behanceProjectAPI = 'https://www.behance.net/v2/projects/' + projectID + '?api_key=' + apiKey + '&callback=callbackProject';\n  var sessionName = 'behanceProject_' + projectID;\n\n  // If sessionStorage has a json data, use it.\n  // If not, get data form Behance API and set it to sessionStorage.\n  // Behance limits the API by 150 requests per hour.\n  if (sessionStorage.getItem(sessionName)) {\n\n    projectContents();\n  } else {\n    // Create <script> tag\n    var script = document.createElement('script');\n    script.type = 'text/javascript';\n    script.src = behanceProjectAPI;\n    document.getElementsByTagName('head')[0].appendChild(script);\n\n    // Callback function\n    var callback_project = function callback_project(data) {\n      // Set data to sessionStorage\n      var sessionData = JSON.stringify(data.project);\n      sessionStorage.setItem(sessionName, sessionData);\n\n      projectContents();\n    };\n\n    // to use as a global function\n    window.callbackProject = callback_project;\n  }\n\n  function projectContents() {\n    // Get json data\n    var behanceData = JSON.parse(sessionStorage.getItem(sessionName));\n\n    var resultHTML = '';\n\n    // Title, Fields\n    resultHTML += '\\n\\t\\t\\t<h1>' + behanceData.name + '</h1>\\n\\t\\t\\t<p>' + behanceData.fields + '</p>';\n\n    // Tools\n    var tools = '';\n    for (var i = 0, len = behanceData.tools.length; i < len; i++) {\n      tools += '<li>' + behanceData.tools[i].title + '</li>';\n    }\n    resultHTML += '\\n\\t\\t\\t<ul>' + tools + '</ul>';\n\n    // Modules\n    var modules = '';\n    for (var _i = 0, _len = behanceData.modules.length; _i < _len; _i++) {\n      if (behanceData.modules[_i].type == 'image') {\n        modules += '<div><img src=\"' + behanceData.modules[_i].sizes[1400] + '\"></div>';\n      } else if (behanceData.modules[_i].type == 'text') {\n        modules += '' + behanceData.modules[_i].text;\n      }\n    }\n    resultHTML += '\\n\\t\\t\\t<div>' + modules + '</div>';\n\n    // Set all project contents to html\n    document.getElementById('behance-project').innerHTML = resultHTML;\n  }\n}\n\n//# sourceURL=webpack:///./src/js/_behance.js?");

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