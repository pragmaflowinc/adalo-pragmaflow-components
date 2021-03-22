import React from 'react'
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface StyleButtonProps {
  isActive: boolean
  onPress: () => void
  icon: string
}

export function StyleButton({ isActive, onPress, icon }: StyleButtonProps) {
  return (
<TouchableOpacity 
      
      style={{
        width: 24,
        height: 24,
        margin: 2,
        borderWidth: 1,
        borderColor: "silver",
        backgroundColor: isActive
        ? "silver"
        : "white",
        justifyContent: 'center',
        alignContent: 'center'
      }}
      onPress={e => onPress() }>
          <Icon size={24} name={icon} />
      </TouchableOpacity>
  )
}