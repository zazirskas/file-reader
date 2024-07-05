"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _fileReader = _interopRequireDefault(require("./routes/fileReader.routes"));
var _ScanFiles = _interopRequireDefault(require("./services/ScanFiles"));
var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));
require("express-async-errors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_ScanFiles["default"].execute();
console.log('Initial application state built');
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_fileReader["default"]);
app.use(_errorHandler["default"]);
var _default = exports["default"] = app;