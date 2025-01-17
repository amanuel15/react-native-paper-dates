function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Color from 'color';
import { PanResponder, StyleSheet, View } from 'react-native';
import { circleSize, clockTypes, getAngle, getHours, getHourType, getHourTypeFromOffset, getMinutes, hourTypes } from './timeUtils';
import * as React from 'react';
import { passedTheme, useLatest } from '../utils';
import AnalogClockHours from './AnalogClockHours';
import AnimatedClockSwitcher from './AnimatedClockSwitcher';
import AnalogClockMinutes from './AnalogClockMinutes';
import { DisplayModeContext } from './TimePicker';
function AnalogClock(_ref) {
  let {
    hours,
    minutes,
    focused,
    is24Hour,
    onChange
  } = _ref;
  const {
    mode
  } = React.useContext(DisplayModeContext);
  // used to make pointer shorter if hours are selected and above 12
  const shortPointer = hours >= 12 && is24Hour;
  const clockRef = React.useRef(null);
  // Hooks are nice, sometimes... :-)..
  // We need the latest values, since the onPointerMove uses a closure to the function
  const hoursRef = useLatest(hours);
  const onChangeRef = useLatest(onChange);
  const minutesRef = useLatest(minutes);
  const focusedRef = useLatest(focused);
  const is24HourRef = useLatest(is24Hour);
  const modeRef = useLatest(mode);
  const onPointerMove = React.useCallback((e, final) => {
    let x = e.nativeEvent.locationX;
    let y = e.nativeEvent.locationY;
    let angle = getAngle(x, y, circleSize);
    if (focusedRef.current === clockTypes.hours) {
      let hours24 = is24HourRef.current;
      let previousHourType = getHourType(hoursRef.current);
      let pickedHours = getHours(angle, previousHourType);
      let hours12AndPm = !hours24 && modeRef.current === 'PM';
      let hourTypeFromOffset = getHourTypeFromOffset(x, y, circleSize);
      let hours24AndPM = hours24 && hourTypeFromOffset === hourTypes.pm;

      // Avoiding the "24h"
      // Should be 12h for 12 hours and PM mode

      if (hours12AndPm || hours24AndPM) {
        pickedHours += 12;
      }
      if ((modeRef.current === 'AM' || hours24) && pickedHours === 12) {
        pickedHours = 0;
      }
      if (!hours24 && modeRef.current === 'AM' && pickedHours === 12) {
        pickedHours = 0;
      }
      if (pickedHours === 24) {
        pickedHours = 12;
      }
      if (hoursRef.current !== pickedHours || final) {
        onChangeRef.current({
          hours: pickedHours,
          minutes: minutesRef.current,
          focused: final ? clockTypes.minutes : undefined
        });
      }
    } else if (focusedRef.current === clockTypes.minutes) {
      let pickedMinutes = getMinutes(angle);
      if (minutesRef.current !== pickedMinutes) {
        onChangeRef.current({
          hours: hoursRef.current,
          minutes: pickedMinutes
        });
      }
    }
  }, [focusedRef, is24HourRef, hoursRef, onChangeRef, minutesRef, modeRef]);
  const panResponder = React.useRef(PanResponder.create({
    onPanResponderGrant: e => onPointerMove(e, false),
    onPanResponderMove: e => onPointerMove(e, false),
    onPanResponderRelease: e => onPointerMove(e, true),
    onStartShouldSetPanResponder: returnTrue,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: returnTrue,
    onMoveShouldSetPanResponderCapture: returnTrue,
    onPanResponderTerminationRequest: returnTrue,
    onShouldBlockNativeResponder: returnTrue
  })).current;
  const dynamicSize = focused === clockTypes.hours && shortPointer ? 33 : 0;
  const pointerNumber = focused === clockTypes.hours ? hours : minutes;
  const degreesPerNumber = focused === clockTypes.hours ? 30 : 6;
  return /*#__PURE__*/React.createElement(View, _extends({
    ref: clockRef
  }, panResponder.panHandlers, {
    style: [styles.clock, {
      backgroundColor: passedTheme.isV3 ? passedTheme.colors.surfaceVariant : passedTheme.dark ? Color(passedTheme.colors.surface).lighten(1.4).hex() : Color(passedTheme.colors.surface).darken(0.1).hex()
    }]
    // @ts-ignore -> https://github.com/necolas/react-native-web/issues/506
    ,
    cursor: 'pointer'
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.line, {
      backgroundColor: passedTheme.colors.primary,
      transform: [{
        rotate: -90 + pointerNumber * degreesPerNumber + 'deg'
      }, {
        translateX: circleSize / 4 - (focused === clockTypes.hours && pointerNumber >= 0 && pointerNumber < 13 ? 0 : 4) + (focused === clockTypes.minutes ? 4 : 0) - dynamicSize / 2
      }],
      width: circleSize / 2 - 4 - dynamicSize
    }],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.endPoint, {
      backgroundColor: passedTheme.colors.primary
    }]
  })), /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.center],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.middlePoint, {
      backgroundColor: passedTheme.colors.primary
    }]
  })), /*#__PURE__*/React.createElement(AnimatedClockSwitcher, {
    focused: focused,
    hours: /*#__PURE__*/React.createElement(AnalogClockHours, {
      is24Hour: is24Hour,
      hours: hours
    }),
    minutes: /*#__PURE__*/React.createElement(AnalogClockMinutes, {
      minutes: minutes
    })
  }));
}
const styles = StyleSheet.create({
  clock: {
    height: circleSize,
    width: circleSize,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: circleSize / 2
  },
  middlePoint: {
    borderRadius: 4,
    height: 8,
    width: 8
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  endPoint: {
    borderRadius: 24,
    height: 48,
    width: 48,
    position: 'absolute',
    right: 0,
    bottom: -23
  },
  line: {
    position: 'absolute',
    height: 2,
    borderRadius: 4
  }
});
function returnTrue() {
  return true;
}
export default /*#__PURE__*/React.memo(AnalogClock);
//# sourceMappingURL=AnalogClock.js.map