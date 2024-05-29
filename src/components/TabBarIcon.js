import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../constants';
import { useIsFocused, useRoute } from '@react-navigation/native';

const map = {
  Home: (props) => <AntDesign name="home" {...props} />,
  Swiper: (props) => <MaterialCommunityIcons name="view-gallery-outline" {...props} />,
  Cart: (props) => <AntDesign name="shoppingcart" {...props} />,
}

export default function TabBarIcon() {
  const { name } = useRoute();
  const isFocused = useIsFocused();
  const Icon = map[name];

  return (
    <Icon size={24} color={isFocused ? colors.TAB_BAR_ITEM_FOCUSED : colors.TAB_BAR_ITEM} />
  )
}
