"use strict";

class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    /**
     * ADDED: SPA Safety Guard
     * REASON: In a 2025 SPA, if you navigate quickly, startApp() might trigger
     * before the router finishes injecting the HTML. This prevents a "null" crash.
     */
    if (!this.form) return;
    this.validateOnSubmit();
    this.validateOnEntry();
  }

  validateOnSubmit() {
    /**
     * CHANGED: Arrow Function (event => { ... })
     * REASON: Replaces 'let self = this'. Arrow functions automatically
     * bind to the class instance, which is the 2025 standard for modern JS.
     */
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (input) this.validateFields(input);
      });
    });
  }

  validateOnEntry() {
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);

      /**
       * ADDED: input existence check
       * REASON: Prevents "Cannot read properties of null" errors if a specific
       * field ID is missing from the current page's HTML string.
       */
      if (!input) return;

      input.addEventListener("input", () => {
        console.log("input", input.value);
        this.validateFields(input);
      });

      input.addEventListener("change", () => {
        console.log("change", input.value);
        this.validateFields(input);
      });
    });
  }

  setStatus(field, message, status) {
    const errorIcon = field.parentElement.querySelector(".icon-error");
    const errorMessage = field.parentElement.querySelector(".error-message");

    if (status === "success") {
      if (errorIcon) {
        errorIcon.classList.add("hidden");
      }
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
    }

    if (status === "error") {
      /**
       * ADDED: errorMessage existence check
       * REASON: Safe assignment ensures your script doesn't crash if the
       * .error-message span is missing from the HTML for any field.
       */
      if (errorMessage) {
        errorMessage.innerText = message;
      }
      field.classList.add("input-error");
    }
  }

  /**
   * PRESERVED: Original function signature and .trim() logic.
   * NOTE: I previously misstated that I added .trim(). It was already present
   * in your code and is the correct 2025 practice for blank checks.
   */
  validateFields(field, validated) {
    if (field.value.trim() === "") {
      return this.setStatus(field, `cannot be blank`, "error");
    } else {
      return this.setStatus(field, null, "success");
    }
  }
}

export default FormValidator;
