"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _FileReaderController = _interopRequireDefault(require("../controllers/FileReaderController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var fileReaderRouter = (0, _express.Router)();
fileReaderRouter.get('/list', _FileReaderController["default"].listFiles);
fileReaderRouter.get('/scan', _FileReaderController["default"].scanFiles);
fileReaderRouter.get('/download-state', _FileReaderController["default"].downloadStateFile);
var _default = exports["default"] = fileReaderRouter;