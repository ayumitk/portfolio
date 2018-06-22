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
	const apiKey = '5AGtA6uAQot7srZlfWYtj1kZUXSuHx0S';
	const behanceProjectAPI = 'https://www.behance.net/v2/projects/' + projectID + '?api_key=' + apiKey + '&callback=myCallbackFunction';

	//const sessionName = 'behanceProject_' + projectID;


	let myCallbackFunction = (data) => {
		console.log(data.project);
	}


	let script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = behanceProjectAPI;
	document.getElementsByTagName('head')[0].appendChild(script);









}