// src/service.js
import data from "./statics/data.js";
("use strict");

// 1. Initialize appList ONCE from your static data
// We use a flat array that we only push to or modify, never overwrite.
let appList = [...data];
let selectedApp = null;
let isSyncAllGlobal = false;

let currentPage = 1;
let itemsPerPage = 10; // Default set to 10

export const getCurrentPage = () => currentPage;
export const setCurrentPage = (page) => {
  currentPage = page;
};

export const getItemsPerPage = () => itemsPerPage;
/**
 * UPDATED: setItemsPerPage
 * REASON: When changing list size, we must reset to Page 1
 * to avoid "out of bounds" errors on smaller datasets.
 */
export const setItemsPerPage = (size) => {
  itemsPerPage = parseInt(size);
  currentPage = 1;
};

export const getTotalPages = () => Math.ceil(appList.length / itemsPerPage);

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
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  // Preservation: Using slice to return only the current view's data
  return appList.slice(start, end);
}

function getSelectedApp() {
  return selectedApp;
}

function setSelectedApp(app) {
  selectedApp = app;
}

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
