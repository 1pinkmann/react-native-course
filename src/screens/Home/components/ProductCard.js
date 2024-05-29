import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HeartButton from '../../../components/HeartButton';
import useColors from '../../../hooks/useColors';
import { useNavigation } from '@react-navigation/native';
import ProductImageWrapper from '../../../components/Product/ProductImageWrapper';
import useProduct from '../hooks/useProduct';
import ProductPriceWrapper from '../../../components/Product/ProductPriceWrapper';
import { inject, observer } from 'mobx-react';

function ProductCard({ product, style, orderStore }) {
  const { toggleSaved, saved } = useProduct();
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const { navigate } = useNavigation();

  function navigateToProduct() {
    navigate('Product', { id: product.id, title: product.title });
  }

  return (
    <Pressable style={[styles.container, style]} onPress={navigateToProduct}>
      <ProductImageWrapper product={product} />
      <View style={styles.wrapper}>
        <Text style={[styles.title, styles.textColor]}>{product.title}</Text>
        <HeartButton onPress={toggleSaved} active={saved} />
        <ProductPriceWrapper product={product} />
        <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.description, styles.textColor]}>{product.description}</Text>
        <Pressable style={styles.button} onPress={() => orderStore.addOrder(product.id)}>
          <Text style={[styles.buttonText, styles.textColor]}>Buy</Text>
          <AntDesign name="shoppingcart" size={24} color={colors.ICON} />
        </Pressable>
      </View>
    </Pressable>
  )
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    borderColor: colors.BORDER,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    backgroundColor: colors.PRODUCT_CARD_BG,
    elevation: 5,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.15,
    position: 'relative'
  },
  wrapper: {
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
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
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  description: {
    width: '100%',
    maxWidth: 150
  },
});

export default inject(({ stores }) => ({ orderStore: stores.orderStore }))(observer(ProductCard));