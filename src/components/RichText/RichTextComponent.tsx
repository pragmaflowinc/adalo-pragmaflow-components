import React, { useState, createRef, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { EditorController } from "./EditorController";
import { RichTextEditorProps } from "./generated";

export function RichTextComponent({
  text = "",
  placeholder = "",
  showControls = true,
  readOnly = false,
  onBlur = () => null,
}: RichTextEditorProps) {
  const editorRef = createRef<DraftEditor>();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const onEditorBlur = (e: React.SyntheticEvent<{}>) => {
    const currentState = editorState.getCurrentContent();
    if (currentState) {
      const rawState = convertToRaw(currentState);
      if (rawState) {
        onBlur(JSON.stringify(rawState));
      }
    }
  };

  useEffect(() => {
    if (text) {
      try {
        setEditorState(
          EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
        );
      } catch {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, []);

  const handleKeyCommand = (command: string, editorState: EditorState, eventTimeStamp: number) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onEditorStateChange(newState);
      return 'handled'
    }
    return 'not-handled'
  };

  const mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onEditorStateChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  return (
    <>
    <View style={{ display: showControls ? 'flex' : 'none', margin: 5, borderColor: 'silver', borderWidth: 1}}>
      <EditorController
        editorState={editorState}
        setEditorState={setEditorState}
      />
      </View>
        <View style={{ margin: 5, minHeight: 100, borderColor: 'silver', borderWidth: 1}}>
          <DraftEditor
            readOnly={readOnly}
            ref={editorRef}
            placeholder={placeholder}
            handleKeyCommand={handleKeyCommand}
            // keyBindingFn={mapKeyToEditorCommand}
            editorState={editorState}
            onChange={onEditorStateChange}
            onBlur={(e) => {
              onEditorBlur(e);
            }}
          />
        </View>
    </>
  );
}
