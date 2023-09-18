import * as React from 'react';
import Color from 'color';
import { passedTheme } from '../utils';
export const circleSize = 256;
export const hourTypes = {
  am: 'am',
  pm: 'pm'
};
export function getHourType(hours) {
  if (hours >= 0 && hours <= 12) {
    return hourTypes.am;
  }
  if (hours > 12 && hours <= 24) {
    return hourTypes.pm;
  }
  return undefined;
}
export const inputTypes = {
  keyboard: 'keyboard',
  picker: 'picker'
};
export const reverseInputTypes = {
  keyboard: 'picker',
  picker: 'keyboard'
};
export const inputTypeIcons = {
  keyboard: 'keyboard-outline',
  picker: 'clock-outline'
};
export const getTimeInputTypeIcon = (inputType, inputIconMap) => {
  return (inputIconMap === null || inputIconMap === void 0 ? void 0 : inputIconMap[reverseInputTypes[inputType]]) || (inputTypeIcons === null || inputTypeIcons === void 0 ? void 0 : inputTypeIcons[reverseInputTypes[inputType]]);
};
export const clockTypes = {
  minutes: 'minutes',
  hours: 'hours'
};

// Code inspiration and copied from: https://github.com/ShaneGH/analogue-time-picker/blob/master/../utils/angle.ts

const outerHeight = 34;
const _30 = Math.PI / 6;
const _12 = Math.PI / 30;
const _360 = Math.PI * 2;
const _90 = Math.PI / 2;

/** Snap an angle to a given step. E.g. if angle = 22° and step = 10°, round down to 20° */
export function snap(angle, step) {
  let a = angle;
  while (a < 0) a += _360;
  let diff = a % step;
  if (diff <= step / 2) {
    return angle - diff;
  }
  return angle - diff + step;
}

// detect am / pm based on offset
export function getHourTypeFromOffset(left, top, size) {
  const w = size / 2;
  const x = w - left;
  const y = size / 2 - top;
  const distance = Math.sqrt(x * x + y * y);
  const maxPm = w - outerHeight;
  return distance > maxPm ? hourTypes.am : hourTypes.pm;
}

// Calculate the minute from the hand angle
export function getMinutes(handAngle) {
  handAngle = snap(handAngle, _12);
  let minute = parseInt(((handAngle - _90) % _360 / _12).toFixed(), 10);
  while (minute < 0) minute += 60;
  while (minute >= 60) minute -= 60;
  return minute;
}

// Calculate the hour from the hand angle
export function getHours(handAngle, hourType) {
  handAngle = snap(handAngle, _30);
  let hour = parseInt(((handAngle - _90) % _360 / _30).toFixed(), 10);
  if (hour < 0) hour += 12;
  if (hour >= 12) hour -= 12;
  if (hourType === hourTypes.am) {
    if (hour <= 0) {
      hour += 12;
    } else if (hour >= 12) {
      hour -= 12;
    }
  }
  if (hourType === hourTypes.pm) {
    if (hour <= 0) {
      hour += 12;
    } else if (hour > 12) {
      hour -= 12;
    }
  }
  return hour;
}

/** Get the angle of the left/top co-ordinate from the center of the width.height box */
export function getAngle(left, top, size) {
  const x = size / 2 - left;
  const y = size / 2 - top;

  // tan O = y / x
  let angle = x ? Math.atan(y / x) : y < 0 ? -_90 : _90;
  if (x < 0) {
    // reflect along vertical axis
    angle = -angle + 2 * (_90 + angle);
  }
  return angle;
}
export function useSwitchColors(highlighted) {
  const backgroundColor = React.useMemo(() => {
    if (passedTheme.dark) {
      if (highlighted) {
        return passedTheme.isV3 ? passedTheme.colors.tertiaryContainer : Color(passedTheme.colors.primary).hex();
      }
      return passedTheme.colors.backdrop;
    }
    if (highlighted) {
      if (passedTheme.isV3) {
        return passedTheme.colors.primaryContainer;
      }
      return Color(passedTheme.colors.primary).lighten(1).hex();
    }
    return passedTheme.colors.surface;
  }, [highlighted]);
  const color = React.useMemo(() => {
    if (highlighted && !passedTheme.dark) {
      return passedTheme.isV3 ? passedTheme.colors.onSurfaceVariant : passedTheme.colors.primary;
    }
    if (highlighted && passedTheme.dark) {
      return passedTheme.isV3 ? passedTheme.colors.onTertiaryContainer : passedTheme.colors.background;
    }
    if (passedTheme.isV3) {
      return passedTheme.colors.onSurfaceVariant;
    } else {
      return passedTheme.colors.placeholder;
    }
  }, [highlighted]);
  return {
    backgroundColor,
    color
  };
}
export function useInputColors(highlighted) {
  const backgroundColor = React.useMemo(() => {
    if (passedTheme.dark) {
      if (highlighted) {
        return passedTheme.isV3 ? passedTheme.colors.primaryContainer : Color(passedTheme.colors.primary).hex();
      }
      return passedTheme.isV3 ? passedTheme.colors.surfaceVariant : Color(passedTheme.colors.surface).lighten(1.4).hex();
    }
    if (highlighted) {
      if (passedTheme.isV3) {
        return passedTheme.colors.secondaryContainer;
      }
      return Color(passedTheme.colors.primary).lighten(1).hex();
    }
    if (passedTheme.isV3) {
      return passedTheme.colors.surfaceVariant;
    }
    return Color(passedTheme.colors.surface).darken(0.1).hex();
  }, [highlighted]);
  const color = React.useMemo(() => {
    if (passedTheme.isV3) {
      if (!highlighted) {
        return passedTheme.isV3 ? passedTheme.colors.onSurface : passedTheme.colors.onBackground;
      }
      return passedTheme.isV3 ? passedTheme.colors.onPrimaryContainer : passedTheme.colors.onBackground;
    } else {
      if (highlighted && !passedTheme.dark) {
        return passedTheme.colors.primary;
      }
      return passedTheme.colors.text;
    }
  }, [highlighted]);
  return {
    backgroundColor,
    color
  };
}
export function toHourInputFormat(hours, is24Hour) {
  if (is24Hour) {
    if (hours === 24) {
      return 0;
    }
    return hours;
  }
  if (hours > 12) {
    return hours - 12;
  }
  if (hours === 0) {
    return hours + 12;
  }
  return hours;
}
export function toHourOutputFormat(newHours, previousHours, is24Hour) {
  if (is24Hour) {
    return newHours;
  }
  if (previousHours === 0 && newHours !== 0) {
    return newHours - 12 < 0 ? newHours : newHours - 12;
  }
  if (previousHours >= 12 && newHours < 12) {
    return newHours + 12;
  }
  return newHours;
}
//# sourceMappingURL=timeUtils.js.map