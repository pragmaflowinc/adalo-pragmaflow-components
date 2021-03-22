import React, { Dispatch, SetStateAction } from "react";
import { EditorState, RichUtils } from "draft-js";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { IconToggle } from '@protonapp/react-native-material-ui'
import { StyleButton } from "./StyleButton";
import {Picker} from '@react-native-picker/picker';

interface EditorControllerProps {
  editorState: EditorState
  setEditorState: Dispatch<SetStateAction<EditorState>>
}

export function EditorController({
  editorState,
  setEditorState = (obj: any) => null
}: EditorControllerProps) {
  const selection = editorState.getSelection();
  const editorBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const currentStyle = editorState.getCurrentInlineStyle();

  const setIterartor = currentStyle.values();
  let style = setIterartor.next();
  let styleString = "";
  while (!style.done) {
    if (styleString) styleString += "," + style.value;
    else styleString = style.value;
    style = setIterartor.next();
  }

  if ((window as any).ReactNativeWebView) {
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        blockType: editorBlockType,
        styles: styleString,
      })
    );
  }

  return (
    <View>
      <View style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        <StyleButton 
        icon="format-bold"
        isActive={currentStyle.has("BOLD")}
        onPress={() => 
        setEditorState(
          RichUtils.toggleInlineStyle(editorState, "BOLD")
        )} />
        
        <StyleButton 
        icon="format-italic"
        isActive={currentStyle.has("ITALIC")}
        onPress={() => 
        setEditorState(
          RichUtils.toggleInlineStyle(editorState, "ITALIC")
        )} />
        
        <StyleButton 
        icon="format-underlined"
        isActive={currentStyle.has("UNDERLINE")}
        onPress={() => 
        setEditorState(
          RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
        )} />
        
        <StyleButton 
        icon="strikethrough-s"
        isActive={currentStyle.has("STRIKETHROUGH")}
        onPress={() => 
        setEditorState(
          RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH")
        )} />
        
        <StyleButton 
        icon="format-quote"
        isActive={currentStyle.has("CODE")}
        onPress={() => 
        setEditorState(
          RichUtils.toggleInlineStyle(editorState, "CODE")
        )} />

      <Picker<string>
        selectedValue={editorBlockType}
        onValueChange={(itemValue, itemIndex) => {
          setEditorState(
            RichUtils.toggleBlockType(editorState, itemValue)
          )
        }}>
        <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="H1" value="header-one" />
        <Picker.Item label="H2" value="header-two" />
        <Picker.Item label="H3" value="header-three" />
        <Picker.Item label="H4" value="header-four" />
        <Picker.Item label="H5" value="header-five" />
        <Picker.Item label="H6" value="header-six" />
        <Picker.Item label="Blockquote" value="blockquote" />
        <Picker.Item label="Code Block" value="code-block" />
      </Picker>
      </View>
      <View style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        <StyleButton 
        icon="format-list-bulleted"
        isActive={currentStyle.has("unordered-list-item")}
        onPress={() => 
          setEditorState(
            RichUtils.toggleBlockType(editorState, "unordered-list-item")
          )} />
          <StyleButton 
          icon="format-list-numbered"
          isActive={currentStyle.has("ordered-list-item")}
          onPress={() => 
            setEditorState(
              RichUtils.toggleBlockType(editorState, "ordered-list-item")
            )} />
      </View>
    </View>
  );
}
