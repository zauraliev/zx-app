import { startApp } from "../app-init.js";

export function renderDashboard() {
  return `
      <h2 style="text-align: center">App Registration (2022-2025)</h2>
      <form action="#" id="registration-form" class="form">
        <div class="input-group">
          <div class="flex-child">
            <input
              id="app-name"
              type="text"
              name="app-name"
              class="type-2 input"
              placeholder="0000-app"
              maxlength="8"
              autofocus
            />
            <span class="error-message"></span>
            <input
              id="form-btn"
              type="submit"
              value="Register App"
              class="btn btn-register"
            />
          </div>
          <div class="flex-child">
            Selected Item:
            <div id="selected-app" class="badge ripple hidden"></div>
          </div>
        </div>
      </form>
      <div class="apps">
        <ul id="app-list" class="app-list"></ul>
      </div>
      <br />
      <input id="sync-all" type="button" class="btn" value="Sync All" />
      <input id="go-settings" type="button" class="btn" value="Settings" />
  `;
}

export function initDashboard(container) {
  startApp(container);

  const goSettings = container.querySelector("#go-settings");
  goSettings.onclick = (e) => {
    e.stopPropagation();
    history.pushState({}, "", "/settings");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
}


