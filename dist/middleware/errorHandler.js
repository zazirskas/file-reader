"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AppError = _interopRequireDefault(require("../errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function errorHandler(err, _req, res, next) {
  if (err instanceof _AppError["default"]) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}
var _default = exports["default"] = errorHandler;