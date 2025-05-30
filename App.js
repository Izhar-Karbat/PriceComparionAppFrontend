// price_comparison_react_frontend/App.js
import React from 'react'; // Removed useState as it's not used at App level
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// Removed useNavigation as it's not used at App level

// Screen Imports from './screens/' directory
import WelcomeScreen from './screens/WelcomeScreen';
import SupermarketHomeScreen from './screens/SupermarketHomeScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import StoreSelectorScreen from './screens/StoreSelectorScreen';
import StoresNearYouScreen from './screens/StoresNearYouScreen';
import HahishukProductListScreen from './screens/HahishukProductListScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import AccountScreen from './screens/AccountScreen'; // Assuming this is now in ./screens/AccountScreen.js
import SettingsScreen from './screens/SettingsScreen'; // Assuming this is now in ./screens/SettingsScreen.js
import PharmacyHomeScreen from './screens/PharmacyHomeScreen'; // Assuming this is now in ./screens/PharmacyHomeScreen.js
import ElectronicsHomeScreen from './screens/ElectronicsHomeScreen'; // <-- IMPORT NEW ELECTRONICS SCREEN
import ProductSearchScreen from './screens/ProductSearchScreen'; // <-- IMPORT NEW SEARCH SCREEN

// Context
import { CartProvider } from './context/CartContext';

console.log('[App.js] File loaded - Navigator Child Fix Attempt');

// Navigators
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const SupermarketStack = createNativeStackNavigator();
const PharmacyStack = createNativeStackNavigator();
const ElectronicsStack = createNativeStackNavigator(); // <-- NEW STACK FOR ELECTRONICS
const StatisticsStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

// Supermarket Stack Navigator
function SupermarketStackScreen() {
  console.log('[App.js] Rendering SupermarketStackScreen');
  return (
    <SupermarketStack.Navigator screenOptions={{ headerShown: false }}>
      <SupermarketStack.Screen
        name="SupermarketHome"
        component={SupermarketHomeScreen}
        options={{ title: 'Metriks Supermarket' }}
      />
      <SupermarketStack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{ title: 'Your Cart' }}
      />
      <SupermarketStack.Screen
        name="StoreSelector"
        component={StoreSelectorScreen}
        options={{ title: 'Select Stores' }}
      />
      <SupermarketStack.Screen
        name="StoresNearYou"
        component={StoresNearYouScreen}
        options={{ title: 'Stores Near You' }}
      />
      <SupermarketStack.Screen
        name="HahishukProducts"
        component={HahishukProductListScreen}
        options={{ title: 'Hahishuk Products' }}
      />
      <SupermarketStack.Screen
        name="ProductSearch" // Name used in SupermarketHomeScreen navigation
        component={ProductSearchScreen}
      />
    </SupermarketStack.Navigator>
  );
}

// Pharmacy Stack Navigator
function PharmacyStackScreen() {
  console.log('[App.js] Rendering PharmacyStackScreen');
  return (
    <PharmacyStack.Navigator screenOptions={{ headerShown: false }}>
      <PharmacyStack.Screen
        name="PharmacyHome"
        component={PharmacyHomeScreen} // Using the imported screen
      />
      {/* Add other pharmacy-related screens here if needed */}
    </PharmacyStack.Navigator>
  );
}

// Electronics Stack Navigator <-- NEW
function ElectronicsStackScreen() {
  console.log('[App.js] Rendering ElectronicsStackScreen');
  return (
    <ElectronicsStack.Navigator screenOptions={{ headerShown: false }}>
      <ElectronicsStack.Screen
        name="ElectronicsHome"
        component={ElectronicsHomeScreen} // Using the imported screen
      />
      {/* Add other electronics-related screens here, e.g., ElectronicsProductSearch */}
    </ElectronicsStack.Navigator>
  );
}

// Statistics Stack Navigator
function StatisticsStackScreen() {
  console.log('[App.js] Rendering StatisticsStackScreen');
  return (
    <StatisticsStack.Navigator screenOptions={{ headerShown: false }}>
      <StatisticsStack.Screen
        name="StatisticsMain"
        component={StatisticsScreen}
      />
    </StatisticsStack.Navigator>
  );
}

// Account Stack Navigator
function AccountStackScreen() {
  console.log('[App.js] Rendering AccountStackScreen');
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen
        name="AccountMain"
        component={AccountScreen} // Using the imported screen
      />
      <AccountStack.Screen
        name="Settings"
        component={SettingsScreen} // Using the imported screen
      />
    </AccountStack.Navigator>
  );
}

// Main Bottom Tab Navigator
function MainAppTabs() {
  console.log('[App.js] Rendering MainAppTabs');
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'ellipse-outline';
          if (route.name === 'SupermarketTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'PharmacyTab') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (route.name === 'ElectronicsTab') {
            iconName = focused ? 'desktop' : 'desktop-outline';
          } else if (route.name === 'StatisticsTab') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'AccountTab') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          height: Platform.OS === 'android' ? 60 : 80,
          paddingBottom: Platform.OS === 'android' ? 5 : 25
        },
        tabBarLabelStyle: {
          fontSize: 10,
          paddingBottom: Platform.OS === 'ios' ? 0 : 5,
          paddingTop: Platform.OS === 'android' ? 0 : 3
        },
      })}
    >
      <Tab.Screen
        name="SupermarketTab"
        component={SupermarketStackScreen}
        options={{ tabBarLabel: 'Supermarket' }}
      />
      <Tab.Screen
        name="PharmacyTab"
        component={PharmacyStackScreen}
        options={{ tabBarLabel: 'Pharmacy' }}
      />
      <Tab.Screen
        name="ElectronicsTab"
        component={ElectronicsStackScreen} // <-- USE THE NEW ElectronicsStackScreen
        options={{ tabBarLabel: 'Electronics' }}
      />
      <Tab.Screen
        name="StatisticsTab"
        component={StatisticsStackScreen}
        options={{ tabBarLabel: 'Statistics' }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStackScreen}
        options={{ tabBarLabel: 'Account' }}
      />
    </Tab.Navigator>
  );
}

// Root App Component
export default function App() {
  console.log('[App.js] Rendering App component');
  return (
    <CartProvider>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="Welcome" component={WelcomeScreen} />
          <RootStack.Screen name="MainApp" component={MainAppTabs} />
        </RootStack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </CartProvider>
  );
}

// Styles for placeholder screens
const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
