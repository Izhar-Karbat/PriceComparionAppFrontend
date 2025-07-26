import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { designTokens } from '../../theme/designTokens';
import { CommonActions, useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  
  // This function marks onboarding as complete and triggers a re-render
  // of the App component, which will automatically show the MainApp.
  const finishOnboarding = async () => {
    try {
      // You can add push notification permission logic here in the future
      await AsyncStorage.setItem('@hasOnboarded', 'true');
      
      // Navigate to the root navigator and let App.js handle the transition
      navigation.getParent()?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        })
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to save settings.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>=</Text>
        <Text style={styles.title}>Don't miss a deal</Text>
        <Text style={styles.subtitle}>
          Enable notifications to get alerts on price drops for products you follow.
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={finishOnboarding}>
          <Text style={styles.buttonText}>Enable Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={finishOnboarding}>
          <Text style={styles.secondaryButtonText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designTokens.colors.background,
    padding: designTokens.spacing.large,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: designTokens.spacing.large,
  },
  title: {
    fontSize: designTokens.fontSizes.title,
    fontWeight: 'bold',
    color: designTokens.colors.primary,
    textAlign: 'center',
    marginBottom: designTokens.spacing.medium,
  },
  subtitle: {
    fontSize: designTokens.fontSizes.body,
    color: designTokens.colors.text,
    textAlign: 'center',
    paddingHorizontal: designTokens.spacing.medium,
  },
  button: {
    backgroundColor: designTokens.colors.primary,
    padding: designTokens.spacing.medium,
    borderRadius: designTokens.borderRadius.medium,
    alignItems: 'center',
    marginBottom: designTokens.spacing.medium,
  },
  buttonText: {
    color: designTokens.colors.white,
    fontSize: designTokens.fontSizes.button,
    fontWeight: 'bold',
  },
  secondaryButton: {
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: designTokens.colors.textSecondary,
    fontSize: designTokens.fontSizes.body,
  },
});

export default NotificationsScreen;