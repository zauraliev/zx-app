import { navigateTo } from "../router.js"; // Use the new helper
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
  `;
}

export function initDashboard() {
  startApp(); // Re-binds your app logic to the new HTML

  // REMOVED: e.stopPropagation();
  // Reason: Not needed here as there are no parent click listeners to block.

  // REMOVED: window.dispatchEvent(new PopStateEvent("popstate"));
  // Reason: Hacky. navigateTo() handles the URL change and the Render in one step.
  // MENU handles this now
}

