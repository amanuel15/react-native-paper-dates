"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _TextInputMask = _interopRequireDefault(require("../TextInputMask"));
var _reactNativePaper = require("react-native-paper");
var _reactNative = require("react-native");
var _inputUtils = _interopRequireDefault(require("./inputUtils"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function DatePickerInputWithoutModal(_ref, ref) {
  let {
    label,
    value,
    onChange,
    style,
    locale,
    validRange,
    inputMode,
    withDateFormatInLabel = true,
    hasError,
    hideValidationErrors,
    onValidationError,
    modal,
    inputButton,
    saveLabel,
    saveLabelDisabled,
    uppercase,
    startYear,
    endYear,
    onChangeText,
    inputEnabled,
    disableStatusBarPadding,
    ...rest
  } = _ref;
  const {
    formattedValue,
    inputFormat,
    onChangeText: onDateInputChangeText,
    error
  } = (0, _inputUtils.default)({
    locale,
    value,
    validRange,
    inputMode,
    onChange,
    onValidationError
  });
  let disabled;
  if (inputEnabled !== undefined) {
    disabled = !inputEnabled;
  }
  if (rest.disabled) {
    disabled = rest.disabled;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.inputContainer
  }, /*#__PURE__*/React.createElement(_TextInputMask.default, _extends({}, rest, {
    ref: ref,
    label: getLabel({
      // TODO: support label components?
      label: label,
      inputFormat,
      withDateFormatInLabel
    }),
    value: formattedValue,
    keyboardType: rest.keyboardType ?? 'number-pad',
    mask: inputFormat,
    disabled: disabled,
    onChangeText: onDateInputChangeText,
    onChange: e => onChangeText && onChangeText(e.nativeEvent.text),
    keyboardAppearance: _utils.passedTheme.dark ? 'dark' : 'default',
    error: !!error && !hideValidationErrors || !!hasError,
    style: [styles.input, style],
    inputButton: inputButton
  }))), error && !hideValidationErrors ? /*#__PURE__*/React.createElement(_reactNativePaper.HelperText, {
    type: "error",
    visible: !!error
  }, error) : null), modal === null || modal === void 0 ? void 0 : modal({
    value,
    locale,
    inputMode,
    validRange,
    saveLabel,
    saveLabelDisabled,
    uppercase,
    startYear,
    endYear,
    inputEnabled,
    disableStatusBarPadding
  }));
}
function getLabel(_ref2) {
  let {
    withDateFormatInLabel,
    inputFormat,
    label
  } = _ref2;
  if (withDateFormatInLabel) {
    return label ? `${label} (${inputFormat})` : inputFormat;
  }
  return label || '';
}
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%'
  },
  inputContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  input: {
    flexGrow: 1,
    width: '100%'
  }
});
var _default = /*#__PURE__*/React.forwardRef(DatePickerInputWithoutModal);
exports.default = _default;
//# sourceMappingURL=DatePickerInputWithoutModal.js.map