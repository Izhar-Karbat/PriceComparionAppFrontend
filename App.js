// price_comparison_react_frontend/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native'; // Keep Button if used in placeholders
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from './screens/WelcomeScreen';
import SupermarketHomeScreen from './screens/SupermarketHomeScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import StoreSelectorScreen from './screens/StoreSelectorScreen.js'; // Fixed import path
import StoresNearYouScreen from './screens/StoresNearYouScreen';
import { CartProvider } from './context/CartContext'; // <-- Import CartProvider

// Placeholder screens
function PharmacyScreen() { 
  return <View style={styles.placeholderContainer}><Text>Pharmacy Screen</Text></View>;
}
function ElectronicsScreen() { 
  return <View style={styles.placeholderContainer}><Text>Electronics Screen</Text></View>;
}
function AccountScreen() { 
  return <View style={styles.placeholderContainer}><Text>Account Screen</Text></View>;
}

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator(); // Renamed for clarity, was Stack
const SupermarketStack = createNativeStackNavigator();

function SupermarketStackScreen() {
  return (
    <SupermarketStack.Navigator
      // You can define default screenOptions for this stack if needed
      // screenOptions={{ headerShown: false }} 
    >
      <SupermarketStack.Screen 
        name="SupermarketHome" 
        component={SupermarketHomeScreen} 
        options={{ title: 'Metriks Supermarket' }} // Or headerShown: false if custom header in screen
      />
      <SupermarketStack.Screen 
        name="ShoppingCart" 
        component={ShoppingCartScreen} 
        options={{ title: 'Your Cart' }} 
      />
      {/* --- ADDED STORE SELECTOR SCREEN TO THIS STACK --- */}
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
      {/* Add other supermarket-specific screens here, like ProductDetail, SearchResults */}
    </SupermarketStack.Navigator>
  );
}

function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Supermarket') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Pharmacy') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (route.name === 'Electronics') {
            iconName = focused ? 'desktop' : 'desktop-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Headers are handled by individual stack navigators
      })}
    >
      <Tab.Screen 
        name="Supermarket" 
        component={SupermarketStackScreen} 
      />
      <Tab.Screen name="Pharmacy" component={PharmacyScreen} />
      <Tab.Screen name="Electronics" component={ElectronicsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider> {/* <-- Wrap NavigationContainer with CartProvider */}
      <NavigationContainer>
        <RootStack.Navigator // Using RootStack here
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

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
