"use strict";

let appList = [];

function appRegisterService(appName) {
  let oldApps = ["f1", "f2", "f3"];
  appList = [...oldApps];
  appList.push(appName);
}

export { appList, appRegisterService }
