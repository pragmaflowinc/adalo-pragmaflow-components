/*********** Manifest Props *******************
 * This file is auto generated, making manual *
 * edits to this file might result in loosing *
 * information.                               *
 **********************************************/
export interface IStyles {
  fontFamily?: string
  fontSize?: number
  fontWeight?: number | string
  textAlignment?: string
  color?: string
}

export interface IFonts {
  body: string
  heading: string
}

export interface IAvatar {
  uri: string
  cache: string
}

export interface IListHeader {
  enabled?: boolean
  header?: string
  styles: { header: IStyles }
}

export interface IFirstLine {
  text?: string
  styles: { text: IStyles }
  titleLineNum?: number
}

export interface ISecondLine {
  enabled?: boolean
  text?: string
  styles: { text: IStyles }
  subtitleLineNum?: number
}

export interface ILeftSection {
  enabled?: boolean
  type?: string
  icon?: string
  iconColor?: string
  image?: string | IAvatar
}

export interface IRightSection {
  enabled?: boolean
  icon?: string
  iconColor?: string
  onPress?: () => void
}

export interface IBackground {
  enabled?: boolean
  backgroundColor?: string
  border?: boolean
  borderColor?: string
  borderSize?: number
  rounding?: number
  shadow?: boolean
}

export interface IItems {
  id: number
  firstLine?: IFirstLine
  secondLine?: ISecondLine
  leftSection?: ILeftSection
  rightSection?: IRightSection
  _meta: any
}

export interface MergeListProps {
  listHeader?: IListHeader
  firstLine?: { "text": IStyles }
  secondLine?: { "text": IStyles }
  background?: IBackground
  items?: IItems[]
  dividerType?: string
  dividerColor?: string
  onPress?: () => void
  appId: string
  _fonts: IFonts
  _width: number
  _height: number
  editor: boolean
}