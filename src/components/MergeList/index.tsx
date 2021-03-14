import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MergeListProps } from './generated'
import { MergeListComponent } from './MergeListComponent'

class MergeList extends Component<MergeListProps> {
	render() {
		const { text, color } = this.props
		return (
			<View style={styles.wrapper}>
				<MergeListComponent {...this.props} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default MergeList
