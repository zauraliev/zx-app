import data from "./statics/data.js";

("use strict");

// ============================================================
// CORE STATE - SINGLE SOURCE OF TRUTH
// ============================================================

let appList = (() => {
  // Try to load saved apps first
  const savedApps = localStorage.getItem("user_apps");

  if (savedApps) {
    try {
      const parsed = JSON.parse(savedApps);
      if (parsed.length > 0) {
        console.debug(`✅ Loaded ${parsed.length} user apps from storage`);
      }
      return parsed;
    } catch (error) {
      console.error("Failed to load saved apps:", error);
    }
  }

  // Fallback to original 100 apps
  console.debug("📂 Using default 100 apps");
  return data.map((app) => ({ ...app, isSynced: false }));
})();
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

  console.debug(`📊 Page initialized: ${page}/${totalPages}`);
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

  console.debug(`📍 Page set: ${validPage}/${totalPages}`);
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

  // Run cleanup if needed
  if (Object.keys(cache).length > MAX_CACHE_SIZE * 1.5) {
    cleanupCache();
  }

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

  console.debug(`✅ Restored ${restored} synced apps from cache`);

  // VERIFICATION: Log current page state
  console.debug(
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
  console.debug(
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

  console.debug(`📏 Page size changed to: ${size}, reset to page 1`);
};

const getTotalPages = () => Math.ceil(appList.length / itemsPerPage);

// ============================================================
// APP MANAGEMENT
// ============================================================

const appRegisterService = (newApp) => {
  appList.push(newApp);

  // ✅ CRITICAL: Save to localStorage
  localStorage.setItem("user_apps", JSON.stringify(appList));

  console.debug(`✅ App saved: ${newApp.name} (total: ${appList.length})`);
};

const updateAppName = (appId, newName) => {
  const app = appList.find((a) => a.id === appId);
  if (app) app.name = newName;
};

// ============================================================
// AUTH FUNCTIONS
// ============================================================

const saveSession = () => localStorage.setItem("isLoggedIn", "true");

const isTokenValid = () => {
  const token = localStorage.getItem("app_token");
  if (!token) return false;

  try {
    // Decode JWT without verification (just to check expiry)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expiry;
  } catch {
    return false;
  }
};

const checkAndRefreshToken = async () => {
  if (!isTokenValid()) {
    clearSession();
    return false;
  }
  return true;
};

const checkSession = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const tokenValid = isTokenValid();

  // Auto-logout if token is invalid
  if (isLoggedIn && !tokenValid) {
    console.warn("Session expired, auto-logging out");
    clearSession();
    return false;
  }

  return isLoggedIn && tokenValid;
};

const clearSession = () => {
  console.debug("=== LOGGING OUT ===");

  // Clear authentication tokens only
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("app_token");

  // Reset to page 1 for next login (clean start)
  setCurrentPage(1);

  console.debug("✅ Logout complete. Returning to page 1 next login.");
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
    console.error("Authentication error:", err);
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
// CACHE MANAGEMENT (NEW)
// ============================================================

const MAX_CACHE_SIZE = 100; // Maximum number of cached apps

const cleanupCache = () => {
  const cache = loadCache();
  const entries = Object.entries(cache);

  if (entries.length <= MAX_CACHE_SIZE) return;

  // Sort by sync date (oldest first)
  entries.sort((a, b) => {
    const dateA = new Date(a[1].syncedAt || 0);
    const dateB = new Date(b[1].syncedAt || 0);
    return dateA - dateB;
  });

  // Remove oldest entries
  const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
  toRemove.forEach(([id]) => delete cache[id]);

  saveCache(cache);
  console.debug(`🧹 Cache cleaned: removed ${toRemove.length} old entries`);
};

// ============================================================
// CONSOLE MANAGEMENT (NEW)
// ============================================================

// ============================================================
// PAGE VERIFICATION FUNCTION (NEW)
// ============================================================

const verifyPageState = () => {
  const storedPage = localStorage.getItem("current_page");
  const currentPageValue = getCurrentPage();
  const totalPages = getTotalPages();

  console.debug(`🔍 Page State Verification:`);
  console.debug(`   localStorage: ${storedPage || "none"}`);
  console.debug(`   currentPage: ${currentPageValue}`);
  console.debug(`   totalPages: ${totalPages}`);
  console.debug(
    `   Valid: ${currentPageValue >= 1 && currentPageValue <= totalPages}`
  );

  // Auto-correct if invalid
  if (currentPageValue < 1 || currentPageValue > totalPages) {
    console.warn(`⚠️ Invalid page ${currentPageValue}. Resetting to page 1.`);
    setCurrentPage(1);
  }
};

// ============================================================
// MAINTENANCE & STARTUP (NEW)
// ============================================================

// Start maintenance tasks after everything loads
setTimeout(() => {
  // Initial cache cleanup
  cleanupCache();

  // Periodic cleanup every hour
  setInterval(cleanupCache, 60 * 60 * 1000);

  console.debug("🛠️ Maintenance tasks initialized");
}, 2000);

// Run verification after everything loads
setTimeout(verifyPageState, 100);

// DEBUG FUNCTION: Test page state
window.debugPageState = () => {
  console.group("🔬 PAGE STATE DEBUG");
  console.debug(
    "1. localStorage current_page:",
    localStorage.getItem("current_page")
  );
  console.debug("2. service.currentPage variable:", currentPage);
  console.debug("3. getCurrentPage() function:", getCurrentPage());
  console.debug("4. getAppList() first app:", getAppList()[0]?.name);
  console.debug(
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
    console.debug(`✅ CORRECT! Page ${getCurrentPage()} shows ${actual}`);
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
  isTokenValid,
  checkAndRefreshToken,
  cleanupCache,
};
