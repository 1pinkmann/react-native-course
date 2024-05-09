import React from 'react';
import Products from './components/Products';
import { createStackNavigator } from '@react-navigation/stack';
import Product from './components/Product';
import WishList from './modals/WishList';

const Stack = createStackNavigator();

export default function Home({ toggleSettingsModalVisible }) {
  function getProductOptions({ route }) {
    return {
      headerShown: true,
      headerTitle: route.params.title
    }
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Products" children={() => <Products toggleSettingsModalVisible={toggleSettingsModalVisible} />} />
      <Stack.Screen name="Product" children={(navigation) => <Product navigation={navigation} />} options={getProductOptions} />
      <Stack.Screen name="WishList" component={WishList} options={{ presentation: 'modal', animation: 'flip', cardStyle: { flex: 1, justifyContent: 'flex-end' } }} />
    </Stack.Navigator>
  )
}