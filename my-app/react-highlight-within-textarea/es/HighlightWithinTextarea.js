function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { useState, forwardRef, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
import { createDecorator } from "./createDecorator.js";
import { Selection } from "./Selection.js";
var HighlightWithinTextareaFunc = forwardRef(function (props, fwdRef) {
  var placeholder = props.placeholder,
      highlight = props.highlight,
      onChange = props.onChange;
  var value = props.value,
      selection = props.selection;

  var _useState = useState(),
      forceUpdate = _useState[1];

  var ref = useRef({});
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
    var _contentState = ContentState.createFromText(value);

    var changeType = "change-block-data";
    editorState = EditorState.push(prevEditorState, _contentState, changeType);

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
    editorState = EditorState.createWithContent(convertFromRaw({
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
  var decorator = useMemo(function () {
    return createDecorator(contentState, highlight, value);
  }, [contentState, highlight, value]);
  editorState = EditorState.set(editorState, {
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
    selection = new Selection(nextEditorState);
    onChange(nextValue, selection);
    forceUpdate({});
  };

  return /*#__PURE__*/React.createElement(Editor, {
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
    return /*#__PURE__*/React.createElement(HighlightWithinTextareaFunc, this.props);
  };

  return HighlightWithinTextarea;
}(React.Component);

HighlightWithinTextarea.propTypes = process.env.NODE_ENV !== "production" ? {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.instanceOf(RegExp), PropTypes.object, PropTypes.func]),
  placeholder: PropTypes.string,
  selection: PropTypes.instanceOf(Selection)
} : {};
HighlightWithinTextarea.defaultProps = {
  highlight: null,
  placeholder: "Enter some text..."
};
export default HighlightWithinTextarea;