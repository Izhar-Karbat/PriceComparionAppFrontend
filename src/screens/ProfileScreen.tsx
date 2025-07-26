import React from 'react';
import { View, Text, StyleSheet, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
import ProfileListItem from '../components/profile/ProfileListItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation param list for the stack that ProfileScreen lives in
// This allows type-safe navigation
type RootStackParamList = {
    Profile: undefined;
    SavedItems: undefined; // Add SavedItems here
    // ... any other screens in this stack
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  const handlePress = (action: string) => {
    Alert.alert('Navigate', `This would navigate to ${action}.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Izhar Karbat</Text>
          <Text style={styles.email}>izhar.k@email.com</Text>
        </View>

        <View style={styles.menuSection}>
          {/* --- THIS IS THE NEW ITEM --- */}
          <ProfileListItem
            label="Saved Items"
            icon="💾"
            onPress={() => navigation.navigate('SavedItems')}
          />
          <ProfileListItem
            label="Manage Preferences"
            icon="⚙️"
            onPress={() => handlePress('Preferences')}
          />
          <ProfileListItem
            label="Notification Settings"
            icon="🔔"
            onPress={() => handlePress('Notifications')}
          />
          <ProfileListItem
            label="Privacy Policy"
            icon="🛡️"
            onPress={() => handlePress('Privacy Policy')}
          />
        </View>

        <View style={styles.menuSection}>
          <ProfileListItem
            label="Logout"
            icon="🚪"
            onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
            isDestructive={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  menuSection: {
    marginTop: 25,
    backgroundColor: '#FFFFFF',
  },
});

export default ProfileScreen;