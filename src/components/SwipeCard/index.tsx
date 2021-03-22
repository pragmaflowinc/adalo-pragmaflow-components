import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { SwipeCardProps } from './generated'
import { SwipeCardComponent } from './SwipeCardComponent'
import { styles } from './Styles'
class MergeList extends Component<SwipeCardProps> {
	render() {
		return (
			<View style={styles.wrapper}>
				<SwipeCardComponent />
			</View>
		)
	}
}

export default MergeList
