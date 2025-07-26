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
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import StoreSelectorScreen from './screens/StoreSelectorScreen';
import StoresNearYouScreen from './screens/StoresNearYouScreen';
import AccountScreen from './screens/AccountScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProductSearchScreen from './screens/ProductSearchScreen';
import SearchScreen from './screens/SearchScreen';
// Auth Screens
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import InvitationsScreen from './screens/InvitationsScreen';


// --- NAVIGATORS ---
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const SavedStack = createNativeStackNavigator();

// --- STACK NAVIGATORS PER TAB ---

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="StoreSelector" component={StoreSelectorScreen} />
      <HomeStack.Screen name="StoresNearYou" component={StoresNearYouScreen} />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
      <SearchStack.Screen name="ProductSearch" component={ProductSearchScreen} />
    </SearchStack.Navigator>
  );
}

function CartStackScreen() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
    </CartStack.Navigator>
  );
}

function SavedStackScreen() {
  return (
    <SavedStack.Navigator screenOptions={{ headerShown: false }}>
      <SavedStack.Screen name="SavedItems" component={AccountScreen} />
    </SavedStack.Navigator>
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
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Scan') iconName = focused ? 'scan-circle' : 'scan-circle-outline';
          else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Saved') iconName = focused ? 'heart' : 'heart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2A5959',
        tabBarInactiveTintColor: '#999',
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
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Search" component={SearchStackScreen} options={{ tabBarLabel: 'Search' }}/>
      <Tab.Screen 
        name="Scan" 
        component={HomeStackScreen} 
        options={{ 
          tabBarLabel: 'Scan',
          tabBarIcon: ({ focused, color }) => (
            <View style={{
              backgroundColor: '#2A5959',
              borderRadius: 30,
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <Ionicons name="scan" size={30} color="#FFFFFF" />
            </View>
          )
        }} 
      />
      <Tab.Screen name="Cart" component={CartStackScreen} options={{ tabBarLabel: 'Cart' }} />
      <Tab.Screen name="Saved" component={SavedStackScreen} options={{ tabBarLabel: 'Saved' }} />
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
            {/* Welcome screen as initial route */}
            <RootStack.Screen name="Welcome" component={WelcomeScreen} />
            {/* The MainAppTabs is the second screen */}
            <RootStack.Screen name="MainApp" component={MainAppTabs} />
            
            {/* These screens will slide up from the bottom over the main app */}
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
              <RootStack.Screen name="Login" component={LoginScreen} />
              <RootStack.Screen name="SignUp" component={SignUpScreen} />
              <RootStack.Screen name="Settings" component={SettingsScreen} />
              <RootStack.Screen name="Invitations" component={InvitationsScreen} />
              <RootStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            </RootStack.Group>

          </RootStack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
