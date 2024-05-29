import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../constants';
import { inject, observer } from 'mobx-react';

const CartFooter = ({ orderStore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>Total Price: ${orderStore.totalPrice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    borderTopColor: colors.BORDER_COLOR,
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default inject(({ stores }) => ({ orderStore: stores.orderStore }))(observer(CartFooter));