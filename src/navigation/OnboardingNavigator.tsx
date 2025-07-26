import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import PreferencesScreen from '../screens/onboarding/PreferencesScreen';
import NotificationsScreen from '../screens/onboarding/NotificationsScreen';

const OnboardingStack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
      <OnboardingStack.Screen name="Preferences" component={PreferencesScreen} />
      <OnboardingStack.Screen name="Notifications" component={NotificationsScreen} />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigator;