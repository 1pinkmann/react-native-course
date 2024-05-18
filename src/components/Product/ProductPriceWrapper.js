import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import useColors from '../../hooks/useColors';

export default function ProductPriceWrapper({ product }) {
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.priceWrapper}>
      <Text style={[styles.price, styles.textColor]}>{product.price}</Text>
      {product.oldPrice &&
        <Text style={[styles.priceOld, styles.textColor]}>{product.oldPrice}</Text>
      }
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  priceWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontWeight: '700'
  },
  textColor: {
    color: colors.TEXT
  },
  priceOld: {
    marginLeft: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
});