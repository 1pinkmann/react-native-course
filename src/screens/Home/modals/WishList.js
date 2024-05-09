import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomPressable from '../../../components/CustomPressable';
import { useNavigation } from '@react-navigation/native';

export default function WishList() {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <CustomPressable onPress={goBack}>
        <Text>Close Modal</Text>
      </CustomPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 500,
  }
});