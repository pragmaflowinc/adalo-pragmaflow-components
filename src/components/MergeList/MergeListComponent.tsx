import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { MergeListProps } from "./generated";
import { Row } from "./Row";
import { styles } from "./Styles";

export function MergeListComponent({
  editor,
  listHeader,
  background,
  _fonts,
  items,
  dividerType,
  dividerColor,
}: MergeListProps) {
  const [currentWidth, setCurrentWidth] = useState(0);
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
