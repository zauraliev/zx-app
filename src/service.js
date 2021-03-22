"use strict";


let appList = [];

function appRegisterService(newApp) {
  let oldApps = [
    { 
      name: "f1-app",
      id: "f1".padStart(10, "0")
    },
    { 
      name: "f2-app",
      id: "f2".padStart(10, "0")
    },
    { 
      name: "f3-app",
      id: "f3".padStart(10, "0")
    },
  ];

  appList = [...oldApps];
  appList.push(newApp);
}

export { appList, appRegisterService }
