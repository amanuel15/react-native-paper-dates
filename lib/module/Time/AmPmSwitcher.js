import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { useMemo } from 'react';
import Color from 'color';
import { inputTypes, useSwitchColors } from './timeUtils';
import { DisplayModeContext } from './TimePicker';
import { passedTheme } from '../utils';
export default function AmPmSwitcher(_ref) {
  let {
    onChange,
    hours,
    inputType
  } = _ref;
  const {
    setMode,
    mode
  } = React.useContext(DisplayModeContext);
  const backgroundColor = useMemo(() => {
    if (passedTheme.isV3) {
      return passedTheme.colors.outline;
    }
    return Color(passedTheme.dark ? Color(passedTheme.colors.surface).lighten(1.2).hex() : passedTheme.colors.surface).darken(0.1).hex();
  }, []);
  const isAM = mode === 'AM';
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.root,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      borderColor: backgroundColor,
      borderRadius: passedTheme.roundness * 2,
      height: inputType === inputTypes.keyboard ? 72 : 80,
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
  }), /*#__PURE__*/React.createElement(View, {
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
  } = useSwitchColors(selected);
  let textFont = passedTheme !== null && passedTheme !== void 0 && passedTheme.isV3 ? passedTheme.fonts.titleMedium : passedTheme.fonts.medium;
  return /*#__PURE__*/React.createElement(TouchableRipple, {
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
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.switchButtonInner, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    maxFontSizeMultiplier: 1.5,
    selectable: false,
    style: [{
      ...textFont,
      color: color
    }]
  }, label)));
}
const styles = StyleSheet.create({
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