// src/views/profile.js
export function renderProfile() {
  return `
    <div class="profile-dialog hidden" id="profile-dialog">
      <div class="profile-header">
        <div class="profile-avatar">
          <div class="avatar-circle" id="profile-avatar">${getInitials()}</div>
        </div>
        <div class="profile-info">
          <div class="profile-name" id="profile-username">Loading...</div>
          <div class="profile-email" id="profile-email">user@example.com</div>
        </div>
      </div>
      <div class="profile-divider"></div>
      <div class="profile-menu">
        <button class="profile-menu-item" data-action="profile">
          <span class="profile-menu-icon">&#x1F464;</span>
          <span class="profile-menu-text">Profile</span>
        </button>
        <button class="profile-menu-item" data-action="settings">
          <span class="profile-menu-icon">&#x2699;</span>
          <span class="profile-menu-text">Settings</span>
        </button>
        <button class="profile-menu-item" data-action="logout">
          <span class="profile-menu-icon">&#x23FB;</span>
          <span class="profile-menu-text">Sign Out</span>
        </button>
      </div>
    </div>
  `;
}

function getInitials() {
  const username = localStorage.getItem("username") || "User";
  return username.charAt(0).toUpperCase();
}

export function initProfile() {
  // Load user data
  const username = localStorage.getItem("username") || "Demo User";
  const email = localStorage.getItem("user_email") || "user@example.com";

  document.getElementById("profile-username").textContent = username;
  document.getElementById("profile-email").textContent = email;

  // Set avatar with initials
  const avatar = document.getElementById("profile-avatar");
  avatar.textContent = username.charAt(0).toUpperCase();
  avatar.style.backgroundColor = generateColorFromName(username);

  // Menu item click handlers
  document.querySelectorAll(".profile-menu-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const action = e.currentTarget.dataset.action;
      handleProfileAction(action);
    });
  });

  // Close dialog when clicking outside
  document.addEventListener("click", (e) => {
    const dialog = document.getElementById("profile-dialog");
    const avatarBtn = document.getElementById("profile-avatar-btn");

    if (
      dialog &&
      !dialog.contains(e.target) &&
      avatarBtn &&
      !avatarBtn.contains(e.target) &&
      !dialog.classList.contains("hidden")
    ) {
      dialog.classList.add("hidden");
    }
  });
}

function generateColorFromName(name) {
  // Generate a consistent color from username
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 65%)`;
}

function handleProfileAction(action) {
  const dialog = document.getElementById("profile-dialog");
  dialog.classList.add("hidden");

  switch (action) {
    case "profile":
      console.log("Navigate to profile page");
      // navigateTo('/profile');
      break;
    case "settings":
      window.navigateTo("/settings");
      break;
    case "logout":
      // Use existing logout from service.js
      import("../service.js").then((module) => {
        module.clearSession();
      });
      break;
  }
}

