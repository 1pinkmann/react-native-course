import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomPressable from '../../../components/CustomPressable';
import CustomModal from '../../../components/CustomModal';

export default function ModalWindow({ modalVisible, toggleModalVisible }) {
  return (
    <CustomModal modalVisible={modalVisible} toggleModalVisible={toggleModalVisible}>
      <View style={styles.modalView}>
        <CustomPressable onPress={toggleModalVisible}>
          <Text>Close Modal</Text>
        </CustomPressable>
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    marginTop: 'auto',
    height: 300,
    padding: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  }
});