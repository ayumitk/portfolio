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

    // loop
    behanceData.map((project, index) => {
      resultHTML += `
        <div class="col-12 col-sm-6 col-md-4">
          <a href="work.html?projectID=${project.id}">
            <div><img src="${project.covers[404]}"></div>
            <h3>${projectTitle[index]}</h3>
            <p>${project.fields}</p>
          </a>
        </div>`;
      return false;
    });

    // Set all project contents to html
    document.querySelector('#behance-list').innerHTML = resultHTML;
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
    document.querySelector('head').appendChild(script);

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
    behanceData.tools.forEach((tool) => {
      tools += `<li>${tool.title}</li>`;
    });
    resultHTML += `
      <ul>${tools}</ul>`;

    // Modules
    let modules = '';
    behanceData.modules.forEach((content) => {
      if (content.type === 'image') {
        modules += `<div><img src="${content.sizes[1400]}"></div>`;
      } else if (content.type === 'text') {
        modules += `${content.text}`;
      }
    });
    resultHTML += `
      <div>${modules}</div>`;

    // Set all project contents to html
    document.querySelector('#behance-project').innerHTML = resultHTML;
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
    document.querySelector('head').appendChild(script);

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