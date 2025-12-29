import {
  appRegisterService,
  getAppList,
  appList,
  selectedApp,
  getSelectedApp,
  setSelectedApp,
  updateAppName,
} from "./service.js";

import { uuidv4, constructElement } from "./util/util-functions.js";
import FormValidator from "./util/form-validator.js";

export function startApp(container) {
  console.log("MY_VAR: ", process.env.MY_VAR || "NO VALUE");

  const apps = container.querySelector("#app-list");
  const syncAllBtn = container.querySelector("#sync-all");
  const appNameInput = container.querySelector("#app-name");
  const selectedAppBadge = container.querySelector("#selected-app");
  const formBtn = container.querySelector("#form-btn");

  let isUpdate = false;
  let isSyncAll = false;

  const form = container.querySelector(".form");
  const fields = ["app-name"];
  new FormValidator(form, fields).initialize();

  console.log("Apps => ", getAppList());

  getSelectedApp();

  function initialize() {
    appList.forEach((app) => createListItem(app, container));
  }
  
  initialize();

  function createListItem(app, container) {
    const apps = container.querySelector("#app-list");
    let item = document.createElement("li"); // app-list li
    item.id = `li-${app.id}`;

    // Get Info link
    let linkProps = {
      id: `link-${app.id}`,
      href: "#",
      className: "app-name-link",
      onclick: () => editAppName(app, container),
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

    getInfoBtn(item, app, btn, container);

    apps.prepend(item);

    syncAll(container); // sync all initialization
  }

  function getInfoBtn(parentTag, app, btn, container) {
    let count = 0;
    let isProcessing = false;
    btn.onclick = async function (e) {
      e.stopPropagation();
      if (isProcessing) return;
      isProcessing = true;
      fetchAppInfo(parentTag, app, container).then((app) => {
        isProcessing = false;
        count++;
        console.log(app, "Count => ", count);
      });
    };
  }

  function fetchAppInfo(parentTag, app, container) {
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

  function syncAll(container) {
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
          fetchAppInfo(parentTag, app, container).then((app) => {
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

  function editAppName(app, container) {
    // let app = appList.find(app => app.id === appId);

    const appNameInput = container.querySelector("#app-name");
    const selectedAppBadge = container.querySelector("#selected-app");
    const formBtn = container.querySelector("#form-btn");

    setSelectedApp(app);

    selectedAppBadge.innerText = selectedApp.name;
    selectedAppBadge.classList.remove("hidden");

    appNameInput.value = selectedApp.name;
    appNameInput.dispatchEvent(new Event("change", { bubbles: true }));

    isUpdate = true;
    formBtn.value = "Update App";
    formBtn.classList.add("btn-update");
    formBtn.classList.remove("btn-register");

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

  let logoutBtn = container.querySelector("#logout-btn");
  if (!logoutBtn) {
    logoutBtn = document.createElement("input");
    logoutBtn.id = "logout-btn";
    logoutBtn.value = "Logout";
    logoutBtn.className = "btn";
    logoutBtn.type = "button";
    logoutBtn.onclick = () => {
      localStorage.clear();
      history.replaceState({}, "", "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    };
    container.appendChild(logoutBtn);
  }
}







