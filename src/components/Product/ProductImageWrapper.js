import React, { useMemo } from 'react'
import { Alert, Image, Pressable, Share, StyleSheet, Text, View } from 'react-native'
import useColors from '../../hooks/useColors';
import { Entypo } from '@expo/vector-icons';

export default function ProductImageWrapper({ customStyles, product, shareIconSize = 12 }) {
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  function combineStyles(styleName) {
    return [styles[styleName], customStyles && customStyles[styleName]];
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
    <View style={combineStyles('imageWrapper')}>
      {product.isNew &&
        <View style={combineStyles('badge')}>
          <Text style={combineStyles('badgeText')}>New</Text>
        </View>
      }
      <Pressable style={combineStyles('share')}>
        <Entypo name="share-alternative" size={shareIconSize} color={colors.SHARE_ICON} onPress={onSharePress} />
      </Pressable>
      <Image style={styles.image} source={{ uri: product.image }} />
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  image: {
    flex: 1
  },
  imageWrapper: {
    width: 90,
    height: 90,
    position: 'relative'
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
    top: -10,
    left: -10,
    backgroundColor: '#fff',
    borderRadius: 50,
    zIndex: 1
  },
});