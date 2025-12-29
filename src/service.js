// src/service.js
import data from "./statics/data.js";
("use strict");

// 1. Initialize appList ONCE from your static data
// We use a flat array that we only push to or modify, never overwrite.
let appList = [...data];
let selectedApp = null;
let isSyncAllGlobal = false;

export const getSyncAllStatus = () => isSyncAllGlobal;
export const setSyncAllStatus = (status) => {
  isSyncAllGlobal = status;
};

function appRegisterService(newApp) {
  // Pushing to the existing array maintains the reference
  appList.push(newApp);
}

function updateAppName(appId, newName) {
  const app = appList.find((app) => app.id === appId);
  if (app) {
    app.name = newName;
  }
}

/**
 * CHANGED: Removed the 'appList = [...data]' line.
 * REASON: That line was resetting your list every time you navigated back,
 * making new registrations disappear. Now it just returns the current state.
 */
function getAppList() {
  return appList;
}

function getSelectedApp() {
  return selectedApp;
}

function setSelectedApp(app) {
  selectedApp = app;
}

// ... your existing authenticate, saveSession, checkSession, etc. ...

async function authenticate(username, password) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
}

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
