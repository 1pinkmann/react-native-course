import React from 'react';
import CustomPressable from './CustomPressable';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import useColors from '../hooks/useColors';

export default function HeartButton({ onPress, style, active }) {
  const colors = useColors();

  return (
    <CustomPressable style={[styles.container, style]} onPress={onPress}>
      <AntDesign name="heart" size={24} color={active ? colors.HEART_ACTIVE : colors.ICON} />
    </CustomPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})