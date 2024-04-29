import React from 'react';
import CustomPressable from './CustomPressable';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../constants';
import { StyleSheet } from 'react-native';

export default function HeartButton({ onPress, style, active }) {
  return (
    <CustomPressable style={[styles.container, style]} onPress={onPress}>
      <AntDesign name="heart" size={24} color={active ? colors.HEART_ACTIVE : 'black'} />
    </CustomPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})