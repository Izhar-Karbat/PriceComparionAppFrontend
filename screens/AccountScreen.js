// screens/AccountScreen.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  // Removed Share from here, as it's better to implement Share API when fully functional
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Mock user data - replace with actual data source later
const MOCK_USER_ACCOUNT = {
  name: 'Lior Cohen',
  email: 'lior@example.com',
  avatar: 'https://via.placeholder.com/100/FFA500/FFFFFF?Text=LC', // Placeholder image URL
};

export default function AccountScreen() {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings-outline',
      onPress: () => {
        navigation.navigate('Settings'); // Navigates to SettingsScreen defined in App.js stack
      },
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: 'heart-outline',
      onPress: () => {
        Alert.alert('Navigate', 'Navigate to Favorites screen (to be implemented)');
        // navigation.navigate('FavoritesScreen'); // Example
      },
    },
    {
      id: 'history',
      label: 'Transaction History',
      icon: 'time-outline',
      onPress: () => {
        Alert.alert('Navigate', 'Navigate to Transaction History screen (to be implemented)');
        // navigation.navigate('OrderHistoryScreen'); // Example
      },
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: 'people-outline',
      onPress: () => {
        Alert.alert('Navigate', 'Navigate to Friends screen (to be implemented)');
        // navigation.navigate('FriendsScreen'); // Example
      },
    },
    {
      id: 'shareApp',
      label: 'Share this app',
      icon: 'share-social-outline',
      onPress: async () => {
        // For a real implementation, you would use React Native's Share API here:
        // import { Share } from 'react-native';
        // try {
        //   await Share.share({
        //     message: 'Check out Metriks, a great app for price comparison! [Your App Link Here]',
        //     title: 'Share Metriks App'
        //   });
        // } catch (error) {
        //   Alert.alert(error.message);
        // }
        Alert.alert('Share App', 'Sharing functionality to be implemented using React Native Share API.');
      },
    },
  ];

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        onPress: () => {
          // In a real app, clear user session, tokens, etc.
          // Navigate to the root/welcome screen.
          navigation.getParent()?.getParent()?.navigate('Welcome');
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Account</Text>

        <View style={styles.profileCard}>
          <Image source={{ uri: MOCK_USER_ACCOUNT.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{MOCK_USER_ACCOUNT.name}</Text>
            <Text style={styles.profileEmail}>{MOCK_USER_ACCOUNT.email}</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={item.onPress}
            >
              <Ionicons name={item.icon} size={24} color="#007AFF" style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward-outline" size={22} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles using the color scheme you confirmed
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#E5E7EB',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 18,
  },
  menuLabel: {
    flex: 1,
    fontSize: 17,
    color: '#333333',
  },
  menuValue: {
    fontSize: 17,
    color: '#666666',
    marginRight: 8,
  },
  logoutSection: {
    marginHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  logoutButtonText: {
    fontSize: 17,
    color: '#FF3B30',
    fontWeight: '500',
  },
});