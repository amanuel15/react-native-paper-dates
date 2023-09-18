import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { MD2Theme, Text } from 'react-native-paper'
import { passedTheme } from '../utils'

function DayName({ label }: { label: string }) {
  let textFont = passedTheme?.isV3
    ? passedTheme.fonts.bodySmall
    : (passedTheme as any as MD2Theme).fonts.medium

  return (
    <View style={styles.dayName}>
      <Text
        maxFontSizeMultiplier={1.5}
        style={[
          styles.dayNameLabel,
          { ...textFont, color: passedTheme.colors.onSurface },
        ]}
        selectable={false}
      >
        {label}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  dayName: { flex: 1, alignItems: 'center' },
  dayNameLabel: { fontSize: 14, opacity: 0.7 },
})
export default React.memo(DayName)
