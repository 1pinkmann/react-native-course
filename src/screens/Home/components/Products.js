import React, { useMemo, useState } from 'react'
import { FlatList, Linking, RefreshControl, StyleSheet, TextInput, View } from 'react-native'
import ProductCard from './ProductCard';
import useFetchProducts from '../hooks/useFetchProducts';
import CustomPressable from '../../../components/CustomPressable';
import { AntDesign } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import HeartButton from '../../../components/HeartButton';
import useSearch from '../hooks/useSearch';
import FiltersModal from './FiltersModal';
import useColors from '../../../hooks/useColors';
import { useNavigation } from '@react-navigation/native';
import withBackground from '../../../components/withBackground';

function Products({ toggleSettingsModalVisible }) {
  const [refreshing, setRefreshing] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const { search, setSearch, searchVisible, toggleSearchVisible, handleFilter, filters } = useSearch();
  const { products, changePage } = useFetchProducts(refreshing, search, filters);
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const { navigate } = useNavigation();

  function toggleFiltersModalVisible() {
    setFilterModalVisible((state) => {
      if (state) {
        handleFilter(checked, 'isNew', true)
      }
      return !state;
    });
  }

  function onRefresh() {
    setRefreshing(true);
    handleFilter(false, 'isNew');
    setSearch('');

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);

  }

  function navigateToWishList() {
    navigate('WishList');
  }

  function onContactsPress(type) {
    const actions = {
      email: 'mailto',
      phone: 'tel',
      web: 'https'
    };
    const endpoints = {
      email: 'email@icloud.com',
      phone: '123456789',
      web: 'https://google.com'
    };
    Linking.openURL(`${actions[type]}:${endpoints[type]}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {searchVisible ?
          <TextInput value={search} onChangeText={setSearch} placeholder="Search..." style={styles.input} /> :
          <>
            <CustomPressable style={styles.icon} onPress={() => toggleSettingsModalVisible()}>
              <AntDesign name="setting" color={colors.ICON} size={24} />
            </CustomPressable>
            <CustomPressable style={styles.icon} onPress={() => onContactsPress('email')}>
              <Fontisto name="email" color={colors.ICON} size={24} />
            </CustomPressable>
            <CustomPressable style={styles.icon} onPress={() => onContactsPress('phone')}>
              <Entypo name="phone" color={colors.ICON} size={24} />
            </CustomPressable>
            <CustomPressable style={styles.icon} onPress={() => onContactsPress('web')}>
              <MaterialCommunityIcons name="web" color={colors.ICON} size={24} />
            </CustomPressable>
          </>
        }
        <HeartButton style={styles.icon} onPress={navigateToWishList} active={true} />
        <CustomPressable style={styles.icon} onPress={toggleFiltersModalVisible}>
          <AntDesign name="filter" color={colors.ICON} size={24} />
        </CustomPressable>
        <CustomPressable style={styles.icon} onPress={toggleSearchVisible}>
          <AntDesign name="search1" color={colors.ICON} size={24} />
        </CustomPressable>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} key={item.id} />}
        onEndReached={changePage}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <FiltersModal checked={checked} setChecked={setChecked} modalVisible={filterModalVisible} toggleModalVisible={toggleFiltersModalVisible} />
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingTop: 35,
  },
  header: {
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
  icon: {
    marginLeft: 10
  }
});

export default withBackground(Products);