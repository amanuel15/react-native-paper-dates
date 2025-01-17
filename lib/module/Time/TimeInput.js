function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Color from 'color';
import { inputTypes, useInputColors } from './timeUtils';
import { passedTheme } from '../utils';
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
  const highlighted = inputType === inputTypes.picker ? pressed : inputFocused;
  const {
    color,
    backgroundColor
  } = useInputColors(highlighted);
  let formattedValue = controlledValue;
  if (!inputFocused) {
    formattedValue = controlledValue.length === 1 ? `0${controlledValue}` : `${controlledValue}`;
  }
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(TextInput, _extends({
    ref: ref,
    style: [styles.input,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      color,
      fontSize: inputFontSize,
      backgroundColor,
      borderRadius: passedTheme.roundness * 2,
      borderColor: passedTheme.isV3 && highlighted ? passedTheme.colors.onPrimaryContainer : undefined,
      borderWidth: passedTheme.isV3 && highlighted ? 2 : 0,
      height: inputType === inputTypes.keyboard ? 72 : 80
    }],
    maxFontSizeMultiplier: 1.5,
    value: formattedValue,
    maxLength: 2,
    onFocus: () => setInputFocused(true),
    onBlur: () => setInputFocused(false),
    keyboardAppearance: passedTheme.dark ? 'dark' : 'default',
    keyboardType: "number-pad",
    onChangeText: onInnerChange
  }, rest)), onPress && inputType === inputTypes.picker ? /*#__PURE__*/React.createElement(TouchableRipple, {
    style: [StyleSheet.absoluteFill, styles.buttonOverlay, {
      borderRadius: passedTheme.roundness
    }],
    rippleColor: Platform.OS !== 'ios' ? Color(passedTheme.colors.onSurface).fade(0.7).hex() : undefined,
    onPress: () => onPress(clockType),
    borderless: true
  }, /*#__PURE__*/React.createElement(View, null)) : null);
}
const styles = StyleSheet.create({
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
export default /*#__PURE__*/React.forwardRef(TimeInput);
//# sourceMappingURL=TimeInput.js.map