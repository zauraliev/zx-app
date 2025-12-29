// views/home.js
import { navigateTo } from "../router.js";

export function renderHome() {
  return `
    <div class="home-hero">
      <h1>Welcome to the App Registration</h1>
      <p>Securely manage your registrations with our 2025 dashboard.</p>
      <button id="get-started" class="btn">Get Started</button>
    </div>
  `;
}

export function initHome() {
  document.getElementById("get-started").onclick = () => {
    const token = localStorage.getItem("isLoggedIn");
    navigateTo(token ? "/dashboard" : "/login");
  };
}

