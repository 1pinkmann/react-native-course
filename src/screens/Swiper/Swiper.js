import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions, Image, RefreshControl, Text } from 'react-native';
import useProducts from '../Home/hooks/useProducts';

export default function Swiper() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [page, setPage] = useState(1);
  const { products } = useProducts(page);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const flatListRef = useRef(null);
  const interval = useRef(null);

  const handleScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent;
    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    setActiveIndex(currentIndex);
  }

  const changePage = () => {
    setPage(state => state === products.length - 1 ? state : state + 1);
  }

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshed(true);
      setRefreshing(false);
    }, 3000);
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
        onEndReached={changePage}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <View style={styles.dotsContainer}>
        {products.map((item, index) => (
          <View key={item.id} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
      {refreshed &&
        <Text>Refreshed</Text> // не уверен, что я правильно понял задание. С начала я подумал, что нужно добавлять еще один айтем в data, но в задании №3 говорится "має підзавантажувати 5 новий айтемів", а значит "Намокати обʼєкт який буде добавлятись через 3 секунди після початку рефреша" это что-то другое.
      }
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