"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PSQPay = void 0;
var _basisTheoryJs = require("@basis-theory/basis-theory-js");
var _constants = require("./constants");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class PSQPay {
  constructor() {
    _defineProperty(this, "_bt", void 0);
    _defineProperty(this, "_elements", void 0);
  }
  async init(apiKey, options) {
    this._bt = await new _basisTheoryJs.BasisTheory().init((Math.random() + 1).toString(36).substring(7), {
      elements: true
    });
    return this;
  }
  createElement(type, options) {
    if (!this._bt) {
      throw new Error(_constants.ELEMENTS_INIT_ERROR_MESSAGE);
    }
    return this._bt.createElement(type, options);
  }
}
exports.PSQPay = PSQPay;