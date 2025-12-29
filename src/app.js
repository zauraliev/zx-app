import "./css/animation.scss";
import "./css/style.scss";
import { router } from "./router.js";

(function () {
  "use strict";

  // Initial render
  window.addEventListener("DOMContentLoaded", router);

  // Handle browser navigation
  window.addEventListener("popstate", router);
})();
