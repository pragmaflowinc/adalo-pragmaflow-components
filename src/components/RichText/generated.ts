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


export interface RichTextEditorProps {
  text?: string
  placeholder?: string
  readOnly?: boolean
  showControls?: boolean
  onBlur?: (content?: string) => void
  appId: string
  _fonts: IFonts
  _width: number
  _height: number
  editor: boolean
}