import React, { useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import CustomPressable from '../../../components/CustomPressable';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../constants';
import HeartButton from '../../../components/HeartButton';
import ModalWindow from './ModalWindow';
import useSearch from '../hooks/useSearch';
import FiltersModal from './FiltersModal';

export default function Products() {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const { search, setSearch, searchVisible, toggleSearchVisible, handleFilter, filters } = useSearch();
  const { products } = useProducts(search, filters);

  function toggleModalVisible() {
    setModalVisible(!modalVisible);
  }

  function toggleFiltersModalVisible() {
    setFilterModalVisible((state) => {
      if (state) {
        handleFilter(checked, 'isNew', true)
      }
      return !state;
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {searchVisible &&
          <TextInput value={search} onChangeText={setSearch} placeholder="Search..." style={styles.input} />
        }
        <HeartButton style={styles.searchButton} onPress={toggleModalVisible} active={true} />
        <CustomPressable style={styles.searchButton} onPress={toggleFiltersModalVisible}>
          <AntDesign name="filter" size={24} />
        </CustomPressable>
        <CustomPressable style={styles.searchButton} onPress={toggleSearchVisible}>
          <AntDesign name="search1" size={24} />
        </CustomPressable>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} key={item.id} />}
      />
      <ModalWindow modalVisible={modalVisible} toggleModalVisible={toggleModalVisible} />
      <FiltersModal checked={checked} setChecked={setChecked} modalVisible={filterModalVisible} toggleModalVisible={toggleFiltersModalVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingTop: 35
  },
  inputWrapper: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 20
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    borderColor: colors.BORDER,
    borderWidth: 1,
    backgroundColor: colors.GREY,
    borderRadius: 5,
    height: '100%'
  },
  searchButton: {
    marginLeft: 10
  }
});