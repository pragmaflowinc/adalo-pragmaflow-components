import React from 'react'
import { View, Text } from 'react-native'
import { IFonts, IStyles } from './generated'
import { styles } from './Styles'

interface SecondLineProps {
  text?: string, 
  color?: string,
  subtitleLineNum?: number,
  widthLimit: number,
  _fonts: IFonts
  styles?: { [key: string]: IStyles }
}

export function SecondLine({ text, color, subtitleLineNum, widthLimit, _fonts, styles: _styles }: SecondLineProps) {
    let customFontStyles = _styles ? _styles.text : null
    let propStyles: any[] = [
      { color: customFontStyles ? customFontStyles.color : color },
    ]
    if (customFontStyles) {
      propStyles.push({
        fontFamily: customFontStyles.fontFamily,
        fontWeight: customFontStyles.fontWeight,
      })
    } else if (_fonts) {
      propStyles.push({ fontFamily: _fonts.body })
    }
    let subtitleLimit = widthLimit / 7
    let breakless = (text || '').replace(/(\r\n|\n|\r)/gm, '')
    if (subtitleLineNum == 2) {
      if (breakless.length > subtitleLimit) {
        const firstLine = breakless.substring(0, subtitleLimit + 1)
        const i = firstLine.lastIndexOf(' ')
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.secondLine, propStyles]}>
              {breakless.substring(0, i + 1)}
            </Text>
            <Text
              style={[styles.secondLine, propStyles]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {breakless.substring(i + 1)}
            </Text>
          </View>
        )
      } else {
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.secondLine, propStyles]}>{breakless}</Text>
          </View>
        )
      }
    }
    if ((subtitleLineNum || 0) > 2) {
      return (
        <Text style={[styles.secondLine, propStyles]} ellipsizeMode="tail">
          {breakless}
        </Text>
      )
    }

    return (
      <Text
        style={[styles.secondLine, propStyles]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {breakless}
      </Text>
    )
}