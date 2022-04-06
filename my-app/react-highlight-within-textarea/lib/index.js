"use strict";

exports.__esModule = true;
exports["default"] = exports.createDecorator = exports.Selection = void 0;

var _HighlightWithinTextarea = _interopRequireDefault(require("./HighlightWithinTextarea"));

exports.HighlightWithinTextarea = _HighlightWithinTextarea["default"];

var _Selection = require("./Selection.js");

exports.Selection = _Selection.Selection;

var _createDecorator = require("./createDecorator.js");

exports.createDecorator = _createDecorator.createDecorator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _HighlightWithinTextarea["default"];
exports["default"] = _default;