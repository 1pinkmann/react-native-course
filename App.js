import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import SettingsModal from './src/modals/SettingsModal';
import { createStackNavigator } from '@react-navigation/stack';
import RootTabNavigator from './src/components/RootTabNavigator';
import SearchProvider from './src/contexts/SearchProvider';
import FiltersModal from './src/modals/FiltersModal';
import WishListModal from './src/modals/WishListModal';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SearchProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator initialRouteName="Root">
              <Stack.Screen name="Root" component={RootTabNavigator} />
              <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false, animation: 'flip', cardStyle: { flex: 1, justifyContent: 'flex-end' } }}>
                <Stack.Screen name="Settings" component={SettingsModal} options={{ presentation: 'transparentModal' }} />
                <Stack.Screen name="WishList" component={WishListModal} />
                <Stack.Screen name="Filters" component={FiltersModal} options={{ presentation: 'transparentModal' }} />
              </Stack.Group>
            </Stack.Navigator>
          </SafeAreaView>
        </QueryClientProvider>
      </SearchProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
