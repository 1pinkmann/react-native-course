import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import CustomModal from '../components/CustomModal';
import CheckBox from 'expo-checkbox';
import CustomPressable from '../components/CustomPressable';
import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';

function FiltersModal({ productsStore }) {
  const { newOnlyChecked, setNewOnlyChecked, handleFilter } = productsStore;
  const navigation = useNavigation();

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      handleFilter(newOnlyChecked, 'isNew', true)
    });

    return listener;
  }, [handleFilter, newOnlyChecked]);

  return (
    <CustomModal>
      <View style={styles.modalView}>
        <Text style={styles.title}>Filter</Text>
        <View style={styles.checkboxWrapper}>
          <CheckBox value={newOnlyChecked} onValueChange={setNewOnlyChecked} />
          <CustomPressable onPress={() => setNewOnlyChecked(!newOnlyChecked)}>
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

export default inject(({ stores }) => ({ productsStore: stores.productsStore }))(observer(FiltersModal));