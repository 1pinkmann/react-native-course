import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import useColors from '../hooks/useColors';

export default function withBackground(Component) {
  return () => {
    const colors = useColors();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
      <View style={styles.container}>
        <Component />
      </View>
    )
  }
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND,
  },
});