/*-------------------------------------------------------------------------------
	formcarry.
-------------------------------------------------------------------------------*/

export function formcarry() {
	document.querySelector('#ajaxForm').addEventListener('submit', function (e) {
		e.preventDefault();

		const href = e.target.getAttribute('action');
		const formMessage = document.getElementById('form-message');

		//formMessage.fadeOutEffect();

		console.log(href);
		console.log(formMessage);

		const name = document.getElementsByName('name')[0].value;
		const email = document.getElementsByName('email')[0].value;
		const message = document.getElementsByName('message')[0].value;


		//console.log(data);


		// Ajax
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

		httpRequest.open('POST', 'https://formcarry.com/s/SyJGIGvZ7', true);

		//Send the proper header information along with the request
		httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		httpRequest.onreadystatechange = function() {//Call a function when the state changes.
			if(httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
				// Request finished. Do processing here.
				console.log('success');
			}
		}
		httpRequest.send(data);





		// $.ajax({
		// 	type: "POST",
		// 	dataType: "json",
		// 	url: href,
		// 	data: $(this).serialize(),
		// 	success: function (response) {
		// 		if (response.status == "success") {
		// 			formMessage.html('I received your submission, thank you!');
		// 			formMessage.fadeIn();
		// 		} else {
		// 			formMessage.html('An error occured: ' + response.message);
		// 			formMessage.fadeIn();
		// 		}
		// 	}
		// });

	});

	function fadeOutEffect() {
		var fadeTarget = document.getElementById("target");
		var fadeEffect = setInterval(function () {
			if (!fadeTarget.style.opacity) {
				fadeTarget.style.opacity = 1;
			}
			if (fadeTarget.style.opacity > 0) {
				fadeTarget.style.opacity -= 0.1;
			} else {
				clearInterval(fadeEffect);
			}
		}, 200);
	}


}