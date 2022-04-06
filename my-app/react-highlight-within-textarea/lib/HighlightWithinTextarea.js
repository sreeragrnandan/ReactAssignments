"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _draftJs = require("draft-js");

var _createDecorator = require("./createDecorator.js");

var _Selection = require("./Selection.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HighlightWithinTextareaFunc = (0, _react.forwardRef)(function (props, fwdRef) {
  var placeholder = props.placeholder,
      highlight = props.highlight,
      onChange = props.onChange;
  var value = props.value,
      selection = props.selection;

  var _useState = (0, _react.useState)(),
      forceUpdate = _useState[1];

  var ref = (0, _react.useRef)({});
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
      selection = new _Selection.Selection(editorState);
      selection.focus = Math.max(selection.anchor, selection.focus);
      selection.anchor = selection.focus;
    }
  } else if (prevEditorState) {
    // They chose a whole new value.
    var _contentState = _draftJs.ContentState.createFromText(value);

    var changeType = "change-block-data";
    editorState = _draftJs.EditorState.push(prevEditorState, _contentState, changeType);

    if (!selection) {
      var fixedValue, offset;

      if (nextEditorState) {
        selection = new _Selection.Selection(nextEditorState);
        fixedValue = value.replaceAll("\r\n", "\n");
        offset = fixedValue.length - nextValue.length;
      } else {
        selection = new _Selection.Selection(prevEditorState);
        fixedValue = value.replaceAll("\r\n", "\n");
        offset = fixedValue.length - prevValue.length;
      }

      selection.anchor += offset;
      selection.focus += offset;
    }
  } else {
    // First time in here.
    editorState = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)({
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
  var decorator = (0, _react.useMemo)(function () {
    return (0, _createDecorator.createDecorator)(contentState, highlight, value);
  }, [contentState, highlight, value]);
  editorState = _draftJs.EditorState.set(editorState, {
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
    ref.current = _extends({}, ref.current, {
      nextEditorState: nextEditorState,
      nextValue: nextValue
    });
    var selection = undefined;
    selection = new _Selection.Selection(nextEditorState);
    onChange(nextValue, selection);
    forceUpdate({});
  };

  return /*#__PURE__*/_react["default"].createElement(_draftJs.Editor, {
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

var HighlightWithinTextarea = /*#__PURE__*/function (_React$Component) {
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
    return /*#__PURE__*/_react["default"].createElement(HighlightWithinTextareaFunc, this.props);
  };

  return HighlightWithinTextarea;
}(_react["default"].Component);

HighlightWithinTextarea.propTypes = process.env.NODE_ENV !== "production" ? {
  onChange: _propTypes["default"].func,
  value: _propTypes["default"].string.isRequired,
  highlight: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array, _propTypes["default"].instanceOf(RegExp), _propTypes["default"].object, _propTypes["default"].func]),
  placeholder: _propTypes["default"].string,
  selection: _propTypes["default"].instanceOf(_Selection.Selection)
} : {};
HighlightWithinTextarea.defaultProps = {
  highlight: null,
  placeholder: "Enter some text..."
};
var _default = HighlightWithinTextarea;
exports["default"] = _default;
module.exports = exports.default;