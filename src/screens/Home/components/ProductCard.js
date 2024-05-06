import React, { useMemo, useState } from 'react';
import { Alert, Image, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HeartButton from '../../../components/HeartButton';
import useColors from '../../../hooks/useColors';
import { Entypo } from '@expo/vector-icons';

export default function ProductCard({ product, style }) {
  const [saved, setSaved] = useState(false);
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  function toggleSaved() {
    setSaved(!saved);
  }

  function onCartPress() {
    Alert.alert('Success', 'Product added to cart', [
      { text: 'OK' },
      { text: 'Cancel', style: 'cancel' }
    ]);
  }

  async function onSharePress() {
    try {
      const result = await Share.share({
        message:
          'Share this product with your friends',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.warn(result.activityType);
        } else {
          console.warn('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.warn('Dismissed');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageWrapper}>
        {product.isNew &&
          <View style={styles.badge}>
            <Text style={styles.badgeText}>New</Text>
          </View>
        }
        <Image style={styles.image} source={{ uri: product.image }} />
      </View>
      <View style={styles.wrapper}>
        <Text style={[styles.title, styles.textColor]}>{product.title}</Text>
        <HeartButton onPress={toggleSaved} active={saved} />
        <View style={styles.priceWrapper}>
          <Text style={[styles.price, styles.textColor]}>{product.price}</Text>
          {product.oldPrice &&
            <Text style={[styles.priceOld, styles.textColor]}>{product.oldPrice}</Text>
          }
        </View>
        <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.description, styles.textColor]}>{product.description}</Text>
        <Pressable style={styles.button}>
          <Text style={[styles.buttonText, styles.textColor]}>Buy</Text>
          <AntDesign name="shoppingcart" size={24} color={colors.ICON} onPress={onCartPress} />
        </Pressable>
      </View>
      <Pressable style={styles.share}>
        <Entypo name="share-alternative" size={12} color={colors.SHARE_ICON} onPress={onSharePress} />
      </Pressable>
    </View>
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
  image: {
    flex: 1
  },
  imageWrapper: {
    width: 90,
    height: 90,
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
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors.GREY,
    borderRadius: 50,
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.15
  },
  badgeText: {
    fontSize: 10
  },
  share: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#fff',
    borderRadius: 50
  },
});