import React, { createContext, useState } from 'react';
import { runOnJS, useAnimatedScrollHandler, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';

export const HeaderAnimationContext = createContext();

const INITIAL_INPUT_POSITION = -420;

export default function HeaderAnimationProvider({ children }) {
  const [animatedTextInputVisible, setAnimatedTextInputVisible] = useState(false);
  const inputOffsetX = useSharedValue(INITIAL_INPUT_POSITION);
  const iconsOffsetX = useSharedValue(0);
  const scrollOffset = useSharedValue(0);

  function toggleAnimatedTextInputVisible() {
    if (animatedTextInputVisible) {
      iconsOffsetX.value = withSpring(0, { mass: 0.4 });
      inputOffsetX.value = withDelay(100, withSpring(INITIAL_INPUT_POSITION, { mass: 0.4 }, () => {
        runOnJS(setAnimatedTextInputVisible)(false);
      }));
    } else {
      setAnimatedTextInputVisible(true);
      iconsOffsetX.value = withDelay(70, withSpring(300, { mass: 0.4 }));
    }
  }

  const onScrollHandler = useAnimatedScrollHandler((event) => {
    scrollOffset.value = event.contentOffset.y;
  });

  return (
    <HeaderAnimationContext.Provider value={{ toggleAnimatedTextInputVisible, animatedTextInputVisible, inputOffsetX, iconsOffsetX, onScrollHandler, scrollOffset }}>
      {children}
    </HeaderAnimationContext.Provider>
  );
}
