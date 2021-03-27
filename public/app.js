/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/service.js":
/*!************************!*\
  !*** ./src/service.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.updateAppName = exports.setSelectedApp = exports.getSelectedApp = exports.getAppList = exports.appRegisterService = exports.selectedApp = exports.appList = undefined;

var _utilFunctions = __webpack_require__(/*! ./util/util-functions */ "./src/util/util-functions.js");

var _data = __webpack_require__(/*! ./statics/data */ "./src/statics/data.js");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

"use strict";

var appList = [];
var selectedApp = null;

function appRegisterService(newApp) {
  appList.push(newApp);
}

function updateAppName(appId, newName) {

  var _app = appList.find(function (app) {
    return app.id === appId;
  });

  if (_app) appList.find(function (app) {
    return app.id === appId;
  }).name = newName;
}

function getAppList() {
  exports.appList = appList = [].concat(_toConsumableArray(_data2.default));
  return appList;
}

function getSelectedApp(params) {
  return selectedApp;
}

function setSelectedApp(app) {
  exports.selectedApp = selectedApp = app;
}

exports.appList = appList;
exports.selectedApp = selectedApp;
exports.appRegisterService = appRegisterService;
exports.getAppList = getAppList;
exports.getSelectedApp = getSelectedApp;
exports.setSelectedApp = setSelectedApp;
exports.updateAppName = updateAppName;

/***/ }),

/***/ "./src/statics/data.js":
/*!*****************************!*\
  !*** ./src/statics/data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var data = [{
  name: "0001-app",
  id: "9eb2fd3c-809b-4e04-9ad4-56574cfdb545" //uuidv4()
}, {
  name: "0002-app",
  id: "4e9ef95e-a1bb-4049-90e0-32d5e48b24c9" //uuidv4()
}, {
  name: "0003-app",
  id: "c5599c42-57fe-4045-87ca-4696de9900c9" //uuidv4()
}];

exports.default = data;

/***/ }),

/***/ "./src/util/form-validator.js":
/*!************************************!*\
  !*** ./src/util/form-validator.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormValidator = function () {
  function FormValidator(form, fields) {
    _classCallCheck(this, FormValidator);

    this.form = form;
    this.fields = fields;
  }

  _createClass(FormValidator, [{
    key: 'initialize',
    value: function initialize() {
      this.validateOnSubmit();
      this.validateOnEntry();
    }
  }, {
    key: 'validateOnSubmit',
    value: function validateOnSubmit() {
      var self = this;

      this.form.addEventListener('submit', function (event) {
        event.preventDefault();
        self.fields.forEach(function (field) {
          var input = document.querySelector('#' + field);
          self.validateFields(input);
        });
      });
    }
  }, {
    key: 'validateOnEntry',
    value: function validateOnEntry() {
      var self = this;

      this.fields.forEach(function (field) {
        var input = document.querySelector('#' + field);

        input.addEventListener('input', function (event) {
          self.validateFields(input);
        });

        input.addEventListener('change', function (event) {
          self.validateFields(input);
        });
      });
    }
  }, {
    key: 'setStatus',
    value: function setStatus(field, message, status) {
      var errorIcon = field.parentElement.querySelector('.icon-error');
      var errorMessage = field.parentElement.querySelector('.error-message');

      if (status === "success") {
        if (errorIcon) {
          errorIcon.classList.add('hidden');
        }
        if (errorMessage) {
          errorMessage.innerText = "";
        }
        field.classList.remove('input-error');
      }

      if (status === "error") {
        field.parentElement.querySelector('.error-message').innerText = message;
        field.classList.add('input-error');
      }
    }
  }, {
    key: 'validateFields',
    value: function validateFields(field) {

      if (field.value.trim() === '') {
        this.setStatus(field, 'cannot be blank', 'error');
      } else {
        this.setStatus(field, null, 'success');
      }
    }
  }]);

  return FormValidator;
}();

exports.default = FormValidator;

/***/ }),

/***/ "./src/util/util-functions.js":
/*!************************************!*\
  !*** ./src/util/util-functions.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var uuidv4 = function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};

exports.uuidv4 = uuidv4;

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/animation.scss":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/animation.scss ***!
  \*****************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ripple {\n  animation: ripple 3s linear infinite;\n}\n\n.ripple::before,\n.ripple::after {\n  animation-delay: 1s;\n}\n\n@keyframes ripple {\n  0% {\n    box-shadow: 0 0 0 0.1rem rgba(36, 172, 235, 0.2);\n  }\n  100% {\n    box-shadow: 0 0 0 0.7rem rgba(255, 255, 255, 0);\n  }\n}", "",{"version":3,"sources":["webpack://./src/css/animation.scss"],"names":[],"mappings":"AAAA;EACE,oCAAA;AACF;;AACA;;EAEE,mBAAA;AAEF;;AAAA;EACE;IACE,gDAAA;EAGF;EADA;IACE,+CAAA;EAGF;AACF","sourcesContent":[".ripple {\r\n  animation: ripple 3s linear infinite;\r\n}\r\n.ripple::before,\r\n.ripple::after {\r\n  animation-delay:1s;\r\n}\r\n@keyframes ripple {\r\n  0% {\r\n    box-shadow: 0 0 0 .1rem rgba(36, 172, 235, 0.2);\r\n  }\r\n  100% {\r\n    box-shadow: 0 0 0 .7rem rgba(255,255,255, 0);\r\n  }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss ***!
  \*************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".main-font {\n  font-family: \"Courier New\", Courier, monospace;\n  color: black;\n  font-size: 12pt;\n}\n\ninput.btn {\n  background-color: #3363cc;\n  border: none;\n  color: white;\n  padding: 7px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin: 4px 2px;\n  cursor: pointer;\n  outline: none;\n}\n\n.btn {\n  border-radius: 6px;\n}\n.btn:active {\n  box-shadow: 0 1px 0 #3363cc;\n}\n.btn.btn-register {\n  padding: 11px;\n}\n.btn.btn-update {\n  background-color: #3c9c3c;\n  padding: 11px;\n}\n\n.app-list {\n  list-style-type: none;\n  padding: inherit;\n}\n\n.app-name-link {\n  text-decoration: none;\n  cursor: pointer;\n  font-weight: bold;\n}\n\ninput {\n  display: flexbox;\n  margin: 10px 0;\n  padding: 10px;\n}\n\n.type-1 {\n  border-radius: 10px;\n  border: 1px solid #eee;\n  transition: 0.3s border-color;\n}\n.type-1:hover {\n  border: 1px solid #aaa;\n}\n\n.type-2 {\n  background-color: #fafafa;\n  border: 0;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);\n  transition: 0.3s box-shadow;\n}\n.type-2:hover {\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);\n}\n\n.hidden {\n  display: none !important;\n}\n\n.icon {\n  width: 24px;\n  height: 24px;\n  top: 32px;\n  right: 5px;\n  pointer-events: none;\n  z-index: 2;\n}\n.icon.icon-success {\n  fill: green;\n}\n.icon.icon-error {\n  fill: red;\n}\n\n.container {\n  max-width: 800px;\n  margin: 3rem auto;\n  padding: 3rem;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  background-color: white;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n}\n\n.input {\n  appearance: none;\n  color: #2d3748;\n  border: 1px solid #cbd5e0;\n  line-height: 1.25;\n  background-color: white;\n  padding: 0.65rem 0.75rem;\n  border-radius: 0.25rem;\n  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);\n}\n.input::placeholder {\n  color: #a0aec0;\n}\n.input.input-error {\n  border: 1px solid red;\n  background-image: linear-gradient(to right, pink, pink);\n}\n.input.input-error:focus {\n  border: 1px solid red;\n}\n.input:focus {\n  outline: none;\n  border: 1px solid #a0aec0;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n  background-clip: padding-box;\n}\n\n.input-group {\n  margin-bottom: 2rem;\n  position: relative;\n  display: flex;\n  align-items: stretch;\n  justify-content: center;\n}\n\n.flex-child {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  padding: 20px;\n  border: 2px solid #e4dddd;\n}\n\n.error-message {\n  font-size: 0.85rem;\n  color: red;\n  position: absolute;\n  top: 75px;\n  left: 22;\n}\n\n.badge {\n  border: 1px solid #388fe6c4;\n  color: #388fe6c4;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 12pt;\n  font-weight: bolder;\n  vertical-align: initial;\n  margin-left: 10px;\n}", "",{"version":3,"sources":["webpack://./src/css/style.scss"],"names":[],"mappings":"AAIA;EACE,8CALY;EAMZ,YALW;EAMX,eALU;AAEZ;;AAKA;EACE,yBAAA;EACA,YAAA;EACA,YAAA;EACA,YAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,eAAA;EACA,eAAA;EACA,eAAA;EACA,aAAA;AAFF;;AAIA;EACE,kBAAA;AADF;AAEE;EACE,2BAAA;AAAJ;AAEE;EACE,aAAA;AAAJ;AAEE;EACE,yBAAA;EACA,aAAA;AAAJ;;AAIA;EACE,qBAAA;EACA,gBAAA;AADF;;AAIA;EACE,qBAAA;EACA,eAAA;EACA,iBAAA;AADF;;AAIA;EACE,gBAAA;EACA,cAAA;EACA,aAAA;AADF;;AAGA;EACE,mBAAA;EACA,sBAAA;EACA,6BAAA;AAAF;AACE;EACE,sBAAA;AACJ;;AAGA;EACE,yBAAA;EACA,SAAA;EACA,sCAAA;EACA,2BAAA;AAAF;AACE;EACE,sCAAA;AACJ;;AAGA;EACE,wBAAA;AAAF;;AAGA;EACE,WAAA;EACA,YAAA;EAEA,SAAA;EACA,UAAA;EACA,oBAAA;EACA,UAAA;AADF;AAGE;EACE,WAAA;AADJ;AAIE;EACE,SAAA;AAFJ;;AAMA;EACE,gBAAA;EACA,iBAAA;EACA,aAAA;EACA,sBAAA;EACA,sBAAA;EACA,uBAAA;EACA,qFAAA;AAHF;;AAMA;EACE,gBAAA;EAGA,cAAA;EACA,yBAAA;EACA,iBAAA;EACA,uBAAA;EACA,wBAAA;EACA,sBAAA;EACA,iDAAA;AALF;AAOE;EACE,cAAA;AALJ;AAQE;EACE,qBAAA;EACA,uDAAA;AANJ;AAQI;EACE,qBAAA;AANN;AAUE;EACE,aAAA;EACA,yBAAA;EACA,2EAAA;EACA,4BAAA;AARJ;;AAmBA;EACE,mBAAA;EACA,kBAAA;EACA,aAAA;EACA,oBAAA;EACA,uBAAA;AAhBF;;AAkBA;EACE,OAAA;EACA,oBAAA;EACA,mBAAA;EACA,aAAA;EACA,yBAAA;AAfF;;AAkBA;EACE,kBAAA;EACA,UAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;AAfF;;AAkBA;EACE,2BAAA;EAEA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,eAAA;EACA,mBAAA;EACA,uBAAA;EACA,iBAAA;AAhBF","sourcesContent":["$font-family: \"Courier New\", Courier, monospace;\r\n$text-color: black;\r\n$font-size: 12pt;\r\n\r\n.main-font {\r\n  font-family: $font-family;\r\n  color: $text-color;\r\n  font-size: $font-size;\r\n}\r\ninput.btn {\r\n  background-color: #3363cc;\r\n  border: none;\r\n  color: white;\r\n  padding: 7px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  font-size: 16px;\r\n  margin: 4px 2px;\r\n  cursor: pointer;\r\n  outline: none;\r\n}\r\n.btn {\r\n  border-radius: 6px;\r\n  &:active {\r\n    box-shadow: 0 1px 0 #3363cc;\r\n  }\r\n  &.btn-register {\r\n    padding: 11px;\r\n  }\r\n  &.btn-update {\r\n    background-color: #3c9c3c;\r\n    padding: 11px;\r\n  }\r\n}\r\n\r\n.app-list{\r\n  list-style-type: none;\r\n  padding: inherit;\r\n}\r\n\r\n.app-name-link {\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n  font-weight: bold;\r\n}\r\n\r\ninput {\r\n  display:flexbox;\r\n  margin:10px 0;\r\n  padding:10px;\r\n}\r\n.type-1 {\r\n  border-radius:10px;\r\n  border: 1px solid #eee;\r\n  transition: .3s border-color;\r\n  &:hover {\r\n    border: 1px solid #aaa;\r\n  }\r\n}\r\n\r\n.type-2 {\r\n  background-color: #fafafa;\r\n  border:0;\r\n  box-shadow:0 0 4px rgba(0,0,0,0.3);\r\n  transition: .3s box-shadow;\r\n  &:hover {\r\n    box-shadow:0 0 4px rgba(0,0,0,0.5);\r\n  }\r\n}\r\n\r\n.hidden {\r\n  display: none !important;\r\n}\r\n\r\n.icon {\r\n  width: 24px;\r\n  height: 24px;\r\n  // position: absolute;\r\n  top: 32px; \r\n  right: 5px;\r\n  pointer-events: none;\r\n  z-index: 2;\r\n  \r\n  &.icon-success {\r\n    fill: green;\r\n  }\r\n  \r\n  &.icon-error {\r\n    fill: red;\r\n  }\r\n}\r\n\r\n.container {\r\n  max-width: 800px;\r\n  margin: 3rem auto;\r\n  padding: 3rem;\r\n  border: 1px solid #ddd;\r\n  border-radius: .25rem;\r\n  background-color: white;\r\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\r\n}\r\n\r\n.input {\r\n  appearance: none;\r\n  // display: block;\r\n  // width: 100%;\r\n  color: #2d3748;\r\n  border: 1px solid #cbd5e0;\r\n  line-height: 1.25;\r\n  background-color: white;\r\n  padding: .65rem .75rem;\r\n  border-radius: 0.25rem;\r\n  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);\r\n  \r\n  &::placeholder {\r\n    color: #a0aec0;\r\n  }\r\n  \r\n  &.input-error {\r\n    border: 1px solid red;\r\n    background-image: linear-gradient(to right, pink, pink);\r\n    \r\n    &:focus {\r\n      border: 1px solid red;\r\n    }\r\n  }\r\n  \r\n  &:focus {\r\n    outline: none;\r\n    border: 1px solid #a0aec0;\r\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\r\n    background-clip: padding-box;\r\n  }\r\n  // &:invalid:required {\r\n  //   background-image: linear-gradient(to right, pink, lightgreen);\r\n  // }\r\n  \r\n  // &:valid {\r\n  //   border: 2px solid black;\r\n  // }\r\n}\r\n\r\n.input-group {\r\n  margin-bottom: 2rem;\r\n  position: relative;\r\n  display: flex;\r\n  align-items:stretch;\r\n  justify-content: center;\r\n}\r\n.flex-child{\r\n  flex: 1;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  padding: 20px;\r\n  border: 2px solid #e4dddd;\r\n}\r\n\r\n.error-message {\r\n  font-size: .85rem;\r\n  color: red;\r\n  position: absolute;\r\n  top: 75px;\r\n  left: 22;\r\n}\r\n\r\n.badge {\r\n  border: 1px solid #388fe6c4;\r\n  // background-color: initial;\r\n  color: #388fe6c4;\r\n  padding: 2px 6px;\r\n  border-radius: 4px;\r\n  font-size: 12pt;\r\n  font-weight: bolder;\r\n  vertical-align: initial;\r\n  margin-left: 10px;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/animation.scss":
/*!********************************!*\
  !*** ./src/css/animation.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_animation_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./animation.scss */ "./node_modules/cache-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/animation.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_cache_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_animation_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_cache_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_animation_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/css/style.scss":
/*!****************************!*\
  !*** ./src/css/style.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/cache-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_cache_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_cache_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/


__webpack_require__(/*! ./css/animation.scss */ "./src/css/animation.scss");

__webpack_require__(/*! ./css/style.scss */ "./src/css/style.scss");

var _service = __webpack_require__(/*! ./service */ "./src/service.js");

var _utilFunctions = __webpack_require__(/*! ./util/util-functions */ "./src/util/util-functions.js");

var _formValidator = __webpack_require__(/*! ./util/form-validator */ "./src/util/form-validator.js");

var _formValidator2 = _interopRequireDefault(_formValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;(function (global) {
  "use strict";

  var apps = document.getElementById("app-list");
  var syncAllBtn = document.getElementById("sync-all");
  var appNameInput = document.getElementById("app-name");
  var selectedAppBadge = document.getElementById("selected-app");
  var isUpdate = false;

  var formBtn = document.getElementById("form-btn");

  var form = document.querySelector(".form");
  var fields = ["app-name"];

  var formValidator = new _formValidator2.default(form, fields);
  formValidator.initialize();

  console.log("Apps => ", (0, _service.getAppList)());

  (0, _service.getSelectedApp)(); // initializing the getter

  function initialize() {

    _service.appList.forEach(function (app, i) {
      logger('Element' + i + ' ' + app.id);

      createListItem(app);
    });
  }

  initialize();

  function createListItem(app) {
    var item = document.createElement("li"); // app-list li
    item.id = 'li-' + app.id;

    var link = document.createElement("a");
    link.id = 'link-' + app.id;
    link.href = "#";
    link.className = "app-name-link";

    link.appendChild(document.createTextNode('' + app.name));

    link.onclick = function () {
      return editAppName(app);
    };

    item.appendChild(link); // app-list li text
    item.appendChild(document.createTextNode(' >>> '));

    // Get Info button
    var btnProps = {
      id: 'button-' + app.id,
      type: 'button',
      value: 'Get Info',
      className: 'btn'
    };

    var btn = constructBtn(btnProps);

    // Appending Get Info button into app-list
    item.appendChild(btn);

    getInfoBtn(item, app, btn);

    apps.prepend(item);
  }

  function constructBtn(btnProps) {
    var button = document.createElement('input');
    for (var property in btnProps) {
      button[property] = btnProps[property];
    }
    return button;
  }

  function getInfoBtn(destionation, app, btn) {
    btn.onclick = function () {
      fetchAppInfo(destionation, app);
    };
  }

  function fetchAppInfo(destination, app) {
    var span = document.createElement("span"); // app-list info span
    span.id = 'span-00' + app.id;

    destination.appendChild(span); // Adding app-list info span into app-list

    document.getElementById(span.id).innerHTML = ' Loading... ';
    setTimeout(function () {
      document.getElementById(span.id).innerHTML = ' >>> ' + app.id;
    }, 500);
  }

  syncAllBtn.onclick = function () {
    syncAll();
  };

  function syncAll() {
    _service.appList.forEach(function (app) {
      var destinationId = 'li-' + app.id;
      var destination = document.getElementById(destinationId);
      fetchAppInfo(destination, app);
    });
  }

  function editAppName(app) {
    // let app = appList.find(app => app.id === appId);

    (0, _service.setSelectedApp)(app);

    selectedAppBadgeSwitch(_service.selectedApp.name, true);

    appNameInput.value = _service.selectedApp.name;

    appNameInput.dispatchEvent(new Event('change', { 'bubbles': true }));

    isUpdate = true;

    formBtnSwitch(isUpdate);

    return false;
  }

  function selectedAppBadgeSwitch(appName, toggle) {
    if (toggle) {
      selectedAppBadge.innerText = '' + appName;
      selectedAppBadge.classList.remove('hidden');
    } else {
      selectedAppBadge.innerText = "";
      selectedAppBadge.classList.add('hidden');
    }
  }

  function formBtnSwitch(isUpdate) {
    if (isUpdate) {
      formBtn.value = "Update App";
      formBtn.classList.add("btn-update");
      formBtn.classList.remove("btn-register");
    } else {
      formBtn.value = "Register App";
      formBtn.classList.add("btn-register");
      formBtn.classList.remove("btn-update");
    }
  }

  formBtn.onclick = function (e) {
    if (isUpdate) {

      if (appNameInput.value) {
        var appExists = _service.appList.some(function (app) {
          return app.name === appNameInput.value && app.id !== _service.selectedApp.id;
        });

        if (!isAppNameValid(appNameInput.value)) return;

        if (!appExists) {
          (0, _service.updateAppName)(_service.selectedApp.id, appNameInput.value);

          apps.innerHTML = "";

          initialize();

          isUpdate = false;

          selectedAppBadgeSwitch(null, false);

          appNameInput.value = "";

          formBtnSwitch(isUpdate);
        } else {
          textAlert('Oops looks like the ' + appNameInput.value + ' already exists!!!');
        }
      }
    } else {
      if (appNameInput.value) {
        registerApp(appNameInput.value);
      }
    }
  };

  function registerApp(appName) {
    console.log('Registering App => ' + appName);

    var appExists = _service.appList.some(function (app) {
      return app.name === appName;
    });

    if (!isAppNameValid(appName)) return;

    if (!appExists) {
      var app = {
        name: appName,
        id: (0, _utilFunctions.uuidv4)()
      };
      (0, _service.appRegisterService)(app);
      createListItem(app);
      appNameInput.value = "";
      appNameInput.dispatchEvent(new Event('change', { 'bubbles': true }));
    } else {
      textAlert('Oops looks like the ' + appName + ' already exists!!!');
    }
  }

  function isAppNameValid(appName) {
    var regexp = /^(?!.*\d-\d)[A-Za-z0-9]+(-[A-Za-z0-9]+)?$/;

    var isValid = appName.search(regexp) !== -1;

    if (!isValid) {
      textAlert("not valid name");
      return false;
    }

    return true;
  }

  function logger(log) {
    console.log('' + log);
  }
  function textAlert(message) {
    alert('' + message);
  }
})(window);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96eC1hcHAvLi9zcmMvc2VydmljZS5qcyIsIndlYnBhY2s6Ly96eC1hcHAvLi9zcmMvc3RhdGljcy9kYXRhLmpzIiwid2VicGFjazovL3p4LWFwcC8uL3NyYy91dGlsL2Zvcm0tdmFsaWRhdG9yLmpzIiwid2VicGFjazovL3p4LWFwcC8uL3NyYy91dGlsL3V0aWwtZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3p4LWFwcC8uL3NyYy9jc3MvYW5pbWF0aW9uLnNjc3MiLCJ3ZWJwYWNrOi8vengtYXBwLy4vc3JjL2Nzcy9zdHlsZS5zY3NzIiwid2VicGFjazovL3p4LWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vengtYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vengtYXBwLy4vc3JjL2Nzcy9hbmltYXRpb24uc2Nzcz83MTkzIiwid2VicGFjazovL3p4LWFwcC8uL3NyYy9jc3Mvc3R5bGUuc2Nzcz8wZjQ0Iiwid2VicGFjazovL3p4LWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly96eC1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vengtYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3p4LWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vengtYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vengtYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vengtYXBwLy4vc3JjL2FwcC5qcyJdLCJuYW1lcyI6WyJhcHBMaXN0Iiwic2VsZWN0ZWRBcHAiLCJhcHBSZWdpc3RlclNlcnZpY2UiLCJuZXdBcHAiLCJwdXNoIiwidXBkYXRlQXBwTmFtZSIsImFwcElkIiwibmV3TmFtZSIsIl9hcHAiLCJmaW5kIiwiYXBwIiwiaWQiLCJuYW1lIiwiZ2V0QXBwTGlzdCIsImRhdGEiLCJnZXRTZWxlY3RlZEFwcCIsInBhcmFtcyIsInNldFNlbGVjdGVkQXBwIiwiRm9ybVZhbGlkYXRvciIsImZvcm0iLCJmaWVsZHMiLCJ2YWxpZGF0ZU9uU3VibWl0IiwidmFsaWRhdGVPbkVudHJ5Iiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZm9yRWFjaCIsImlucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZmllbGQiLCJ2YWxpZGF0ZUZpZWxkcyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJlcnJvckljb24iLCJwYXJlbnRFbGVtZW50IiwiZXJyb3JNZXNzYWdlIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJUZXh0IiwicmVtb3ZlIiwidmFsdWUiLCJ0cmltIiwic2V0U3RhdHVzIiwidXVpZHY0IiwicmVwbGFjZSIsImMiLCJjcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJVaW50OEFycmF5IiwidG9TdHJpbmciLCJnbG9iYWwiLCJhcHBzIiwiZ2V0RWxlbWVudEJ5SWQiLCJzeW5jQWxsQnRuIiwiYXBwTmFtZUlucHV0Iiwic2VsZWN0ZWRBcHBCYWRnZSIsImlzVXBkYXRlIiwiZm9ybUJ0biIsImZvcm1WYWxpZGF0b3IiLCJpbml0aWFsaXplIiwiY29uc29sZSIsImxvZyIsImkiLCJsb2dnZXIiLCJjcmVhdGVMaXN0SXRlbSIsIml0ZW0iLCJjcmVhdGVFbGVtZW50IiwibGluayIsImhyZWYiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwib25jbGljayIsImVkaXRBcHBOYW1lIiwiYnRuUHJvcHMiLCJ0eXBlIiwiYnRuIiwiY29uc3RydWN0QnRuIiwiZ2V0SW5mb0J0biIsInByZXBlbmQiLCJidXR0b24iLCJwcm9wZXJ0eSIsImRlc3Rpb25hdGlvbiIsImZldGNoQXBwSW5mbyIsImRlc3RpbmF0aW9uIiwic3BhbiIsImlubmVySFRNTCIsInNldFRpbWVvdXQiLCJzeW5jQWxsIiwiZGVzdGluYXRpb25JZCIsInNlbGVjdGVkQXBwQmFkZ2VTd2l0Y2giLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJmb3JtQnRuU3dpdGNoIiwiYXBwTmFtZSIsInRvZ2dsZSIsImUiLCJhcHBFeGlzdHMiLCJzb21lIiwiaXNBcHBOYW1lVmFsaWQiLCJ0ZXh0QWxlcnQiLCJyZWdpc3RlckFwcCIsInJlZ2V4cCIsImlzVmFsaWQiLCJzZWFyY2giLCJhbGVydCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFDQTs7QUFFQSxJQUFJQSxVQUFVLEVBQWQ7QUFDQSxJQUFJQyxjQUFjLElBQWxCOztBQUVBLFNBQVNDLGtCQUFULENBQTRCQyxNQUE1QixFQUFvQztBQUNsQ0gsVUFBUUksSUFBUixDQUFhRCxNQUFiO0FBQ0Q7O0FBRUQsU0FBU0UsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLE9BQTlCLEVBQXVDOztBQUVyQyxNQUFJQyxPQUFPUixRQUFRUyxJQUFSLENBQWE7QUFBQSxXQUFPQyxJQUFJQyxFQUFKLEtBQVdMLEtBQWxCO0FBQUEsR0FBYixDQUFYOztBQUVBLE1BQUdFLElBQUgsRUFBU1IsUUFBUVMsSUFBUixDQUFhO0FBQUEsV0FBT0MsSUFBSUMsRUFBSixLQUFXTCxLQUFsQjtBQUFBLEdBQWIsRUFBc0NNLElBQXRDLEdBQTZDTCxPQUE3QztBQUNWOztBQUdELFNBQVNNLFVBQVQsR0FBc0I7QUFDcEIsMkRBQWNDLGNBQWQ7QUFDQSxTQUFPZCxPQUFQO0FBQ0Q7O0FBRUQsU0FBU2UsY0FBVCxDQUF3QkMsTUFBeEIsRUFBZ0M7QUFDOUIsU0FBT2YsV0FBUDtB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LEVBQXFCO0FBQ25CRCxZQUFRQyxHQUFSLE1BQWVBLEdBQWY7QUFDRDtBQUNELFdBQVN1QyxTQUFULENBQW1CckUsT0FBbkIsRUFBNEI7QUFDMUIwRSxlQUFTMUUsT0FBVDtBQUNEO0FBQ0YsQ0EvTkEsRUErTkUyRSxNQS9ORixFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV1aWR2NCB9IGZyb20gXCIuL3V0aWwvdXRpbC1mdW5jdGlvbnNcIjtcclxuaW1wb3J0IGRhdGEgZnJvbSBcIi4vc3RhdGljcy9kYXRhXCI7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxubGV0IGFwcExpc3QgPSBbXTtcclxubGV0IHNlbGVjdGVkQXBwID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIGFwcFJlZ2lzdGVyU2VydmljZShuZXdBcHApIHtcclxuICBhcHBMaXN0LnB1c2gobmV3QXBwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQXBwTmFtZShhcHBJZCwgbmV3TmFtZSkge1xyXG5cclxuICBsZXQgX2FwcCA9IGFwcExpc3QuZmluZChhcHAgPT4gYXBwLmlkID09PSBhcHBJZCk7XHJcblxyXG4gIGlmKF9hcHApIGFwcExpc3QuZmluZChhcHAgPT4gYXBwLmlkID09PSBhcHBJZCkubmFtZSA9IG5ld05hbWU7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRBcHBMaXN0KCkge1xyXG4gIGFwcExpc3QgPSBbLi4uZGF0YV07XHJcbiAgcmV0dXJuIGFwcExpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlbGVjdGVkQXBwKHBhcmFtcykge1xyXG4gIHJldHVybiBzZWxlY3RlZEFwcDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U2VsZWN0ZWRBcHAoYXBwKSB7XHJcbiAgc2VsZWN0ZWRBcHAgPSBhcHA7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGFwcExpc3QsIFxyXG4gICAgICAgICBzZWxlY3RlZEFwcCwgXHJcbiAgICAgICAgIGFwcFJlZ2lzdGVyU2VydmljZSxcclxuICAgICAgICAgZ2V0QXBwTGlzdCwgXHJcbiAgICAgICAgIGdldFNlbGVjdGVkQXBwLFxyXG4gICAgICAgICBzZXRTZWxlY3RlZEFwcCxcclxuICAgICAgICAgdXBkYXRlQXBwTmFtZVxyXG4gICAgICAgIH1cclxuIiwiY29uc3QgZGF0YSA9IFtcclxuICB7IFxyXG4gICAgbmFtZTogXCIwMDAxLWFwcFwiLFxyXG4gICAgaWQ6IFwiOWViMmZkM2MtODA5Yi00ZTA0LTlhZDQtNTY1NzRjZmRiNTQ1XCIgLy91dWlkdjQoKVxyXG4gIH0sXHJcbiAgeyBcclxuICAgIG5hbWU6IFwiMDAwMi1hcHBcIixcclxuICAgIGlkOiBcIjRlOWVmOTVlLWExYmItNDA0OS05MGUwLTMyZDVlNDhiMjRjOVwiIC8vdXVpZHY0KClcclxuICB9LFxyXG4gIHsgXHJcbiAgICBuYW1lOiBcIjAwMDMtYXBwXCIsXHJcbiAgICBpZDogXCJjNTU5OWM0Mi01N2ZlLTQwNDUtODdjYS00Njk2ZGU5OTAwYzlcIiAvL3V1aWR2NCgpXHJcbiAgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGE7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5jbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoZm9ybSwgZmllbGRzKSB7XHJcbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xyXG4gICAgdGhpcy5maWVsZHMgPSBmaWVsZHM7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy52YWxpZGF0ZU9uU3VibWl0KCk7XHJcbiAgICB0aGlzLnZhbGlkYXRlT25FbnRyeSgpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGVPblN1Ym1pdCgpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBzZWxmLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2ZpZWxkfWApO1xyXG4gICAgICAgIHNlbGYudmFsaWRhdGVGaWVsZHMoaW5wdXQpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlT25FbnRyeSgpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtmaWVsZH1gKTtcclxuXHJcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgIHNlbGYudmFsaWRhdGVGaWVsZHMoaW5wdXQpO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZXZlbnQgPT4ge1xyXG4gICAgICAgIHNlbGYudmFsaWRhdGVGaWVsZHMoaW5wdXQpO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0U3RhdHVzKGZpZWxkLCBtZXNzYWdlLCBzdGF0dXMpe1xyXG4gICAgY29uc3QgZXJyb3JJY29uID0gZmllbGQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbi1lcnJvcicpO1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlICA9IGZpZWxkLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yLW1lc3NhZ2UnKTtcclxuICAgIFxyXG4gICAgaWYgKHN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgaWYgKGVycm9ySWNvbikgeyBlcnJvckljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7IH1cclxuICAgICAgaWYgKGVycm9yTWVzc2FnZSkgeyBlcnJvck1lc3NhZ2UuaW5uZXJUZXh0ID0gXCJcIjsgfVxyXG4gICAgICBmaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC1lcnJvcicpO1xyXG4gICAgfSBcclxuICAgIFxyXG4gICAgaWYgKHN0YXR1cyA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgIGZpZWxkLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yLW1lc3NhZ2UnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdpbnB1dC1lcnJvcicpO1xyXG4gICAgfSAgICBcclxuICB9XHJcblxyXG5cclxuICB2YWxpZGF0ZUZpZWxkcyhmaWVsZCkge1xyXG5cclxuICAgIGlmIChmaWVsZC52YWx1ZS50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdHVzKGZpZWxkLCBgY2Fubm90IGJlIGJsYW5rYCwgJ2Vycm9yJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFN0YXR1cyhmaWVsZCwgbnVsbCwgJ3N1Y2Nlc3MnKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjsiLCJcInVzZSBzdHJpY3RcIlxyXG5cclxuY29uc3QgdXVpZHY0ID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csIGMgPT5cclxuICAgIChjIF4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAxNSA+PiBjIC8gNCkudG9TdHJpbmcoMTYpXHJcbiAgKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyB1dWlkdjQgfTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5yaXBwbGUge1xcbiAgYW5pbWF0aW9uOiByaXBwbGUgM3MgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4ucmlwcGxlOjpiZWZvcmUsXFxuLnJpcHBsZTo6YWZ0ZXIge1xcbiAgYW5pbWF0aW9uLWRlbGF5OiAxcztcXG59XFxuXFxuQGtleWZyYW1lcyByaXBwbGUge1xcbiAgMCUge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMCAwLjFyZW0gcmdiYSgzNiwgMTcyLCAyMzUsIDAuMik7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMC43cmVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9jc3MvYW5pbWF0aW9uLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxvQ0FBQTtBQUNGOztBQUNBOztFQUVFLG1CQUFBO0FBRUY7O0FBQUE7RUFDRTtJQUNFLGdEQUFBO0VBR0Y7RUFEQTtJQUNFLCtDQUFBO0VBR0Y7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucmlwcGxlIHtcXHJcXG4gIGFuaW1hdGlvbjogcmlwcGxlIDNzIGxpbmVhciBpbmZpbml0ZTtcXHJcXG59XFxyXFxuLnJpcHBsZTo6YmVmb3JlLFxcclxcbi5yaXBwbGU6OmFmdGVyIHtcXHJcXG4gIGFuaW1hdGlvbi1kZWxheToxcztcXHJcXG59XFxyXFxuQGtleWZyYW1lcyByaXBwbGUge1xcclxcbiAgMCUge1xcclxcbiAgICBib3gtc2hhZG93OiAwIDAgMCAuMXJlbSByZ2JhKDM2LCAxNzIsIDIzNSwgMC4yKTtcXHJcXG4gIH1cXHJcXG4gIDEwMCUge1xcclxcbiAgICBib3gtc2hhZG93OiAwIDAgMCAuN3JlbSByZ2JhKDI1NSwyNTUsMjU1LCAwKTtcXHJcXG4gIH1cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLm1haW4tZm9udCB7XFxuICBmb250LWZhbWlseTogXFxcIkNvdXJpZXIgTmV3XFxcIiwgQ291cmllciwgbW9ub3NwYWNlO1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgZm9udC1zaXplOiAxMnB0O1xcbn1cXG5cXG5pbnB1dC5idG4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzNjNjYztcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDdweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG1hcmdpbjogNHB4IDJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbi5idG4ge1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG4uYnRuOmFjdGl2ZSB7XFxuICBib3gtc2hhZG93OiAwIDFweCAwICMzMzYzY2M7XFxufVxcbi5idG4uYnRuLXJlZ2lzdGVyIHtcXG4gIHBhZGRpbmc6IDExcHg7XFxufVxcbi5idG4uYnRuLXVwZGF0ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2M5YzNjO1xcbiAgcGFkZGluZzogMTFweDtcXG59XFxuXFxuLmFwcC1saXN0IHtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG4gIHBhZGRpbmc6IGluaGVyaXQ7XFxufVxcblxcbi5hcHAtbmFtZS1saW5rIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG5pbnB1dCB7XFxuICBkaXNwbGF5OiBmbGV4Ym94O1xcbiAgbWFyZ2luOiAxMHB4IDA7XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG5cXG4udHlwZS0xIHtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xcbiAgdHJhbnNpdGlvbjogMC4zcyBib3JkZXItY29sb3I7XFxufVxcbi50eXBlLTE6aG92ZXIge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYTtcXG59XFxuXFxuLnR5cGUtMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xcbiAgYm9yZGVyOiAwO1xcbiAgYm94LXNoYWRvdzogMCAwIDRweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICB0cmFuc2l0aW9uOiAwLjNzIGJveC1zaGFkb3c7XFxufVxcbi50eXBlLTI6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogMCAwIDRweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uaWNvbiB7XFxuICB3aWR0aDogMjRweDtcXG4gIGhlaWdodDogMjRweDtcXG4gIHRvcDogMzJweDtcXG4gIHJpZ2h0OiA1cHg7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHotaW5kZXg6IDI7XFxufVxcbi5pY29uLmljb24tc3VjY2VzcyB7XFxuICBmaWxsOiBncmVlbjtcXG59XFxuLmljb24uaWNvbi1lcnJvciB7XFxuICBmaWxsOiByZWQ7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgbWF4LXdpZHRoOiA4MDBweDtcXG4gIG1hcmdpbjogM3JlbSBhdXRvO1xcbiAgcGFkZGluZzogM3JlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3gtc2hhZG93OiAwIDIwcHggMjVweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxMHB4IDEwcHggLTVweCByZ2JhKDAsIDAsIDAsIDAuMDQpO1xcbn1cXG5cXG4uaW5wdXQge1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGNvbG9yOiAjMmQzNzQ4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NiZDVlMDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjI1O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAwLjY1cmVtIDAuNzVyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAycHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjA2KTtcXG59XFxuLmlucHV0OjpwbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2EwYWVjMDtcXG59XFxuLmlucHV0LmlucHV0LWVycm9yIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcGluaywgcGluayk7XFxufVxcbi5pbnB1dC5pbnB1dC1lcnJvcjpmb2N1cyB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XFxufVxcbi5pbnB1dDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2EwYWVjMDtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjA2KTtcXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxufVxcblxcbi5pbnB1dC1ncm91cCB7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5mbGV4LWNoaWxkIHtcXG4gIGZsZXg6IDE7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgYm9yZGVyOiAycHggc29saWQgI2U0ZGRkZDtcXG59XFxuXFxuLmVycm9yLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xcbiAgY29sb3I6IHJlZDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNzVweDtcXG4gIGxlZnQ6IDIyO1xcbn1cXG5cXG4uYmFkZ2Uge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzM4OGZlNmM0O1xcbiAgY29sb3I6ICMzODhmZTZjNDtcXG4gIHBhZGRpbmc6IDJweCA2cHg7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBmb250LXNpemU6IDEycHQ7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgdmVydGljYWwtYWxpZ246IGluaXRpYWw7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2Nzcy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUlBO0VBQ0UsOENBTFk7RUFNWixZQUxXO0VBTVgsZUFMVTtBQUVaOztBQUtBO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FBRkY7O0FBSUE7RUFDRSxrQkFBQTtBQURGO0FBRUU7RUFDRSwyQkFBQTtBQUFKO0FBRUU7RUFDRSxhQUFBO0FBQUo7QUFFRTtFQUNFLHlCQUFBO0VBQ0EsYUFBQTtBQUFKOztBQUlBO0VBQ0UscUJBQUE7RUFDQSxnQkFBQTtBQURGOztBQUlBO0VBQ0UscUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7QUFERjs7QUFHQTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtBQUFGO0FBQ0U7RUFDRSxzQkFBQTtBQUNKOztBQUdBO0VBQ0UseUJBQUE7RUFDQSxTQUFBO0VBQ0Esc0NBQUE7RUFDQSwyQkFBQTtBQUFGO0FBQ0U7RUFDRSxzQ0FBQTtBQUNKOztBQUdBO0VBQ0Usd0JBQUE7QUFBRjs7QUFHQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBRUEsU0FBQTtFQUNBLFVBQUE7RUFDQSxvQkFBQTtFQUNBLFVBQUE7QUFERjtBQUdFO0VBQ0UsV0FBQTtBQURKO0FBSUU7RUFDRSxTQUFBO0FBRko7O0FBTUE7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLHFGQUFBO0FBSEY7O0FBTUE7RUFDRSxnQkFBQTtFQUdBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsdUJBQUE7RUFDQSx3QkFBQTtFQUNBLHNCQUFBO0VBQ0EsaURBQUE7QUFMRjtBQU9FO0VBQ0UsY0FBQTtBQUxKO0FBUUU7RUFDRSxxQkFBQTtFQUNBLHVEQUFBO0FBTko7QUFRSTtFQUNFLHFCQUFBO0FBTk47QUFVRTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtFQUNBLDJFQUFBO0VBQ0EsNEJBQUE7QUFSSjs7QUFtQkE7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsdUJBQUE7QUFoQkY7O0FBa0JBO0VBQ0UsT0FBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7QUFmRjs7QUFrQkE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0FBZkY7O0FBa0JBO0VBQ0UsMkJBQUE7RUFFQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0FBaEJGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiRmb250LWZhbWlseTogXFxcIkNvdXJpZXIgTmV3XFxcIiwgQ291cmllciwgbW9ub3NwYWNlO1xcclxcbiR0ZXh0LWNvbG9yOiBibGFjaztcXHJcXG4kZm9udC1zaXplOiAxMnB0O1xcclxcblxcclxcbi5tYWluLWZvbnQge1xcclxcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcXHJcXG4gIGNvbG9yOiAkdGV4dC1jb2xvcjtcXHJcXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcXHJcXG59XFxyXFxuaW5wdXQuYnRuIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzYzY2M7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxuICBwYWRkaW5nOiA3cHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBtYXJnaW46IDRweCAycHg7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbn1cXHJcXG4uYnRuIHtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXHJcXG4gICY6YWN0aXZlIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAxcHggMCAjMzM2M2NjO1xcclxcbiAgfVxcclxcbiAgJi5idG4tcmVnaXN0ZXIge1xcclxcbiAgICBwYWRkaW5nOiAxMXB4O1xcclxcbiAgfVxcclxcbiAgJi5idG4tdXBkYXRlIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNjOWMzYztcXHJcXG4gICAgcGFkZGluZzogMTFweDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmFwcC1saXN0e1xcclxcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbiAgcGFkZGluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLmFwcC1uYW1lLWxpbmsge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbmlucHV0IHtcXHJcXG4gIGRpc3BsYXk6ZmxleGJveDtcXHJcXG4gIG1hcmdpbjoxMHB4IDA7XFxyXFxuICBwYWRkaW5nOjEwcHg7XFxyXFxufVxcclxcbi50eXBlLTEge1xcclxcbiAgYm9yZGVyLXJhZGl1czoxMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcXHJcXG4gIHRyYW5zaXRpb246IC4zcyBib3JkZXItY29sb3I7XFxyXFxuICAmOmhvdmVyIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2FhYTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLnR5cGUtMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xcclxcbiAgYm9yZGVyOjA7XFxyXFxuICBib3gtc2hhZG93OjAgMCA0cHggcmdiYSgwLDAsMCwwLjMpO1xcclxcbiAgdHJhbnNpdGlvbjogLjNzIGJveC1zaGFkb3c7XFxyXFxuICAmOmhvdmVyIHtcXHJcXG4gICAgYm94LXNoYWRvdzowIDAgNHB4IHJnYmEoMCwwLDAsMC41KTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmhpZGRlbiB7XFxyXFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5pY29uIHtcXHJcXG4gIHdpZHRoOiAyNHB4O1xcclxcbiAgaGVpZ2h0OiAyNHB4O1xcclxcbiAgLy8gcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAzMnB4OyBcXHJcXG4gIHJpZ2h0OiA1cHg7XFxyXFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gIHotaW5kZXg6IDI7XFxyXFxuICBcXHJcXG4gICYuaWNvbi1zdWNjZXNzIHtcXHJcXG4gICAgZmlsbDogZ3JlZW47XFxyXFxuICB9XFxyXFxuICBcXHJcXG4gICYuaWNvbi1lcnJvciB7XFxyXFxuICAgIGZpbGw6IHJlZDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgbWFyZ2luOiAzcmVtIGF1dG87XFxyXFxuICBwYWRkaW5nOiAzcmVtO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IC4yNXJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgYm94LXNoYWRvdzogMCAyMHB4IDI1cHggLTVweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMTBweCAxMHB4IC01cHggcmdiYSgwLCAwLCAwLCAwLjA0KTtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0IHtcXHJcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxyXFxuICAvLyBkaXNwbGF5OiBibG9jaztcXHJcXG4gIC8vIHdpZHRoOiAxMDAlO1xcclxcbiAgY29sb3I6ICMyZDM3NDg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2JkNWUwO1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gIHBhZGRpbmc6IC42NXJlbSAuNzVyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xcclxcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAycHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjA2KTtcXHJcXG4gIFxcclxcbiAgJjo6cGxhY2Vob2xkZXIge1xcclxcbiAgICBjb2xvcjogI2EwYWVjMDtcXHJcXG4gIH1cXHJcXG4gIFxcclxcbiAgJi5pbnB1dC1lcnJvciB7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBwaW5rLCBwaW5rKTtcXHJcXG4gICAgXFxyXFxuICAgICY6Zm9jdXMge1xcclxcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgXFxyXFxuICAmOmZvY3VzIHtcXHJcXG4gICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2EwYWVjMDtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xcclxcbiAgfVxcclxcbiAgLy8gJjppbnZhbGlkOnJlcXVpcmVkIHtcXHJcXG4gIC8vICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBwaW5rLCBsaWdodGdyZWVuKTtcXHJcXG4gIC8vIH1cXHJcXG4gIFxcclxcbiAgLy8gJjp2YWxpZCB7XFxyXFxuICAvLyAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcclxcbiAgLy8gfVxcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQtZ3JvdXAge1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczpzdHJldGNoO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcbi5mbGV4LWNoaWxke1xcclxcbiAgZmxleDogMTtcXHJcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCAjZTRkZGRkO1xcclxcbn1cXHJcXG5cXHJcXG4uZXJyb3ItbWVzc2FnZSB7XFxyXFxuICBmb250LXNpemU6IC44NXJlbTtcXHJcXG4gIGNvbG9yOiByZWQ7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDc1cHg7XFxyXFxuICBsZWZ0OiAyMjtcXHJcXG59XFxyXFxuXFxyXFxuLmJhZGdlIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMzODhmZTZjNDtcXHJcXG4gIC8vIGJhY2tncm91bmQtY29sb3I6IGluaXRpYWw7XFxyXFxuICBjb2xvcjogIzM4OGZlNmM0O1xcclxcbiAgcGFkZGluZzogMnB4IDZweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTJwdDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogaW5pdGlhbDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pIHtcbiAgdmFyIF9pdGVtID0gX3NsaWNlZFRvQXJyYXkoaXRlbSwgNCksXG4gICAgICBjb250ZW50ID0gX2l0ZW1bMV0sXG4gICAgICBjc3NNYXBwaW5nID0gX2l0ZW1bM107XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hbmltYXRpb24uc2Nzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxudmFyIHN0eWxlc0luRG9tID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5Eb20ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5Eb21baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzSW5Eb20ucHVzaCh7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IGFkZFN0eWxlKG9iaiwgb3B0aW9ucyksXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHZhciBhdHRyaWJ1dGVzID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuXG4gIGlmICh0eXBlb2YgYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRyaWJ1dGVzLm5vbmNlID0gbm9uY2U7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmoubWVkaWEgPyBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpLmNvbmNhdChvYmouY3NzLCBcIn1cIikgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxyXG5pbXBvcnQgJy4vY3NzL2FuaW1hdGlvbi5zY3NzJztcclxuaW1wb3J0ICcuL2Nzcy9zdHlsZS5zY3NzJztcclxuaW1wb3J0IHsgYXBwUmVnaXN0ZXJTZXJ2aWNlLCBcclxuICAgICAgICAgZ2V0QXBwTGlzdCxcclxuICAgICAgICAgYXBwTGlzdCwgXHJcbiAgICAgICAgIHNlbGVjdGVkQXBwLCAgXHJcbiAgICAgICAgIGdldFNlbGVjdGVkQXBwLCBcclxuICAgICAgICAgc2V0U2VsZWN0ZWRBcHAsICAgICAgICAgXHJcbiAgICAgICAgIHVwZGF0ZUFwcE5hbWUgfSBmcm9tICcuL3NlcnZpY2UnXHJcbmltcG9ydCB7IHV1aWR2NCB9IGZyb20gJy4vdXRpbC91dGlsLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gJy4vdXRpbC9mb3JtLXZhbGlkYXRvcic7XHJcblxyXG47KGZ1bmN0aW9uKGdsb2JhbCl7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgXHJcbiAgY29uc3QgYXBwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwLWxpc3RcIik7XHJcbiAgY29uc3Qgc3luY0FsbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3luYy1hbGxcIik7XHJcbiAgY29uc3QgYXBwTmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHAtbmFtZVwiKTtcclxuICBjb25zdCBzZWxlY3RlZEFwcEJhZGdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RlZC1hcHBcIik7XHJcbiAgbGV0IGlzVXBkYXRlID0gZmFsc2U7XHJcbiAgXHJcbiAgY29uc3QgZm9ybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS1idG5cIik7XHJcblxyXG5cclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtXCIpO1xyXG4gIGNvbnN0IGZpZWxkcyA9IFtcImFwcC1uYW1lXCJdO1xyXG5cclxuICBjb25zdCBmb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoZm9ybSwgZmllbGRzKTtcclxuICBmb3JtVmFsaWRhdG9yLmluaXRpYWxpemUoKTtcclxuXHJcbiAgY29uc29sZS5sb2coXCJBcHBzID0+IFwiLCBnZXRBcHBMaXN0KCkpO1xyXG5cclxuICBnZXRTZWxlY3RlZEFwcCgpOyAvLyBpbml0aWFsaXppbmcgdGhlIGdldHRlclxyXG5cclxuICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG5cclxuICAgIGFwcExpc3QuZm9yRWFjaCgoYXBwLCBpKSA9PiB7XHJcbiAgICAgIGxvZ2dlcihgRWxlbWVudCR7aX0gJHthcHAuaWR9YCk7XHJcblxyXG4gICAgICBjcmVhdGVMaXN0SXRlbShhcHApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoKTtcclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlTGlzdEl0ZW0oYXBwKSB7XHJcbiAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTsgLy8gYXBwLWxpc3QgbGlcclxuICAgICAgaXRlbS5pZCA9IGBsaS0ke2FwcC5pZH1gXHJcblxyXG4gICAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICBsaW5rLmlkID0gYGxpbmstJHthcHAuaWR9YFxyXG4gICAgICBsaW5rLmhyZWYgPSBcIiNcIjtcclxuICAgICAgbGluay5jbGFzc05hbWUgPSBcImFwcC1uYW1lLWxpbmtcIlxyXG5cclxuICAgICAgbGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHthcHAubmFtZX1gKSk7XHJcblxyXG4gICAgICBsaW5rLm9uY2xpY2sgPSAoKSA9PiBlZGl0QXBwTmFtZShhcHApO1xyXG5cclxuICAgICAgaXRlbS5hcHBlbmRDaGlsZChsaW5rKTsgLy8gYXBwLWxpc3QgbGkgdGV4dFxyXG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAgPj4+IGApKTtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICAvLyBHZXQgSW5mbyBidXR0b25cclxuICAgICAgbGV0IGJ0blByb3BzID0ge1xyXG4gICAgICAgIGlkOiBgYnV0dG9uLSR7YXBwLmlkfWAsXHJcbiAgICAgICAgdHlwZTogJ2J1dHRvbicsXHJcbiAgICAgICAgdmFsdWU6ICdHZXQgSW5mbycsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnYnRuJ1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBidG4gPSBjb25zdHJ1Y3RCdG4oYnRuUHJvcHMpO1xyXG5cclxuICAgICAgLy8gQXBwZW5kaW5nIEdldCBJbmZvIGJ1dHRvbiBpbnRvIGFwcC1saXN0XHJcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoYnRuKSBcclxuXHJcbiAgICAgIGdldEluZm9CdG4oaXRlbSwgYXBwLCBidG4pO1xyXG5cclxuICAgICAgYXBwcy5wcmVwZW5kKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY29uc3RydWN0QnRuKGJ0blByb3BzKSB7XHJcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGZvcihjb25zdCBwcm9wZXJ0eSBpbiBidG5Qcm9wcykge1xyXG4gICAgICBidXR0b25bcHJvcGVydHldID0gYnRuUHJvcHNbcHJvcGVydHldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJ1dHRvbjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldEluZm9CdG4oZGVzdGlvbmF0aW9uLCBhcHAsIGJ0bikge1xyXG4gICAgYnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgZmV0Y2hBcHBJbmZvKGRlc3Rpb25hdGlvbiwgYXBwKVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZldGNoQXBwSW5mbyhkZXN0aW5hdGlvbiwgYXBwKSB7XHJcbiAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpOyAvLyBhcHAtbGlzdCBpbmZvIHNwYW5cclxuICAgICAgc3Bhbi5pZCA9IGBzcGFuLTAwJHthcHAuaWR9YDtcclxuICAgIFxyXG4gICAgICBkZXN0aW5hdGlvbi5hcHBlbmRDaGlsZChzcGFuKTsgLy8gQWRkaW5nIGFwcC1saXN0IGluZm8gc3BhbiBpbnRvIGFwcC1saXN0XHJcblxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGFuLmlkKS5pbm5lckhUTUwgPSAnIExvYWRpbmcuLi4gJztcclxuICAgICAgc2V0VGltZW91dCgoKT0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGFuLmlkKS5pbm5lckhUTUwgPSBgID4+PiAke2FwcC5pZH1gO1xyXG4gICAgICB9LCA1MDApXHJcbiAgfVxyXG5cclxuICBzeW5jQWxsQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBzeW5jQWxsKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzeW5jQWxsKCkge1xyXG4gICAgYXBwTGlzdC5mb3JFYWNoKGFwcCA9PiB7XHJcbiAgICAgIGxldCBkZXN0aW5hdGlvbklkID0gYGxpLSR7YXBwLmlkfWBcclxuICAgICAgbGV0IGRlc3RpbmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVzdGluYXRpb25JZClcclxuICAgICAgZmV0Y2hBcHBJbmZvKGRlc3RpbmF0aW9uLCBhcHApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGVkaXRBcHBOYW1lKGFwcCkge1xyXG4gICAgLy8gbGV0IGFwcCA9IGFwcExpc3QuZmluZChhcHAgPT4gYXBwLmlkID09PSBhcHBJZCk7XHJcblxyXG4gICAgc2V0U2VsZWN0ZWRBcHAoYXBwKTtcclxuXHJcbiAgICBzZWxlY3RlZEFwcEJhZGdlU3dpdGNoKHNlbGVjdGVkQXBwLm5hbWUsIHRydWUpO1xyXG4gICAgXHJcbiAgICBhcHBOYW1lSW5wdXQudmFsdWUgPSBzZWxlY3RlZEFwcC5uYW1lO1xyXG5cclxuICAgIGFwcE5hbWVJbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyAnYnViYmxlcyc6IHRydWUgfSkpO1xyXG5cclxuICAgIGlzVXBkYXRlID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgZm9ybUJ0blN3aXRjaChpc1VwZGF0ZSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2VsZWN0ZWRBcHBCYWRnZVN3aXRjaChhcHBOYW1lLCB0b2dnbGUpe1xyXG4gICAgaWYodG9nZ2xlKSB7XHJcbiAgICAgIHNlbGVjdGVkQXBwQmFkZ2UuaW5uZXJUZXh0ID0gYCR7YXBwTmFtZX1gO1xyXG4gICAgICBzZWxlY3RlZEFwcEJhZGdlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VsZWN0ZWRBcHBCYWRnZS5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICBzZWxlY3RlZEFwcEJhZGdlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZm9ybUJ0blN3aXRjaChpc1VwZGF0ZSkge1xyXG4gICAgaWYoaXNVcGRhdGUpe1xyXG4gICAgICBmb3JtQnRuLnZhbHVlID0gXCJVcGRhdGUgQXBwXCI7XHJcbiAgICAgIGZvcm1CdG4uY2xhc3NMaXN0LmFkZChcImJ0bi11cGRhdGVcIik7XHJcbiAgICAgIGZvcm1CdG4uY2xhc3NMaXN0LnJlbW92ZShcImJ0bi1yZWdpc3RlclwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvcm1CdG4udmFsdWUgPSBcIlJlZ2lzdGVyIEFwcFwiO1xyXG4gICAgICBmb3JtQnRuLmNsYXNzTGlzdC5hZGQoXCJidG4tcmVnaXN0ZXJcIik7ICAgICAgICAgIFxyXG4gICAgICBmb3JtQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJidG4tdXBkYXRlXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9ybUJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmKGlzVXBkYXRlKSB7XHJcblxyXG4gICAgICBpZihhcHBOYW1lSW5wdXQudmFsdWUpIHtcclxuICAgICAgICBjb25zdCBhcHBFeGlzdHMgPSBhcHBMaXN0LnNvbWUoYXBwID0+IGFwcC5uYW1lID09PSBhcHBOYW1lSW5wdXQudmFsdWUgJiYgYXBwLmlkICE9PSBzZWxlY3RlZEFwcC5pZCk7XHJcblxyXG4gICAgICAgIGlmKCFpc0FwcE5hbWVWYWxpZChhcHBOYW1lSW5wdXQudmFsdWUpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmKCFhcHBFeGlzdHMpIHtcclxuICAgICAgICAgIHVwZGF0ZUFwcE5hbWUoc2VsZWN0ZWRBcHAuaWQsIGFwcE5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgXHJcbiAgICAgICAgICBhcHBzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgICBpc1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBzZWxlY3RlZEFwcEJhZGdlU3dpdGNoKG51bGwsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICBhcHBOYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBmb3JtQnRuU3dpdGNoKGlzVXBkYXRlKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHRBbGVydChgT29wcyBsb29rcyBsaWtlIHRoZSAke2FwcE5hbWVJbnB1dC52YWx1ZX0gYWxyZWFkeSBleGlzdHMhISFgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZihhcHBOYW1lSW5wdXQudmFsdWUpIHtcclxuICAgICAgICByZWdpc3RlckFwcChhcHBOYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gcmVnaXN0ZXJBcHAoYXBwTmFtZSkge1xyXG4gICAgY29uc29sZS5sb2coYFJlZ2lzdGVyaW5nIEFwcCA9PiAke2FwcE5hbWV9YCk7XHJcbiAgICBcclxuICAgIGNvbnN0IGFwcEV4aXN0cyA9IGFwcExpc3Quc29tZShhcHAgPT4gYXBwLm5hbWUgPT09IGFwcE5hbWUpO1xyXG5cclxuICAgIGlmKCFpc0FwcE5hbWVWYWxpZChhcHBOYW1lKSkgcmV0dXJuO1xyXG5cclxuICAgIGlmKCFhcHBFeGlzdHMpIHtcclxuICAgICAgY29uc3QgYXBwID0geyBcclxuICAgICAgICBuYW1lOmFwcE5hbWUsXHJcbiAgICAgICAgaWQ6IHV1aWR2NCgpXHJcbiAgICAgIH07XHJcbiAgICAgIGFwcFJlZ2lzdGVyU2VydmljZShhcHApO1xyXG4gICAgICBjcmVhdGVMaXN0SXRlbShhcHApO1xyXG4gICAgICBhcHBOYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICBhcHBOYW1lSW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgJ2J1YmJsZXMnOiB0cnVlIH0pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHRBbGVydChgT29wcyBsb29rcyBsaWtlIHRoZSAke2FwcE5hbWV9IGFscmVhZHkgZXhpc3RzISEhYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc0FwcE5hbWVWYWxpZChhcHBOYW1lKSB7XHJcbiAgICB2YXIgcmVnZXhwID0gL14oPyEuKlxcZC1cXGQpW0EtWmEtejAtOV0rKC1bQS1aYS16MC05XSspPyQvO1xyXG5cclxuICAgIGNvbnN0IGlzVmFsaWQgPSAoYXBwTmFtZS5zZWFyY2gocmVnZXhwKSAhPT0gLTEpO1xyXG5cclxuICAgIGlmKCFpc1ZhbGlkKXtcclxuICAgICAgdGV4dEFsZXJ0KFwibm90IHZhbGlkIG5hbWVcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgXHJcblxyXG4gIGZ1bmN0aW9uIGxvZ2dlcihsb2cpIHtcclxuICAgIGNvbnNvbGUubG9nKGAke2xvZ31gKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gdGV4dEFsZXJ0KG1lc3NhZ2UpIHtcclxuICAgIGFsZXJ0KGAke21lc3NhZ2V9YCk7XHJcbiAgfVxyXG59KSh3aW5kb3cpOyJdLCJzb3VyY2VSb290IjoiIn0=