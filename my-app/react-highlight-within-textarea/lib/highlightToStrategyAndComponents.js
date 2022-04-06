"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _getType = _interopRequireDefault(require("./getType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var highlightToStrategyAndComponents = function highlightToStrategyAndComponents(highlight, className, component) {
  var type = (0, _getType["default"])(highlight);

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
    return highlightToStrategyAndComponents(h, className, component);
  });
  return Array.prototype.concat.apply([], decorators);
}

function strategyToDecorator(highlight, className, component) {
  return [{
    strategy: highlight,
    component: hwtComponent(className, component)
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
    component: hwtComponent(className, component)
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
    component: hwtComponent(className, component)
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
    component: hwtComponent(className, component)
  }];
}

function customToDecorator(highlight) {
  var className = highlight.className;
  var component = highlight.component;
  var hl = highlight.highlight;
  return highlightToStrategyAndComponents(hl, className, component);
}

var hwtComponent = function hwtComponent(className, Component) {
  if (Component) {
    return function (props) {
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({
        className: className
      }, props));
    };
  } else {
    return function (props) {
      return /*#__PURE__*/_react["default"].createElement("mark", {
        className: className
      }, props.children);
    };
  }
};

var _default = highlightToStrategyAndComponents;
exports["default"] = _default;
module.exports = exports.default;