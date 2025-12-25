
export const loginUI = `
    <h2 style="text-align: center">Login</h2>
    <form id="login-form" class="form">
        <div class="input-group">
            <input id="user" type="text" class="type-2 input" placeholder="Username" required />
            <input id="pass" type="password" class="type-2 input" placeholder="Password" required />
            <input type="submit" value="Login" class="btn btn-register" />
        </div>
        <p id="err" style="text-align: center; color: red;"></p>
    </form>
`;
import { authenticate } from "./service.js";

export function initLogin(onSuccess) {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    const errEl = document.getElementById("err");

    if (errEl) errEl.innerText = "Authenticating...";

    const isAuthorized = await authenticate(username, password);

    if (isAuthorized) {
      onSuccess(); // Redirect or show protected UI
    } else {
      if (errEl) errEl.innerText = "Access Denied: Invalid Credentials";
    }

    return false;
  };
}




