import React, { useEffect } from 'react';
import { Modal, StyleSheet } from 'react-native';
import CustomPressable from './CustomPressable';

export default function CustomModal({ modalVisible, toggleModalVisible, children }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => toggleModalVisible}
      style={styles.container}
    >
      <CustomPressable style={styles.trigger} onPress={toggleModalVisible} />
      {children}
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  trigger: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
});