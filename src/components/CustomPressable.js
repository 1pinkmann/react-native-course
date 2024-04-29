import React from 'react'
import { Pressable } from 'react-native'

export default function CustomPressable({ children, ...props }) {
  return (
    <Pressable android_ripple={true} {...props}>
      {children}
    </Pressable>
  )
}
