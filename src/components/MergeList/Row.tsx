import React from 'react'
import { IAvatar, IFirstLine, IFonts, ILeftSection, IRightSection, ISecondLine } from './generated'
import { View, Image } from 'react-native'
import { styles } from './Styles'
import Icon  from 'react-native-vector-icons/MaterialIcons'
import { RippleFeedback, IconToggle } from '@protonapp/react-native-material-ui'
import { FirstLine } from './FirstLine'
import { SecondLine } from './SecondLine'
interface RowProps {
  leftSection?: ILeftSection
  rightSection?: IRightSection
  firstLine?: IFirstLine
  secondLine?: ISecondLine
  fullWidth : number
  dividerType?: string
  dividerColor?: string
  onPress?: () => void
  editor: boolean
  lastRow: boolean
  _fonts: IFonts
}

export function Row({ firstLine, secondLine, leftSection, rightSection, fullWidth, dividerType, dividerColor, onPress, _fonts, editor, lastRow }: RowProps) {
  const getWidthLimit = () => {
    let leftSectWidth = 0
    let rightSectWidth = 0

    if (leftSection && leftSection.enabled) {
      if (leftSection.type === 'image') {
        leftSectWidth = 72
      } else {
        leftSectWidth = 56
      }
    }
    if (rightSection && rightSection.enabled) {
      rightSectWidth = 36
    }
    return (fullWidth - leftSectWidth - rightSectWidth - 32)
  }

  const getDividerInset = () => {
    if (dividerType !== 'inset') {
      return 0
    }

    let baseInset = 16

    if (!leftSection || !leftSection.enabled) {
      return baseInset
    }

    if (leftSection.type === 'icon' || leftSection.type === 'avatar') {
      return baseInset * 2 + 40
    }

    if (leftSection.type === 'image') {
      return baseInset * 2 + 56
    }

    return 0
  }

  const getDividerStyles = () => {
    if (!dividerColor) {
      dividerColor = '#e0e0e0'
    }

    return {
      left: getDividerInset(),
      backgroundColor: dividerColor,
    }
  }

  const checkDivider = () => {
    if (!lastRow && dividerType && dividerType !== 'none') {
      return true
    }

    return false
  }

  const renderLeftSection = () => {
    if (!leftSection || !leftSection.enabled) {
      return null
    }

    if (leftSection.type === 'icon' && leftSection.icon) {
      //56
      return (
        <View style={styles.iconWrapper} pointerEvents="none">
          <Icon
            size={24}
            name={leftSection.icon}
            color={leftSection.iconColor}
          />
        </View>
      )
    }

    if (firstLine && secondLine) {
      if (leftSection.type === 'avatar' && leftSection.image) {
        let avatarStyle: any[] = [styles.avatar]
          if ((firstLine.titleLineNum && firstLine.titleLineNum > 2) || (secondLine.subtitleLineNum && secondLine.subtitleLineNum > 2)) {
            avatarStyle.push({ marginTop: 18 })
          } else if (!editor) {
            avatarStyle.push({ marginTop: 16 })
          }
        return (
          <View style={styles.imageWrapper}>
            <Image
              resizeMode="cover"
              source={{ uri: (leftSection.image as IAvatar).uri}}
              style={avatarStyle}
            />
          </View>
        )
      }

      if (leftSection.type === 'image') {
        let imageStyle: any[] = [styles.image]

        if ((firstLine.titleLineNum && firstLine.titleLineNum > 2) || (secondLine.subtitleLineNum && secondLine.subtitleLineNum > 2)) {
          imageStyle.push({ marginTop: 18 })
        }
        return (
          <View style={styles.imageWrapper}>
            <Image
              resizeMode="cover"
              source={{ uri: (leftSection.image as string)}}
              style={imageStyle}
            />
          </View>
        )
      }
    }
  }

  const renderRightSection = () => {
    if (!rightSection || !rightSection.enabled) {
      return null
    }

    let iconStyles = [{ marginRight: -12 }]
    let iconWrap = [styles.iconWrap]

    if (rightSection.icon) {
      return (
        <View style={{ justifyContent: 'flex-start' }}>
          <View style={iconWrap}>
            <IconToggle
              name={rightSection.icon}
              color={rightSection.iconColor}
              underlayColor={rightSection.iconColor}
              maxOpacity={0.3}
              size={24}
              onPress={rightSection.onPress}
              style={{ container: iconStyles }}
            />
          </View>
        </View>
      )
    }

    return null
  }
  const renderSubtitle = () => {
    return secondLine && secondLine.enabled
  }

  const renderContent = () => {
    let hasDivider = checkDivider()

    let row: any[] = [styles.row]
    if (firstLine && secondLine && (
      ((firstLine.titleLineNum && firstLine.titleLineNum <= 2) && (secondLine.subtitleLineNum && secondLine.subtitleLineNum <= 2)) ||
      !firstLine.titleLineNum ||
      !secondLine.subtitleLineNum)
    ) {
      row.push({ alignItems: 'center' })
    }

    return (
      <View style={row}>
        {renderLeftSection()}
        <View style={styles.main} pointerEvents="none">
          <FirstLine
            {...firstLine}
            widthLimit={getWidthLimit()}
            _fonts={_fonts}
          />
          {renderSubtitle() ? (
            <SecondLine
              {...secondLine}
              widthLimit={getWidthLimit()}
              _fonts={_fonts}
            />
          ) : null}
        </View>
        {renderRightSection()}
        {hasDivider ? (
          <View style={[styles.divider, getDividerStyles()]} />
        ) : null}
      </View>
    )
  }
    if (onPress) {
      return (
        <View>
          <RippleFeedback onPress={onPress}>
            {renderContent()}
          </RippleFeedback>
        </View>
      )
    }

    return <View>{renderContent()}</View>
} 