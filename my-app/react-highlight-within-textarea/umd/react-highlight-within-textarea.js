/*!
 * react-highlight-within-textarea v2.1.4
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("draft-js"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "draft-js", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["HighlightWithinTextarea"] = factory(require("react"), require("draft-js"), require("prop-types"));
	else
		root["HighlightWithinTextarea"] = factory(root["React"], root["Draft"], root["PropTypes"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "HighlightWithinTextarea", function() { return /* reexport */ src_HighlightWithinTextarea; });
__webpack_require__.d(__webpack_exports__, "Selection", function() { return /* reexport */ Selection; });
__webpack_require__.d(__webpack_exports__, "createDecorator", function() { return /* reexport */ createDecorator_createDecorator; });

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(0);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);

// EXTERNAL MODULE: external {"root":"PropTypes","commonjs2":"prop-types","commonjs":"prop-types","amd":"prop-types"}
var external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_ = __webpack_require__(2);
var external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_);

// EXTERNAL MODULE: external {"root":"Draft","commonjs2":"draft-js","commonjs":"draft-js","amd":"draft-js"}
var external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/getType.js
// returns identifier strings that aren't necessarily "real" JavaScript types
function getType(instance) {
  var type = typeof instance;

  if (!instance) {
    return "falsey";
  } else if (Array.isArray(instance)) {
    if (instance.length === 2 && typeof instance[0] === "number" && typeof instance[1] === "number") {
      return "range";
    } else {
      return "array";
    }
  } else if (type === "object") {
    if (instance instanceof RegExp) {
      return "regexp";
    } else if (instance.hasOwnProperty("highlight")) {
      return "custom";
    }
  } else if (type === "function") {
    return "strategy";
  } else if (type === "string") {
    return type;
  }

  return "other";
}
// CONCATENATED MODULE: ./src/highlightToStrategyAndComponents.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var highlightToStrategyAndComponents_highlightToStrategyAndComponents = function highlightToStrategyAndComponents(highlight, className, component) {
  var type = getType(highlight);

  switch (type) {
    case "array":
      return arrayToDecorator(highlight, className, component);

    case "strategy":
      return strategyToDecorator(highlight, className, component);

    case "regexp":
      return regExpToDecorator(highlight, className, component);

    case "string":
      return stringToDecorator(highlight, className, component);

    case "range":
      return rangeToDecorator(highlight, className, component);

    case "custom":
      return customToDecorator(highlight);

    default:
      if (!highlight) {// do nothing for falsey values
      } else {
        console.error("unrecognized highlight type");
      }

      return [];
  }
};

function arrayToDecorator(highlight, className, component) {
  var decorators = highlight.map(function (h) {
    return highlightToStrategyAndComponents_highlightToStrategyAndComponents(h, className, component);
  });
  return Array.prototype.concat.apply([], decorators);
}

function strategyToDecorator(highlight, className, component) {
  return [{
    strategy: highlight,
    component: highlightToStrategyAndComponents_hwtComponent(className, component)
  }];
}

function regExpToDecorator(highlight, className, component) {
  var regExpStrategy = function regExpStrategy(text, callback) {
    var matchArr, start;

    while ((matchArr = highlight.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  };

  return [{
    strategy: regExpStrategy,
    component: highlightToStrategyAndComponents_hwtComponent(className, component)
  }];
}

function stringToDecorator(highlight, className, component) {
  var stringStrategy = function stringStrategy(text, callback) {
    var textLower = text.toLowerCase();
    var strLower = highlight.toLowerCase();
    var index = 0;

    while (index = textLower.indexOf(strLower, index), index !== -1) {
      callback(index, index + strLower.length);
      index += strLower.length;
    }
  };

  return [{
    strategy: stringStrategy,
    component: highlightToStrategyAndComponents_hwtComponent(className, component)
  }];
}

function rangeToDecorator(highlight, className, component) {
  var rangeStrategy = function rangeStrategy(text, callback) {
    var low = Math.max(0, highlight[0]);
    var high = Math.min(highlight[1], text.length);

    if (low < high) {
      callback(low, high);
    }
  };

  return [{
    strategy: rangeStrategy,
    component: highlightToStrategyAndComponents_hwtComponent(className, component)
  }];
}

function customToDecorator(highlight) {
  var className = highlight.className;
  var component = highlight.component;
  var hl = highlight.highlight;
  return highlightToStrategyAndComponents_highlightToStrategyAndComponents(hl, className, component);
}

var highlightToStrategyAndComponents_hwtComponent = function hwtComponent(className, Component) {
  if (Component) {
    return function (props) {
      return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(Component, _extends({
        className: className
      }, props));
    };
  } else {
    return function (props) {
      return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("mark", {
        className: className
      }, props.children);
    };
  }
};

/* harmony default export */ var src_highlightToStrategyAndComponents = (highlightToStrategyAndComponents_highlightToStrategyAndComponents);
// CONCATENATED MODULE: ./src/createDecorator.js
function createDecorator_extends() { createDecorator_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return createDecorator_extends.apply(this, arguments); }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var getMatches = function getMatches(text, strategyAndComponents) {
  // Calls each strategy to get all matches and then filters out overlaps.
  var finds = [];

  var _loop = function _loop() {
    var sc = _step.value;
    sc.strategy(text, function (start, end) {
      if (start < end && start >= 0 && end <= text.length) {
        finds.push({
          Component: sc.component,
          matchStart: start,
          matchEnd: end,
          matchText: text.slice(start, end)
        });
      }
    });
  };

  for (var _iterator = _createForOfIteratorHelperLoose(strategyAndComponents), _step; !(_step = _iterator()).done;) {
    _loop();
  }

  var maps = []; // Eliminate overlapping finds.

  loop: for (var _i = 0, _finds = finds; _i < _finds.length; _i++) {
    var find = _finds[_i];

    for (var i = find.matchStart; i < find.matchEnd; i++) {
      if (maps[i]) {
        continue loop;
      }
    }

    for (var _i2 = find.matchStart; _i2 < find.matchEnd; _i2++) {
      maps[_i2] = find;
    }
  }

  var matches = Array.from(new Set(Object.values(maps))).sort(function (a, b) {
    return a.matchStart - b.matchStart;
  });
  return matches;
};

var extractBlockData = function extractBlockData(contentState, text) {
  var blocks = contentState.getBlocksAsArray();
  var blockData = [];
  var blockEnd = 0;

  for (var _iterator2 = _createForOfIteratorHelperLoose(blocks), _step2; !(_step2 = _iterator2()).done;) {
    var block = _step2.value;
    var blockLength = block.getLength();

    if (blockLength == 0) {
      continue;
    }

    var blockText = block.getText();
    var blockStart = text.indexOf(blockText[0], blockEnd);
    blockEnd = blockStart + blockLength;
    blockData.push({
      blockStart: blockStart,
      blockEnd: blockEnd,
      blockText: text.slice(blockStart, blockEnd),
      block: block
    });
  }

  return blockData;
};

var breakSpansByBlocks = function breakSpansByBlocks(contentState, matches, text) {
  var blockData = extractBlockData(contentState, text);
  var newSpans = [];

  loop: for (var _iterator3 = _createForOfIteratorHelperLoose(matches), _step3; !(_step3 = _iterator3()).done;) {
    var match = _step3.value;

    for (var _iterator4 = _createForOfIteratorHelperLoose(blockData), _step4; !(_step4 = _iterator4()).done;) {
      var block = _step4.value;

      if (block.blockStart >= match.matchEnd) {
        continue loop;
      }

      if (block.blockEnd < match.matchStart) {
        continue;
      }

      var spanStart = Math.max(match.matchStart, block.blockStart);
      var spanEnd = Math.min(match.matchEnd, block.blockEnd);
      var spanText = text.slice(spanStart, spanEnd);
      newSpans.push(createDecorator_extends({
        text: text
      }, match, block, {
        spanStart: spanStart,
        spanEnd: spanEnd,
        spanText: spanText
      }));
    }
  }

  return newSpans;
};

var createDecorator_blockSpansToDecorators = function blockSpansToDecorators(blockSpans) {
  var decorators = [];

  var _loop2 = function _loop2() {
    var blockSpan = _step5.value;
    var block = blockSpan.block,
        spanStart = blockSpan.spanStart,
        spanEnd = blockSpan.spanEnd,
        blockStart = blockSpan.blockStart,
        Component = blockSpan.Component;

    var strategy = function strategy(contentBlock, callback, contentState) {
      if (contentBlock === block) {
        callback(spanStart - blockStart, spanEnd - blockStart);
      }
    };

    delete blockSpan.component;
    delete blockSpan.block;

    var component = function component(props) {
      return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(Component, createDecorator_extends({}, blockSpan, {
        children: props.children
      }));
    };

    decorators.push({
      strategy: strategy,
      component: component
    });
  };

  for (var _iterator5 = _createForOfIteratorHelperLoose(blockSpans), _step5; !(_step5 = _iterator5()).done;) {
    _loop2();
  }

  return decorators;
};

var createDecorator_createDecorator = function createDecorator(contentState, highlight, text) {
  text = text || contentState.getPlainText();
  var sc = src_highlightToStrategyAndComponents(highlight);
  var matches = getMatches(text, sc);
  var blockSpans = breakSpansByBlocks(contentState, matches, text);
  var decorators = createDecorator_blockSpansToDecorators(blockSpans);
  return new external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["CompositeDecorator"](decorators);
};


// CONCATENATED MODULE: ./src/Selection.js
function Selection_extends() { Selection_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Selection_extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function Selection_createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = Selection_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Selection_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Selection_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Selection_arrayLikeToArray(o, minLen); }

function Selection_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



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

  for (var _iterator = Selection_createForOfIteratorHelperLoose(blocks), _step; !(_step = _iterator()).done;) {
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

  for (var _iterator2 = Selection_createForOfIteratorHelperLoose(blocks), _step2; !(_step2 = _iterator2()).done;) {
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

  var selectionState = external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["SelectionState"].createEmpty().set("anchorKey", anchorKey).set("anchorOffset", anchorOffset).set("focusKey", focusKey).set("focusOffset", focusOffset);
  return external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["EditorState"].forceSelection(editorState, selectionState);
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
        _classPrivateFieldSet(_this, _private, Selection_extends({}, _classPrivateFieldGet(_this, _private), editorStateToTextAnchorFocus(_classPrivateFieldGet(_this, _private).editorState), {
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


// CONCATENATED MODULE: ./src/HighlightWithinTextarea.js
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function HighlightWithinTextarea_extends() { HighlightWithinTextarea_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return HighlightWithinTextarea_extends.apply(this, arguments); }







var HighlightWithinTextareaFunc = Object(external_root_React_commonjs2_react_commonjs_react_amd_react_["forwardRef"])(function (props, fwdRef) {
  var placeholder = props.placeholder,
      highlight = props.highlight,
      onChange = props.onChange;
  var value = props.value,
      selection = props.selection;

  var _useState = Object(external_root_React_commonjs2_react_commonjs_react_amd_react_["useState"])(),
      forceUpdate = _useState[1];

  var ref = Object(external_root_React_commonjs2_react_commonjs_react_amd_react_["useRef"])({});
  var editorState;
  var _ref$current = ref.current,
      prevValue = _ref$current.prevValue,
      prevEditorState = _ref$current.prevEditorState,
      nextValue = _ref$current.nextValue,
      nextEditorState = _ref$current.nextEditorState;

  if (nextValue == value) {
    // Change was accepted.
    editorState = nextEditorState;
  } else if (prevValue == value) {
    // They blocked the state change.
    editorState = prevEditorState;

    if (!selection && nextValue) {
      selection = new Selection(editorState);
      selection.focus = Math.max(selection.anchor, selection.focus);
      selection.anchor = selection.focus;
    }
  } else if (prevEditorState) {
    // They chose a whole new value.
    var _contentState = external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["ContentState"].createFromText(value);

    var changeType = "change-block-data";
    editorState = external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["EditorState"].push(prevEditorState, _contentState, changeType);

    if (!selection) {
      var fixedValue, offset;

      if (nextEditorState) {
        selection = new Selection(nextEditorState);
        fixedValue = value.replaceAll("\r\n", "\n");
        offset = fixedValue.length - nextValue.length;
      } else {
        selection = new Selection(prevEditorState);
        fixedValue = value.replaceAll("\r\n", "\n");
        offset = fixedValue.length - prevValue.length;
      }

      selection.anchor += offset;
      selection.focus += offset;
    }
  } else {
    // First time in here.
    editorState = external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["EditorState"].createWithContent(Object(external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["convertFromRaw"])({
      entityMap: {},
      blocks: [{
        text: value,
        key: 'foo',
        type: 'unstyled',
        entityRanges: []
      }]
    }));
  }

  var contentState = editorState.getCurrentContent();
  var decorator = Object(external_root_React_commonjs2_react_commonjs_react_amd_react_["useMemo"])(function () {
    return createDecorator_createDecorator(contentState, highlight, value);
  }, [contentState, highlight, value]);
  editorState = external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["EditorState"].set(editorState, {
    decorator: decorator
  });

  if (selection) {
    editorState = selection.forceSelection(editorState);
  }

  ref.current = {
    prevEditorState: editorState,
    prevValue: value
  };

  var onDraftChange = function onDraftChange(nextEditorState) {
    var nextValue = nextEditorState.getCurrentContent().getPlainText();
    ref.current = HighlightWithinTextarea_extends({}, ref.current, {
      nextEditorState: nextEditorState,
      nextValue: nextValue
    });
    var selection = undefined;
    selection = new Selection(nextEditorState);
    onChange(nextValue, selection);
    forceUpdate({});
  };

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(external_root_Draft_commonjs2_draft_js_commonjs_draft_js_amd_draft_js_["Editor"], {
    editorState: editorState,
    onChange: onDraftChange,
    placeholder: placeholder,
    ref: fwdRef
  });
});
/*
 * For some reason, exporting a FunctionComponent
 * doesn't work when importing in codepen.io, so wrap
 * it in a class component.
 */

var HighlightWithinTextarea_HighlightWithinTextarea = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(HighlightWithinTextarea, _React$Component);

  function HighlightWithinTextarea(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      date: new Date()
    };
    return _this;
  }

  var _proto = HighlightWithinTextarea.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(HighlightWithinTextareaFunc, this.props);
  };

  return HighlightWithinTextarea;
}(external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Component);

HighlightWithinTextarea_HighlightWithinTextarea.propTypes = {
  onChange: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  value: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string.isRequired,
  highlight: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.oneOfType([external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string, external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.array, external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.instanceOf(RegExp), external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.object, external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func]),
  placeholder: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
  selection: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.instanceOf(Selection)
};
HighlightWithinTextarea_HighlightWithinTextarea.defaultProps = {
  highlight: null,
  placeholder: "Enter some text..."
};
/* harmony default export */ var src_HighlightWithinTextarea = (HighlightWithinTextarea_HighlightWithinTextarea);
// CONCATENATED MODULE: ./src/index.js




/* harmony default export */ var src = __webpack_exports__["default"] = (src_HighlightWithinTextarea);

/***/ })
/******/ ])["default"];
});