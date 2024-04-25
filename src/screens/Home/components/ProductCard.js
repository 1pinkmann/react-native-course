import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function ProductCard({ product, style }) {
  const [saved, setSaved] = useState(false);

  function toggleSaved () {
    setSaved(!saved);
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: product.image }} />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{product.title}</Text>
        <Pressable style={styles.button} onPress={toggleSaved}>
          <AntDesign name="heart" size={24} color={saved ? 'red' : 'black'} />
        </Pressable>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{product.price}</Text>
          {product.oldPrice &&
            <Text style={styles.priceOld}>{product.oldPrice}</Text>
          }
        </View>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.description}>{product.description}</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Buy</Text>
          <AntDesign name="shoppingcart" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    backgroundColor: '#f8f0f0',
    elevation: 5,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.15
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
    fontSize: 16
  },
  priceWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontWeight: '700'
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
  buttonText: {

  }
});