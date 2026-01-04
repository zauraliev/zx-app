import { startApp } from "../app-init.js";
import { appList, getSyncData, getCurrentPage, getTotalPages } from "../service.js";

// views/dashboard.js
export function renderDashboard() {
  return `
      <h2 style="text-align: center">App Registration (2022-2025)</h2>
      <form action="#" id="registration-form" class="form">
        <div class="input-group">
          <div class="flex-child">
            <input
              id="app-name"
              type="text"
              name="app-name"
              class="type-2 input"
              placeholder="0000-app"
              maxlength="8"
              autofocus
            />
            <span class="error-message"></span>
            <input
              id="form-btn"
              type="submit"
              value="Register App"
              class="btn btn-register"
            />
          </div>
          <div class="flex-child">
            Selected Item:
            <div id="selected-app" class="badge ripple hidden"></div>
          </div>
        </div>
      </form>

      <!-- ADDED: Controls bar for Sync and Page Size -->
      <div class="dashboard-actions" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <input id="sync-all" type="button" class="btn" value="Sync All" />
        
        <div class="page-size-container">
          <label for="page-size">Show:</label>
          <select id="page-size" class="type-2 select-input">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      <div class="apps">
        <ul id="app-list" class="app-list"></ul>
      </div>

      <!-- ADDED: Semantic Pagination Navigation -->
      <nav id="pagination-nav" aria-label="App list pagination" style="text-align: center; margin-top: 20px;">
        <div id="pagination-controls" class="pagination-bar"></div>
      </nav>
  `;
}

export function initDashboard() {
  console.log("🎯 Dashboard starting...");

  // FIXED: Verify page state before starting
  setTimeout(() => {
    const currentPage = getCurrentPage();
    const totalPages = getTotalPages();

    console.log(`📌 Dashboard Load Verification:`);
    console.log(`   Page: ${currentPage}/${totalPages}`);
    console.log(
      `   localStorage page: ${localStorage.getItem("current_page")}`
    );

    // Force validation if needed
    if (currentPage > totalPages) {
      console.warn(
        `⚠️ Page ${currentPage} exceeds max ${totalPages}. Correcting...`
      );
      setCurrentPage(totalPages);
    }
  }, 50);

  startApp();
}
