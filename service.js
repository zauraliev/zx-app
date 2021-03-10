function appRegisterService(appName, apps) {
  let oldApps = ["f1", "f2", "f3"];
  apps = [...oldApps];
  apps.push(appName);
  return apps;  
}

