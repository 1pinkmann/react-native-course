import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../constants';

const map = {
  Home: (props) => <AntDesign name="home" {...props} />,
  Swiper: (props) => <MaterialCommunityIcons name="view-gallery-outline" {...props} />
}

export default function TabBarIcon({ name, focused }) {
  const Icon = map[name];
  return (
    <Icon size={24} color={focused ? colors.TAB_BAR_ITEM_FOCUSED : colors.TAB_BAR_ITEM} />
  )
}
