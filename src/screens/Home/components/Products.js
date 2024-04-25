import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { products } from '../../../../data/products.json';
import ProductCard from './ProductCard';

export default function Products() {
  return (
    <ScrollView style={styles.container}>
      {products.map(product => {
        return (
          <ProductCard product={product} key={product.id} />
        );
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 15
  }
});