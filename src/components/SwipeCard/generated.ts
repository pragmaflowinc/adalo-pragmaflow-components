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

export interface IFirstFirstLine {
  text?: string
  styles: { text: IStyles }
  image?: string | IAvatar
  titleLineNum?: number
}

export interface IDataList {
  id: number
  firstFirstLine?: IFirstFirstLine
  _meta: any
}

export interface SwipeCardProps {
  firstFirstLine?: { "text": IStyles }
  dataList?: IDataList[]
  appId: string
  _fonts: IFonts
  _width: number
  _height: number
  editor: boolean
}