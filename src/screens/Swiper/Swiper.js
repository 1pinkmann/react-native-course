import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions, Image, RefreshControl } from 'react-native';
import withBackground from '../../components/withBackground';
import { observer } from 'mobx-react';
import ProductsStore from '../../stores/ProductsStore';

const productsStore = new ProductsStore(); // Swiper must have its own state

function Swiper() {
  const { refreshing, products, loadMore, onRefresh, loadProducts } = productsStore;
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const flatListRef = useRef(null);
  const interval = useRef(null);

  const handleScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent;
    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    setActiveIndex(currentIndex);
  }

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = setInterval(() => {
      const nextIndex = activeIndex === products.length - 1 ? 0 : activeIndex + 1;
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }, 5000);

    return () => {
      clearInterval(interval.current);
    }
  }, [activeIndex]);

  useEffect(() => {
    loadProducts(true);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        data={products}
        renderItem={({ item }) => <Image key={item.id} style={styles.item(width)} source={{ uri: item.image }} />}
        ref={flatListRef}
        onEndReached={loadMore}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <View style={styles.dotsContainer}>
        {products.map((item, index) => (
          <View key={item.id} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'gray',
  },
  activeDot: {
    backgroundColor: 'black',
  },
  item: (width) => ({
    width: width - 20,
    height: '100%',
    marginHorizontal: 10
  })
});

export default withBackground(observer(Swiper));