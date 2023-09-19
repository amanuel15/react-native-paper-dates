"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
var _color = _interopRequireDefault(require("color"));
var _timeUtils = require("./timeUtils");
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function TimeInput(_ref, ref) {
  let {
    value,
    clockType,
    pressed,
    onPress,
    onChanged,
    inputType,
    inputFontSize = 57,
    ...rest
  } = _ref;
  const [controlledValue, setControlledValue] = React.useState(`${value}`);
  const onInnerChange = text => {
    setControlledValue(text);
    if (text !== '' && text !== '0') {
      onChanged(Number(text));
    }
  };
  React.useEffect(() => {
    setControlledValue(`${value}`);
  }, [value]);
  const [inputFocused, setInputFocused] = React.useState(false);
  const highlighted = inputType === _timeUtils.inputTypes.picker ? pressed : inputFocused;
  const {
    color,
    backgroundColor
  } = (0, _timeUtils.useInputColors)(highlighted);
  let formattedValue = controlledValue;
  if (!inputFocused) {
    formattedValue = controlledValue.length === 1 ? `0${controlledValue}` : `${controlledValue}`;
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(_reactNative.TextInput, _extends({
    ref: ref,
    style: [styles.input,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      color,
      fontSize: inputFontSize,
      backgroundColor,
      borderRadius: _utils.passedTheme.roundness * 2,
      borderColor: _utils.passedTheme.isV3 && highlighted ? _utils.passedTheme.colors.onPrimaryContainer : undefined,
      borderWidth: _utils.passedTheme.isV3 && highlighted ? 2 : 0,
      height: inputType === _timeUtils.inputTypes.keyboard ? 72 : 80
    }],
    maxFontSizeMultiplier: 1.5,
    value: formattedValue,
    maxLength: 2,
    onFocus: () => setInputFocused(true),
    onBlur: () => setInputFocused(false),
    keyboardAppearance: _utils.passedTheme.dark ? 'dark' : 'default',
    keyboardType: "number-pad",
    onChangeText: onInnerChange
  }, rest)), onPress && inputType === _timeUtils.inputTypes.picker ? /*#__PURE__*/React.createElement(_reactNativePaper.TouchableRipple, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.buttonOverlay, {
      borderRadius: _utils.passedTheme.roundness
    }],
    rippleColor: _reactNative.Platform.OS !== 'ios' ? (0, _color.default)(_utils.passedTheme.colors.onSurface).fade(0.7).hex() : undefined,
    onPress: () => onPress(clockType),
    borderless: true
  }, /*#__PURE__*/React.createElement(_reactNative.View, null)) : null);
}
const styles = _reactNative.StyleSheet.create({
  root: {
    position: 'relative',
    height: 80,
    width: 96
  },
  input: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 96
  },
  buttonOverlay: {
    overflow: 'hidden'
  }
});
var _default = /*#__PURE__*/React.forwardRef(TimeInput);
exports.default = _default;
//# sourceMappingURL=TimeInput.js.map