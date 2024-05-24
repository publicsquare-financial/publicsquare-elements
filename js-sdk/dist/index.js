"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _PSQPay = require("./PSQPay");
Object.keys(_PSQPay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PSQPay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PSQPay[key];
    }
  });
});