// price_comparison_react_frontend/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// --- AUTH AND CART CONTEXT PROVIDERS ---
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// --- SCREEN IMPORTS ---
// Main Screens
import WelcomeScreen from './screens/WelcomeScreen';
import SupermarketHomeScreen from './screens/SupermarketHomeScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import StoreSelectorScreen from './screens/StoreSelectorScreen';
import StoresNearYouScreen from './screens/StoresNearYouScreen';
import HahishukProductListScreen from './screens/HahishukProductListScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import AccountScreen from './screens/AccountScreen';
import SettingsScreen from './screens/SettingsScreen';
import PharmacyHomeScreen from './screens/PharmacyHomeScreen';
import ElectronicsHomeScreen from './screens/ElectronicsHomeScreen';
import ProductSearchScreen from './screens/ProductSearchScreen';
// Auth Screens
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import InvitationsScreen from './screens/InvitationsScreen';


// --- NAVIGATORS ---
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const SupermarketStack = createNativeStackNavigator();
const PharmacyStack = createNativeStackNavigator();
const ElectronicsStack = createNativeStackNavigator();
const StatisticsStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

// --- STACK NAVIGATORS PER TAB ---

function SupermarketStackScreen() {
  return (
    <SupermarketStack.Navigator screenOptions={{ headerShown: false }}>
      <SupermarketStack.Screen name="SupermarketHome" component={SupermarketHomeScreen} />
      <SupermarketStack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      <SupermarketStack.Screen name="StoreSelector" component={StoreSelectorScreen} />
      <SupermarketStack.Screen name="StoresNearYou" component={StoresNearYouScreen} />
      <SupermarketStack.Screen name="HahishukProducts" component={HahishukProductListScreen} />
      <SupermarketStack.Screen name="ProductSearch" component={ProductSearchScreen} />
    </SupermarketStack.Navigator>
  );
}

function PharmacyStackScreen() {
  return (
    <PharmacyStack.Navigator screenOptions={{ headerShown: false }}>
      <PharmacyStack.Screen name="PharmacyHome" component={PharmacyHomeScreen} />
    </PharmacyStack.Navigator>
  );
}

function ElectronicsStackScreen() {
  return (
    <ElectronicsStack.Navigator screenOptions={{ headerShown: false }}>
      <ElectronicsStack.Screen name="ElectronicsHome" component={ElectronicsHomeScreen} />
    </ElectronicsStack.Navigator>
  );
}

function StatisticsStackScreen() {
  return (
    <StatisticsStack.Navigator screenOptions={{ headerShown: false }}>
      <StatisticsStack.Screen name="StatisticsMain" component={StatisticsScreen} />
    </StatisticsStack.Navigator>
  );
}

// AccountStack will now only contain the main AccountScreen.
// Settings, Login, and SignUp will be presented modally by the RootStack.
function AccountStackScreen() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="AccountMain" component={AccountScreen} />
      {/* Settings is now in the RootStack to allow it to be a modal */}
    </AccountStack.Navigator>
  );
}

// --- MAIN BOTTOM TAB NAVIGATOR ---
// This is the primary UI for browsing the app.
function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'SupermarketTab') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'PharmacyTab') iconName = focused ? 'medkit' : 'medkit-outline';
          else if (route.name === 'ElectronicsTab') iconName = focused ? 'desktop' : 'desktop-outline';
          else if (route.name === 'StatisticsTab') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'AccountTab') iconName = focused ? 'person-circle' : 'person-circle-outline';
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
      <Tab.Screen name="SupermarketTab" component={SupermarketStackScreen} options={{ tabBarLabel: 'Supermarket' }} />
      <Tab.Screen name="PharmacyTab" component={PharmacyStackScreen} options={{ tabBarLabel: 'Pharmacy' }}/>
      <Tab.Screen name="ElectronicsTab" component={ElectronicsStackScreen} options={{ tabBarLabel: 'Electronics' }} />
      <Tab.Screen name="StatisticsTab" component={StatisticsStackScreen} options={{ tabBarLabel: 'Statistics' }} />
      <Tab.Screen name="AccountTab" component={AccountStackScreen} options={{ tabBarLabel: 'Account' }} />
    </Tab.Navigator>
  );
}

// --- ROOT APP COMPONENT & NAVIGATOR ---
// This is the highest level navigator. It contains the main tabbed app,
// and also defines the modal screens for Login, SignUp, and Settings.
export default function App() {
  return (
    // Wrap the entire app in the context providers
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {/* The MainAppTabs is the default screen. No login wall. */}
            <RootStack.Screen name="MainApp" component={MainAppTabs} />
            
            {/* These screens will slide up from the bottom over the main app */}
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
              <RootStack.Screen name="Login" component={LoginScreen} />
              <RootStack.Screen name="SignUp" component={SignUpScreen} />
              <RootStack.Screen name="Settings" component={SettingsScreen} />
              <RootStack.Screen name="Invitations" component={InvitationsScreen} />
            </RootStack.Group>

          </RootStack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
