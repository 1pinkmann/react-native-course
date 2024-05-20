import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Button, Alert } from 'react-native';
import useColors from '../../hooks/useColors';
import { inject, observer } from 'mobx-react';
import CartItem from './components/CartItem';
import CartFooter from './components/CartFooter';

const Cart = ({ orderStore }) => {
  const { orderedProducts, fetchPizzasByIds, totalPrice, clearOrders } = orderStore;
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  function onCheckout() {
    Alert.alert('Checkout', `Order for $${totalPrice} has been placed!`);
    clearOrders();
  }

  useEffect(() => {
    fetchPizzasByIds();
  }, []);

  return (
    <View style={styles.container}>
      {orderedProducts?.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <ScrollView>
            {orderedProducts.map(item => <CartItem item={item} key={item.id} />)}
          </ScrollView>
          <CartFooter />
          <Button title="Checkout" onPress={onCheckout} />
        </>
      )}
    </View>
  );
};

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  emptyText: {
    marginVertical: 30,
    textAlign: 'center',
    fontSize: 20,
  },
});


export default inject(({ stores }) => ({ orderStore: stores.orderStore }))(observer(Cart));
