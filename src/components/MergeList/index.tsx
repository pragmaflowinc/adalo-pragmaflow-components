import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MergeListProps } from './generated'
import { MergeListComponent } from './MergeListComponent'
import { styles } from './Styles'
class MergeList extends Component<MergeListProps> {
	render() {
		return (
			<View style={styles.wrapper}>
				<MergeListComponent {...this.props} />
			</View>
		)
	}
}

export default MergeList
