import React from 'react';
import Home from '../screens/Home/Home';
import Swiper from '../screens/Swiper/Swiper';
import TabBarIcon from './TabBarIcon';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants';
import Cart from '../screens/Cart/Cart';
import { inject, observer } from 'mobx-react';

const Tab = createBottomTabNavigator();

function RootTabNavigator({ orderStore }) {
  const ordersCount = orderStore.orders.length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarIcon: () => <TabBarIcon />,
          tabBarLabel: ({ focused }) => <Text style={styles.tabBarLabel(focused)}>{route.name}</Text>,
          tabBarStyle: styles.tabBarStyle,
          unmountOnBlur: true,
          tabBarBadge: route.name === 'Cart' && ordersCount > 0 ? ordersCount : null,
        }
      }}
    >
      <Tab.Screen name="Home" children={(navigation) => <Home navigation={navigation} />} />
      <Tab.Screen name="Swiper" component={Swiper} />
      <Tab.Screen name="Cart" component={Cart} options={{ headerShown: true }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarLabel: (focused) => ({
    color: focused ? colors.TAB_BAR_ITEM_FOCUSED : colors.TAB_BAR_ITEM,
    fontSize: 12
  }),
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#9EB1CA',
    height: 56,
    paddingBottom: 5,
    paddingTop: 3,
  }
});

export default inject(({ stores }) => ({ orderStore: stores.orderStore }))(observer(RootTabNavigator));