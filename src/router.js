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
  "/404": { protected: false, render: () => `<h1>404 Not Found</h1>` },
};

/**
 * NEW: navigateTo helper
 * Updates the URL and triggers a re-render in one step.
 */
export function navigateTo(path) {
  // PREVENT LOOP: If we are already at this path, do nothing
  if (window.location.pathname === path) return;

  window.history.pushState({}, "", path);
  router(path);
}
window.navigateTo = navigateTo;
/**
 * REWRITTEN: router function
 * Handles path matching, security guards, and DOM injection.
 */
export function router(path = window.location.pathname) {
  // 1. Keep your existing variable name 'cleanPath'
  // Use typeof check to ensure we handle the 'Event' object issue from app.js
  let cleanPath = typeof path === "string" ? path : window.location.pathname;

  // ADD THE SANITIZER HERE
  // This removes trailing slashes and ensures empty becomes "/"
  cleanPath = cleanPath.replace(/\/$/, "") || "/";

  const isLoggedIn = checkSession();
  let route = routes[cleanPath];

  // 2. FALLBACK
  if (!route) {
    window.history.replaceState({}, "", "/404");
    route = routes["/404"];
  }

  // 3. Smart Auth Guards (Use return to exit function)
  if (route.protected && !isLoggedIn) {
    return navigateTo("/login"); // Fixed: now navigateTo checks for loops
  }
  if (cleanPath === "/login" && isLoggedIn) {
    return navigateTo("/dashboard");
  }

  // 4. Update UI
  renderNavbar(isLoggedIn); // Safe now due to status check above
  const container = document.getElementById("container");
  container.innerHTML = route.render();
  route.init?.();
}
function renderNavbar(isLoggedIn) {
  let nav = document.getElementById("main-nav");

  // 1. Check if Navbar exists; if not, create it ONCE
  if (!nav) {
    const navHTML = `<nav id="main-nav" class="navbar"></nav>`;
    document.body.insertAdjacentHTML("afterbegin", navHTML);
    nav = document.getElementById("main-nav");
    nav.dataset.status = ""; // Track state to prevent redundant renders
  }

  // 2. ONLY re-render content if the login status has changed
  // This prevents the 'Throttling' loop by stopping unnecessary DOM updates
  const currentStatus = isLoggedIn ? "in" : "out";
  if (nav.dataset.status === currentStatus) return;

  nav.dataset.status = currentStatus;
  nav.innerHTML = `
    <div class="logo" data-link="/">MyApp 2025</div>
    <ul class="nav-links">
      <li data-link="/">Home</li>
      ${
        isLoggedIn
          ? `
        <li data-link="/dashboard">Dashboard</li>
        <li data-link="/settings">Settings</li>
        <li id="nav-logout" class="logout-link">Logout</li>
      `
          : `
        <li data-link="/login">Login</li>
      `
      }
    </ul>
  `;

  // 3. Attach listeners only when content changes
  initNavbar();
  if (isLoggedIn) attachLogoutListener();
}


function initNavbar() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;

  // Remove old listener if it exists to prevent double-firing
  // (Standard practice in 2025 for dynamic DOM elements)
  nav.onclick = (e) => {
    // 1. Find the element that was clicked, or its closest parent with data-link
    // This allows clicking on text inside an <li> to still work
    const link = e.target.closest("[data-link]");

    if (link) {
      const path = link.getAttribute("data-link");

      // 2. Use your navigateTo helper to change the view
      navigateTo(path);
    }
  };
}

// Separate Logout listener for cleaner logic
function attachLogoutListener() {
  const logoutBtn = document.getElementById("nav-logout");
  if (logoutBtn) {
    logoutBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent the nav.onclick delegation from firing
      localStorage.removeItem("isLoggedIn");
      navigateTo("/login");
    };
  }
}







