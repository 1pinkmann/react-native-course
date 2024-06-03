import React, { useContext } from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import ProductCard from './ProductCard';
import withBackground from '../../../components/withBackground';
import { inject, observer } from 'mobx-react';
import Header from './Header';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { HeaderAnimationContext } from '../contexts/HeaderAnimationContext';

function Products({ productsStore }) {
  const { products, refreshing, loadMore, onRefresh } = productsStore;
  const { scrollOffset, onScrollHandler } = useContext(HeaderAnimationContext);

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, 100], [1, 0], 'clamp'),
    height: interpolate(scrollOffset.value, [0, 100], [60, 0], 'clamp'),
  }));

  return (
    <View style={styles.container}>
      <Header style={animatedHeaderStyle} />
      <Animated.FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} key={item.id} />}
        onEndReached={loadMore}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={onScrollHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
  icon: {
    marginLeft: 10
  }
});

export default inject(({ stores }) => ({ productsStore: stores.productsStore }))(withBackground(observer(Products)));