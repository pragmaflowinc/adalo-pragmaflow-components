import React, { useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";
import { IAvatar, IStyles, MergeListProps } from "./generated";
import { Row } from "./Row";
import { styles } from "./Styles";

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
export interface IItem {
  id?: number
  firstLine?: IFirstLine
  secondLine?: ISecondLine
  leftSection?: ILeftSection
  rightSection?: IRightSection
  sort: Date
  _meta: any
}

export function MergeListComponent({
  editor,
  listHeader,
  background,
  _fonts,
  items1,
  items2,
  items3,
  items4,
  dividerType,
  dividerColor,
}: MergeListProps) {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [items, setItems] = useState<IItem[]>([])
  useEffect(() => {
    const newItems = [
      ...(items1?.map(item => ({
        id: item.id,
        firstLine: item.firstFirstLine,
        secondLine: item.secondLine1,
        leftSection: item.leftSection1,
        rightSection: item.rightSection1,
        _meta: item._meta,
        sort: new Date(item.firstSortText?.date|| '')
      })) || []),
      ...(items2?.map(item => ({
        id: item.id,
        firstLine: item.secondFirstLine,
        secondLine: item.secondLine2,
        leftSection: item.leftSection2,
        rightSection: item.rightSection2,
        _meta: item._meta,
        sort: new Date(item.secondSortText?.date|| '')
      })) || []),
      ...(items3?.map(item => ({
        id: item.id,
        firstLine: item.thirdFirstLine,
        secondLine: item.secondLine3,
        leftSection: item.leftSection3,
        rightSection: item.rightSection3,
        _meta: item._meta,
        sort: new Date(item.thirdSortText?.date || '')
      })) || []),
      ...(items4?.map(item => ({
        id: item.id,
        firstLine: item.fourthFirstLine,
        secondLine: item.secondLine4,
        leftSection: item.leftSection4,
        rightSection: item.rightSection4,
        _meta: item._meta,
        sort: new Date(item.fourthSortText?.date || '')
      })) || []),

    ]
    newItems.sort((a, b) => new Date(b.sort).getTime() - new Date(a.sort).getTime())
    setItems(newItems)
  }, [items1, items2, items3, items4])
  const handleLayout = ({ nativeEvent }: any) => {
    const { width } = (nativeEvent && nativeEvent.layout) || {};

    if (width !== currentWidth) {
      setCurrentWidth(width);
    }
  };

  const renderHeader = () => {
    if (!listHeader || !listHeader.header || !listHeader.enabled) {
      return null;
    }
    let space = 0;
    if (background && background.enabled) {
      space = 10;
    }

    let headerStyles = [styles.header];
    if (listHeader.styles) {
      headerStyles.push(listHeader.styles.header as any);
    } else if (_fonts) {
      headerStyles.push({ fontFamily: _fonts.heading } as any);
    }

    return (
      <>
        <Text style={headerStyles}>{listHeader.header}</Text>
        <View style={{ height: space }}></View>
      </>
    );
  };
  return (
    <>
      {renderHeader()}
        <View style={[styles.wrapper]} onLayout={handleLayout}>
          {
            !items ? (
              <Text>Please select items</Text>
            ) : (
              <>
              {items.map((itm, i) => (
                <Row 
                  {...itm}
                  key={itm.id}
                  dividerType={dividerType}
                  dividerColor={dividerColor}
                  lastRow={i === items.length - 1}
                  fullWidth={currentWidth}
                  editor={editor}
                  _fonts={_fonts}
                />
              ))}
            </>
            )
          }
        </View>
    </>
  );
}
