import { uuidv4 } from "./util/util-functions";
import data from "./statics/data";
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
  appList = [...data];
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
