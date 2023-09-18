"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clockTypes = exports.circleSize = void 0;
exports.getAngle = getAngle;
exports.getHourType = getHourType;
exports.getHourTypeFromOffset = getHourTypeFromOffset;
exports.getHours = getHours;
exports.getMinutes = getMinutes;
exports.reverseInputTypes = exports.inputTypes = exports.inputTypeIcons = exports.hourTypes = exports.getTimeInputTypeIcon = void 0;
exports.snap = snap;
exports.toHourInputFormat = toHourInputFormat;
exports.toHourOutputFormat = toHourOutputFormat;
exports.useInputColors = useInputColors;
exports.useSwitchColors = useSwitchColors;
var React = _interopRequireWildcard(require("react"));
var _color = _interopRequireDefault(require("color"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const circleSize = 256;
exports.circleSize = circleSize;
const hourTypes = {
  am: 'am',
  pm: 'pm'
};
exports.hourTypes = hourTypes;
function getHourType(hours) {
  if (hours >= 0 && hours <= 12) {
    return hourTypes.am;
  }
  if (hours > 12 && hours <= 24) {
    return hourTypes.pm;
  }
  return undefined;
}
const inputTypes = {
  keyboard: 'keyboard',
  picker: 'picker'
};
exports.inputTypes = inputTypes;
const reverseInputTypes = {
  keyboard: 'picker',
  picker: 'keyboard'
};
exports.reverseInputTypes = reverseInputTypes;
const inputTypeIcons = {
  keyboard: 'keyboard-outline',
  picker: 'clock-outline'
};
exports.inputTypeIcons = inputTypeIcons;
const getTimeInputTypeIcon = (inputType, inputIconMap) => {
  return (inputIconMap === null || inputIconMap === void 0 ? void 0 : inputIconMap[reverseInputTypes[inputType]]) || (inputTypeIcons === null || inputTypeIcons === void 0 ? void 0 : inputTypeIcons[reverseInputTypes[inputType]]);
};
exports.getTimeInputTypeIcon = getTimeInputTypeIcon;
const clockTypes = {
  minutes: 'minutes',
  hours: 'hours'
};

// Code inspiration and copied from: https://github.com/ShaneGH/analogue-time-picker/blob/master/../utils/angle.ts
exports.clockTypes = clockTypes;
const outerHeight = 34;
const _30 = Math.PI / 6;
const _12 = Math.PI / 30;
const _360 = Math.PI * 2;
const _90 = Math.PI / 2;

/** Snap an angle to a given step. E.g. if angle = 22° and step = 10°, round down to 20° */
function snap(angle, step) {
  let a = angle;
  while (a < 0) a += _360;
  let diff = a % step;
  if (diff <= step / 2) {
    return angle - diff;
  }
  return angle - diff + step;
}

// detect am / pm based on offset
function getHourTypeFromOffset(left, top, size) {
  const w = size / 2;
  const x = w - left;
  const y = size / 2 - top;
  const distance = Math.sqrt(x * x + y * y);
  const maxPm = w - outerHeight;
  return distance > maxPm ? hourTypes.am : hourTypes.pm;
}

// Calculate the minute from the hand angle
function getMinutes(handAngle) {
  handAngle = snap(handAngle, _12);
  let minute = parseInt(((handAngle - _90) % _360 / _12).toFixed(), 10);
  while (minute < 0) minute += 60;
  while (minute >= 60) minute -= 60;
  return minute;
}

// Calculate the hour from the hand angle
function getHours(handAngle, hourType) {
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
function getAngle(left, top, size) {
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
function useSwitchColors(highlighted) {
  const backgroundColor = React.useMemo(() => {
    if (_utils.passedTheme.dark) {
      if (highlighted) {
        return _utils.passedTheme.isV3 ? _utils.passedTheme.colors.tertiaryContainer : (0, _color.default)(_utils.passedTheme.colors.primary).hex();
      }
      return _utils.passedTheme.colors.backdrop;
    }
    if (highlighted) {
      if (_utils.passedTheme.isV3) {
        return _utils.passedTheme.colors.primaryContainer;
      }
      return (0, _color.default)(_utils.passedTheme.colors.primary).lighten(1).hex();
    }
    return _utils.passedTheme.colors.surface;
  }, [highlighted]);
  const color = React.useMemo(() => {
    if (highlighted && !_utils.passedTheme.dark) {
      return _utils.passedTheme.isV3 ? _utils.passedTheme.colors.onSurfaceVariant : _utils.passedTheme.colors.primary;
    }
    if (highlighted && _utils.passedTheme.dark) {
      return _utils.passedTheme.isV3 ? _utils.passedTheme.colors.onTertiaryContainer : _utils.passedTheme.colors.background;
    }
    if (_utils.passedTheme.isV3) {
      return _utils.passedTheme.colors.onSurfaceVariant;
    } else {
      return _utils.passedTheme.colors.placeholder;
    }
  }, [highlighted]);
  return {
    backgroundColor,
    color
  };
}
function useInputColors(highlighted) {
  const backgroundColor = React.useMemo(() => {
    if (_utils.passedTheme.dark) {
      if (highlighted) {
        return _utils.passedTheme.isV3 ? _utils.passedTheme.colors.primaryContainer : (0, _color.default)(_utils.passedTheme.colors.primary).hex();
      }
      return _utils.passedTheme.isV3 ? _utils.passedTheme.colors.surfaceVariant : (0, _color.default)(_utils.passedTheme.colors.surface).lighten(1.4).hex();
    }
    if (highlighted) {
      if (_utils.passedTheme.isV3) {
        return _utils.passedTheme.colors.secondaryContainer;
      }
      return (0, _color.default)(_utils.passedTheme.colors.primary).lighten(1).hex();
    }
    if (_utils.passedTheme.isV3) {
      return _utils.passedTheme.colors.surfaceVariant;
    }
    return (0, _color.default)(_utils.passedTheme.colors.surface).darken(0.1).hex();
  }, [highlighted]);
  const color = React.useMemo(() => {
    if (_utils.passedTheme.isV3) {
      if (!highlighted) {
        return _utils.passedTheme.isV3 ? _utils.passedTheme.colors.onSurface : _utils.passedTheme.colors.onBackground;
      }
      return _utils.passedTheme.isV3 ? _utils.passedTheme.colors.onPrimaryContainer : _utils.passedTheme.colors.onBackground;
    } else {
      if (highlighted && !_utils.passedTheme.dark) {
        return _utils.passedTheme.colors.primary;
      }
      return _utils.passedTheme.colors.text;
    }
  }, [highlighted]);
  return {
    backgroundColor,
    color
  };
}
function toHourInputFormat(hours, is24Hour) {
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
function toHourOutputFormat(newHours, previousHours, is24Hour) {
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