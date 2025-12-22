import "./css/animation.scss";
import "./css/style.scss";
import {
  appRegisterService,
  getAppList,
  appList,
  selectedApp,
  getSelectedApp,
  setSelectedApp,
  updateAppName,
} from "./service";
import { uuidv4, constructElement } from "./util/util-functions";
import FormValidator from "./util/form-validator";

(function (global) {
  "use strict";
  console.log("MY_VAR: ", process.env.MY_VAR || "NO VALUE");
  const apps = document.getElementById("app-list");
  const syncAllBtn = document.getElementById("sync-all");
  const appNameInput = document.getElementById("app-name");
  const selectedAppBadge = document.getElementById("selected-app");
  let isUpdate = false;
  let isSyncAll = false;

  const formBtn = document.getElementById("form-btn");

  const form = document.querySelector(".form");
  const fields = ["app-name"];

  const formValidator = new FormValidator(form, fields);
  formValidator.initialize();

  console.log("Apps => ", getAppList());

  getSelectedApp(); // initializing the getter

  function initialize() {
    console.log("Initializing => ", appList);
    appList.forEach((app, i) => {
      logger(`Element${i} ${app.id}`);

      createListItem(app);
    });
  }

  initialize();

  function createListItem(app) {
    let item = document.createElement("li"); // app-list li
    item.id = `li-${app.id}`;

    // Get Info link
    let linkProps = {
      id: `link-${app.id}`,
      href: "#",
      className: "app-name-link",
      onclick: () => editAppName(app),
    };
    const link = constructElement(linkProps, "a");

    link.appendChild(document.createTextNode(`${app.name}`));

    item.appendChild(link); // app-list li text
    item.appendChild(document.createTextNode(` >>> `));

    // Get Info button
    let btnProps = {
      id: `button-${app.id}`,
      type: "button",
      value: "Get Info",
      className: "btn",
    };

    const btn = constructElement(btnProps, "input");

    // Appending Get Info button into app-list
    item.appendChild(btn);

    getInfoBtn(item, app, btn);

    apps.prepend(item);

    syncAll(); // sync all initialization
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
    let span = document.createElement("span"); // app-list info span
    span.id = `span-00${app.id}`;

    parentTag.appendChild(span); // Adding app-list info span into app-list

    document.getElementById(span.id).innerHTML = " Loading... ";

    return new Promise(async function (resolve) {
      //The Safety Standard; blocks legacy mobile "ghost" clicks and accidental double-taps.
      setTimeout(() => {
        document.getElementById(span.id).innerHTML = ` >>> ${app.id}`;
        app.isSynced = true;
        resolve(app); // Return the updated app data
      }, 300);
    });
  }

  function syncAll() {
    try {
      let count = 0;
      let isProcessing = false;
      syncAllBtn.onclick = function (e) {
        isSyncAll = true;
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
      isSyncAll = false;
      console.log(error);
    }
  }

  function editAppName(app) {
    // let app = appList.find(app => app.id === appId);

    setSelectedApp(app);

    selectedAppBadgeSwitch(selectedApp.name, true);

    appNameInput.value = selectedApp.name;

    appNameInput.dispatchEvent(new Event("change", { bubbles: true }));

    isUpdate = true;

    formBtnSwitch(isUpdate);

    return true;
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

          appNameInput.value = "";

          if (isSyncAll) {
            syncAllBtn.click((e) => {
              e.stopPropagation();
              e.preventDefault();
            });
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
          textAlert(
            `Oops looks like the ${appNameInput.value} already exists!!!`
          );
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
      createListItem(app);
      appNameInput.value = "";
      isSyncAll = false;
      // appNameInput.dispatchEvent(new Event('change', { 'bubbles': true }));
    } else {
      textAlert(`Oops looks like the ${appName} already exists!!!`);
    }
  }

  function isAppNameValid(appName) {
    var regexp = /^(?!.*\d-\d)[A-Za-z0-9]+(-[A-Za-z0-9]+)?$/;

    const isValid = appName.search(regexp) !== -1;

    if (!isValid) {
      textAlert("not valid name");
      return false;
    }

    return true;
  }

  function logger(log) {
    console.log(`${log}`);
  }
  function textAlert(message) {
    alert(`${message}`);
  }
})(window);
