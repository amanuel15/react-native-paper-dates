import * as React from 'react';
import { Modal, StyleSheet, View, Text, Animated, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Button, IconButton, overlay } from 'react-native-paper';
import TimePicker from './TimePicker';
import { clockTypes, getTimeInputTypeIcon, inputTypes, reverseInputTypes } from './timeUtils';
import { passedTheme } from '../utils';
const supportedOrientations = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
export function TimePickerModal(_ref) {
  var _passedTheme$colors;
  let {
    visible,
    onDismiss,
    onConfirm,
    hours,
    minutes,
    label = 'Select time',
    uppercase = true,
    cancelLabel = 'Cancel',
    confirmLabel = 'Ok',
    animationType = 'none',
    locale,
    keyboardIcon = 'keyboard-outline',
    clockIcon = 'clock-outline',
    use24HourClock,
    inputFontSize,
    defaultInputType
  } = _ref;
  let textFont;
  let labelText = label;
  if (passedTheme.isV3) {
    textFont = passedTheme.fonts.labelMedium;
  } else {
    textFont = passedTheme === null || passedTheme === void 0 ? void 0 : passedTheme.fonts.medium;
  }
  const [inputType, setInputType] = React.useState(defaultInputType || inputTypes.picker);
  const [focused, setFocused] = React.useState(clockTypes.hours);
  const [localHours, setLocalHours] = React.useState(getHours(hours));
  const [localMinutes, setLocalMinutes] = React.useState(getMinutes(minutes));
  if (inputType === inputTypes.keyboard && !label) {
    labelText = 'Enter time';
  }
  React.useEffect(() => {
    setLocalHours(getHours(hours));
  }, [setLocalHours, hours]);
  React.useEffect(() => {
    setLocalMinutes(getMinutes(minutes));
  }, [setLocalMinutes, minutes]);
  const onFocusInput = React.useCallback(type => setFocused(type), []);
  const onChange = React.useCallback(params => {
    if (params.focused) {
      setFocused(params.focused);
    }
    setLocalHours(params.hours);
    setLocalMinutes(params.minutes);
  }, [setFocused, setLocalHours, setLocalMinutes]);
  return /*#__PURE__*/React.createElement(Modal, {
    animationType: animationType,
    transparent: true,
    visible: visible,
    onRequestClose: onDismiss,
    presentationStyle: "overFullScreen",
    supportedOrientations: supportedOrientations,
    statusBarTranslucent: true
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: onDismiss
  }, /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.modalBackground, {
      backgroundColor: (_passedTheme$colors = passedTheme.colors) === null || _passedTheme$colors === void 0 ? void 0 : _passedTheme$colors.backdrop
    }]
  })), /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.modalRoot],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    style: styles.keyboardView,
    behavior: 'padding'
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.modalContent, {
      backgroundColor: passedTheme.dark && passedTheme.isV3 ? passedTheme.colors.elevation.level3 : passedTheme.isV3 ? passedTheme.colors.surface : passedTheme.dark ? overlay(10, passedTheme.colors.surface) : passedTheme.colors.surface,
      borderRadius: passedTheme.isV3 ? passedTheme.roundness * 6 : passedTheme.roundness
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.labelContainer
  }, /*#__PURE__*/React.createElement(Text, {
    maxFontSizeMultiplier: 1.5,
    style: [styles.label, {
      ...textFont,
      color: passedTheme !== null && passedTheme !== void 0 && passedTheme.isV3 ? passedTheme.colors.onSurfaceVariant : passedTheme.colors.text
    }]
  }, uppercase ? labelText.toUpperCase() : labelText)), /*#__PURE__*/React.createElement(View, {
    style: styles.timePickerContainer
  }, /*#__PURE__*/React.createElement(TimePicker, {
    locale: locale,
    inputType: inputType,
    use24HourClock: use24HourClock,
    inputFontSize: inputFontSize,
    focused: focused,
    hours: localHours,
    minutes: localMinutes,
    onChange: onChange,
    onFocusInput: onFocusInput
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.bottom
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: getTimeInputTypeIcon(inputType, {
      keyboard: keyboardIcon,
      picker: clockIcon
    }),
    onPress: () => setInputType(reverseInputTypes[inputType]),
    size: 24,
    style: styles.inputTypeToggle,
    accessibilityLabel: "toggle keyboard"
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.fill
  }), /*#__PURE__*/React.createElement(Button, {
    onPress: onDismiss,
    uppercase: uppercase
  }, cancelLabel), /*#__PURE__*/React.createElement(Button, {
    onPress: () => onConfirm({
      hours: localHours,
      minutes: localMinutes
    }),
    uppercase: uppercase
  }, confirmLabel)))))));
}
function getMinutes(minutes) {
  return minutes === undefined || minutes === null ? new Date().getMinutes() : minutes;
}
function getHours(hours) {
  return hours === undefined || hours === null ? new Date().getHours() : hours;
}
const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  keyboardView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalBackground: {
    flex: 1
  },
  modalContent: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 3,
    minWidth: 287,
    paddingVertical: 8
  },
  labelContainer: {
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16
  },
  label: {
    letterSpacing: 1,
    fontSize: 13
  },
  timePickerContainer: {
    paddingLeft: 24,
    paddingTop: 20,
    paddingBottom: 16,
    paddingRight: 24
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  inputTypeToggle: {
    margin: 4
  },
  fill: {
    flex: 1
  }
});
export default /*#__PURE__*/React.memo(TimePickerModal);
//# sourceMappingURL=TimePickerModal.js.map