
import './style.scss';
import { appRegisterService, 
         getAppList,
         appList, 
         selectedApp,  
         getSelectedApp, 
         setSelectedApp,         
         updateAppName } from './service'
import { uuidv4 } from '../util/util-functions';
import Hello from './hello'
import FormValidator from '../util/form-validator';

;(function(global){
  "use strict";
  
  const apps = document.getElementById("app-list");
  const syncAllBtn = document.getElementById("sync-all");
  const appNameInput = document.getElementById("app-name");
  const selectedAppBadge = document.getElementById("selected-app");
  let isUpdate = false;
  
  const formBtn = document.getElementById("form-btn");


  const form = document.querySelector(".form");
  const fields = ["app-name"];

  const formValidator = new FormValidator(form, fields);
  formValidator.initialize();

  console.log("Apps => ", getAppList());

  getSelectedApp(); // initializing the getter

  function initialize() {

    // appUpdateBtn.classList.add("hidden");

    appList.forEach((app, i) => {
      logger(`Element${i} ${app.id}`);

      createListItem(app)
    });
  }

  initialize();

  function createListItem(app) {
    let item = document.createElement("li"); // app-list li
      item.id = `li-${app.id}`

      let link = document.createElement("a");
      link.id = `link-${app.id}`
      link.href = "#";
      link.className = "app-name-link"

      link.appendChild(document.createTextNode(`${app.name}`));

      link.onclick = () => editAppName(app);

      item.appendChild(link); // app-list li text
      item.appendChild(document.createTextNode(` >>> `));
      
      
      // Get Info button
      let btnProps = {
        id: `button-${app.id}`,
        type: 'button',
        value: 'Get Info',
        className: 'btn'
      }

      const btn = constructBtn(btnProps);

      // Appending Get Info button into app-list
      item.appendChild(btn) 

      getInfoBtn(item, app, btn);

      apps.prepend(item);
  }

  function constructBtn(btnProps) {
    let button = document.createElement('input');
    for(const property in btnProps) {
      button[property] = btnProps[property];
    }
    return button;
  }

  function getInfoBtn(destionation, app, btn) {
    btn.onclick = function() {
      fetchAppInfo(destionation, app)
    };
  }

  function fetchAppInfo(destination, app) {
    let span = document.createElement("span"); // app-list info span
      span.id = `span-00${app.id}`;
    
      destination.appendChild(span); // Adding app-list info span into app-list

      document.getElementById(span.id).innerHTML = ' Loading... ';
      setTimeout(()=> {
        document.getElementById(span.id).innerHTML = ` >>> ${app.id}`;
      }, 500)
  }

  syncAllBtn.onclick = function () {
    syncAll();
  }

  function syncAll() {
    appList.forEach(app => {
      let destinationId = `li-${app.id}`
      let destination = document.getElementById(destinationId)
      fetchAppInfo(destination, app)
    });
  }

  function editAppName(app) {
    // let app = appList.find(app => app.id === appId);

    setSelectedApp(app);

    selectedAppBadge.innerText = `${selectedApp.name}`;
    selectedAppBadge.classList.remove('hidden');
    appNameInput.value = selectedApp.name;

    appNameInput.dispatchEvent(new Event('change', { 'bubbles': true }));

    isUpdate = true;
    formBtn.value = "Update App";
    formBtn.classList.add("btn-update");
    formBtn.classList.remove("btn-register");

    console.log(selectedApp);
    const link = document.getElementById(`link-${selectedApp.id}`);
    console.log(link.onclick)

    return false;
  }

  formBtn.onclick = function (e) {
    if(isUpdate) {

      if(appNameInput.value) {
        const appExists = appList.some(app => app.name === appNameInput.value && app.id !== selectedApp.id);

        if(!isAppNameValid(appNameInput.value)) return;

        if(!appExists) {
          updateAppName(selectedApp.id, appNameInput.value)
  
          apps.innerHTML = "";
          selectedAppBadge.innerText = "";
          selectedAppBadge.classList.add('hidden');
          isUpdate = false;
          initialize();

          appNameInput.value = "";
          formBtn.classList.remove("btn-update");
          formBtn.classList.add("btn-register");
          formBtn.value = "Register App";
        } else {
          textAlert(`Oops looks like the ${appNameInput.value} already exists!!!`)
        }
      }

    } else {

      if(appNameInput.value) {
        registerApp(appNameInput.value)
      }

    }


  }


  function registerApp(appName) {
    console.log(`Registering App => ${appName}`)
    
    const appExists = appList.some(app => app.name === appName);

    if(!isAppNameValid(appName)) return;

    if(!appExists) {
      const app = { 
        name:appName,
        id: uuidv4()
      };
      appRegisterService(app);
      createListItem(app)
      appNameInput.value = "";
      appNameInput.dispatchEvent(new Event('change', { 'bubbles': true }));
    } else {
      textAlert(`Oops looks like the ${appName} already exists!!!`)
    }
  }

  function isAppNameValid(appName) {
    var regexp = /^(?!.*\d-\d)[A-Za-z0-9]+(-[A-Za-z0-9]+)?$/;

    const isValid = (appName.search(regexp) !== -1);

    if(!isValid){
      textAlert("not valid name");
      return false;
    }

    return true;
  }
  

  function logger(log) {
    console.log(`${log}`);
  }
  function textAlert(message){
    alert(`${message}`);
  }
})(window);