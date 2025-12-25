import { uuidv4 } from "./util/util-functions.js";
import data from "./statics/data.js";
("use strict");

let appList = [];
let selectedApp = null;

function appRegisterService(newApp) {
  appList.push(newApp);
}

function updateAppName(appId, newName) {
  let _app = appList.find((app) => app.id === appId);

  if (_app) appList.find((app) => app.id === appId).name = newName;
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

/**
 * Checks credentials against environment variables injected by dotenvx
 */
// src/service.js
async function authenticate(username, password) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.success; // true if login succeeds
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
}

/**
 * Handles LocalStorage session management
 */
const saveSession = () => localStorage.setItem("isLoggedIn", "true");
const clearSession = () => localStorage.clear();
const checkSession = () => localStorage.getItem("isLoggedIn") === "true";

export {
  appList,
  selectedApp,
  appRegisterService,
  getAppList,
  getSelectedApp,
  setSelectedApp,
  updateAppName,
  authenticate,
  saveSession,
  clearSession,
  checkSession,
};
