"use strict"

const uuidv4 = function () {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function constructElement(elementProps, elementType) {
  let element = document.createElement(elementType);
  for (const property in elementProps) {
    element[property] = elementProps[property];
  }
  return element;
}

export { uuidv4, constructElement };