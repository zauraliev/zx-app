// /src/util/ui-helpers.js - Professional UI Utilities using SCSS
"use strict";

/**
 * Toast Notification System
 * Uses CSS classes from style.scss for styling
 */
class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create toast container if it doesn't exist
    if (!document.getElementById("toast-container")) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById("toast-container");
    }
  }

  /**
   * Show a toast notification
   * @param {string} message - Notification text
   * @param {string} type - 'success' | 'error' | 'info' | 'warning'
   * @param {number} duration - Auto-dismiss time in ms (0 = manual dismiss)
   * @param {Object} options - Additional options
   * @returns {HTMLElement} The toast element
   */
  show(message, type = "info", duration = 5000, options = {}) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    // Icon based on type
    const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️",
    };

    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${icons[type] || ""}</span>
        <span class="toast-message">${message}</span>
      </div>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    // Add to container
    this.container.appendChild(toast);

    // Close button handler
    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.onclick = () => this.removeToast(toast);

    // Auto-dismiss if duration > 0
    if (duration > 0) {
      setTimeout(() => this.removeToast(toast), duration);
    }

    // Add action button if provided
    if (options.action) {
      const actionBtn = document.createElement("button");
      actionBtn.className = "toast-action";
      actionBtn.textContent = options.action.label;
      actionBtn.onclick = (e) => {
        e.stopPropagation();
        options.action.handler();
        this.removeToast(toast);
      };

      toast.querySelector(".toast-content").appendChild(actionBtn);
    }

    // Return toast element for external manipulation
    return toast;
  }

  removeToast(toast) {
    toast.classList.add("toast-exiting");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  /**
   * Quick success toast (common use case)
   */
  success(message, duration = 3000) {
    return this.show(message, "success", duration);
  }

  /**
   * Quick error toast (common use case)
   */
  error(message, duration = 5000) {
    return this.show(message, "error", duration);
  }

  /**
   * Quick info toast (common use case)
   */
  info(message, duration = 3000) {
    return this.show(message, "info", duration);
  }

  /**
   * Quick warning toast (common use case)
   */
  warning(message, duration = 4000) {
    return this.show(message, "warning", duration);
  }
}

/**
 * Highlight Utility
 * Uses CSS classes for visual feedback
 */
class HighlightManager {
  /**
   * Highlight a newly created element
   * @param {string} elementId - ID of element to highlight
   * @param {number} duration - Highlight duration in ms
   */
  static highlightNew(elementId, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with ID ${elementId} not found for highlighting`);
      return false;
    }

    element.classList.add("highlight-new");

    // Remove highlight after duration
    setTimeout(() => {
      element.classList.remove("highlight-new");
    }, duration);

    return true;
  }

  /**
   * Pulse a pagination button
   * @param {number} pageNumber - Page to highlight
   * @param {number} duration - Pulse duration in ms
   */
  static highlightPage(pageNumber, duration = 3000) {
    const pagination = document.getElementById("pagination-controls");
    if (!pagination) return false;

    const buttons = pagination.querySelectorAll(".btn-page");
    const targetBtn = Array.from(buttons).find((btn) => {
      const btnText = btn.textContent.trim();
      const btnPage = parseInt(btnText);
      return !isNaN(btnPage) && btnPage === pageNumber;
    });

    if (targetBtn) {
      targetBtn.classList.add("page-pulse");

      setTimeout(() => {
        targetBtn.classList.remove("page-pulse");
      }, duration);

      return true;
    }

    return false;
  }

  /**
   * Flash an element (brief highlight)
   * @param {string} elementId - Element to flash
   * @param {string} color - Flash color (css variable or hex)
   */
  static flash(elementId, color = "var(--primary-color, #3B82F6)") {
    const element = document.getElementById(elementId);
    if (!element) return false;

    const originalBorder = element.style.border;
    element.style.border = `2px solid ${color}`;
    element.style.transition = "border 0.3s ease";

    setTimeout(() => {
      element.style.border = originalBorder;
      setTimeout(() => {
        element.style.transition = "";
      }, 300);
    }, 300);

    return true;
  }
}

/**
 * Loading State Manager
 * Uses CSS classes for loading states
 */
class LoadingManager {
  /**
   * Show loading state on an element
   * @param {string} elementId - Element to show loading on
   * @param {string} text - Loading text
   */
  static show(elementId, text = "Loading...") {
    const element = document.getElementById(elementId);
    if (!element) return false;

    // Store original content
    const originalContent = element.innerHTML;
    const originalClasses = element.className;

    element.dataset.originalContent = originalContent;
    element.dataset.originalClasses = originalClasses;

    element.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <span class="loading-text">${text}</span>
      </div>
    `;

    // Add loading class to parent element
    element.classList.add("is-loading");

    return true;
  }

  /**
   * Hide loading state
   * @param {string} elementId - Element to restore
   */
  static hide(elementId) {
    const element = document.getElementById(elementId);
    if (!element || !element.dataset.originalContent) return false;

    element.innerHTML = element.dataset.originalContent;
    element.className = element.dataset.originalClasses;

    // Clean up
    delete element.dataset.originalContent;
    delete element.dataset.originalClasses;

    return true;
  }

  /**
   * Toggle loading state on a button
   * @param {string} buttonId - Button element ID
   * @param {boolean} isLoading - Whether to show loading
   */
  static toggleButtonLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return false;

    if (isLoading) {
      const originalText = button.textContent;
      button.dataset.originalText = originalText;
      button.innerHTML = '<div class="loading-spinner small"></div>';
      button.disabled = true;
      button.classList.add("is-loading");
    } else {
      if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
        delete button.dataset.originalText;
      }
      button.disabled = false;
      button.classList.remove("is-loading");
    }

    return true;
  }
}

/**
 * Confirmation Dialog (Better than confirm())
 * Uses CSS classes for styling
 */
class ConfirmDialog {
  /**
   * Show confirmation dialog
   * @param {string} message - Dialog message
   * @param {Object} options - Dialog options
   * @returns {Promise<boolean>} Resolves to true if confirmed
   */
  static async show(message, options = {}) {
    return new Promise((resolve) => {
      // Create overlay
      const overlay = document.createElement("div");
      overlay.className = "confirm-dialog-overlay";

      // Create dialog
      const dialog = document.createElement("div");
      dialog.className = "confirm-dialog";

      // Set dialog content
      dialog.innerHTML = `
        <div class="confirm-message">${message}</div>
        <div class="confirm-buttons">
          <button type="button" class="btn confirm-cancel">
            ${options.cancelText || "Cancel"}
          </button>
          <button type="button" class="btn confirm-ok ${
            options.danger ? "danger" : ""
          }">
            ${options.okText || "OK"}
          </button>
        </div>
      `;

      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      // Focus management
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-labelledby", "confirm-dialog-title");

      // Add title if provided
      if (options.title) {
        const title = document.createElement("h3");
        title.id = "confirm-dialog-title";
        title.className = "confirm-title";
        title.textContent = options.title;
        dialog.insertBefore(title, dialog.firstChild);
      }

      // Event handlers
      const handleConfirm = () => {
        cleanup();
        resolve(true);
      };

      const handleCancel = () => {
        cleanup();
        resolve(false);
      };

      const handleKeydown = (e) => {
        if (e.key === "Escape") {
          handleCancel();
        } else if (e.key === "Enter" && !options.preventEnterConfirm) {
          handleConfirm();
        }
      };

      const handleOverlayClick = (e) => {
        if (e.target === overlay && !options.preventOutsideClick) {
          handleCancel();
        }
      };

      // Add event listeners
      const okBtn = dialog.querySelector(".confirm-ok");
      const cancelBtn = dialog.querySelector(".confirm-cancel");

      okBtn.onclick = handleConfirm;
      cancelBtn.onclick = handleCancel;
      overlay.onclick = handleOverlayClick;
      document.addEventListener("keydown", handleKeydown);

      // Focus the OK button
      setTimeout(() => okBtn.focus(), 10);

      // Cleanup function
      const cleanup = () => {
        overlay.classList.add("closing");
        setTimeout(() => {
          document.removeEventListener("keydown", handleKeydown);
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 200);
      };
    });
  }
}

/**
 * Form Helper Utilities
 */
class FormHelper {
  /**
   * Show form field error
   * @param {string} fieldId - Field element ID
   * @param {string} message - Error message
   */
  static showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return false;

    // Remove existing error
    this.clearError(fieldId);

    // Add error class
    field.classList.add("has-error");

    // Create error message element
    const errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.textContent = message;

    // Insert after field
    if (field.parentNode) {
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    // Focus field if it's an input
    if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
      field.focus();
    }

    return true;
  }

  /**
   * Clear field error
   * @param {string} fieldId - Field element ID
   */
  static clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return false;

    field.classList.remove("has-error");

    // Remove existing error message
    const parent = field.parentNode;
    if (parent) {
      const existingError = parent.querySelector(".field-error");
      if (existingError) {
        parent.removeChild(existingError);
      }
    }

    return true;
  }

  /**
   * Disable form
   * @param {string} formId - Form element ID
   */
  static disableForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const elements = form.querySelectorAll("input, button, select, textarea");
    elements.forEach((element) => {
      element.disabled = true;
    });

    form.classList.add("is-disabled");

    return true;
  }

  /**
   * Enable form
   * @param {string} formId - Form element ID
   */
  static enableForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const elements = form.querySelectorAll("input, button, select, textarea");
    elements.forEach((element) => {
      element.disabled = false;
    });

    form.classList.remove("is-disabled");

    return true;
  }
}

/**
 * Clipboard Helper
 */
class ClipboardHelper {
  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @param {Object} options - Options
   * @returns {Promise<boolean>} Success status
   */
  static async copy(text, options = {}) {
    try {
      await navigator.clipboard.writeText(text);

      if (options.showToast !== false) {
        toast.success(options.successMessage || "Copied to clipboard!", 2000);
      }

      return true;
    } catch (err) {
      console.error("Clipboard copy failed:", err);

      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        if (options.showToast !== false) {
          toast.success(options.successMessage || "Copied to clipboard!", 2000);
        }

        return true;
      } catch (fallbackErr) {
        console.error("Clipboard fallback failed:", fallbackErr);

        if (options.showToast !== false) {
          toast.error("Failed to copy to clipboard", 3000);
        }

        return false;
      }
    }
  }
}

// Create singleton instance
const toast = new ToastManager();

// Export everything
export {
  toast,
  ToastManager,
  HighlightManager,
  LoadingManager,
  ConfirmDialog,
  FormHelper,
  ClipboardHelper,
};

// Also export default for convenience
export default {
  toast,
  HighlightManager,
  LoadingManager,
  ConfirmDialog,
  FormHelper,
  ClipboardHelper,
};
