"use strict";

let appList = [];

function appRegisterService(appName) {
  let oldApps = ["f1", "f2", "f3"];
  appList = [...oldApps];
  appList.push(appName);
}

function getAppList() {
  return appList;
}

export { appList, appRegisterService, getAppList }
