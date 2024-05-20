import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import ProductImageWrapper from '../../../components/Product/ProductImageWrapper'
import ProductPriceWrapper from '../../../components/Product/ProductPriceWrapper'
import NumericPicker from '../../../components/NumericPicker'
import { inject, observer } from 'mobx-react'

function CartItem({ item, orderStore }) {
  const { removeOrder, decrementQuantity, incrementQuantity, getQuantity } = orderStore;

  return (
    <View style={styles.order}>
      <ProductImageWrapper product={item} shareShown={false} />
      <View style={styles.column}>
        <Text style={styles.name}>{item.title}</Text>
        <ProductPriceWrapper product={item} textColor="#000" />
        <View style={styles.buttonsRow}>
          <Button title="Remove" onPress={() => removeOrder(item.id)} />
          <NumericPicker value={getQuantity(item.id)} decrementQuantity={() => decrementQuantity(item.id)} incrementQuantity={() => incrementQuantity(item.id)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  column: {
    marginLeft: 10,
    flex: 1
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default inject(({ stores }) => ({ orderStore: stores.orderStore }))(observer(CartItem));