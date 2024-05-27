"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Credova = require("./Credova");
Object.keys(_Credova).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Credova[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Credova[key];
    }
  });
});