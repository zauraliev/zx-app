import { renderHome, initHome } from "./views/home.js";
import { renderLogin, initLogin } from "./views/login.js";
import { renderDashboard, initDashboard } from "./views/dashboard.js";
import { renderSettings, initSettings } from "./views/settings.js";
import { checkSession } from "./service.js";

const routes = {
  "/": { protected: false, render: renderHome, init: initHome },
  "/dashboard": {
    protected: true,
    render: renderDashboard,
    init: initDashboard,
  },
  "/settings": { protected: true, render: renderSettings, init: initSettings },
  "/login": { protected: false, render: renderLogin, init: initLogin },
};

/**
 * NEW: navigateTo helper
 * Updates the URL and triggers a re-render in one step.
 */
export function navigateTo(path) {
  window.history.pushState({}, "", path);
  router(path);
}
window.navigateTo = navigateTo; 
/**
 * REWRITTEN: router function
 * Handles path matching, security guards, and DOM injection.
 */
export function router(path = window.location.pathname) {
  const container = document.getElementById("container"); // Explicit ID selector
  if (!container) return;

  const isLoggedIn = checkSession();

  // RENDER MENU (Only if not on login page)
  renderNavbar(isLoggedIn);

  let route = routes[path];

  // 1. Fallback for unknown routes
  if (!route) {
    path = isLoggedIn ? "/" : "/login";
    window.history.replaceState({}, "", path);
    route = routes[path];
  }

  // 2. Auth Guard: Check if protected route is accessible
  if (route.protected && !isLoggedIn) {
    window.history.replaceState({}, "", "/login");
    route = routes["/login"];
  }

  // 3. Auth Guard: Prevent logged-in users from seeing the login page
  if (!route.protected && isLoggedIn && path === "/login") {
    window.history.replaceState({}, "", "/");
    route = routes["/"];
  }

  // 4. Inject HTML and execute initialization
  container.innerHTML = route.render();
  route.init?.();
}

function renderNavbar(isLoggedIn) {
  // Check if navbar already exists to avoid duplicates
  if (document.getElementById("main-nav")) return;

  const navHTML = `
    <nav id="main-nav" class="navbar">
      <div class="logo" onclick="navigateTo('/')">MyApp 2025</div>
      <ul class="nav-links">
        <li onclick="navigateTo('/')">Home</li>
        ${
          isLoggedIn
            ? "<li onclick=\"navigateTo('/dashboard')\">Dashboard</li>"
            : ""
        }
        ${
          isLoggedIn
            ? "<li onclick=\"navigateTo('/settings')\">Settings</li>"
            : ""
        }
      </ul>
    </nav>
  `;
  // Insert BEFORE the container
  document.body.insertAdjacentHTML("afterbegin", navHTML);
}




