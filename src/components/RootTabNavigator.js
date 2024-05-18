import React from 'react';
import Home from '../screens/Home/Home';
import Swiper from '../screens/Swiper/Swiper';
import TabBarIcon from './TabBarIcon';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants';

const Tab = createBottomTabNavigator();

export default function RootTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarIcon: () => <TabBarIcon />,
          tabBarLabel: ({ focused }) => <Text style={styles.tabBarLabel(focused)}>{route.name}</Text>,
          tabBarStyle: styles.tabBarStyle,
          unmountOnBlur: true
        }
      }}
    >
      <Tab.Screen name="Home" children={(navigation) => <Home navigation={navigation} />} />
      <Tab.Screen name="Swiper" component={Swiper} />
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