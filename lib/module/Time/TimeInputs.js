import * as React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { clockTypes, toHourInputFormat, toHourOutputFormat } from './timeUtils';
import TimeInput from './TimeInput';
import AmPmSwitcher from './AmPmSwitcher';
import { passedTheme, useLatest } from '../utils';
import Color from 'color';
function TimeInputs(_ref) {
  let {
    hours,
    minutes,
    onFocusInput,
    focused,
    inputType,
    onChange,
    is24Hour,
    inputFontSize
  } = _ref;
  const startInput = React.useRef(null);
  const endInput = React.useRef(null);
  const dimensions = useWindowDimensions();
  const isLandscape = dimensions.width > dimensions.height;
  const onSubmitStartInput = React.useCallback(() => {
    if (endInput.current) {
      endInput.current.focus();
    }
  }, [endInput]);
  const onSubmitEndInput = React.useCallback(() => {
    // TODO: close modal and persist time
  }, []);
  const minutesRef = useLatest(minutes);
  const onChangeHours = React.useCallback(newHours => {
    onChange({
      hours: newHours,
      minutes: minutesRef.current,
      focused: clockTypes.hours
    });
  }, [onChange, minutesRef]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.inputContainer, isLandscape && styles.inputContainerLandscape]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.column
  }, /*#__PURE__*/React.createElement(TimeInput, {
    ref: startInput,
    inputFontSize: inputFontSize,
    placeholder: '00',
    value: toHourInputFormat(hours, is24Hour),
    clockType: clockTypes.hours,
    pressed: focused === clockTypes.hours,
    onPress: onFocusInput,
    inputType: inputType,
    maxFontSizeMultiplier: 1.2,
    selectionColor: passedTheme.dark ? Color(passedTheme.colors.primary).darken(0.2).hex() : passedTheme.colors.primary,
    returnKeyType: 'next',
    onSubmitEditing: onSubmitStartInput,
    blurOnSubmit: false,
    onChanged: newHoursFromInput => {
      let newHours = toHourOutputFormat(newHoursFromInput, hours, is24Hour);
      if (newHoursFromInput > 24) {
        newHours = 24;
      }
      onChange({
        hours: newHours,
        minutes
      });
    }
  }), inputType === 'keyboard' ? /*#__PURE__*/React.createElement(Text, {
    maxFontSizeMultiplier: 1.5,
    variant: "bodySmall"
  }, "Hour") : null), /*#__PURE__*/React.createElement(View, {
    style: [styles.hoursAndMinutesSeparator,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      marginBottom: inputType === 'keyboard' ? 24 : 0
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.spaceDot
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.dot, {
      backgroundColor: passedTheme !== null && passedTheme !== void 0 && passedTheme.isV3 ? passedTheme.colors.onSurface : passedTheme.colors.text
    }]
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.betweenDot
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.dot, {
      backgroundColor: passedTheme !== null && passedTheme !== void 0 && passedTheme.isV3 ? passedTheme.colors.onSurface : passedTheme.colors.text
    }]
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.spaceDot
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.column
  }, /*#__PURE__*/React.createElement(TimeInput, {
    ref: endInput,
    inputFontSize: inputFontSize,
    placeholder: '00',
    value: minutes,
    clockType: clockTypes.minutes,
    pressed: focused === clockTypes.minutes,
    onPress: onFocusInput,
    inputType: inputType,
    maxFontSizeMultiplier: 1.2,
    selectionColor: passedTheme.dark ? Color(passedTheme.colors.primary).darken(0.2).hex() : passedTheme.colors.primary,
    onSubmitEditing: onSubmitEndInput,
    onChanged: newMinutesFromInput => {
      let newMinutes = newMinutesFromInput;
      if (newMinutesFromInput > 59) {
        newMinutes = 59;
      }
      onChange({
        hours,
        minutes: newMinutes
      });
    }
  }), inputType === 'keyboard' ? /*#__PURE__*/React.createElement(Text, {
    maxFontSizeMultiplier: 1.5,
    variant: "bodySmall"
  }, "Minute") : null), !is24Hour && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.spaceBetweenInputsAndSwitcher
  }), /*#__PURE__*/React.createElement(AmPmSwitcher, {
    hours: hours,
    onChange: onChangeHours,
    inputType: inputType
  })));
}
const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
  },
  spaceBetweenInputsAndSwitcher: {
    width: 12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainerLandscape: {
    flex: 1
  },
  hoursAndMinutesSeparator: {
    fontSize: 65,
    width: 24,
    alignItems: 'center'
  },
  spaceDot: {
    flex: 1
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7 / 2
  },
  betweenDot: {
    height: 12
  }
});
export default /*#__PURE__*/React.memo(TimeInputs);
//# sourceMappingURL=TimeInputs.js.map