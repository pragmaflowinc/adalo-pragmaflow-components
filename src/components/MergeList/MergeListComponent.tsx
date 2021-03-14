import React from 'react'
import { View, Text } from 'react-native'
import { MergeListProps } from './generated'

export function MergeListComponent(props: MergeListProps) {
  return (
    <View>
      <Text>{props.text}</Text>
    </View>
  )
}