import React from 'react';
import Products from './components/Products';
import withBackground from '../../components/withBackground';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './components/Product';

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Products'>
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  )
}

export default withBackground(Home);