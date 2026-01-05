import { authenticate, saveSession, checkSession } from "../service.js";
import { navigateTo } from "../router.js";

export function renderLogin() {
  return `
    <h2 style="text-align: center">Login</h2>
    <form id="login-form" class="form">
        <div class="input-group">
            <input 
              id="user" 
              type="text" 
              class="type-2 input" 
              placeholder="Username" 
              autocomplete="username" 
              required 
            />
            <input 
              id="pass" 
              type="password" 
              class="type-2 input" 
              placeholder="Password" 
              autocomplete="current-password" 
              required 
            />
            <input type="submit" value="Login" class="btn btn-register" />
        </div>
        <p id="err" style="text-align: center; color: red;"></p>
    </form>
  `;
}

export function initLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

  // Check if already logged in
  if (checkSession()) {
    navigateTo("/dashboard");
    return;
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    const errEl = document.getElementById("err");

    if (errEl) errEl.innerText = "Authenticating...";

    const isAuthorized = await authenticate(username, password);

    if (isAuthorized) {
      // ✅ Now uses service.js function
      saveSession();

      if (errEl) errEl.innerText = "";
      navigateTo("/dashboard");
    } else {
      if (errEl) errEl.innerText = "Access Denied: Invalid Credentials";
    }

    return false;
  };
}
