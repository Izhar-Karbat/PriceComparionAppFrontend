// price_comparison_react_frontend/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from './screens/WelcomeScreen';
import SupermarketHomeScreen from './screens/SupermarketHomeScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import StoreSelectorScreen from './screens/StoreSelectorScreen.js';
import StoresNearYouScreen from './screens/StoresNearYouScreen';
import HahishukProductListScreen from './screens/HahishukProductListScreen';
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

function SupermarketStackScreen() {
  console.log('[App.js] Rendering SupermarketStackScreen');
  return (
    <SupermarketStack.Navigator>
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
    </SupermarketStack.Navigator>
  );
}

function MainAppTabs() {
  console.log('[App.js] Rendering MainAppTabs');
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // console.log(`[App.js] Rendering tabBarIcon for route: ${route.name}`); // Can be too noisy
          let iconName = 'ellipse-outline'; // Default icon
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
        headerShown: false,
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

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
