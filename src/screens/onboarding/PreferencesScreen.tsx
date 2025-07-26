import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { designTokens } from '../../theme/designTokens';

// This should be the same definition as in WelcomeScreen
type OnboardingStackParamList = {
  Welcome: undefined;
  Preferences: undefined;
  Notifications: undefined;
};

type PreferencesScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Preferences'>;

const PREFERENCES_DATA = [
  'Cosmetics & Makeup',
  'Supplements & Vitamins',
  'Baby Products',
  'Toiletries',
  'Medications',
  'Health & Wellness',
];

const PreferencesScreen = () => {
  const navigation = useNavigation<PreferencesScreenNavigationProp>();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = selected.includes(item);
    return (
      <TouchableOpacity
        style={[styles.tag, isSelected && styles.tagSelected]}
        onPress={() => toggleSelection(item)}
      >
        <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Tell us what you like</Text>
        <Text style={styles.subtitle}>Select your interests to get personalized deals.</Text>
        <FlatList
          data={PREFERENCES_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notifications')}>
        <Text style={styles.buttonText}>Next</Text>
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
  title: {
    fontSize: designTokens.fontSizes.title,
    fontWeight: 'bold',
    color: designTokens.colors.primary,
    textAlign: 'center',
    marginTop: designTokens.spacing.large,
    marginBottom: designTokens.spacing.small,
  },
  subtitle: {
    fontSize: designTokens.fontSizes.body,
    color: designTokens.colors.text,
    textAlign: 'center',
    marginBottom: designTokens.spacing.large,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: designTokens.colors.gray.light,
    borderRadius: designTokens.borderRadius.large,
    paddingVertical: designTokens.spacing.small,
    paddingHorizontal: designTokens.spacing.medium,
    margin: designTokens.spacing.small,
  },
  tagSelected: {
    backgroundColor: designTokens.colors.accent,
  },
  tagText: {
    color: designTokens.colors.text,
    fontSize: designTokens.fontSizes.body,
  },
  tagTextSelected: {
    color: designTokens.colors.white,
    fontWeight: 'bold',
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

export default PreferencesScreen;