import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Home from './src/screens/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Swiper from './src/screens/Swiper/Swiper';
import useColors from './src/hooks/useColors';
import { useMemo } from 'react';

const queryClient = new QueryClient()

export default function App() {
  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <Home />
        {/* <Swiper /> */}
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
