"use strict";

exports.__esModule = true;
exports.Selection = void 0;

var _draftJs = require("draft-js");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function editorStateToTextAnchorFocus(editorState) {
  if (!editorState) {
    return {
      anchor: 0,
      focus: 0
    };
  }

  var contentState = editorState.getCurrentContent();
  var selection = editorState.getSelection();
  var blocks = contentState.getBlocksAsArray();
  var anchorKey = selection.anchorKey;
  var anchorOffset = selection.anchorOffset;
  var focusKey = selection.focusKey;
  var focusOffset = selection.focusOffset;
  var blockStart = 0;
  var anchor = undefined;
  var focus = undefined;

  for (var _iterator = _createForOfIteratorHelperLoose(blocks), _step; !(_step = _iterator()).done;) {
    var block = _step.value;

    if (block.key == anchorKey) {
      anchor = blockStart + anchorOffset;
    }

    if (block.key == focusKey) {
      focus = blockStart + focusOffset;
    }

    if (anchor != undefined && focus != undefined) {
      break;
    }

    blockStart += block.getLength() + 1;
  }

  if (anchor == undefined || focus == undefined) {
    throw new ReferenceError("Potentially corrupt editorState.");
  }

  return {
    anchor: anchor,
    focus: focus
  };
}

function _forceSelection(editorState, anchor, focus) {
  if (!editorState) {
    throw new ReferenceError("editorState is required");
  }

  var contentState = editorState.getCurrentContent();
  var blocks = contentState.getBlocksAsArray();
  var blockStart = 0;
  var blockEnd = undefined;
  var anchorKey = undefined;
  var anchorOffset = undefined;
  var focusKey = undefined;
  var focusOffset = undefined;
  var block = undefined;

  for (var _iterator2 = _createForOfIteratorHelperLoose(blocks), _step2; !(_step2 = _iterator2()).done;) {
    block = _step2.value;
    blockEnd = blockStart + block.getLength();

    if (anchorKey == undefined && blockEnd >= anchor) {
      anchorKey = block.key;
      anchorOffset = Math.max(0, anchor - blockStart);
    }

    if (focusKey == undefined && blockEnd >= focus) {
      focusKey = block.key;
      focusOffset = Math.max(0, focus - blockStart);
    }

    if (anchorKey != undefined && focusKey != undefined) {
      break;
    }
  }

  if (anchorKey == undefined) {
    anchorKey = block.key;
    anchorOffset = block.getLength();
  }

  if (focusKey == undefined) {
    focusKey = block.key;
    focusOffset = block.getLength();
  }

  var selectionState = _draftJs.SelectionState.createEmpty().set("anchorKey", anchorKey).set("anchorOffset", anchorOffset).set("focusKey", focusKey).set("focusOffset", focusOffset);

  return _draftJs.EditorState.forceSelection(editorState, selectionState);
}

var _private = /*#__PURE__*/new WeakMap();

var Selection = /*#__PURE__*/function () {
  function Selection(editorStateOrAnchor, focus) {
    var _this = this;

    _classPrivateFieldInitSpec(this, _private, {
      writable: true,
      value: void 0
    });

    var editorState = undefined;
    var anchor = undefined;

    var initFunc = function initFunc() {
      return undefined;
    };

    if (typeof editorStateOrAnchor == "number") {
      anchor = editorStateOrAnchor;
      focus = focus == undefined ? anchor : focus;
    } else {
      editorState = editorStateOrAnchor;

      initFunc = function initFunc() {
        _classPrivateFieldSet(_this, _private, _extends({}, _classPrivateFieldGet(_this, _private), editorStateToTextAnchorFocus(_classPrivateFieldGet(_this, _private).editorState), {
          init: function init() {
            return undefined;
          }
        }));
      };
    }

    _classPrivateFieldSet(this, _private, {
      editorState: editorState,
      anchor: anchor,
      focus: focus,
      init: initFunc
    });
  }

  var _proto = Selection.prototype;

  _proto.forceSelection = function forceSelection(editorState) {
    return _forceSelection(editorState, this.anchor, this.focus);
  };

  _proto.getHasFocus = function getHasFocus() {
    var editorState = _classPrivateFieldGet(this, _private).editorState;

    return editorState && editorState.getHasFucus();
  };

  _createClass(Selection, [{
    key: "anchor",
    get: function get() {
      _classPrivateFieldGet(this, _private).init();

      return _classPrivateFieldGet(this, _private).anchor;
    },
    set: function set(value) {
      _classPrivateFieldGet(this, _private).init();

      _classPrivateFieldGet(this, _private).anchor = value;
    }
  }, {
    key: "focus",
    get: function get() {
      _classPrivateFieldGet(this, _private).init();

      return _classPrivateFieldGet(this, _private).focus;
    },
    set: function set(value) {
      _classPrivateFieldGet(this, _private).init();

      _classPrivateFieldGet(this, _private).focus = value;
    }
  }, {
    key: "start",
    get: function get() {
      return Math.min(this.anchor, this.focus);
    },
    set: function set(value) {
      throw new ReferenceError("start is read only.  use anchor instead");
    }
  }, {
    key: "end",
    get: function get() {
      return Math.max(this.anchor, this.focus);
    },
    set: function set(value) {
      throw new ReferenceError("end is read only.  use focus instead");
    }
  }]);

  return Selection;
}();

exports.Selection = Selection;