function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import DatePickerModal from './DatePickerModal';
import { useLatest } from '../utils';
import DatePickerInputWithoutModal from './DatePickerInputWithoutModal';
function DatePickerInput(_ref, ref) {
  let {
    withModal = true,
    calendarIcon = 'calendar',
    ...rest
  } = _ref;
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onChangeRef = useLatest(rest.onChange);
  const onInnerConfirm = React.useCallback(_ref2 => {
    let {
      date
    } = _ref2;
    setVisible(false);
    onChangeRef.current(date);
  }, [setVisible, onChangeRef]);
  return /*#__PURE__*/React.createElement(DatePickerInputWithoutModal, _extends({
    ref: ref
  }, rest, {
    inputButton: withModal ? /*#__PURE__*/React.createElement(TextInput.Icon, {
      size: 24,
      icon: calendarIcon,
      disabled: rest.disabled,
      onPress: () => setVisible(true)
    }) : null
    // eslint-disable-next-line react/no-unstable-nested-components
    ,
    modal: _ref3 => {
      let {
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
      } = _ref3;
      return withModal ? /*#__PURE__*/React.createElement(DatePickerModal, {
        date: value,
        mode: "single",
        visible: visible,
        onDismiss: onDismiss,
        onConfirm: onInnerConfirm,
        locale: locale,
        dateMode: inputMode,
        validRange: validRange,
        saveLabel: saveLabel,
        saveLabelDisabled: saveLabelDisabled ?? false,
        uppercase: uppercase ?? true,
        startYear: startYear ?? 1800,
        endYear: endYear ?? 2200,
        inputEnabled: inputEnabled,
        disableStatusBarPadding: disableStatusBarPadding ?? false
      }) : null;
    }
  }));
}
export default /*#__PURE__*/React.forwardRef(DatePickerInput);
//# sourceMappingURL=DatePickerInput.js.map