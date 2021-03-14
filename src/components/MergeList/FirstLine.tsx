import React from 'react'
import { View, Text } from 'react-native'
import { IFonts, IStyles } from './generated'
import { styles } from './Styles'
interface FirstLineProps {
  text?: string, 
  color?: string, 
  titleLineNum?: number, 
  widthLimit: number, 
  _fonts: IFonts
  styles?: { [key: string]: IStyles }
}

export function FirstLine({ text, color, titleLineNum, widthLimit, _fonts, styles: _styles }: FirstLineProps) {
    let breakless = (text || '').replace(/(\r\n|\n|\r)/gm, '')
    //custom fonts
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
    let titleLimit = widthLimit / 7.7
    if (titleLineNum == 2) {
      if (breakless.length > titleLimit) {
        const firstLine = breakless.substring(0, titleLimit + 1)
        const i = firstLine.lastIndexOf(' ')
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.firstLine, _styles]}>
              {breakless.substring(0, i + 1)}
            </Text>
            <Text
              style={[styles.firstLine, _styles]}
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
            <Text style={[styles.firstLine, _styles]}>{breakless}</Text>
          </View>
        )
      }
    }

    if ((titleLineNum || 0) > 2) {
      return (
        <Text style={[styles.firstLine, _styles]} ellipsizeMode="tail">
          {breakless}
        </Text>
      )
    }

    return (
      <Text
        style={[styles.firstLine, _styles]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {breakless}
      </Text>
    )
}