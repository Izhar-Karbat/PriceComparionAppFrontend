// price_comparison_react_frontend/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native'; // Keep this
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from './screens/WelcomeScreen';
import SupermarketHomeScreen from './screens/SupermarketHomeScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import StoreSelectorScreen from './screens/StoreSelectorScreen.js';
import StoresNearYouScreen from './screens/StoresNearYouScreen';
import HahishukProductListScreen from './screens/HahishukProductListScreen';
import StatisticsScreen from './screens/StatisticsScreen'; // <-- IMPORT THE NEW SCREEN
import { CartProvider } from './context/CartContext';

// --- DEBUGGING ---
console.log('[App.js] File loaded');

// Placeholder screens
function PharmacyScreen() {
  console.log('[App.js] Rendering PharmacyScreen');
  return <View style={styles.placeholderContainer}><Text>Pharmacy Screen</Text></View>;
}
function ElectronicsScreen() {
  console.log('[App.js] Rendering ElectronicsScreen');
  return <View style={styles.placeholderContainer}><Text>Electronics Screen</Text></View>;
}
function AccountScreen() {
  console.log('[App.js] Rendering AccountScreen');
  return <View style={styles.placeholderContainer}><Text>Account Screen</Text></View>;
}

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const SupermarketStack = createNativeStackNavigator();
const StatisticsStack = createNativeStackNavigator(); // <-- ADD STACK FOR STATISTICS

function SupermarketStackScreen() {
  console.log('[App.js] Rendering SupermarketStackScreen');
  return (
    <SupermarketStack.Navigator>
      <SupermarketStack.Screen
        name="SupermarketHome"
        component={SupermarketHomeScreen}
        options={{ title: 'Metriks Supermarket' }} // You might want to use a translation key here
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
    </SupermarketStack.Navigator>
  );
}

// Stack for Statistics tab
function StatisticsStackScreen() {
  console.log('[App.js] Rendering StatisticsStackScreen');
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen
        name="StatisticsMain"
        component={StatisticsScreen}
        options={{ title: 'Statistics' }} // This title will appear in the header for this tab
      />
      {/* You can add more screens to this stack if the Statistics tab needs deeper navigation */}
    </StatisticsStack.Navigator>
  );
}


function MainAppTabs() {
  console.log('[App.js] Rendering MainAppTabs');
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'ellipse-outline';
          if (route.name === 'SupermarketTab') { // Changed to SupermarketTab to avoid conflict
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'PharmacyTab') { // Changed to PharmacyTab
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (route.name === 'ElectronicsTab') { // Changed to ElectronicsTab
            iconName = focused ? 'desktop' : 'desktop-outline';
          } else if (route.name === 'StatisticsTab') { // <-- ADD ICON FOR STATISTICS
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'AccountTab') { // Changed to AccountTab
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Header for each tab is handled by its respective StackNavigator
      })}
    >
      <Tab.Screen
        name="SupermarketTab" // Changed name to avoid conflict
        component={SupermarketStackScreen}
        options={{ tabBarLabel: 'Supermarket' }} // Label for the tab
      />
      <Tab.Screen 
        name="PharmacyTab" 
        component={PharmacyScreen} 
        options={{ tabBarLabel: 'Pharmacy' }}
      />
      <Tab.Screen 
        name="ElectronicsTab" 
        component={ElectronicsScreen} 
        options={{ tabBarLabel: 'Electronics' }}
      />
      <Tab.Screen // <-- ADD STATISTICS TAB
        name="StatisticsTab"
        component={StatisticsStackScreen} // Use the new stack
        options={{ tabBarLabel: 'Statistics' }}
      />
      <Tab.Screen 
        name="AccountTab" 
        component={AccountScreen} 
        options={{ tabBarLabel: 'Account' }}
      />
    </Tab.Navigator>
  );
}

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

const styles = StyleSheet.create({ // Keep existing styles
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});