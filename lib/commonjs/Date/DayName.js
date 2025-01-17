"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DayName(_ref) {
  let {
    label
  } = _ref;
  let textFont = _utils.passedTheme !== null && _utils.passedTheme !== void 0 && _utils.passedTheme.isV3 ? _utils.passedTheme.fonts.bodySmall : _utils.passedTheme.fonts.medium;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.dayName
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    maxFontSizeMultiplier: 1.5,
    style: [styles.dayNameLabel, {
      ...textFont,
      color: _utils.passedTheme.colors.onSurface
    }],
    selectable: false
  }, label));
}
const styles = _reactNative.StyleSheet.create({
  dayName: {
    flex: 1,
    alignItems: 'center'
  },
  dayNameLabel: {
    fontSize: 14,
    opacity: 0.7
  }
});
var _default = /*#__PURE__*/React.memo(DayName);
exports.default = _default;
//# sourceMappingURL=DayName.js.map