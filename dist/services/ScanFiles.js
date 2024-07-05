"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var fs = _interopRequireWildcard(require("fs"));
var _md5File = _interopRequireDefault(require("md5-file"));
var _StateManager = _interopRequireDefault(require("./StateManager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ScanFiles = /*#__PURE__*/function () {
  function ScanFiles() {
    _classCallCheck(this, ScanFiles);
  }
  return _createClass(ScanFiles, null, [{
    key: "execute",
    value: function execute() {
      var filesFolderPath = String(process.env.FILES_FOLDER_PATH);
      var state = _StateManager["default"].readState();
      var filesInFolderList = fs.readdirSync(filesFolderPath);
      state.forEach(function (file, index) {
        if (!filesInFolderList.includes(file.name)) {
          state[index].active = false;
        } else {
          state[index].active = true;
        }
      });
      filesInFolderList.forEach(function (fileName) {
        var fileAlreadyInState = state.find(function (fileObject) {
          return fileObject.name === fileName;
        });
        if (!fileAlreadyInState) {
          state.push({
            name: fileName,
            active: true,
            md5Hash: _md5File["default"].sync("".concat(filesFolderPath, "/").concat(fileName))
          });
        }
      });
      _StateManager["default"].buildState(state);
    }
  }]);
}();
var _default = exports["default"] = ScanFiles;