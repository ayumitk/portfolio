!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";function r(){fetch("images/symbol-defs.svg").then(function(e){return e.text()}).then(function(e){var t=document.createElement("div");t.innerHTML=e,document.body.insertBefore(t,document.body.childNodes[0])})}n.d(t,"a",function(){return r})},function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"a",function(){return c});var r="5AGtA6uAQot7srZlfWYtj1kZUXSuHx0S";function o(){var e="https://www.behance.net/v2/users/ayumitk/projects?callback=?&api_key="+r+"&per_page=6&callback=callbackUser",t="projectUser",n=["SoySauce","OliveCode","PetRibbon","Anysense Inc.","TERRASS"];function o(){var e="";JSON.parse(sessionStorage.getItem(t)).map(function(t,r){return e+='\n        <div class="col-12 col-sm-6 col-md-4">\n          <a href="work.html?projectID='+t.id+'">\n            <div><img src="'+t.covers[404]+'"></div>\n            <h3>'+n[r]+"</h3>\n            <p>"+t.fields+"</p>\n          </a>\n        </div>",!1}),document.querySelector("#behance-list").innerHTML=e}if(sessionStorage.getItem(t))o();else{var c=document.createElement("script");c.type="text/javascript",c.src=e,document.querySelector("head").appendChild(c);window.callbackUser=function(e){var n=JSON.stringify(e.projects);sessionStorage.setItem(t,n),o()}}}function c(){var e=window.location.search,t="59135529";e.includes("?projectID=")&&(t=e.replace("?projectID=",""));var n="https://www.behance.net/v2/projects/"+t+"?api_key="+r+"&callback=callbackProject",o="behanceProject_"+t;function c(){var e=JSON.parse(sessionStorage.getItem(o)),t="";t+="\n      <h1>"+e.name+"</h1>\n      <p>"+e.fields+"</p>";var n="";e.tools.forEach(function(e){n+="<li>"+e.title+"</li>"}),t+="\n      <ul>"+n+"</ul>";var r="";e.modules.forEach(function(e){"image"===e.type?r+='<div><img src="'+e.sizes[1400]+'"></div>':"text"===e.type&&(r+=""+e.text)}),t+="\n      <div>"+r+"</div>",document.querySelector("#behance-project").innerHTML=t}if(sessionStorage.getItem(o))c();else{var i=document.createElement("script");i.type="text/javascript",i.src=n,document.querySelector("head").appendChild(i);window.callbackProject=function(e){var t=JSON.stringify(e.project);sessionStorage.setItem(o,t),c()}}}},,function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(1);Object(r.a)(),Object(o.a)()}]);