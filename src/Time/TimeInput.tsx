import * as React from 'react'
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Platform,
} from 'react-native'
import { useTheme, TouchableRipple } from 'react-native-paper'

import Color from 'color'
import {
  inputTypes,
  PossibleClockTypes,
  PossibleInputTypes,
  useInputColors,
} from './timeUtils'
import { passedTheme } from 'src/utils'

interface TimeInputProps
  extends Omit<Omit<TextInputProps, 'value'>, 'onFocus'> {
  value: number
  clockType: PossibleClockTypes
  onPress?: (type: PossibleClockTypes) => any
  pressed: boolean
  onChanged: (n: number) => any
  inputType: PossibleInputTypes
  inputFontSize?: number
}

function TimeInput(
  {
    value,
    clockType,
    pressed,
    onPress,
    onChanged,
    inputType,
    inputFontSize = 57,
    ...rest
  }: TimeInputProps,
  ref: any
) {
  const [controlledValue, setControlledValue] = React.useState<string>(
    `${value}`
  )

  const onInnerChange = (text: string) => {
    setControlledValue(text)
    if (text !== '' && text !== '0') {
      onChanged(Number(text))
    }
  }

  React.useEffect(() => {
    setControlledValue(`${value}`)
  }, [value])

  const [inputFocused, setInputFocused] = React.useState<boolean>(false)

  const highlighted = inputType === inputTypes.picker ? pressed : inputFocused

  const { color, backgroundColor } = useInputColors(highlighted)

  let formattedValue = controlledValue
  if (!inputFocused) {
    formattedValue =
      controlledValue.length === 1
        ? `0${controlledValue}`
        : `${controlledValue}`
  }

  return (
    <View style={styles.root}>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            color,
            fontSize: inputFontSize,
            backgroundColor,
            borderRadius: passedTheme.roundness * 2,
            borderColor:
              passedTheme.isV3 && highlighted
                ? passedTheme.colors.onPrimaryContainer
                : undefined,
            borderWidth: passedTheme.isV3 && highlighted ? 2 : 0,
            height: inputType === inputTypes.keyboard ? 72 : 80,
          },
        ]}
        maxFontSizeMultiplier={1.5}
        value={formattedValue}
        maxLength={2}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        keyboardAppearance={passedTheme.dark ? 'dark' : 'default'}
        keyboardType="number-pad"
        onChangeText={onInnerChange}
        {...rest}
      />
      {onPress && inputType === inputTypes.picker ? (
        <TouchableRipple
          style={[
            StyleSheet.absoluteFill,
            styles.buttonOverlay,
            {
              borderRadius: passedTheme.roundness,
            },
          ]}
          rippleColor={
            Platform.OS !== 'ios'
              ? Color(passedTheme.colors.onSurface).fade(0.7).hex()
              : undefined
          }
          onPress={() => onPress(clockType)}
          borderless={true}
        >
          <View />
        </TouchableRipple>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { position: 'relative', height: 80, width: 96 },
  input: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 96,
  },
  buttonOverlay: { overflow: 'hidden' },
})

export default React.forwardRef(TimeInput)
