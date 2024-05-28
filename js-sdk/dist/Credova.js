"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Credova = void 0;
var _basisTheoryJs = require("@basis-theory/basis-theory-js");
var _sdk = require("./types/sdk");
var _constants = require("./constants");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Credova {
  constructor() {
    _defineProperty(this, "_bt", void 0);
  }
  /**
   * Initialize the Credova sdk. (REQUIRED before calling `createElement`)
   * @param apiKey your Credova public key
   * @param options CredovaInitOptions see [docs](https://docs.credova.com)
   * @returns class Credova
   */
  async init(apiKey, options) {
    this._bt = await new _basisTheoryJs.BasisTheory().init((Math.random() + 1).toString(36).substring(7), {
      elements: true
    });
    return this;
  }
  _createElement(type, options) {
    if (!this._bt) {
      throw new Error(_constants.ELEMENTS_INIT_ERROR_MESSAGE);
    }
    return this._bt.createElement(type, options);
  }

  /**
   * Initialize a Credova element.
   * @param type 'card' | 'cardExpirationDate' | 'cardNumber' | 'cardVerificationCode'
   * @param options CreateCardElementOptions see [docs](https://docs.credova.com)
   * @returns created element
   */
  createElement(type, options) {
    return this._createElement(type, options);
  }
  createCardElement(options) {
    return this._createElement(_sdk.ElementTypeEnum.Card, options);
  }
  createCardExpirationDateElement(options) {
    return this._createElement(_sdk.ElementTypeEnum.CardExpirationDate, {
      ...options,
      targetId: 'elementTypesCardExpirationDateElement'
    });
  }
  createCardNumberElement(options) {
    return this._createElement(_sdk.ElementTypeEnum.CardNumber, {
      ...options,
      targetId: 'elementTypesCardNumberElement'
    });
  }
  createCardVerificationCodeElement(options) {
    return this._createElement(_sdk.ElementTypeEnum.CardVerificationCode, {
      ...options,
      targetId: 'elementTypesCardVerificationCodeElement'
    });
  }
}
exports.Credova = Credova;