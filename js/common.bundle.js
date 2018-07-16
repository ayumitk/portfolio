(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/form-serialize/index.js":
/*!**********************************************!*\
  !*** ./node_modules/form-serialize/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n// get successful control from form and assemble into object\n// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2\n\n// types which indicate a submit action and are not successful controls\n// these will be ignored\nvar k_r_submitter = /^(?:submit|button|image|reset|file)$/i;\n\n// node names which could be successful controls\nvar k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;\n\n// Matches bracket notation.\nvar brackets = /(\\[[^\\[\\]]*\\])/g;\n\n// serializes form fields\n// @param form MUST be an HTMLForm element\n// @param options is an optional argument to configure the serialization. Default output\n// with no options specified is a url encoded string\n//    - hash: [true | false] Configure the output type. If true, the output will\n//    be a js object.\n//    - serializer: [function] Optional serializer function to override the default one.\n//    The function takes 3 arguments (result, key, value) and should return new result\n//    hash and url encoded str serializers are provided with this module\n//    - disabled: [true | false]. If true serialize disabled fields.\n//    - empty: [true | false]. If true serialize empty fields\nfunction serialize(form, options) {\n    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) != 'object') {\n        options = { hash: !!options };\n    } else if (options.hash === undefined) {\n        options.hash = true;\n    }\n\n    var result = options.hash ? {} : '';\n    var serializer = options.serializer || (options.hash ? hash_serializer : str_serialize);\n\n    var elements = form && form.elements ? form.elements : [];\n\n    //Object store each radio and set if it's empty or not\n    var radio_store = Object.create(null);\n\n    for (var i = 0; i < elements.length; ++i) {\n        var element = elements[i];\n\n        // ingore disabled fields\n        if (!options.disabled && element.disabled || !element.name) {\n            continue;\n        }\n        // ignore anyhting that is not considered a success field\n        if (!k_r_success_contrls.test(element.nodeName) || k_r_submitter.test(element.type)) {\n            continue;\n        }\n\n        var key = element.name;\n        var val = element.value;\n\n        // we can't just use element.value for checkboxes cause some browsers lie to us\n        // they say \"on\" for value when the box isn't checked\n        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {\n            val = undefined;\n        }\n\n        // If we want empty elements\n        if (options.empty) {\n            // for checkbox\n            if (element.type === 'checkbox' && !element.checked) {\n                val = '';\n            }\n\n            // for radio\n            if (element.type === 'radio') {\n                if (!radio_store[element.name] && !element.checked) {\n                    radio_store[element.name] = false;\n                } else if (element.checked) {\n                    radio_store[element.name] = true;\n                }\n            }\n\n            // if options empty is true, continue only if its radio\n            if (val == undefined && element.type == 'radio') {\n                continue;\n            }\n        } else {\n            // value-less fields are ignored unless options.empty is true\n            if (!val) {\n                continue;\n            }\n        }\n\n        // multi select boxes\n        if (element.type === 'select-multiple') {\n            val = [];\n\n            var selectOptions = element.options;\n            var isSelectedOptions = false;\n            for (var j = 0; j < selectOptions.length; ++j) {\n                var option = selectOptions[j];\n                var allowedEmpty = options.empty && !option.value;\n                var hasValue = option.value || allowedEmpty;\n                if (option.selected && hasValue) {\n                    isSelectedOptions = true;\n\n                    // If using a hash serializer be sure to add the\n                    // correct notation for an array in the multi-select\n                    // context. Here the name attribute on the select element\n                    // might be missing the trailing bracket pair. Both names\n                    // \"foo\" and \"foo[]\" should be arrays.\n                    if (options.hash && key.slice(key.length - 2) !== '[]') {\n                        result = serializer(result, key + '[]', option.value);\n                    } else {\n                        result = serializer(result, key, option.value);\n                    }\n                }\n            }\n\n            // Serialize if no selected options and options.empty is true\n            if (!isSelectedOptions && options.empty) {\n                result = serializer(result, key, '');\n            }\n\n            continue;\n        }\n\n        result = serializer(result, key, val);\n    }\n\n    // Check for all empty radio buttons and serialize them with key=\"\"\n    if (options.empty) {\n        for (var key in radio_store) {\n            if (!radio_store[key]) {\n                result = serializer(result, key, '');\n            }\n        }\n    }\n\n    return result;\n}\n\nfunction parse_keys(string) {\n    var keys = [];\n    var prefix = /^([^\\[\\]]*)/;\n    var children = new RegExp(brackets);\n    var match = prefix.exec(string);\n\n    if (match[1]) {\n        keys.push(match[1]);\n    }\n\n    while ((match = children.exec(string)) !== null) {\n        keys.push(match[1]);\n    }\n\n    return keys;\n}\n\nfunction hash_assign(result, keys, value) {\n    if (keys.length === 0) {\n        result = value;\n        return result;\n    }\n\n    var key = keys.shift();\n    var between = key.match(/^\\[(.+?)\\]$/);\n\n    if (key === '[]') {\n        result = result || [];\n\n        if (Array.isArray(result)) {\n            result.push(hash_assign(null, keys, value));\n        } else {\n            // This might be the result of bad name attributes like \"[][foo]\",\n            // in this case the original `result` object will already be\n            // assigned to an object literal. Rather than coerce the object to\n            // an array, or cause an exception the attribute \"_values\" is\n            // assigned as an array.\n            result._values = result._values || [];\n            result._values.push(hash_assign(null, keys, value));\n        }\n\n        return result;\n    }\n\n    // Key is an attribute name and can be assigned directly.\n    if (!between) {\n        result[key] = hash_assign(result[key], keys, value);\n    } else {\n        var string = between[1];\n        // +var converts the variable into a number\n        // better than parseInt because it doesn't truncate away trailing\n        // letters and actually fails if whole thing is not a number\n        var index = +string;\n\n        // If the characters between the brackets is not a number it is an\n        // attribute name and can be assigned directly.\n        if (isNaN(index)) {\n            result = result || {};\n            result[string] = hash_assign(result[string], keys, value);\n        } else {\n            result = result || [];\n            result[index] = hash_assign(result[index], keys, value);\n        }\n    }\n\n    return result;\n}\n\n// Object/hash encoding serializer.\nfunction hash_serializer(result, key, value) {\n    var matches = key.match(brackets);\n\n    // Has brackets? Use the recursive assignment function to walk the keys,\n    // construct any missing objects in the result tree and make the assignment\n    // at the end of the chain.\n    if (matches) {\n        var keys = parse_keys(key);\n        hash_assign(result, keys, value);\n    } else {\n        // Non bracket notation can make assignments directly.\n        var existing = result[key];\n\n        // If the value has been assigned already (for instance when a radio and\n        // a checkbox have the same name attribute) convert the previous value\n        // into an array before pushing into it.\n        //\n        // NOTE: If this requirement were removed all hash creation and\n        // assignment could go through `hash_assign`.\n        if (existing) {\n            if (!Array.isArray(existing)) {\n                result[key] = [existing];\n            }\n\n            result[key].push(value);\n        } else {\n            result[key] = value;\n        }\n    }\n\n    return result;\n}\n\n// urlform encoding serializer\nfunction str_serialize(result, key, value) {\n    // encode newlines as \\r\\n cause the html spec says so\n    value = value.replace(/(\\r)?\\n/g, '\\r\\n');\n    value = encodeURIComponent(value);\n\n    // spaces should be '+' rather than '%20'.\n    value = value.replace(/%20/g, '+');\n    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;\n}\n\nmodule.exports = serialize;\n\n//# sourceURL=webpack:///./node_modules/form-serialize/index.js?");

/***/ }),

/***/ "./node_modules/smoothscroll-polyfill/dist/smoothscroll.js":
/*!*****************************************************************!*\
  !*** ./node_modules/smoothscroll-polyfill/dist/smoothscroll.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/* smoothscroll v0.4.0 - 2018 - Dustan Kasten, Jeremias Menichelli - MIT License */\n(function () {\n  'use strict';\n\n  // polyfill\n\n  function polyfill() {\n    // aliases\n    var w = window;\n    var d = document;\n\n    // return if scroll behavior is supported and polyfill is not forced\n    if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {\n      return;\n    }\n\n    // globals\n    var Element = w.HTMLElement || w.Element;\n    var SCROLL_TIME = 468;\n\n    // object gathering original scroll methods\n    var original = {\n      scroll: w.scroll || w.scrollTo,\n      scrollBy: w.scrollBy,\n      elementScroll: Element.prototype.scroll || scrollElement,\n      scrollIntoView: Element.prototype.scrollIntoView\n    };\n\n    // define timing method\n    var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;\n\n    /**\n     * indicates if a the current browser is made by Microsoft\n     * @method isMicrosoftBrowser\n     * @param {String} userAgent\n     * @returns {Boolean}\n     */\n    function isMicrosoftBrowser(userAgent) {\n      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];\n\n      return new RegExp(userAgentPatterns.join('|')).test(userAgent);\n    }\n\n    /*\n     * IE has rounding bug rounding down clientHeight and clientWidth and\n     * rounding up scrollHeight and scrollWidth causing false positives\n     * on hasScrollableSpace\n     */\n    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;\n\n    /**\n     * changes scroll position inside an element\n     * @method scrollElement\n     * @param {Number} x\n     * @param {Number} y\n     * @returns {undefined}\n     */\n    function scrollElement(x, y) {\n      this.scrollLeft = x;\n      this.scrollTop = y;\n    }\n\n    /**\n     * returns result of applying ease math function to a number\n     * @method ease\n     * @param {Number} k\n     * @returns {Number}\n     */\n    function ease(k) {\n      return 0.5 * (1 - Math.cos(Math.PI * k));\n    }\n\n    /**\n     * indicates if a smooth behavior should be applied\n     * @method shouldBailOut\n     * @param {Number|Object} firstArg\n     * @returns {Boolean}\n     */\n    function shouldBailOut(firstArg) {\n      if (firstArg === null || (typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') {\n        // first argument is not an object/null\n        // or behavior is auto, instant or undefined\n        return true;\n      }\n\n      if ((typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) === 'object' && firstArg.behavior === 'smooth') {\n        // first argument is an object and behavior is smooth\n        return false;\n      }\n\n      // throw error when behavior is not supported\n      throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');\n    }\n\n    /**\n     * indicates if an element has scrollable space in the provided axis\n     * @method hasScrollableSpace\n     * @param {Node} el\n     * @param {String} axis\n     * @returns {Boolean}\n     */\n    function hasScrollableSpace(el, axis) {\n      if (axis === 'Y') {\n        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;\n      }\n\n      if (axis === 'X') {\n        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;\n      }\n    }\n\n    /**\n     * indicates if an element has a scrollable overflow property in the axis\n     * @method canOverflow\n     * @param {Node} el\n     * @param {String} axis\n     * @returns {Boolean}\n     */\n    function canOverflow(el, axis) {\n      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];\n\n      return overflowValue === 'auto' || overflowValue === 'scroll';\n    }\n\n    /**\n     * indicates if an element can be scrolled in either axis\n     * @method isScrollable\n     * @param {Node} el\n     * @param {String} axis\n     * @returns {Boolean}\n     */\n    function isScrollable(el) {\n      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');\n      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');\n\n      return isScrollableY || isScrollableX;\n    }\n\n    /**\n     * finds scrollable parent of an element\n     * @method findScrollableParent\n     * @param {Node} el\n     * @returns {Node} el\n     */\n    function findScrollableParent(el) {\n      var isBody;\n\n      do {\n        el = el.parentNode;\n\n        isBody = el === d.body;\n      } while (isBody === false && isScrollable(el) === false);\n\n      isBody = null;\n\n      return el;\n    }\n\n    /**\n     * self invoked function that, given a context, steps through scrolling\n     * @method step\n     * @param {Object} context\n     * @returns {undefined}\n     */\n    function step(context) {\n      var time = now();\n      var value;\n      var currentX;\n      var currentY;\n      var elapsed = (time - context.startTime) / SCROLL_TIME;\n\n      // avoid elapsed times higher than one\n      elapsed = elapsed > 1 ? 1 : elapsed;\n\n      // apply easing to elapsed time\n      value = ease(elapsed);\n\n      currentX = context.startX + (context.x - context.startX) * value;\n      currentY = context.startY + (context.y - context.startY) * value;\n\n      context.method.call(context.scrollable, currentX, currentY);\n\n      // scroll more if we have not reached our destination\n      if (currentX !== context.x || currentY !== context.y) {\n        w.requestAnimationFrame(step.bind(w, context));\n      }\n    }\n\n    /**\n     * scrolls window or element with a smooth behavior\n     * @method smoothScroll\n     * @param {Object|Node} el\n     * @param {Number} x\n     * @param {Number} y\n     * @returns {undefined}\n     */\n    function smoothScroll(el, x, y) {\n      var scrollable;\n      var startX;\n      var startY;\n      var method;\n      var startTime = now();\n\n      // define scroll context\n      if (el === d.body) {\n        scrollable = w;\n        startX = w.scrollX || w.pageXOffset;\n        startY = w.scrollY || w.pageYOffset;\n        method = original.scroll;\n      } else {\n        scrollable = el;\n        startX = el.scrollLeft;\n        startY = el.scrollTop;\n        method = scrollElement;\n      }\n\n      // scroll looping over a frame\n      step({\n        scrollable: scrollable,\n        method: method,\n        startTime: startTime,\n        startX: startX,\n        startY: startY,\n        x: x,\n        y: y\n      });\n    }\n\n    // ORIGINAL METHODS OVERRIDES\n    // w.scroll and w.scrollTo\n    w.scroll = w.scrollTo = function () {\n      // avoid action when no arguments are passed\n      if (arguments[0] === undefined) {\n        return;\n      }\n\n      // avoid smooth behavior if not required\n      if (shouldBailOut(arguments[0]) === true) {\n        original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset,\n        // use top prop, second argument if present or fallback to scrollY\n        arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);\n\n        return;\n      }\n\n      // LET THE SMOOTHNESS BEGIN!\n      smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);\n    };\n\n    // w.scrollBy\n    w.scrollBy = function () {\n      // avoid action when no arguments are passed\n      if (arguments[0] === undefined) {\n        return;\n      }\n\n      // avoid smooth behavior if not required\n      if (shouldBailOut(arguments[0])) {\n        original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);\n\n        return;\n      }\n\n      // LET THE SMOOTHNESS BEGIN!\n      smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));\n    };\n\n    // Element.prototype.scroll and Element.prototype.scrollTo\n    Element.prototype.scroll = Element.prototype.scrollTo = function () {\n      // avoid action when no arguments are passed\n      if (arguments[0] === undefined) {\n        return;\n      }\n\n      // avoid smooth behavior if not required\n      if (shouldBailOut(arguments[0]) === true) {\n        // if one number is passed, throw error to match Firefox implementation\n        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {\n          throw new SyntaxError('Value could not be converted');\n        }\n\n        original.elementScroll.call(this,\n        // use left prop, first number argument or fallback to scrollLeft\n        arguments[0].left !== undefined ? ~~arguments[0].left : _typeof(arguments[0]) !== 'object' ? ~~arguments[0] : this.scrollLeft,\n        // use top prop, second argument or fallback to scrollTop\n        arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);\n\n        return;\n      }\n\n      var left = arguments[0].left;\n      var top = arguments[0].top;\n\n      // LET THE SMOOTHNESS BEGIN!\n      smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);\n    };\n\n    // Element.prototype.scrollBy\n    Element.prototype.scrollBy = function () {\n      // avoid action when no arguments are passed\n      if (arguments[0] === undefined) {\n        return;\n      }\n\n      // avoid smooth behavior if not required\n      if (shouldBailOut(arguments[0]) === true) {\n        original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);\n\n        return;\n      }\n\n      this.scroll({\n        left: ~~arguments[0].left + this.scrollLeft,\n        top: ~~arguments[0].top + this.scrollTop,\n        behavior: arguments[0].behavior\n      });\n    };\n\n    // Element.prototype.scrollIntoView\n    Element.prototype.scrollIntoView = function () {\n      // avoid smooth behavior if not required\n      if (shouldBailOut(arguments[0]) === true) {\n        original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);\n\n        return;\n      }\n\n      // LET THE SMOOTHNESS BEGIN!\n      var scrollableParent = findScrollableParent(this);\n      var parentRects = scrollableParent.getBoundingClientRect();\n      var clientRects = this.getBoundingClientRect();\n\n      if (scrollableParent !== d.body) {\n        // reveal element inside parent\n        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);\n\n        // reveal parent in viewport unless is fixed\n        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {\n          w.scrollBy({\n            left: parentRects.left,\n            top: parentRects.top,\n            behavior: 'smooth'\n          });\n        }\n      } else {\n        // reveal element in viewport\n        w.scrollBy({\n          left: clientRects.left,\n          top: clientRects.top,\n          behavior: 'smooth'\n        });\n      }\n    };\n  }\n\n  if (( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined') {\n    // commonjs\n    module.exports = { polyfill: polyfill };\n  } else {\n    // global\n    polyfill();\n  }\n})();\n\n//# sourceURL=webpack:///./node_modules/smoothscroll-polyfill/dist/smoothscroll.js?");

/***/ }),

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"svgInclude\", function() { return svgInclude; });\n/*-------------------------------------------------------------------------------\r\n    SVG Load\r\n-------------------------------------------------------------------------------*/\nfunction svgInclude() {\n\n  fetch('images/symbol-defs.svg').then(function (response) {\n    return response.text();\n  }).then(function (text) {\n    var div = document.createElement('div');\n    div.innerHTML = text;\n    document.body.insertBefore(div, document.body.childNodes[0]);\n  });\n}\n\n//# sourceURL=webpack:///./src/js/_svg.js?");

/***/ }),

/***/ "./src/js/common.js":
/*!**************************!*\
  !*** ./src/js/common.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_svg */ \"./src/js/_svg.js\");\n// SVG include\n\nObject(_svg__WEBPACK_IMPORTED_MODULE_0__[\"svgInclude\"])();\n\n// Formcarry\n// import {\n// \tformcarry\n// } from './_formcarry';\n// formcarry();\n\n//# sourceURL=webpack:///./src/js/common.js?");

/***/ })

}]);