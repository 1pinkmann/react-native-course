import { useColorScheme } from 'react-native';
import { colors } from '../constants';

export default function useColors () {
  const colorScheme = useColorScheme();
  const handledColors = Object.entries(colors).reduce((acc, [key, value]) => {
    const color = typeof value === 'object' ? value[colorScheme] : value;
    acc[key] = color;
    return acc;
  }, {});
  return handledColors;
};