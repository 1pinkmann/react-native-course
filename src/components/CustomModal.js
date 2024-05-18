import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CustomModal({ children }) {
  const navigation = useNavigation();

  function closeModal() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.trigger} onPress={closeModal} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  trigger: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
});