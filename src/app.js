import "./css/animation.scss";
import "./css/style.scss";
import { router } from "./router.js";

(function () {
  "use strict";

  // CHANGE: Wrap in an anonymous function so the Event object isn't passed as 'path'
  window.addEventListener("DOMContentLoaded", () => router());

  // CHANGE: Do the same for popstate
  window.addEventListener("popstate", () => router());
})();
