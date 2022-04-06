function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React from "react";
import { CompositeDecorator } from "draft-js";
import highlightToStrategyAndComponents from "./highlightToStrategyAndComponents.js";

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
      newSpans.push(_extends({
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

var blockSpansToDecorators = function blockSpansToDecorators(blockSpans) {
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
      return /*#__PURE__*/React.createElement(Component, _extends({}, blockSpan, {
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

var createDecorator = function createDecorator(contentState, highlight, text) {
  text = text || contentState.getPlainText();
  var sc = highlightToStrategyAndComponents(highlight);
  var matches = getMatches(text, sc);
  var blockSpans = breakSpansByBlocks(contentState, matches, text);
  var decorators = blockSpansToDecorators(blockSpans);
  return new CompositeDecorator(decorators);
};

export { createDecorator };