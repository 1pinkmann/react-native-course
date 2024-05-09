import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, } from 'react-native';
import Home from './src/screens/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Swiper from './src/screens/Swiper/Swiper';
import TabBarIcon from './src/components/TabBarIcon';
import { colors } from './src/constants';
import SettingsModal from './src/components/SettingsModal';
import { useState } from 'react';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

export default function App() {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  function toggleSettingsModalVisible() {
    setSettingsModalVisible(!settingsModalVisible);
  }

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <Tab.Navigator
            screenOptions={({ route }) => {
              return { 
                headerShown: false, 
                tabBarIcon: () => <TabBarIcon />,
                tabBarLabel: ({ focused }) => <Text style={styles.tabBarLabel(focused)}>{route.name}</Text>,
                tabBarStyle: styles.tabBarStyle,
                unmountOnBlur: true
              }
            }}
          >
            <Tab.Screen name="Home" children={(navigation) => <Home navigation={navigation} toggleSettingsModalVisible={toggleSettingsModalVisible} />} />
            <Tab.Screen name="Swiper" component={Swiper} />
          </Tab.Navigator>
          <SettingsModal modalVisible={settingsModalVisible} toggleModalVisible={toggleSettingsModalVisible} />
        </SafeAreaView>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  tabBarLabel: (focused) => ({
    color: focused ? colors.TAB_BAR_ITEM_FOCUSED : colors.TAB_BAR_ITEM,
    fontSize: 12
  }),
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#9EB1CA',
    height: 56,
    paddingBottom: 5,
    paddingTop: 3,
  }
});
