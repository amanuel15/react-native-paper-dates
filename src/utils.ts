import * as React from 'react'
import {
  DefaultTheme,
  MD3DarkTheme,
  overlay,
  MD3Theme,
  MD3LightTheme,
} from 'react-native-paper'
import Color from 'color'

export type PaperTheme = typeof MD3DarkTheme | typeof DefaultTheme

export let passedTheme = MD3LightTheme

export function registerTheme(paperTheme: MD3Theme) {
  passedTheme = paperTheme
}

export function useLatest<T>(value: T) {
  const ref = React.useRef(value)
  ref.current = value
  return ref
}

export function useHeaderBackgroundColor() {
  if (passedTheme.isV3) {
    return passedTheme.colors.surface
  }
  return passedTheme.dark && passedTheme.mode === 'adaptive'
    ? overlay(4, passedTheme.colors.surface)
    : passedTheme.colors.primary
}

export function useHeaderColorIsLight() {
  const background =
    passedTheme.dark && passedTheme.mode === 'adaptive'
      ? passedTheme.colors.surface
      : passedTheme.colors.primary
  return Color(background).isLight()
}

export function useHeaderTextColor() {
  const isLight = useHeaderColorIsLight()
  if (passedTheme.isV3) {
    return passedTheme.colors.onSurfaceVariant
  }
  return !isLight ? '#fff' : '#000'
}

export function useTextColorOnPrimary() {
  const isDark = !Color(passedTheme.colors.primary).isLight()

  if (passedTheme.isV3) {
    if (isDark && passedTheme.dark) {
      return passedTheme.colors.onSurface
    } else {
      return passedTheme.colors.onPrimary
    }
  }

  return isDark ? '#fff' : '#000'
}

export function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, i) => start + i)
}

export function lightenBy(color: Color, ratio: number) {
  const lightness = color.lightness()
  return color.lightness(lightness + (100 - lightness) * ratio)
}

export function darkenBy(color: Color, ratio: number) {
  const lightness = color.lightness()
  return color.lightness(lightness - lightness * ratio)
}
