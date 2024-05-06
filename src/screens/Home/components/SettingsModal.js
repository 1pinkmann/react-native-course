import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';
import CustomModal from '../../../components/CustomModal';
import { Appearance } from 'react-native';

export default function SettingsModal({ modalVisible, toggleModalVisible }) {
  const [colorSchemeMode, setColorSchemeMode] = useState(null);

  function changeColorSchemeMode(value, isDefaultSwitch) {
    setColorSchemeMode(() => {
      switch (true) {
        case isDefaultSwitch:
          return value ? null : 'light';
        default:
          return value ? 'dark' : 'light';
      }
    });
  }

  useEffect(() => {
    Appearance.setColorScheme(colorSchemeMode);
  }, [colorSchemeMode]);

  return (
    <CustomModal modalVisible={modalVisible} toggleModalVisible={toggleModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.wrapper}>
          <Text style={styles.label}>Default theme</Text>
          <Switch value={colorSchemeMode === null} onValueChange={(value) => changeColorSchemeMode(value, true)} />
        </View>
        <View style={[styles.wrapper, colorSchemeMode === null && styles.disabled]}>
          <Text style={styles.label}>Switch theme</Text>
          <Switch value={!!colorSchemeMode && colorSchemeMode === 'dark'} onValueChange={(value) => changeColorSchemeMode(value)} />
        </View>
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    width: 200,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 50,
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
    textAlign: 'left',
    fontSize: 18
  },
  wrapper: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  disabled: {
    opacity: 0.5
  }
});