"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.darkenBy = darkenBy;
exports.lightenBy = lightenBy;
exports.passedTheme = void 0;
exports.range = range;
exports.registerTheme = registerTheme;
exports.useHeaderBackgroundColor = useHeaderBackgroundColor;
exports.useHeaderColorIsLight = useHeaderColorIsLight;
exports.useHeaderTextColor = useHeaderTextColor;
exports.useLatest = useLatest;
exports.useTextColorOnPrimary = useTextColorOnPrimary;
var React = _interopRequireWildcard(require("react"));
var _reactNativePaper = require("react-native-paper");
var _color = _interopRequireDefault(require("color"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let passedTheme = _reactNativePaper.MD3LightTheme;
exports.passedTheme = passedTheme;
function registerTheme(paperTheme) {
  exports.passedTheme = passedTheme = paperTheme;
}
function useLatest(value) {
  const ref = React.useRef(value);
  ref.current = value;
  return ref;
}
function useHeaderBackgroundColor() {
  if (passedTheme.isV3) {
    return passedTheme.colors.surface;
  }
  return passedTheme.dark && passedTheme.mode === 'adaptive' ? (0, _reactNativePaper.overlay)(4, passedTheme.colors.surface) : passedTheme.colors.primary;
}
function useHeaderColorIsLight() {
  const background = passedTheme.dark && passedTheme.mode === 'adaptive' ? passedTheme.colors.surface : passedTheme.colors.primary;
  return (0, _color.default)(background).isLight();
}
function useHeaderTextColor() {
  const isLight = useHeaderColorIsLight();
  if (passedTheme.isV3) {
    return passedTheme.colors.onSurfaceVariant;
  }
  return !isLight ? '#fff' : '#000';
}
function useTextColorOnPrimary() {
  const isDark = !(0, _color.default)(passedTheme.colors.primary).isLight();
  if (passedTheme.isV3) {
    if (isDark && passedTheme.dark) {
      return passedTheme.colors.onSurface;
    } else {
      return passedTheme.colors.onPrimary;
    }
  }
  return isDark ? '#fff' : '#000';
}
function range(start, end) {
  return Array(end - start + 1).fill(null).map((_, i) => start + i);
}
function lightenBy(color, ratio) {
  const lightness = color.lightness();
  return color.lightness(lightness + (100 - lightness) * ratio);
}
function darkenBy(color, ratio) {
  const lightness = color.lightness();
  return color.lightness(lightness - lightness * ratio);
}
//# sourceMappingURL=utils.js.map