import React from 'react';
import Products from './components/Products';
import { createStackNavigator } from '@react-navigation/stack';
import Product from './components/Product';
import HeaderAnimationProvider from './contexts/HeaderAnimationContext';

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
      <Stack.Screen name="Products" children={() => {
        return (
          <HeaderAnimationProvider>
            <Products />
          </HeaderAnimationProvider>
        );
      }} />
      <Stack.Screen name="Product" component={Product} options={getProductOptions} />
    </Stack.Navigator>
  )
}