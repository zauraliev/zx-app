// app-init.js - Updated with UI Helpers
import {
  appRegisterService,
  getAppList,
  appList,
  selectedApp,
  getSelectedApp,
  setSelectedApp,
  updateAppName,
  getSyncAllStatus,
  setSyncAllStatus,
  getItemsPerPage,
  setItemsPerPage,
  getCurrentPage,
  setCurrentPage,
  getTotalPages,
  getSyncData,
  setIndividualSync,
} from "./service.js";

import { uuidv4, constructElement } from "./util/util-functions.js";
import FormValidator from "./util/form-validator.js";
import {
  toast,
  HighlightManager,
  ConfirmDialog,
  LoadingManager,
} from "./util/ui-helpers.js";

export function startApp() {
  console.log("🔄 App initializing with UI helpers");

  const container = document.querySelector(".container");
  const apps = document.getElementById("app-list");
  const syncAllBtn = document.getElementById("sync-all");
  const appNameInput = document.getElementById("app-name");
  const selectedAppBadge = document.getElementById("selected-app");
  const formBtn = document.getElementById("form-btn");

  // 1. Login form handler
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

      // Show loading on login button
      LoadingManager.toggleButtonLoading("login-btn", true);

      const success = await authenticate(user, pass);

      LoadingManager.toggleButtonLoading("login-btn", false);

      if (success) {
        toast.success("Login successful! Redirecting...", 2000);
        setTimeout(() => navigateTo("/dashboard"), 500);
      } else {
        toast.error("Login failed: Invalid credentials", 4000);
      }
    });
  }

  let isUpdate = false;

  const form = document.querySelector(".form");
  const fields = ["app-name"];
  new FormValidator(form, fields).initialize();

  // ============================================================
  // FIXED: DASHBOARD INITIALIZATION
  // ============================================================

  function initialize() {
    console.group("🚀 INITIALIZE DASHBOARD");

    // 1. Clear container
    if (apps) apps.innerHTML = "";

    // 2. Get CURRENT page state (force validation)
    const currentPage = getCurrentPage();
    const itemsPerPage = getItemsPerPage();
    const totalPages = getTotalPages();

    console.log(`📊 Initialization State:`);
    console.log(`   Page: ${currentPage}/${totalPages}`);
    console.log(`   Items per page: ${itemsPerPage}`);
    console.log(`   Total apps: ${appList.length}`);

    // 3. CRITICAL FIX: Validate page is correct
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleApps = appList.slice(startIndex, startIndex + itemsPerPage);

    console.log(
      `📄 Loading apps ${startIndex + 1} to ${startIndex + visibleApps.length}`
    );

    // 4. Verification check
    if (visibleApps.length > 0) {
      const expectedFirstApp = (currentPage - 1) * itemsPerPage + 1;
      const actualFirstApp =
        parseInt(visibleApps[0].name.replace("-app", "")) || 0;

      if (actualFirstApp !== expectedFirstApp) {
        console.error(`🚨 CRITICAL: Page mismatch!`);
        console.error(
          `   Expected app ${expectedFirstApp}, got ${actualFirstApp}`
        );
        console.error(`   This indicates a state corruption. Forcing page 1.`);

        // Force reset to page 1
        setCurrentPage(1);
        console.warn(`🔄 Resetting to page 1...`);

        // Clear and reinitialize
        if (apps) apps.innerHTML = "";
        setTimeout(() => {
          initialize(); // Recursive call with correct page
        }, 100);
        console.groupEnd();
        return;
      }

      console.log(
        `✅ First app correct: ${visibleApps[0].name} (expected app ${expectedFirstApp})`
      );
    }

    // 5. Create list items
    visibleApps.forEach(createListItem);

    // 6. Render pagination (will read currentPage from service.js)
    renderPagination();

    console.log(`✅ Dashboard initialized successfully`);
    console.groupEnd();
  }

  function renderPagination() {
    const container = document.getElementById("pagination-controls");
    if (!container) return;
    container.innerHTML = "";

    // FIXED: Get fresh page state
    const currentPage = getCurrentPage(); // ADD THIS LINE

    // Rest of existing code...
    const totalPages = getTotalPages();

    // 1. FIRST PAGE (<<)
    if (currentPage > 1) {
      const firstBtn = document.createElement("button");
      firstBtn.innerHTML = "&laquo;";
      firstBtn.className = "btn-page";
      firstBtn.onclick = () => {
        setCurrentPage(1);
        initialize();
      };
      container.appendChild(firstBtn);
    }

    // 2. PREVIOUS PAGE (<)
    if (currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.innerHTML = "&lsaquo;";
      prevBtn.className = "btn-page";
      prevBtn.onclick = () => {
        setCurrentPage(currentPage - 1);
        initialize();
      };
      container.appendChild(prevBtn);
    }

    // 3. PAGE NUMBERS (1, 2, 3...)
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.className = i === currentPage ? "btn-page active" : "btn-page";
      btn.onclick = () => {
        setCurrentPage(i);
        initialize();
      };
      container.appendChild(btn);
    }

    // 4. NEXT PAGE (>)
    if (currentPage < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.innerHTML = "&rsaquo;";
      nextBtn.className = "btn-page";
      nextBtn.onclick = () => {
        setCurrentPage(currentPage + 1);
        initialize();
      };
      container.appendChild(nextBtn);
    }

    // 5. LAST PAGE (>>)
    if (currentPage < totalPages) {
      const lastBtn = document.createElement("button");
      lastBtn.innerHTML = "&raquo;";
      lastBtn.className = "btn-page";
      lastBtn.onclick = () => {
        setCurrentPage(totalPages);
        initialize();
      };
      container.appendChild(lastBtn);
    }
  }

  function initPageSizeSelector() {
    const selector = document.getElementById("page-size");
    if (selector) {
      selector.value = getItemsPerPage();
      selector.onchange = (e) => {
        setItemsPerPage(e.target.value);
        toast.info(`Showing ${e.target.value} items per page`, 2000);
        initialize();
      };
    }
  }

  // Initialization
  console.log("Apps => ", getAppList());
  getSelectedApp();

  initPageSizeSelector();
  initialize();

  // Sync All Logic
  function runSyncAllLogic(isManualClick = false) {
    const visibleApps = getAppList();
    console.log(
      `🔄 Syncing ${visibleApps.length} apps on page ${getCurrentPage()}`
    );

    let completed = 0;
    const total = visibleApps.length;

    visibleApps.forEach((app) => {
      let parentTagId = "li-" + app.id;
      let parentTag = document.getElementById(parentTagId);

      if (parentTag) {
        fetchAppInfo(parentTag, app).then(() => {
          completed++;
          if (completed === total) {
            toast.success(`Synced ${completed} apps successfully`, 3000);
          }
        });
      }
    });

    if (visibleApps.length === 0) {
      toast.info("No apps to sync on this page", 2000);
    }
  }

  // Sync All Button
  syncAllBtn.onclick = async function (e) {
    e.stopPropagation();

    const currentPage = getCurrentPage();
    const pageSize = getItemsPerPage();
    const visibleApps = getAppList();

    if (visibleApps.length === 0) {
      toast.warning("No apps to sync on this page", 2000);
      return;
    }

    const confirmed = await ConfirmDialog.show(
      `Sync all ${visibleApps.length} apps on page ${currentPage}?`,
      {
        title: "Confirm Sync All",
        okText: "Sync All",
        cancelText: "Cancel",
      }
    );

    if (!confirmed) return;

    // Show loading on sync button
    LoadingManager.toggleButtonLoading("sync-all", true);

    // Mark all apps as synced
    visibleApps.forEach((app) => {
      app.isSynced = true;
      setIndividualSync(app.id, true, ` >>> ${app.id}`);
    });

    // Run sync logic
    runSyncAllLogic(true);

    // Re-enable button after 1 second
    setTimeout(() => {
      LoadingManager.toggleButtonLoading("sync-all", false);
    }, 1000);
  };

  // Create List Item
  function createListItem(app) {
    let item = document.createElement("li");
    item.id = `li-${app.id}`;

    // App name link
    let linkProps = {
      id: `link-${app.id}`,
      href: "#",
      className: "app-name-link",
      onclick: (e) => {
        e.preventDefault();
        editAppName(app);
      },
    };
    const link = constructElement(linkProps, "a");
    link.appendChild(document.createTextNode(`${app.name}`));
    item.appendChild(link);

    // Separator
    item.appendChild(document.createTextNode(` >>> `));

    // Check cache for sync state
    const cachedData = getSyncData(app.id);
    const isSyncedFromCache = cachedData?.isSynced || false;
    const isActuallySynced = isSyncedFromCache || app.isSynced;

    // Update memory state from cache if needed
    if (cachedData?.isSynced && !app.isSynced) {
      app.isSynced = true;
    }

    // Button with dynamic text
    let btnProps = {
      id: `button-${app.id}`,
      type: "button",
      value: isActuallySynced ? "Refresh Info" : "Get Info",
      className: "btn",
    };
    const btn = constructElement(btnProps, "input");
    item.appendChild(btn);

    // Show UUID if synced
    if (isActuallySynced) {
      let span = document.createElement("span");
      span.id = `span-${app.id}`;

      // ✅ RESTORED: Show cached data with timestamp
      span.innerHTML = cachedData?.data || ` >>> ${app.id}`;
      span.style.color = "#3c9c3c";
      span.style.fontSize = "0.9em";
      span.style.fontStyle = "italic";

      item.appendChild(span);
    }

    getInfoBtn(item, app, btn);
    apps.prepend(item);

    return item;
  }

  function getInfoBtn(parentTag, app, btn) {
    let count = 0;
    let isProcessing = false;
    btn.onclick = async function (e) {
      e.stopPropagation();
      if (isProcessing) return;
      isProcessing = true;

      // Show loading on this button
      LoadingManager.toggleButtonLoading(btn.id, true);

      fetchAppInfo(parentTag, app)
        .then((app) => {
          isProcessing = false;
          LoadingManager.toggleButtonLoading(btn.id, false);
          count++;
          console.log(app, "Count => ", count);
        })
        .catch(() => {
          isProcessing = false;
          LoadingManager.toggleButtonLoading(btn.id, false);
          toast.error(`Failed to sync ${app.name}`, 3000);
        });
    };
  }

  function fetchAppInfo(parentTag, app) {
    if (!parentTag || !document.contains(parentTag)) {
      return Promise.resolve();
    }

    let span = document.createElement("span");
    span.id = `span-${app.id}`;
    parentTag.appendChild(span);

    const spanEl = document.getElementById(span.id);
    if (spanEl) spanEl.innerHTML = " Loading... ";

    const btn = document.getElementById(`button-${app.id}`);
    if (btn) {
      btn.value = "Loading...";
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const updateEl = document.getElementById(span.id);
        if (updateEl && document.contains(updateEl)) {
          // ✅ RESTORED: Timestamp display
          const timeString = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          const fetchedData = ` >>> ${app.id} (Synced at ${timeString})`;

          updateEl.innerHTML = fetchedData;
          updateEl.style =
            "color: #3c9c3c; font-size: 0.9em; font-style: italic;";

          if (btn) {
            btn.value = "Refresh Info";
          }

          // ✅ RESTORED: Save with timestamp
          setIndividualSync(app.id, true, fetchedData);

          // Also update app.isSynced in memory
          const appInList = appList.find((a) => a.id === app.id);
          if (appInList) {
            appInList.isSynced = true;
          }

          // Show success feedback
          toast.success(`Synced ${app.name} at ${timeString}`, 2000);

          resolve(app);
        }
      }, 300);
    });
  }

  function syncAll() {
    try {
      let count = 0;
      let isProcessing = false;
      syncAllBtn.onclick = async function (e) {
        e.stopPropagation();
        if (isProcessing) return;
        isProcessing = true;

        const visibleApps = getAppList();

        // Show loading
        LoadingManager.toggleButtonLoading("sync-all", true);

        visibleApps.forEach((app) => {
          let parentTagId = `li-${app.id}`;
          let parentTag = document.getElementById(parentTagId);
          fetchAppInfo(parentTag, app).then((app) => {
            isProcessing = false;
            LoadingManager.toggleButtonLoading("sync-all", false);
            count++;
            console.log(app, "Count => ", count);
          });
        });
      };
    } catch (error) {
      console.log(error);
      toast.error("Sync all failed", 3000);
    }
  }

  syncAll();

  function editAppName(app) {
    setSelectedApp(app);

    const nameInput = document.getElementById("app-name");

    if (nameInput) {
      nameInput.value = app.name;
      selectedAppBadgeSwitch(app.name, true);
      nameInput.dispatchEvent(new Event("change", { bubbles: true }));
      isUpdate = true;
      formBtnSwitch(isUpdate);
      nameInput.focus();

      // Highlight the selected app
      HighlightManager.flash(`li-${app.id}`, "#3B82F6");
    }
  }

  function selectedAppBadgeSwitch(appName, toggle) {
    if (toggle) {
      selectedAppBadge.innerText = `${appName}`;
      selectedAppBadge.classList.remove("hidden");
    } else {
      selectedAppBadge.innerText = "";
      selectedAppBadge.classList.add("hidden");
    }
  }

  function formBtnSwitch(isUpdate) {
    if (isUpdate) {
      formBtn.value = "Update App";
      formBtn.classList.add("btn-update");
      formBtn.classList.remove("btn-register");
    } else {
      formBtn.value = "Register App";
      formBtn.classList.add("btn-register");
      formBtn.classList.remove("btn-update");
    }
  }

  formBtn.onclick = async function (e) {
    e.preventDefault();

    if (!appNameInput.value.trim()) {
      toast.error("Please enter an app name", 3000);
      return;
    }

    const appName = appNameInput.value.trim();

    if (isUpdate) {
      // UPDATE MODE
      if (appNameInput.value) {
        const appExists = appList.some(
          (app) => app.name === appNameInput.value && app.id !== selectedApp.id
        );

        if (!isAppNameValid(appNameInput.value)) {
          toast.error("Invalid app name format", 3000);
          return;
        }

        if (!appExists) {
          // Show loading
          LoadingManager.toggleButtonLoading("form-btn", true);

          updateAppName(selectedApp.id, appNameInput.value);

          // Refresh the list
          apps.innerHTML = "";
          initialize();

          isUpdate = false;
          selectedAppBadgeSwitch(null, false);
          formBtnSwitch(isUpdate);

          // Clear Input
          appNameInput.value = "";

          const errEl =
            appNameInput.parentElement.querySelector(".error-message");
          if (errEl) errEl.innerText = "";

          // Show success
          LoadingManager.toggleButtonLoading("form-btn", false);
          toast.success(`App updated to "${appName}"`, 3000);

          // Highlight the updated app
          HighlightManager.flash(`li-${selectedApp.id}`, "#10B981");
        } else {
          toast.error(`App "${appNameInput.value}" already exists!`, 4000);
        }
      }
    } else {
      // CREATE MODE
      if (appNameInput.value) {
        // Show loading
        LoadingManager.toggleButtonLoading("form-btn", true);

        const success = await registerApp(appNameInput.value);

        LoadingManager.toggleButtonLoading("form-btn", false);

        if (!success) {
          e.preventDefault();
        }
      }
    }
  };

  async function registerApp(appName) {
    console.log(`📝 Registering App => ${appName}`);
    const appExists = appList.some((app) => app.name === appName);

    if (!isAppNameValid(appName)) {
      toast.error(
        "App name must follow pattern: 0000-app (letters, numbers, hyphens only)",
        4000
      );
      return false;
    }

    if (appExists) {
      toast.error(`App "${appName}" already exists!`, 4000);
      return false;
    }

    // Check sequential numbering
    const appNum = parseInt(appName.replace("-app", ""));
    const existingNumbers = appList.map((a) =>
      parseInt(a.name.replace("-app", ""))
    );
    const maxNum = Math.max(...existingNumbers, 0);

    if (appNum > maxNum + 10) {
      const nextSuggested = (maxNum + 1).toString().padStart(4, "0");

      const confirmed = await ConfirmDialog.show(
        `App ${appName} is out of sequence. Next available: ${nextSuggested}-app. Create anyway?`,
        {
          title: "Out of Sequence",
          okText: "Create Anyway",
          cancelText: "Use Suggested",
        }
      );

      if (!confirmed) {
        // Auto-fill suggested name
        appNameInput.value = `${nextSuggested}-app`;
        appNameInput.focus();
        return false;
      }
    }

    const app = {
      name: appName,
      id: `app-${appName.replace("-app", "")}`,
      isSynced: false,
      createdAt: new Date().toISOString(),
    };

    // Insert in correct sorted position
    let insertIndex = appList.findIndex((a) => {
      const num = parseInt(a.name.replace("-app", ""));
      return num > appNum;
    });

    if (insertIndex === -1) insertIndex = appList.length;
    appList.splice(insertIndex, 0, app);

    // Also update via service for cache initialization
    setIndividualSync(app.id, false, "");

    // Calculate which page it belongs on
    const pageSize = getItemsPerPage();
    const correctPage = Math.ceil((insertIndex + 1) / pageSize);
    const currentPage = getCurrentPage();

    // Clear form
    appNameInput.value = "";
    const errEl = appNameInput.parentElement.querySelector(".error-message");
    if (errEl) errEl.innerText = "";

    // Professional feedback based on location
    if (correctPage === currentPage) {
      // Same page - show immediately with highlight
      const newItem = createListItem(app);
      HighlightManager.highlightNew(newItem.id);
      toast.success(`✅ ${appName} added to current page`, 3000);
    } else {
      // Different page - show notification with navigation option
      const notification = toast.info(
        `📄 ${appName} added to page ${correctPage}`,
        5000
      );

      // Add "Go to page" button to toast
      if (notification) {
        const goBtn = document.createElement("button");
        goBtn.className = "toast-action";
        goBtn.textContent = "Go to Page";
        goBtn.onclick = () => {
          setCurrentPage(correctPage);
          initialize();
          HighlightManager.highlightPage(correctPage);
        };

        const content = notification.querySelector(".toast-content");
        if (content) {
          content.appendChild(goBtn);
        }
      }

      // Pulse the correct page button
      HighlightManager.highlightPage(correctPage);
    }

    // Log event
    console.log("App created:", {
      appName,
      page: correctPage,
      totalApps: appList.length,
    });

    return true;
  }

  function isAppNameValid(appName) {
    var regexp = /^(?!.*\d-\d)[A-Za-z0-9]+(-[A-Za-z0-9]+)?$/;
    const isValid = appName.search(regexp) !== -1;
    return isValid;
  }

  // Ensure this is called when the Dashboard view starts
  initPageSizeSelector();
}

// Export authenticate function if needed elsewhere
export { authenticate } from "./service.js";
