import * as React from 'react';
import { overlay, MD3LightTheme } from 'react-native-paper';
import Color from 'color';
export let passedTheme = MD3LightTheme;
export function registerTheme(paperTheme) {
  passedTheme = paperTheme;
}
export function useLatest(value) {
  const ref = React.useRef(value);
  ref.current = value;
  return ref;
}
export function useHeaderBackgroundColor() {
  if (passedTheme.isV3) {
    return passedTheme.colors.surface;
  }
  return passedTheme.dark && passedTheme.mode === 'adaptive' ? overlay(4, passedTheme.colors.surface) : passedTheme.colors.primary;
}
export function useHeaderColorIsLight() {
  const background = passedTheme.dark && passedTheme.mode === 'adaptive' ? passedTheme.colors.surface : passedTheme.colors.primary;
  return Color(background).isLight();
}
export function useHeaderTextColor() {
  const isLight = useHeaderColorIsLight();
  if (passedTheme.isV3) {
    return passedTheme.colors.onSurfaceVariant;
  }
  return !isLight ? '#fff' : '#000';
}
export function useTextColorOnPrimary() {
  const isDark = !Color(passedTheme.colors.primary).isLight();
  if (passedTheme.isV3) {
    if (isDark && passedTheme.dark) {
      return passedTheme.colors.onSurface;
    } else {
      return passedTheme.colors.onPrimary;
    }
  }
  return isDark ? '#fff' : '#000';
}
export function range(start, end) {
  return Array(end - start + 1).fill(null).map((_, i) => start + i);
}
export function lightenBy(color, ratio) {
  const lightness = color.lightness();
  return color.lightness(lightness + (100 - lightness) * ratio);
}
export function darkenBy(color, ratio) {
  const lightness = color.lightness();
  return color.lightness(lightness - lightness * ratio);
}
//# sourceMappingURL=utils.js.map