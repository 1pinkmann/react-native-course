import React from 'react';
import Products from './components/Products';
import { createStackNavigator } from '@react-navigation/stack';
import Product from './components/Product';

const Stack = createStackNavigator();

export default function Home() {
  function getProductOptions({ route }) {
    return {
      headerShown: true,
      headerTitle: route.params.title
    }
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Product" component={Product} options={getProductOptions} />
    </Stack.Navigator>
  )
}