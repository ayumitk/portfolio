/*-------------------------------------------------------------------------------
	Behance User
-------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------
	Behance Project
-------------------------------------------------------------------------------*/

export function behanceProject() {
	//const projectID = location.search.replace('?projectID=', '');
	const projectID = 59135529;
	//console.log(projectID);
	//const apiKey = 'W5wzRII9xhBnTPVkVYJRd4G80OwelH3y';
	//const behanceProjectAPI = 'http://www.behance.net/v2/projects/' + projectID + '?api_key=' + apiKey;
	const behanceProjectAPI = 'https://www.behance.net/v2/projects/59135529?api_key=W5wzRII9xhBnTPVkVYJRd4G80OwelH3y';

	const sessionName = 'behanceProject_' + projectID;




	////-------------

	let httpRequest;

	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE
		try {
			httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
			try {
				httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) {}
		}
	}

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}

	httpRequest.open('GET', behanceProjectAPI, true);

	httpRequest.onload = function () {
		if (httpRequest.status >= 200 && httpRequest.status < 400) {
			// Success!
			const data = JSON.parse(request.responseText);
			console.log(data);
		} else {
			// We reached our target server, but it returned an error
		};
	};

	httpRequest.onerror = function () {
		// There was a connection error of some sort
	};

	httpRequest.send();

	//--------------------------------

	// if (sessionStorage.getItem(sessionName)) {
	// 	setBehance();
	// } else {



	// 	// $.ajax({
	// 	// 	url: behanceProjectAPI,
	// 	// 	dataType: "jsonp",
	// 	// 	success: function (json) {
	// 	// 		//console.log(json);
	// 	// 		var data = JSON.stringify(json);
	// 	// 		sessionStorage.setItem(sessionName, data);
	// 	// 		setBehance();
	// 	// 	}
	// 	// });
	// };

	const setBehance = () => {
		const behanceData = JSON.parse(sessionStorage.getItem(sessionName))['project'];
		const behanceModules = behanceData.modules;
		//console.log(behanceData);

		// Set project title to title tag
		document.getElementsByTagName('title')[0].innerHTML = behanceData.name;

		// Create project contents
		let resultHTML = '';

		resultHTML += `<h1>${behanceData.name}</h1>`;
		resultHTML += `<p>${behanceData.fields}</p>`;

		resultHTML += '<p>';

		for (let i = 0, len = behanceData.tools.length; i < len; i++) {
			resultHTML += `<span>${behanceData.tools[i].title}</span>`;
		}

		resultHTML += '</p>';


		for (let i = 0, len = behanceModules.length; i < len; i++) {
			if (behanceModules[i].type == 'image') {
				resultHTML +=
					`<div class="project-module module image project-module-image image-full project-module-image-full text-center">
								<div class="js-project-lightbox-link project-module-image-inner-wrap lightbox-link hover-icon-enabled">
									<img src="${behanceModules[i].sizes[1400]}">
								</div>
							</div>`;
			} else if (behanceModules[i].type == 'text') {
				resultHTML +=
					`<div class="project-module module project-module-text text align-center text-center">
								<div class="main-text">
									${behanceModules[i].text}
								</div>
							</div>`;
			}
		}

		resultHTML += `<p>${behanceData.short_url}</p>`;

		console.log(resultHTML);

		// Set project contents to div
		document.getElementById('behance-project').innerHTML = resultHTML;
	};
}