"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AmPmSwitcher;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
var _color = _interopRequireDefault(require("color"));
var _timeUtils = require("./timeUtils");
var _TimePicker = require("./TimePicker");
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function AmPmSwitcher(_ref) {
  let {
    onChange,
    hours,
    inputType
  } = _ref;
  const {
    setMode,
    mode
  } = React.useContext(_TimePicker.DisplayModeContext);
  const backgroundColor = (0, React.useMemo)(() => {
    if (_utils.passedTheme.isV3) {
      return _utils.passedTheme.colors.outline;
    }
    return (0, _color.default)(_utils.passedTheme.dark ? (0, _color.default)(_utils.passedTheme.colors.surface).lighten(1.2).hex() : _utils.passedTheme.colors.surface).darken(0.1).hex();
  }, []);
  const isAM = mode === 'AM';
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.root,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      borderColor: backgroundColor,
      borderRadius: _utils.passedTheme.roundness * 2,
      height: inputType === _timeUtils.inputTypes.keyboard ? 72 : 80,
      marginBottom: inputType === 'keyboard' ? 24 : 0
    }]
  }, /*#__PURE__*/React.createElement(SwitchButton, {
    label: "AM",
    onPress: () => {
      setMode('AM');
      if (hours - 12 >= 0) {
        onChange(hours - 12);
      }
    },
    selected: isAM,
    disabled: isAM
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.switchSeparator, {
      backgroundColor
    }]
  }), /*#__PURE__*/React.createElement(SwitchButton, {
    label: "PM",
    onPress: () => {
      setMode('PM');
      if (hours + 12 <= 24) {
        onChange(hours + 12);
      }
    },
    selected: !isAM,
    disabled: !isAM
  }));
}
function SwitchButton(_ref2) {
  let {
    label,
    onPress,
    selected,
    disabled
  } = _ref2;
  const {
    backgroundColor,
    color
  } = (0, _timeUtils.useSwitchColors)(selected);
  let textFont = _utils.passedTheme !== null && _utils.passedTheme !== void 0 && _utils.passedTheme.isV3 ? _utils.passedTheme.fonts.titleMedium : _utils.passedTheme.fonts.medium;
  return /*#__PURE__*/React.createElement(_reactNativePaper.TouchableRipple, {
    onPress: onPress,
    style: styles.switchButton,
    accessibilityLabel: label
    // @ts-ignore old React Native versions
    ,
    accessibilityTraits: disabled ? ['button', 'disabled'] : 'button'
    // @ts-ignore old React Native versions
    ,
    accessibilityComponentType: "button",
    accessibilityRole: "button",
    accessibilityState: {
      disabled
    },
    disabled: disabled
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.switchButtonInner, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    maxFontSizeMultiplier: 1.5,
    selectable: false,
    style: [{
      ...textFont,
      color: color
    }]
  }, label)));
}
const styles = _reactNative.StyleSheet.create({
  root: {
    width: 52,
    borderWidth: 1,
    overflow: 'hidden'
  },
  switchSeparator: {
    height: 1,
    width: 52
  },
  switchButton: {
    flex: 1
  },
  switchButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=AmPmSwitcher.js.map