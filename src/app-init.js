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

  // 1. PRESERVED INITIALIZERS
  console.log("Apps => ", getAppList());
  getSelectedApp();

  // PRESERVED: DOM cleanup logic
  if (apps) apps.innerHTML = "";

  function initialize() {
    appList.forEach(createListItem);
  }

  initialize();

  // 2. THE LOGIC ENGINE (Preserving count and isProcessing)
  function runSyncAllLogic(isManualClick = false) {
    let count = 0;
    let isProcessing = false;

    appList.forEach((app) => {
      // THE FIX: Manual click syncs all. Re-hydration (false) skips unsynced apps.
      if (isManualClick || app.isSynced) {
        let parentTagId = `li-${app.id}`;
        let parentTag = document.getElementById(parentTagId);
        fetchAppInfo(parentTag, app).then((app) => {
          isProcessing = false;
          count++;
          console.log(app, "Count => ", count);
        });
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
    // ADD THIS GUARD: Prevents the "Cannot read properties of undefined" crash
    if (!parentTag) {
      console.error(
        "fetchAppInfo failed: parentTag is undefined for app",
        app.id
      );
      return Promise.reject("Invalid parentTag");
    }

    let span = document.createElement("span");
    span.id = `span-00${app.id}`;
    parentTag.appendChild(span);

    const spanEl = document.getElementById(span.id);
    if (spanEl) spanEl.innerHTML = " Loading... ";

    return new Promise(async function (resolve) {
      setTimeout(() => {
        const updateEl = document.getElementById(span.id);
        if (updateEl) updateEl.innerHTML = ` >>> ${app.id}`;
        app.isSynced = true;
        resolve(app);
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
    const badge = document.getElementById("selected-app");
    const btn = document.getElementById("form-btn");

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
           * CHANGED: Using getSyncAllStatus() check
           * REASON: Properly checks the global state after name update.
           */
          if (getSyncAllStatus()) {
            syncAllBtn.click();
          } else {
            appList.forEach((app) => {
              if (app.isSynced) {
                let parentTagId = `li-${app.id}`;
                let parentTag = document.getElementById(parentTagId);
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
}

