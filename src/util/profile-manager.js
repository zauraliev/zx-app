// src/util/profile-manager.js
import { renderProfile, initProfile } from "../views/profile.js";

export class ProfileManager {
  constructor() {
    this.isOpen = false;
  }

  initialize() {
    // Inject profile dialog into DOM
    if (!document.getElementById("profile-dialog")) {
      document.body.insertAdjacentHTML("beforeend", renderProfile());
      initProfile();
    }

    // Create avatar button in navbar if logged in
    this.injectNavbarAvatar();
  }

  injectNavbarAvatar() {
    const navbar = document.getElementById("main-nav");
    if (!navbar) return;

    // Check if avatar button already exists
    if (document.getElementById("profile-avatar-btn")) return;

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) return;

    // Add avatar button to navbar
    const navLinks = navbar.querySelector(".nav-links");
    if (navLinks) {
      const avatarItem = document.createElement("li");
      avatarItem.className = "profile-avatar-container";
      avatarItem.innerHTML = `
        <button id="profile-avatar-btn" class="profile-avatar-btn" aria-label="User profile">
          <div class="navbar-avatar" id="navbar-avatar">${this.getUserInitial()}</div>
        </button>
      `;
      navLinks.appendChild(avatarItem);

      // Set avatar color
      const avatar = document.getElementById("navbar-avatar");
      const username = localStorage.getItem("username") || "User";
      avatar.style.backgroundColor = this.generateColorFromName(username);

      // Add click handler
      document
        .getElementById("profile-avatar-btn")
        .addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleProfileDialog();
        });
    }
  }

  toggleProfileDialog() {
    const dialog = document.getElementById("profile-dialog");
    const avatarBtn = document.getElementById("profile-avatar-btn");

    if (!dialog || !avatarBtn) return;

    if (dialog.classList.contains("hidden")) {
      // Position dialog below avatar button
      const rect = avatarBtn.getBoundingClientRect();
      dialog.style.top = `${rect.bottom + window.scrollY + 5}px`;
      dialog.style.right = `${window.innerWidth - rect.right}px`;
      dialog.classList.remove("hidden");
      this.isOpen = true;
    } else {
      dialog.classList.add("hidden");
      this.isOpen = false;
    }
  }

  getUserInitial() {
    const username = localStorage.getItem("username") || "User";
    return username.charAt(0).toUpperCase();
  }

  generateColorFromName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 65%)`;
  }

  updateUserData(username, email) {
    localStorage.setItem("username", username);
    localStorage.setItem("user_email", email);

    // Update UI if elements exist
    const nameEl = document.getElementById("profile-username");
    const emailEl = document.getElementById("profile-email");
    const avatarEls = document.querySelectorAll(
      ".navbar-avatar, .profile-avatar"
    );

    if (nameEl) nameEl.textContent = username;
    if (emailEl) emailEl.textContent = email;

    avatarEls.forEach((avatar) => {
      avatar.textContent = username.charAt(0).toUpperCase();
      avatar.style.backgroundColor = this.generateColorFromName(username);
    });
  }
}

// Singleton instance
export const profileManager = new ProfileManager();
