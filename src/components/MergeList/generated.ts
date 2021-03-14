/*********** Manifest Props *******************
 * This file is auto generated, making manual *
 * edits to this file might result in loosing *
 * information.                               *
 **********************************************/
interface IStyles {
  fontFamiy: String
  fontSize: Number
  fontWeight: Number
  textAlignment: String
  color: String
}

interface IFonts {
  body: String
  heading: String
}


export interface MergeListProps {
  text?: String
  color?: String
  appId: String
  _fonts: IFonts
  _width: Number
  _height: Number
  editor: Boolean
}