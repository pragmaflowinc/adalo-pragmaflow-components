import React, { Component } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import { RichTextEditorProps } from './generated'
import { RichTextComponent } from './RichTextComponent'
import { styles } from './Styles'

class MergeList extends Component<RichTextEditorProps> {
	state = {
		fullWidth: 0
	}
	handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width } = (nativeEvent && nativeEvent.layout) || {};
    const { fullWidth: prevWidth } = this.state;

    if (width !== prevWidth) {
      this.setState({ fullWidth: width });
    }
  };

	render() {
		return (
			<View onLayout={this.handleLayout} style={{ ...styles.wrapper }}>
				<RichTextComponent {...this.props} />
			</View>
		)
	}
}

export default MergeList
