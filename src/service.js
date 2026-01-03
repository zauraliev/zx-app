// service.js - 100% CORRECT VERSION
import data from "./statics/data.js";
("use strict");

// ============================================
// CORE STATE
// ============================================
let appList = data.map((app) => ({ ...app, isSynced: false }));
let selectedApp = null;
let currentPage = 1;
let itemsPerPage = 10;
let isSyncAllGlobal = false;

// ============================================
// SIMPLE CACHE SYSTEM
// ============================================
const CACHE_KEY = "app_sync_cache";

// Load cache
const loadCache = () => {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

// Save cache
const saveCache = (cache) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

// Get sync data
const getSyncData = (id) => {
  const cache = loadCache();
  return cache[id];
};

// Set sync data
const setIndividualSync = (id, status, data = "") => {
  const cache = loadCache();
  cache[id] = {
    isSynced: status,
    data: data,
    syncedAt: new Date().toISOString(),
  };
  saveCache(cache);

  // Update in-memory state
  const app = appList.find((a) => a.id === id);
  if (app) app.isSynced = status;
};

// Restore all sync states on startup
(() => {
  const cache = loadCache();
  let restored = 0;

  Object.entries(cache).forEach(([id, cacheData]) => {
    if (cacheData.isSynced) {
      const app = appList.find((a) => a.id === id);
      if (app) {
        app.isSynced = true;
        restored++;
      }
    }
  });

  console.log(`🔄 Restored ${restored} synced apps from cache`);
})();

// ============================================
// PAGINATION FUNCTIONS
// ============================================
const getAppList = () => {
  const start = (currentPage - 1) * itemsPerPage;
  return appList.slice(start, start + itemsPerPage);
};

const getCurrentPage = () => {
  const saved = localStorage.getItem("current_page");
  return saved ? parseInt(saved) : currentPage;
};

const setCurrentPage = (page) => {
  currentPage = page;
  localStorage.setItem("current_page", page.toString());
};

const getItemsPerPage = () => {
  const saved = localStorage.getItem("items_per_page");
  return saved ? parseInt(saved) : itemsPerPage;
};

const setItemsPerPage = (size) => {
  itemsPerPage = parseInt(size);
  currentPage = 1;
  localStorage.setItem("items_per_page", size.toString());
  localStorage.setItem("current_page", "1");
};

const getTotalPages = () => Math.ceil(appList.length / itemsPerPage);

// ============================================
// APP MANAGEMENT FUNCTIONS
// ============================================
const appRegisterService = (newApp, maintainOrder = true) => {
  if (maintainOrder) {
    // Insert in sorted position
    const appNum = parseInt(newApp.name.replace("-app", ""));
    let insertIndex = appList.findIndex((a) => {
      const num = parseInt(a.name.replace("-app", ""));
      return num > appNum;
    });

    if (insertIndex === -1) insertIndex = appList.length;
    appList.splice(insertIndex, 0, newApp);

    return { app: newApp, index: insertIndex };
  } else {
    // Append to end (legacy behavior)
    appList.push(newApp);
    return { app: newApp, index: appList.length - 1 };
  }
};

const updateAppName = (appId, newName) => {
  const app = appList.find((a) => a.id === appId);
  if (app) app.name = newName;
};

const getSelectedApp = () => selectedApp;
const setSelectedApp = (app) => {
  selectedApp = app;
};
const getSyncAllStatus = () => isSyncAllGlobal;
const setSyncAllStatus = (status) => {
  isSyncAllGlobal = status;
};

// ============================================
// AUTH FUNCTIONS
// ============================================
const saveSession = () => localStorage.setItem("isLoggedIn", "true");
const checkSession = () => localStorage.getItem("isLoggedIn") === "true";
const clearSession = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("app_token");
  window.location.href = "/login";
};

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
      headers: { "Content-Type": "application/json" },
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

// ============================================
// EXPORTS (ALL FUNCTIONS PROPERLY DEFINED)
// ============================================
export {
  appList,
  selectedApp,
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
  appRegisterService,
  updateAppName,
  saveSession,
  checkSession,
  clearSession,
  authenticate,
  getSyncData,
  setIndividualSync,
};
