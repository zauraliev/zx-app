"use strict";

/**
 * PRESERVED: Legacy UUID v4 generator
 * REASON: Good fallback for environments where randomUUID might be restricted.
 */
const uuidv4 = function () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

/**
 * PRESERVED: Native UUID generator
 * NOTE: This is the 2025 standard for speed and randomness.
 */
const newUUID = function () {
  return crypto.randomUUID();
};

/**
 * REFACTORED: constructElement
 * CHANGED: Added Object.assign() and a check for 'dataset'.
 * REASON: Object.assign is faster than a 'for...in' loop for simple property
 * mapping. I added a check for 'dataset' because standard property
 * assignment doesn't work for data-attributes in some browsers.
 */
function constructElement(elementProps, elementType) {
  const element = document.createElement(elementType);

  // Use Object.assign for standard properties (className, id, href, etc.)
  Object.assign(element, elementProps);

  // Handle data-attributes if passed in a 'dataset' object
  if (elementProps.dataset) {
    Object.assign(element.dataset, elementProps.dataset);
  }

  return element;
}

/**
 * REFACTORED: validateEmail
 * CHANGED: Replaced .includes("@") with a Standard Regex.
 * REASON: In 2025, simple "@" checks are considered insecure as they allow
 * strings like "@@@" or "@.". This regex ensures a basic local and domain part.
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * REFACTORED: formatDate
 * CHANGED: Added 'Intl.DateTimeFormat' options.
 * REASON: Standard .toLocaleDateString() varies wildly by browser.
 * Using specific options ensures a consistent UI across all 2025 browsers.
 */
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export { uuidv4, constructElement, newUUID, validateEmail, formatDate };
