function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import TextInputWithMask from '../TextInputMask';
import { HelperText } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import useDateInput from './inputUtils';
import { passedTheme } from '../utils';
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
  } = useDateInput({
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.inputContainer
  }, /*#__PURE__*/React.createElement(TextInputWithMask, _extends({}, rest, {
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
    keyboardAppearance: passedTheme.dark ? 'dark' : 'default',
    error: !!error && !hideValidationErrors || !!hasError,
    style: [styles.input, style],
    inputButton: inputButton
  }))), error && !hideValidationErrors ? /*#__PURE__*/React.createElement(HelperText, {
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
const styles = StyleSheet.create({
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
export default /*#__PURE__*/React.forwardRef(DatePickerInputWithoutModal);
//# sourceMappingURL=DatePickerInputWithoutModal.js.map