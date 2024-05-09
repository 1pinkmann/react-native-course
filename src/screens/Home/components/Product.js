import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useColors from '../../../hooks/useColors';

export default function Product() {
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text>Product</Text>
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingTop: 35,
  },
  header: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 20
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    borderColor: colors.BORDER,
    borderWidth: 1,
    backgroundColor: colors.GREY,
    borderRadius: 5,
    height: '100%'
  },
  icon: {
    marginLeft: 10
  }
});