import React, { useContext, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { colors } from '../constants';
import { HeaderAnimationContext } from '../screens/Home/contexts/HeaderAnimationContext';

const AnimatedTextInputComponent = Animated.createAnimatedComponent(TextInput);

export default function AnimatedTextInput({ store, ...props }) {
  const { inputOffsetX } = useContext(HeaderAnimationContext);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: inputOffsetX.value }]
    }
  });

  useEffect(() => {
    inputOffsetX.value = withSpring(0, { mass: 0.4 });
  }, []);

  return <AnimatedTextInputComponent {...props} style={[styles.input, animatedStyles]} />;
}

const styles = StyleSheet.create({
  input: {
    position: 'absolute',
    width: 320,
    left: 0,
    flex: 1,
    paddingHorizontal: 15,
    borderColor: colors.BORDER,
    borderWidth: 1,
    backgroundColor: colors.GREY,
    borderRadius: 5,
    height: 40
  },
})