"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _fs = _interopRequireDefault(require("fs"));
var http = _interopRequireWildcard(require("http"));
var https = _interopRequireWildcard(require("https"));
require("dotenv/config");
var _app = _interopRequireDefault(require("./app"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// ##################### SERVER SETUP: BEGIN #####################
var serverOptions = {};
var certificateFilePath = 'supposedCertificateFilePath';
var privateKeyFilePath = 'supposedPrivateKeyPath';
var serverPort = process.env.SERVER_PORT;
if (_fs["default"].existsSync(privateKeyFilePath) && _fs["default"].existsSync(certificateFilePath)) {
  serverOptions.key = _fs["default"].readFileSync(privateKeyFilePath, 'utf8');
  serverOptions.cert = _fs["default"].readFileSync(certificateFilePath, 'utf8');
  https.createServer(serverOptions, _app["default"]).listen(serverPort, function () {
    console.log("Server HTTPS started on port ".concat(serverPort, "!"));
  });
} else {
  http.createServer(serverOptions, _app["default"]).listen(serverPort, function () {
    console.log("Server HTTP started on port ".concat(serverPort, "!"));
  });
}