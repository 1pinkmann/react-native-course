import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function NumericPicker ({ value, incrementQuantity, decrementQuantity }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrementQuantity}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity style={styles.button} onPress={incrementQuantity}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 5
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default observer(NumericPicker);
