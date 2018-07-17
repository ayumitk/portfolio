const apiKey = '5AGtA6uAQot7srZlfWYtj1kZUXSuHx0S';

/*-------------------------------------------------------------------------------
  Behance User
-------------------------------------------------------------------------------*/
export function behanceUser() {
  // Define Variables
  const userID = 'ayumitk';
  const perPage = 6;
  const behanceUserAPI = `https://www.behance.net/v2/users/${userID}/projects?callback=?&api_key=${apiKey}&per_page=${perPage}&callback=callbackUser`;
  const sessionName = 'projectUser';
  const projectTitle = ['SoySauce', 'OliveCode', 'PetRibbon', 'Anysense Inc.', 'TERRASS'];

  function projectList() {
    // Get json data
    const behanceData = JSON.parse(sessionStorage.getItem(sessionName));

    let resultHTML = '';

    for (let i = 0, len = behanceData.length; i < len; i += 1) {
      resultHTML += `
        <div class="col-12 col-sm-6 col-md-4">
          <a href="work.html?projectID=${behanceData[i].id}">
            <div><img src="${behanceData[i].covers[404]}"></div>
            <h3>${projectTitle[i]}</h3>
            <p>${behanceData[i].fields}</p>
          </a>
        </div>`;
    }

    // Set all project contents to html
    document.getElementById('behance-list').innerHTML = resultHTML;
  }

  // If sessionStorage has a json data, use it.
  // If not, get data form Behance API and set it to sessionStorage.
  // Behance limits the API by 150 requests per hour.
  if (sessionStorage.getItem(sessionName)) {
    projectList();
  } else {
    // Create <script> tag
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = behanceUserAPI;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Callback function
    const callbackUser = (data) => {
      // Set data to sessionStorage
      const sessionData = JSON.stringify(data.projects);
      sessionStorage.setItem(sessionName, sessionData);

      projectList();
    };

    // to use as a global function
    window.callbackUser = callbackUser;
  }
}


/*-------------------------------------------------------------------------------
  Behance Project
-------------------------------------------------------------------------------*/
export function behanceProject() {
  // Define Variables
  const url = window.location.search;
  let projectID = '59135529';
  if (url.includes('?projectID=')) {
    projectID = url.replace('?projectID=', '');
  }

  const behanceProjectAPI = `https://www.behance.net/v2/projects/${projectID}?api_key=${apiKey}&callback=callbackProject`;
  const sessionName = `behanceProject_${projectID}`;

  function projectContents() {
    // Get json data
    const behanceData = JSON.parse(sessionStorage.getItem(sessionName));

    let resultHTML = '';

    // Title, Fields
    resultHTML += `
      <h1>${behanceData.name}</h1>
      <p>${behanceData.fields}</p>`;

    // Tools
    let tools = '';
    for (let i = 0, len = behanceData.tools.length; i < len; i += 1) {
      tools += `<li>${behanceData.tools[i].title}</li>`;
    }
    resultHTML += `
      <ul>${tools}</ul>`;

    // Modules
    let modules = '';
    for (let i = 0, len = behanceData.modules.length; i < len; i += 1) {
      if (behanceData.modules[i].type === 'image') {
        modules += `<div><img src="${behanceData.modules[i].sizes[1400]}"></div>`;
      } else if (behanceData.modules[i].type === 'text') {
        modules += `${behanceData.modules[i].text}`;
      }
    }
    resultHTML += `
      <div>${modules}</div>`;

    // Set all project contents to html
    document.getElementById('behance-project').innerHTML = resultHTML;
  }

  // If sessionStorage has a json data, use it.
  // If not, get data form Behance API and set it to sessionStorage.
  // Behance limits the API by 150 requests per hour.
  if (sessionStorage.getItem(sessionName)) {
    projectContents();
  } else {
    // Create <script> tag
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = behanceProjectAPI;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Callback function
    const callbackProject = (data) => {
      // Set data to sessionStorage
      const sessionData = JSON.stringify(data.project);
      sessionStorage.setItem(sessionName, sessionData);

      projectContents();
    };

    // to use as a global function
    window.callbackProject = callbackProject;
  }
}