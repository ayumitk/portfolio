/*-------------------------------------------------------------------------------
	SVG Include
-------------------------------------------------------------------------------*/

export function svgInclude() {

	let httpRequest;
	const svgFile = 'images/symbol-defs.svg';

	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}

	httpRequest.open('GET', svgFile, true);

	httpRequest.onload = function () {
		if (httpRequest.status >= 200 && httpRequest.status < 400) {
			// Success!
			let div = document.createElement("div");
			div.innerHTML = httpRequest.responseText;
			document.body.insertBefore(div, document.body.childNodes[0]);
		} else {
			// We reached our target server, but it returned an error
		};
	};

	httpRequest.onerror = function () {
		// There was a connection error of some sort
	};

	httpRequest.send();

}