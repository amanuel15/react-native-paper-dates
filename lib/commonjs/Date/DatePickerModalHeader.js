"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DatePickerModalHeader;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
var _utils = require("../utils");
var _utils2 = require("../translations/utils");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DatePickerModalHeader(props) {
  const {
    disableSafeTop,
    locale,
    closeIcon = 'close'
  } = props;
  const saveLabel = props.saveLabel || (0, _utils2.getTranslation)(locale, 'save');
  const color = (0, _utils.useHeaderTextColor)();
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.animated,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      paddingTop: disableSafeTop ? 0 : insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Appbar, {
    style: styles.appbarHeader
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Appbar.Action, {
    icon: closeIcon,
    accessibilityLabel: (0, _utils2.getTranslation)(locale, 'close'),
    onPress: props.onDismiss,
    color: color,
    testID: "react-native-paper-dates-close"
  }), /*#__PURE__*/React.createElement(_reactNativePaper.Appbar.Content, {
    title: ''
  }), /*#__PURE__*/React.createElement(_reactNativePaper.Button, {
    textColor: _utils.passedTheme.isV3 ? _utils.passedTheme.colors.primary : color,
    onPress: props.onSave,
    disabled: props.saveLabelDisabled ?? false,
    uppercase: props.uppercase ?? true,
    testID: "react-native-paper-dates-save"
  }, saveLabel)));
}
const styles = _reactNative.StyleSheet.create({
  animated: {
    elevation: 4
  },
  header: {
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 12
  },
  headerContentContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  label: {
    color: '#fff',
    letterSpacing: 1,
    fontSize: 13
  },
  singleHeaderText: {
    color: '#fff',
    fontSize: 25
  },
  rangeHeaderText: {
    color: '#fff',
    fontSize: 25
  },
  headerTextFilled: {
    color: 'rgba(255,255,255,1)'
  },
  headerTextEmpty: {
    color: 'rgba(255,255,255,0.5)'
  },
  headerSeparator: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    paddingLeft: 6,
    paddingRight: 6
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: 'transparent'
  }
});
//# sourceMappingURL=DatePickerModalHeader.js.map