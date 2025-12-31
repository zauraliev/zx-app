// src/service.js
import data from "./statics/data.js";
("use strict");

// 1. MODULE STATE
let appList = [...data];
let isSyncAllGlobal = false;
let selectedApp = null;
let currentPage = 1;
let itemsPerPage = 10;

// 2. DATA AND NAVIGATION LOGIC
const getAppList = () => {
  const start = (currentPage - 1) * itemsPerPage;
  return appList.slice(start, start + itemsPerPage);
};

const appRegisterService = (newApp) => {
  appList.push(newApp);
};

const updateAppName = (appId, newName) => {
  const app = appList.find((a) => a.id === appId);
  if (app) {
    // METICULOUS: Object.assign ensures the change 'sticks' to the
    // original reference that other views (like Get Info) are looking at.
    Object.assign(app, { name: newName });
  }
};

const getSyncAllStatus = () => isSyncAllGlobal;
const setSyncAllStatus = (status) => {
  isSyncAllGlobal = status;
};

const getCurrentPage = () => currentPage;
const setCurrentPage = (page) => {
  currentPage = page;
};
const getItemsPerPage = () => itemsPerPage;
const setItemsPerPage = (size) => {
  itemsPerPage = parseInt(size);
  currentPage = 1;
};
const getTotalPages = () => Math.ceil(appList.length / itemsPerPage);

const getSelectedApp = () => selectedApp;
const setSelectedApp = (app) => {
  selectedApp = app;
};

// 3. SESSION HELPERS
const saveSession = () => localStorage.setItem("isLoggedIn", "true");
const checkSession = () => localStorage.getItem("isLoggedIn") === "true";
const clearSession = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("app_token");
};

// 4. 2025 AUTHENTICATION (SHA-256)
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function authenticate(username, password) {
  try {
    const passwordHash = await hashPassword(password);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password: passwordHash }),
    });
    const result = await res.json();
    if (result.success && result.token) {
      localStorage.setItem("app_token", result.token);
      saveSession();
    }
    return result.success;
  } catch (err) {
    return false;
  }
}

// 5. UNIFIED EXPORTS (Restoring all missing references)
export {
  appList,
  selectedApp, // Fixed missing export
  isSyncAllGlobal,
  getSyncAllStatus,
  setSyncAllStatus,
  getSelectedApp,
  setSelectedApp,
  getAppList,
  getCurrentPage,
  setCurrentPage,
  getItemsPerPage,
  setItemsPerPage,
  getTotalPages,
  appRegisterService, // Fixed missing export
  updateAppName, // Fixed missing export
  saveSession,
  checkSession,
  clearSession,
  authenticate,
};
