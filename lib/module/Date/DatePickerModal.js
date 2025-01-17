function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View, Platform, StatusBar } from 'react-native';
import DatePickerModalContent from './DatePickerModalContent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { passedTheme, useHeaderBackgroundColor } from '../utils';
export function DatePickerModal(props) {
  const dimensions = useWindowDimensions();
  const {
    visible,
    animationType,
    disableStatusBar,
    disableStatusBarPadding,
    inputEnabled,
    presentationStyle,
    ...rest
  } = props;
  const animationTypeCalculated = animationType || Platform.select({
    web: 'none',
    default: 'slide'
  });
  const isTransparent = presentationStyle === 'pageSheet' ? false : true;
  const headerBackgroundColor = useHeaderBackgroundColor();
  const insets = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(Modal, {
    animationType: animationTypeCalculated,
    transparent: isTransparent,
    visible: visible,
    onRequestClose: rest.onDismiss,
    presentationStyle: presentationStyle || 'overFullScreen',
    supportedOrientations: supportedOrientations
    //@ts-ignore
    ,
    statusBarTranslucent: true
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: rest.onDismiss
  }, /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.modalBackground, {
      backgroundColor: passedTheme.colors.backdrop
    }]
  })), /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.modalRoot],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.modalContent, {
      backgroundColor: passedTheme.colors.surface
    }, dimensions.width > 650 ? styles.modalContentBig : null]
  }, disableStatusBarPadding ? null : /*#__PURE__*/React.createElement(View, {
    style: [{
      height: Platform.select({
        ios: StatusBar.currentHeight,
        android: StatusBar.currentHeight,
        web: insets.top
      }),
      backgroundColor: Platform.select({
        ios: passedTheme.colors.primary,
        android: passedTheme.colors.primary,
        web: headerBackgroundColor
      })
    }]
  }), /*#__PURE__*/React.createElement(DatePickerModalContent, _extends({}, rest, {
    inputEnabled: inputEnabled,
    disableSafeTop: disableStatusBar
  })))))));
}
const supportedOrientations = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
const styles = StyleSheet.create({
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
export default /*#__PURE__*/React.memo(DatePickerModal);
//# sourceMappingURL=DatePickerModal.js.map