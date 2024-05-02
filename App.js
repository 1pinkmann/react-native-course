import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Home from './src/screens/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Swiper from './src/screens/Swiper/Swiper';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        {/* <Home /> */}
        <Swiper />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
