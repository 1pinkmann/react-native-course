import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomModal from '../../../components/CustomModal';
import CheckBox from 'expo-checkbox';
import CustomPressable from '../../../components/CustomPressable';

export default function FiltersModal({ checked, setChecked, modalVisible, toggleModalVisible }) {
  return (
    <CustomModal modalVisible={modalVisible} toggleModalVisible={toggleModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Filter</Text>
        <View style={styles.checkboxWrapper}>
          <CheckBox value={checked} onValueChange={setChecked} />
          <CustomPressable onPress={() => setChecked(!checked)}>
            <Text style={styles.checkboxText}>Only new</Text>
          </CustomPressable>
        </View>
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    width: 200,
    padding: 20,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    textAlign: 'left'
  },
  checkboxWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxText: {
    marginLeft: 10
  }
});