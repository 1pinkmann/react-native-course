import React from 'react'
import { Pressable } from 'react-native'

export default function CustomPressable({ children, ...props }) {
  return (
    <Pressable
      android_ripple={{
        color: 'rgba(0, 0, 0, 0.05)',
        borderless: false,
        radius: 30
      }}
      {...props}
    >
      {children}
    </Pressable>
  )
}
