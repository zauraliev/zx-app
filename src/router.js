import { renderLogin, initLogin } from "./views/login.js";
import { renderDashboard, initDashboard } from "./views/dashboard.js";
import { renderSettings, initSettings } from "./views/settings.js";
import { checkSession } from "./service.js";

const routes = {
  "/": {
    protected: true,
    render: renderDashboard,
    init: initDashboard,
  },
  "/settings": {
    protected: true,
    render: renderSettings,
    init: initSettings,
  },
  "/login": {
    protected: false,
    render: renderLogin,
    init: initLogin,
  },
};

export function router(path = location.pathname) {
  const container = document.querySelector(".container");
  if (!container) return;

  const isLoggedIn = checkSession();
  let route = routes[path];

  // Unknown route → fallback
  if (!route) {
    route = isLoggedIn ? routes["/"] : routes["/login"];
    history.replaceState({}, "", isLoggedIn ? "/" : "/login");
  }

  // Auth guard
  if (route.protected && !isLoggedIn) {
    history.replaceState({}, "", "/login");
    route = routes["/login"];
  }

  container.innerHTML = route.render();

  // Bind events AFTER render
  route.init?.(container);
}