import data from "./statics/data.js";

("use strict");

// ============================================================
// CORE STATE - SINGLE SOURCE OF TRUTH
// ============================================================

let appList = data.map((app) => ({ ...app, isSynced: false }));
let selectedApp = null;
let itemsPerPage = 10;
let isSyncAllGlobal = false;

// ============================================================
// FIXED: PAGE STATE MANAGEMENT - WITH BOUNDS CHECKING
// ============================================================

// Initialize currentPage with bounds checking
const calculateCurrentPage = () => {
  const saved = localStorage.getItem("current_page");
  let page = saved ? parseInt(saved) : 1;

  // Always validate against total pages
  const totalPages = Math.ceil(appList.length / itemsPerPage);

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  console.log(
    `📊 Page initialized: ${page}/${totalPages} (saved: ${saved || "none"})`
  );
  return page;
};

// Single source for currentPage
let currentPage = calculateCurrentPage();

// FIXED: Update getCurrentPage to always return the validated value
const getCurrentPage = () => {
  // Validate again on each call to ensure bounds
  const totalPages = Math.ceil(appList.length / itemsPerPage);

  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  return currentPage;
};

// FIXED: Update setCurrentPage with immediate localStorage update
const setCurrentPage = (page) => {
  const totalPages = Math.ceil(appList.length / itemsPerPage);

  // Validate page
  let validPage = parseInt(page);
  if (validPage < 1) validPage = 1;
  if (validPage > totalPages) validPage = totalPages;

  currentPage = validPage;

  // IMMEDIATE localStorage update
  localStorage.setItem("current_page", validPage.toString());

  console.log(`📍 Page set: ${validPage}/${totalPages}`);
};

// ============================================================
// SIMPLE CACHE SYSTEM
// ============================================================

const CACHE_KEY = "app_sync_cache";

const loadCache = () => {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveCache = (cache) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const getSyncData = (id) => {
  const cache = loadCache();
  return cache[id] || null;
};

const setIndividualSync = (id, status, data = "") => {
  const cache = loadCache();
  cache[id] = {
    isSynced: status,
    data: data,
    syncedAt: new Date().toISOString(),
  };
  saveCache(cache);

  const app = appList.find((a) => a.id === id);
  if (app) app.isSynced = status;
};

// Restore all sync states on startup WITH PAGE VERIFICATION
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

  console.log(`✅ Restored ${restored} synced apps from cache`);

  // VERIFICATION: Log current page state
  console.log(
    `🔍 Verification: currentPage=${currentPage}, getCurrentPage()=${getCurrentPage()}`
  );
})();

// ============================================================
// PAGINATION FUNCTIONS - FIXED FOR CONSISTENCY
// ============================================================

const getAppList = () => {
  const page = getCurrentPage(); // Use validated page
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // DEBUG: Verify slice is correct
  console.log(
    `📄 getAppList() -> Page ${page}: Apps ${start + 1} to ${end} of ${
      appList.length
    }`
  );

  return appList.slice(start, end);
};

const getItemsPerPage = () => itemsPerPage;

const setItemsPerPage = (size) => {
  itemsPerPage = parseInt(size);

  // Reset to page 1 when page size changes
  currentPage = 1;
  localStorage.setItem("items_per_page", size.toString());
  localStorage.setItem("current_page", "1");

  console.log(`📏 Page size changed to: ${size}, reset to page 1`);
};

const getTotalPages = () => Math.ceil(appList.length / itemsPerPage);

// ============================================================
// APP MANAGEMENT
// ============================================================

const appRegisterService = (newApp) => {
  appList.push(newApp);
};

const updateAppName = (appId, newName) => {
  const app = appList.find((a) => a.id === appId);
  if (app) app.name = newName;
};

// ============================================================
// AUTH FUNCTIONS
// ============================================================

const saveSession = () => localStorage.setItem("isLoggedIn", "true");

const checkSession = () => localStorage.getItem("isLoggedIn") === "true";

const clearSession = () => {
  console.log("=== LOGGING OUT ===");

  // Clear authentication tokens only
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("app_token");

  // Reset to page 1 for next login (clean start)
  setCurrentPage(1);

  console.log("✅ Logout complete. Returning to page 1 next login.");
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

const getSelectedApp = () => selectedApp;
const setSelectedApp = (app) => {
  selectedApp = app;
};
const getSyncAllStatus = () => isSyncAllGlobal;
const setSyncAllStatus = (status) => {
  isSyncAllGlobal = status;
};

// ============================================================
// PAGE VERIFICATION FUNCTION (NEW)
// ============================================================

const verifyPageState = () => {
  const storedPage = localStorage.getItem("current_page");
  const currentPageValue = getCurrentPage();
  const totalPages = getTotalPages();

  console.log(`🔍 Page State Verification:`);
  console.log(`   localStorage: ${storedPage || "none"}`);
  console.log(`   currentPage: ${currentPageValue}`);
  console.log(`   totalPages: ${totalPages}`);
  console.log(
    `   Valid: ${currentPageValue >= 1 && currentPageValue <= totalPages}`
  );

  // Auto-correct if invalid
  if (currentPageValue < 1 || currentPageValue > totalPages) {
    console.warn(`⚠️ Invalid page ${currentPageValue}. Resetting to page 1.`);
    setCurrentPage(1);
  }
};

// Run verification after everything loads
setTimeout(verifyPageState, 100);

// DEBUG FUNCTION: Test page state
window.debugPageState = () => {
  console.group("🔬 PAGE STATE DEBUG");
  console.log(
    "1. localStorage current_page:",
    localStorage.getItem("current_page")
  );
  console.log("2. service.currentPage variable:", currentPage);
  console.log("3. getCurrentPage() function:", getCurrentPage());
  console.log("4. getAppList() first app:", getAppList()[0]?.name);
  console.log(
    "5. Expected first app for page",
    getCurrentPage(),
    ":",
    (getCurrentPage() - 1) * getItemsPerPage() + 1 + "-app"
  );
  console.groupEnd();

  // Quick verification
  const expected = (getCurrentPage() - 1) * getItemsPerPage() + 1 + "-app";
  const actual = getAppList()[0]?.name;

  if (expected !== actual) {
    console.error(`❌ MISMATCH! Expected: ${expected}, Got: ${actual}`);
    console.error("Run: setCurrentPage(1) to reset");
  } else {
    console.log(`✅ CORRECT! Page ${getCurrentPage()} shows ${actual}`);
  }
};

// ============================================================
// EXPORTS
// ============================================================

export {
  appList,
  selectedApp,
  isSyncAllGlobal,
  getSelectedApp,
  setSelectedApp,
  getSyncAllStatus,
  setSyncAllStatus,
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
  verifyPageState,
};
