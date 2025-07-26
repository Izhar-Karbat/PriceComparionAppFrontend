import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { designTokens } from '../../theme/designTokens';

// Define the type for the navigation stack
type OnboardingStackParamList = {
  Welcome: undefined;
  Preferences: undefined;
  Notifications: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* You can replace this with your actual logo */}
        <Image source={require('../../assets/react.svg')} style={styles.logo} />
        <Text style={styles.title}>Welcome to PharmMate</Text>
        <Text style={styles.subtitle}>
          Your smart companion for fighting overpricing and making informed choices at the pharmacy.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Preferences')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
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
  logo: {
    width: 120,
    height: 120,
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
  },
  buttonText: {
    color: designTokens.colors.white,
    fontSize: designTokens.fontSizes.button,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;