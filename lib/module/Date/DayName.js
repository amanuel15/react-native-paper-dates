import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { passedTheme } from '../utils';
function DayName(_ref) {
  let {
    label
  } = _ref;
  let textFont = passedTheme !== null && passedTheme !== void 0 && passedTheme.isV3 ? passedTheme.fonts.bodySmall : passedTheme.fonts.medium;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.dayName
  }, /*#__PURE__*/React.createElement(Text, {
    maxFontSizeMultiplier: 1.5,
    style: [styles.dayNameLabel, {
      ...textFont,
      color: passedTheme.colors.onSurface
    }],
    selectable: false
  }, label));
}
const styles = StyleSheet.create({
  dayName: {
    flex: 1,
    alignItems: 'center'
  },
  dayNameLabel: {
    fontSize: 14,
    opacity: 0.7
  }
});
export default /*#__PURE__*/React.memo(DayName);
//# sourceMappingURL=DayName.js.map