"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerModal = DatePickerModal;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _DatePickerModalContent = _interopRequireDefault(require("./DatePickerModalContent"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function DatePickerModal(props) {
  const dimensions = (0, _reactNative.useWindowDimensions)();
  const {
    visible,
    animationType,
    disableStatusBar,
    disableStatusBarPadding,
    inputEnabled,
    presentationStyle,
    ...rest
  } = props;
  const animationTypeCalculated = animationType || _reactNative.Platform.select({
    web: 'none',
    default: 'slide'
  });
  const isTransparent = presentationStyle === 'pageSheet' ? false : true;
  const headerBackgroundColor = (0, _utils.useHeaderBackgroundColor)();
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(_reactNative.Modal, {
    animationType: animationTypeCalculated,
    transparent: isTransparent,
    visible: visible,
    onRequestClose: rest.onDismiss,
    presentationStyle: presentationStyle || 'overFullScreen',
    supportedOrientations: supportedOrientations
    //@ts-ignore
    ,
    statusBarTranslucent: true
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: rest.onDismiss
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.modalBackground, {
      backgroundColor: _utils.passedTheme.colors.backdrop
    }]
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.modalRoot],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.modalContent, {
      backgroundColor: _utils.passedTheme.colors.surface
    }, dimensions.width > 650 ? styles.modalContentBig : null]
  }, disableStatusBarPadding ? null : /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      height: _reactNative.Platform.select({
        ios: _reactNative.StatusBar.currentHeight,
        android: _reactNative.StatusBar.currentHeight,
        web: insets.top
      }),
      backgroundColor: _reactNative.Platform.select({
        ios: _utils.passedTheme.colors.primary,
        android: _utils.passedTheme.colors.primary,
        web: headerBackgroundColor
      })
    }]
  }), /*#__PURE__*/React.createElement(_DatePickerModalContent.default, _extends({}, rest, {
    inputEnabled: inputEnabled,
    disableSafeTop: disableStatusBar
  })))))));
}
const supportedOrientations = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
const styles = _reactNative.StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalBackground: {
    flex: 1
  },
  modalContent: {
    flex: 1,
    width: '100%'
  },
  modalContentBig: {
    maxWidth: 600,
    maxHeight: 800,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden'
  }
});
var _default = /*#__PURE__*/React.memo(DatePickerModal);
exports.default = _default;
//# sourceMappingURL=DatePickerModal.js.map