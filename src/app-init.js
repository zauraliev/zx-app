// app-init.js
import {
  appRegisterService,
  getAppList,
  appList,
  selectedApp,
  getSelectedApp,
  setSelectedApp,
  updateAppName,
  // ADDED: Imports to allow state to survive navigation to/from Settings
  getSyncAllStatus,
  setSyncAllStatus,
  getItemsPerPage,
  setItemsPerPage,
  getCurrentPage,
  setCurrentPage,
  getTotalPages,
} from "./service.js";

import { uuidv4, constructElement } from "./util/util-functions.js";
import FormValidator from "./util/form-validator.js";

export function startApp() {
  console.log("MY_VAR: ", process.env.MY_VAR || "NO VALUE");

  const container = document.querySelector(".container");
  const apps = document.getElementById("app-list");
  const syncAllBtn = document.getElementById("sync-all");
  const appNameInput = document.getElementById("app-name");
  const selectedAppBadge = document.getElementById("selected-app");
  const formBtn = document.getElementById("form-btn");

  let isUpdate = false;

  /**
   * REMOVED: let isSyncAll = false;
   * REASON: This local variable is destroyed when you navigate to Settings.
   * REPLACEMENT: We now use getSyncAllStatus() and setSyncAllStatus() from service.js.
   */

  const form = document.querySelector(".form");
  const fields = ["app-name"];
  new FormValidator(form, fields).initialize();

  function initialize() {
    // PRESERVED & MOVED: Clear list before drawing (required for pagination)
    if (apps) apps.innerHTML = "";

    // CHANGED: Use the sliced list from the service
    const visibleApps = getAppList();
    visibleApps.forEach(createListItem);

    // ADDED: Refresh the UI controls
    renderPagination();

    // PRESERVED: SyncAll re-hydration logic
    if (getSyncAllStatus()) {
      runSyncAllLogic(false);
    }
  }

  /**
   * ADDED: renderPagination
   * REASON: Dynamically builds buttons for each page.
   * Clicking a button updates the service state and calls initialize().
   */
  function renderPagination() {
    const container = document.getElementById("pagination-controls");
    if (!container) return;
    container.innerHTML = "";

    const totalPages = getTotalPages();
    const currentPage = getCurrentPage();

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
      prevBtn.innerHTML = "&lsaquo;"; // Symbol for <
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
      nextBtn.innerHTML = "&rsaquo;"; // Symbol for >
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

  /**
   * ADDED: initPageSizeSelector
   * REASON: Connects the 10, 50, 100 dropdown to the service state.
   */
  function initPageSizeSelector() {
    const selector = document.getElementById("page-size");
    if (selector) {
      selector.value = getItemsPerPage();
      selector.onchange = (e) => {
        setItemsPerPage(e.target.value);
        initialize();
      };
    }
  }

  // PRESERVED: Original initializers
  console.log("Apps => ", getAppList());
  getSelectedApp();

  // Call the new setup and the first draw
  initPageSizeSelector();
  initialize();

  // 2. THE LOGIC ENGINE (Preserving count and isProcessing)
  function runSyncAllLogic(isManualClick = false) {
    let count = 0;
    let isProcessing = false;

    appList.forEach((app) => {
      if (isManualClick || app.isSynced) {
        let parentTagId = `li-${app.id}`;
        let parentTag = document.getElementById(parentTagId);

        // Only proceed if the tag actually exists in the current view
        if (parentTag) {
          fetchAppInfo(parentTag, app).then((app) => {
            if (app) {
              // Only log if the sync actually finished
              isProcessing = false;
              count++;
              console.log(app, "Count => ", count);
            }
          });
        }
      }
    });
  }

  // 3. THE BUTTON CLICK: Sets global state and runs logic
  syncAllBtn.onclick = function (e) {
    setSyncAllStatus(true); // Persist state globally
    e.stopPropagation();
    runSyncAllLogic(true); // 'true' means manual sync all
  };

  // 4. RE-HYDRATION: Check global state when returning from Settings
  if (getSyncAllStatus()) {
    console.log("Global SyncAll active: Restoring state...");
    // Using runSyncAllLogic directly as you noted syncAllBtn.click() can fail timing
    runSyncAllLogic(false); // 'false' ensures we skip newly registered apps
  }

  // 5. REGISTER APP (Preserving your captured reference)
  function createListItem(app) {
    let item = document.createElement("li");
    item.id = `li-${app.id}`;

    let linkProps = {
      id: `link-${app.id}`,
      href: "#",
      className: "app-name-link",
      onclick: (e) => {
        /**
         * ADDED: e.preventDefault();
         * REASON: Stops the browser from jumping to top/adding "#" to URL on click.
         */
        e.preventDefault();
        editAppName(app);
      },
    };
    const link = constructElement(linkProps, "a");
    link.appendChild(document.createTextNode(`${app.name}`));

    item.appendChild(link);
    item.appendChild(document.createTextNode(` >>> `));

    let btnProps = {
      id: `button-${app.id}`,
      type: "button",
      value: "Get Info",
      className: "btn",
    };

    const btn = constructElement(btnProps, "input");
    item.appendChild(btn);

    getInfoBtn(item, app, btn);
    apps.prepend(item);

    // --- CRUCIAL ADDITION ---
    return item;
    // REASON: This allows registerApp to use the element immediately without a DOM lookup.
  }

  function getInfoBtn(parentTag, app, btn) {
    let count = 0;
    let isProcessing = false;
    btn.onclick = async function (e) {
      e.stopPropagation();
      if (isProcessing) return;
      isProcessing = true;
      fetchAppInfo(parentTag, app).then((app) => {
        isProcessing = false;
        count++;
        console.log(app, "Count => ", count);
      });
    };
  }

  function fetchAppInfo(parentTag, app) {
    /**
     * UPDATED GUARD: Silent Exit
     * REASON: When changing page sizes (10, 50, 100), it is NORMAL for elements
     * to leave the DOM. We remove the console.warn to keep your logs clean.
     */
    if (!parentTag || !document.contains(parentTag)) {
      // We return 'resolve' silently so the logic continues without spamming the console
      return Promise.resolve();
    }

    let span = document.createElement("span");
    span.id = `span-00${app.id}`;
    parentTag.appendChild(span);

    const spanEl = document.getElementById(span.id);
    if (spanEl) spanEl.innerHTML = " Loading... ";

    return new Promise((resolve) => {
      setTimeout(() => {
        const updateEl = document.getElementById(span.id);
        // RE-CHECK: Ensure the user hasn't switched pages during the 300ms delay
        if (updateEl && document.contains(updateEl)) {
          updateEl.innerHTML = ` >>> ${app.id}`;
          app.isSynced = true;
          resolve(app);
        } else {
          resolve(); // Resolve without data if element vanished during timeout
        }
      }, 300);
    });
  }

  function syncAll() {
    try {
      let count = 0;
      let isProcessing = false;
      syncAllBtn.onclick = function (e) {
        setSyncAllStatus(true); // Turn on global sync mode

        e.stopPropagation();
        if (isProcessing) return;
        isProcessing = true;
        appList.forEach((app) => {
          let parentTagId = `li-${app.id}`;
          let parentTag = document.getElementById(parentTagId);
          fetchAppInfo(parentTag, app).then((app) => {
            isProcessing = false;
            count++;
            console.log(app, "Count => ", count);
          });
        });
      };
    } catch (error) {
      // CHANGED: Update global state on error
      // setSyncAllStatus(false);
      console.log(error);
    }
  }

  syncAll();

  function editAppName(app) {
    setSelectedApp(app);

    /**
     * ADDED: Manual re-query of elements
     * REASON: Ensures the script targets the NEW elements created by the 2025 router,
     * preventing "stale reference" bugs.
     */
    const nameInput = document.getElementById("app-name");

    if (nameInput) {
      nameInput.value = app.name;
      selectedAppBadgeSwitch(app.name, true);
      nameInput.dispatchEvent(new Event("change", { bubbles: true }));
      isUpdate = true;
      formBtnSwitch(isUpdate);
      nameInput.focus();
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

  formBtn.onclick = function (e) {
    if (isUpdate) {
      if (appNameInput.value) {
        const appExists = appList.some(
          (app) => app.name === appNameInput.value && app.id !== selectedApp.id
        );

        if (!isAppNameValid(appNameInput.value)) return true;

        if (!appExists) {
          updateAppName(selectedApp.id, appNameInput.value);

          apps.innerHTML = "";
          console.log(appList);
          initialize();

          isUpdate = false;
          selectedAppBadgeSwitch(null, false);
          formBtnSwitch(isUpdate);

          // Clear Input
          appNameInput.value = "";

          /**
           * ADDED: Manual clear of error message
           * REASON: FormValidator doesn't auto-clear when value is changed via JS.
           */
          const errEl =
            appNameInput.parentElement.querySelector(".error-message");
          if (errEl) errEl.innerText = "";

          /**
           * THE FIX FOR UPDATE:
           * We do NOT call syncAllBtn.click() here. Instead, we manually
           * restore the sync state for only those that had it.
           */
          if (getSyncAllStatus()) {
            appList.forEach((app) => {
              // ONLY restore sync if the app was already synced.
              // If it was a new registered app with isSynced: false, it stays false.
              if (app.isSynced) {
                const parentTag = document.getElementById(`li-${app.id}`);
                fetchAppInfo(parentTag, app);
              }
            });
          }
          e.preventDefault();
        } else {
          alert(`Oops looks like the ${appNameInput.value} already exists!!!`);
        }
      }
    } else {
      if (appNameInput.value) {
        registerApp(appNameInput.value);
        e.preventDefault();
      }
    }
  };

  function registerApp(appName) {
    console.log(`Registering App => ${appName}`);
    const appExists = appList.some((app) => app.name === appName);

    if (!isAppNameValid(appName)) return true;

    if (!appExists) {
      const app = {
        name: appName,
        id: uuidv4(),
        isSynced: false,
      };

      appRegisterService(app);

      // --- CAPTURE THE ELEMENT ---
      const newListItem = createListItem(app);

      // // --- TRIGGER SYNC IF GLOBAL STATUS IS ACTIVE ---
      // if (getSyncAllStatus()) {
      //   console.log("Global SyncAll is active. Syncing new app...");
      //   fetchAppInfo(newListItem, app);
      // }

      appNameInput.value = "";
      const errEl = appNameInput.parentElement.querySelector(".error-message");
      if (errEl) errEl.innerText = "";
    } else {
      // PRESERVED: Your original alert logic
      alert(`Oops looks like the ${appName} already exists!!!`);
    }
  }

  function isAppNameValid(appName) {
    var regexp = /^(?!.*\d-\d)[A-Za-z0-9]+(-[A-Za-z0-9]+)?$/;
    const isValid = appName.search(regexp) !== -1;
    if (!isValid) {
      alert("not valid name");
      return false;
    }
    return true;
  }

  function initPageSizeSelector() {
    const selector = document.getElementById("page-size");
    if (!selector) return;

    // Set initial value from service state
    selector.value = getItemsPerPage();

    selector.onchange = (e) => {
      setItemsPerPage(e.target.value);
      initialize(); // Re-renders the list and pagination buttons
    };
  }

  // Ensure this is called when the Dashboard view starts
  initPageSizeSelector();
}
