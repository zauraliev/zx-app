import { uuidv4 } from "../util/util-functions";

"use strict";

let appList = [];
let selectedApp = null;

function appRegisterService(newApp) {
  appList.push(newApp);
}

function updateAppName(appId, newName) {

  let _app = appList.find(app => app.id === appId);

  if(_app) appList.find(app => app.id === appId).name = newName;
}


function getAppList() {
  let oldApps = [
    { 
      name: "0001-app",
      id: "9eb2fd3c-809b-4e04-9ad4-56574cfdb545" //uuidv4()
    },
    { 
      name: "0002-app",
      id: "4e9ef95e-a1bb-4049-90e0-32d5e48b24c9" //uuidv4()
    },
    { 
      name: "0003-app",
      id: "c5599c42-57fe-4045-87ca-4696de9900c9" //uuidv4()
    },
  ];
  appList = [...oldApps];
  return appList;
}

function getSelectedApp(params) {
  return selectedApp;
}

function setSelectedApp(app) {
  selectedApp = app;
}

export { appList, 
         selectedApp, 
         appRegisterService,
         getAppList, 
         getSelectedApp,
         setSelectedApp,
         updateAppName
        }
