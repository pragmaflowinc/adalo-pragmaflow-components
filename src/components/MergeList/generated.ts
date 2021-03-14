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

export interface IFirstFirstLine {
  text?: string
  styles: { text: IStyles }
  titleLineNum?: number
}

export interface ISecondFirstLine {
  text?: string
  styles: { text: IStyles }
  titleLineNum?: number
}

export interface IThirdFirstLine {
  text?: string
  styles: { text: IStyles }
  titleLineNum?: number
}

export interface IFourthFirstLine {
  text?: string
  styles: { text: IStyles }
  titleLineNum?: number
}

export interface ISecondLine1 {
  enabled?: boolean
  text?: string
  styles: { text: IStyles }
  subtitleLineNum?: number
}

export interface ISecondLine2 {
  enabled?: boolean
  text?: string
  styles: { text: IStyles }
  subtitleLineNum?: number
}

export interface ISecondLine3 {
  enabled?: boolean
  text?: string
  styles: { text: IStyles }
  subtitleLineNum?: number
}

export interface ISecondLine4 {
  enabled?: boolean
  text?: string
  styles: { text: IStyles }
  subtitleLineNum?: number
}

export interface ILeftSection1 {
  enabled?: boolean
  type?: string
  icon?: string
  iconColor?: string
  image?: string | IAvatar
}

export interface ILeftSection2 {
  enabled?: boolean
  type?: string
  icon?: string
  iconColor?: string
  image?: string | IAvatar
}

export interface ILeftSection3 {
  enabled?: boolean
  type?: string
  icon?: string
  iconColor?: string
  image?: string | IAvatar
}

export interface ILeftSection4 {
  enabled?: boolean
  type?: string
  icon?: string
  iconColor?: string
  image?: string | IAvatar
}

export interface IRightSection1 {
  enabled?: boolean
  icon?: string
  iconColor?: string
  onPress?: () => void
}

export interface IRightSection2 {
  enabled?: boolean
  icon?: string
  iconColor?: string
  onPress?: () => void
}

export interface IRightSection3 {
  enabled?: boolean
  icon?: string
  iconColor?: string
  onPress?: () => void
}

export interface IRightSection4 {
  enabled?: boolean
  icon?: string
  iconColor?: string
  onPress?: () => void
}

export interface IFirstSortText {
  date?: string
}

export interface ISecondSortText {
  date?: string
}

export interface IThirdSortText {
  date?: string
}

export interface IFourthSortText {
  date?: string
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

export interface IItems1 {
  id: number
  firstFirstLine?: IFirstFirstLine
  secondLine1?: ISecondLine1
  leftSection1?: ILeftSection1
  rightSection1?: IRightSection1
  firstSortText?: IFirstSortText
  _meta: any
}

export interface IItems2 {
  id: number
  secondFirstLine?: ISecondFirstLine
  secondLine2?: ISecondLine2
  leftSection2?: ILeftSection2
  rightSection2?: IRightSection2
  secondSortText?: ISecondSortText
  _meta: any
}

export interface IItems3 {
  id: number
  thirdFirstLine?: IThirdFirstLine
  secondLine3?: ISecondLine3
  leftSection3?: ILeftSection3
  rightSection3?: IRightSection3
  thirdSortText?: IThirdSortText
  _meta: any
}

export interface IItems4 {
  id: number
  fourthFirstLine?: IFourthFirstLine
  secondLine4?: ISecondLine4
  leftSection4?: ILeftSection4
  rightSection4?: IRightSection4
  fourthSortText?: IFourthSortText
  _meta: any
}

export interface MergeListProps {
  listHeader?: IListHeader
  firstFirstLine?: { "text": IStyles }
  secondFirstLine?: { "text": IStyles }
  thirdFirstLine?: { "text": IStyles }
  fourthFirstLine?: { "text": IStyles }
  secondLine1?: { "text": IStyles }
  secondLine2?: { "text": IStyles }
  secondLine3?: { "text": IStyles }
  secondLine4?: { "text": IStyles }
  background?: IBackground
  items1?: IItems1[]
  items2?: IItems2[]
  items3?: IItems3[]
  items4?: IItems4[]
  dividerType?: string
  dividerColor?: string
  onPress1?: () => void
  onPress2?: () => void
  onPress3?: () => void
  onPress4?: () => void
  appId: string
  _fonts: IFonts
  _width: number
  _height: number
  editor: boolean
}