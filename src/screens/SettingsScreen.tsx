// screens/SettingsScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
  Platform, // <-- Added Platform import here
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Mock language - replace with actual i18n or state management later
const MOCK_CURRENT_LANGUAGE = 'English';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);

  const settingsItems = [
    {
      id: 'profileHeader',
      type: 'header',
    },
    {
      id: 'editProfile',
      label: 'Edit Profile',
      onPress: () => Alert.alert('Navigate', 'Navigate to Edit Profile screen (to be implemented)'),
    },
    {
      id: 'changePassword',
      label: 'Change Password',
      hasArrow: true,
      onPress: () => Alert.alert('Navigate', 'Navigate to Change Password screen (to be implemented)'),
    },
    {
      id: 'languageHeader',
      type: 'header',
      marginTop: 20,
    },
    {
      id: 'language',
      label: 'Language',
      currentValue: MOCK_CURRENT_LANGUAGE,
      hasArrow: true,
      onPress: () => Alert.alert('Navigate', 'Navigate to Language Settings screen (to be implemented)'),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      isToggle: true,
      toggleValue: notificationsEnabled,
      onToggle: toggleNotifications,
    },
    {
      id: 'moreHeader',
      type: 'header',
      marginTop: 20,
    },
    {
      id: 'about',
      label: 'About',
      hasArrow: true,
      onPress: () => Alert.alert('Navigate', 'Navigate to About screen (to be implemented)'),
    },
    {
      id: 'help',
      label: 'Help',
      hasArrow: true,
      onPress: () => Alert.alert('Navigate', 'Navigate to Help screen (to be implemented)'),
    },
    {
      id: 'privacyPolicy',
      label: 'Privacy Policy',
      hasArrow: true,
      onPress: () => Alert.alert('Navigate', 'Navigate to Privacy Policy screen (to be implemented)'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Settings</Text>

        {settingsItems.map((item, index) => {
          if (item.type === 'header') {
            return <View key={item.id} style={{ height: item.marginTop || 0 }} />;
          }
          return (
            <View key={item.id} style={styles.menuItemGroup}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  (index === 0 || settingsItems[index-1]?.type === 'header') && styles.menuItemFirst,
                  (index === settingsItems.length - 1 || settingsItems[index+1]?.type === 'header') && styles.menuItemLastInSection,
                ]}
                onPress={item.onPress}
                disabled={item.isToggle}
              >
                <Text style={styles.menuLabel}>{item.label}</Text>
                <View style={styles.menuRightContainer}>
                  {item.currentValue && (
                    <Text style={styles.menuValue}>{item.currentValue}</Text>
                  )}
                  {item.isToggle ? (
                    <Switch
                      trackColor={{ false: '#767577', true: '#34C759' }}
                      thumbColor={item.toggleValue ? '#FFFFFF' : '#f4f3f4'}
                      ios_backgroundColor="#E9E9EB"
                      onValueChange={item.onToggle}
                      value={item.toggleValue}
                    />
                  ) : item.hasArrow ? (
                    <Ionicons name="chevron-forward-outline" size={22} color="#C7C7CC" />
                  ) : null}
                </View>
              </TouchableOpacity>
              {!(index === settingsItems.length - 1 || settingsItems[index+1]?.type === 'header' || item.isToggle && index === settingsItems.length -1 ) && !settingsItems[index+1]?.marginTop && (
                 <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                 </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 15 : 10, // Use Platform here
    paddingBottom: 5,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    padding: 5,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
    marginBottom: 25,
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  menuItemGroup: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  menuItemFirst: {
    // Removed specific top border radius, handled by menuItemGroup
  },
  menuItemLastInSection: {
     borderBottomWidth: 0,
  },
  dividerContainer: {
      backgroundColor: '#FFFFFF',
      paddingLeft: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
  },
  menuLabel: {
    flex: 1,
    fontSize: 17,
    color: '#333333',
  },
  menuRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: 17,
    color: '#666666',
    marginRight: 8,
  },
});