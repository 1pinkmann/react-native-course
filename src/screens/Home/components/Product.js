import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import useColors from '../../../hooks/useColors';
import useFetchProduct from '../hooks/useFetchProduct';
import HeartButton from '../../../components/HeartButton';
import { AntDesign } from '@expo/vector-icons';
import ProductImageWrapper from '../../../components/Product/ProductImageWrapper';
import useProduct from '../hooks/useProduct';
import ProductPriceWrapper from '../../../components/Product/ProductPriceWrapper';
import withBackground from '../../../components/withBackground';

function Product({ navigation }) {
  const { toggleSaved, saved } = useProduct();
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const { id } = navigation.route.params;
  const { product, isLoading } = useFetchProduct(id);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color="#23bafe" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ProductImageWrapper product={product} customStyles={styles.customImageWrapper} shareIconSize={18} />
      <View style={styles.wrapper}>
        <Text style={[styles.title, styles.textColor]}>{product.title}</Text>
        <HeartButton onPress={toggleSaved} active={saved} />
        <ProductPriceWrapper product={product} />
        <Text style={[styles.description, styles.textColor]}>{product.description}</Text>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonColor}>Buy</Text>
        <AntDesign name="shoppingcart" size={24} color={styles.buttonColor.color} />
      </Pressable>
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    marginHorizontal: 20
  },
  wrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginBottom: 10
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    backgroundColor: '#23bafe'
  },
  buttonColor: {
    color: '#fff'
  },
  description: {
    width: '100%',
    marginTop: 10
  },
  customImageWrapper: {
    imageWrapper: {
      flex: 1,
      width: 'unset',
      height: 'unset',
      maxHeight: 350
    },
    badge: {
      width: 40,
      height: 40,
    },
    badgeText: {
      fontSize: 14
    },
    share: {
      width: 40,
      height: 40,
    },
  }
});

export default withBackground(Product);