// screens/SupermarketHomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  Switch, // Added Switch
  Platform,
  ActivityIndicator, // Added for location loading
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'; // Added for location
import { useCart } from '../context/CartContext';

// Test location for Sderot, Israel
const TEST_LOCATION_SDEROT = {
  latitude: 31.5240,
  longitude: 34.5958,
};

// Mock data (can be removed or adjusted as per your actual data flow)
const recentlyViewedData = [
  { id: 'rv1', name: 'Organic Bananas', imageUri: 'https://via.placeholder.com/80x80.png?text=Bananas' },
  { id: 'rv2', name: 'Whole Milk 1L', imageUri: 'https://via.placeholder.com/80x80.png?text=Milk' },
  { id: 'rv3', name: 'Artisan Bread', imageUri: 'https://via.placeholder.com/80x80.png?text=Bread' },
];
const popularCategoriesData = [
  { id: 'cat1', name: 'Fresh Produce', icon: 'leaf-outline' },
  { id: 'cat2', name: 'Dairy & Eggs', icon: 'egg-outline' },
  { id: 'cat3', name: 'Bakery', icon: 'storefront-outline' }, // Placeholder, find better bakery icon
  { id: 'cat4', name: 'Beverages', icon: 'beer-outline' },
];

export default function SupermarketHomeScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const { getCartItemCount } = useCart();

  const [searchNearby, setSearchNearby] = useState(false); // State for the toggle
  const [userLocation, setUserLocation] = useState(null); // State for user's location
  const [locationLoading, setLocationLoading] = useState(false); // State for location loading indicator
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Request location permission when the component mounts if not already granted
    // This is a basic permission request, you might want more robust handling
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        status = (await Location.requestForegroundPermissionsAsync()).status;
      }
      if (status !== 'granted') {
        setLocationError('Location permission denied. "Search nearby" will not be available.');
        setSearchNearby(false); // Ensure searchNearby is off if permission denied
      }
    })();
  }, []);

  const handleSearchNearbyToggle = async (value) => {
    setSearchNearby(value);
    if (value) { // If toggled on, try to get location
      setLocationLoading(true);
      setLocationError(null);
      setUserLocation(null);
      try {
        let { status } = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') {
          status = (await Location.requestForegroundPermissionsAsync()).status;
        }

        if (status !== 'granted') {
          setLocationError('Location permission is required to search nearby. Please enable it in settings.');
          setSearchNearby(false); // Turn toggle off if permission is still denied
          setLocationLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log('User location fetched:', location.coords);
      } catch (error) {
        console.error('Error getting location:', error);
        setLocationError('Could not get your location. Please ensure location services are enabled.');
        setSearchNearby(false); // Turn toggle off if location fetch fails
      } finally {
        setLocationLoading(false);
      }
    } else {
      setUserLocation(null); // Clear location if toggled off
      setLocationError(null);
    }
  };

  const handleSearch = () => {
    if (searchText.trim() === '') {
      Alert.alert('Search', 'Please enter a product to search for.');
      return;
    }
    
    let locationToSearch = null;
    if (searchNearby) {
      // For testing, directly use Sderot coordinates if searchNearby is true
      locationToSearch = TEST_LOCATION_SDEROT; 
      if (!locationToSearch) { // Fallback if somehow TEST_LOCATION_SDEROT was not set (should not happen)
          Alert.alert('Location Error', 'Test location (Sderot) not available. Please check the code.');
          return;
      }
    }

    console.log('Navigating to ProductSearchScreen with query:', searchText, 
                'Search Nearby:', searchNearby, 
                'Location being sent:', locationToSearch); // Log the location being sent

    navigation.navigate('ProductSearch', {
      searchQuery: searchText,
      category: 'supermarket',
      searchNearby: searchNearby, 
      userLocation: locationToSearch, // Pass the determined location
    });
  };

  const handleViewRecentlyViewed = () => {
    Alert.alert('Recently Viewed', 'This feature is coming soon!');
  };

  const handleCategoryPress = (category) => {
    Alert.alert('Category', `Navigating to ${category.name} category.`);
    // navigation.navigate('SupermarketCategoryScreen', { categoryId: category.id });
  };

  const goToCart = () => {
    navigation.navigate('ShoppingCart');
  };
  
  const goToStoresNearYou = () => {
    navigation.navigate('StoresNearYou');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Metriks Supermarket</Text>
          <TouchableOpacity onPress={goToCart} style={styles.cartIconContainer}>
            <Ionicons name="cart-outline" size={28} color="#333333" />
            {getCartItemCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.mainHeading}>Find Your Groceries</Text>
        <Text style={styles.subHeading}>
          Search for products, compare prices across different supermarkets, and manage your shopping list.
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search for milk, bread, eggs..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // Allow search on submit
        />
        
        {/* Search Nearby Toggle */}
        <View style={styles.searchOptionsContainer}>
          <Text style={styles.searchOptionText}>Search nearby stores?</Text>
          <Switch
            trackColor={{ false: "#E9E9EB", true: "#007AFF" }}
            thumbColor={searchNearby ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#E9E9EB"
            onValueChange={handleSearchNearbyToggle}
            value={searchNearby}
          />
        </View>
        {locationLoading && <ActivityIndicator size="small" color="#007AFF" style={{marginBottom: 5}} />}
        {locationError && !searchNearby && <Text style={styles.locationErrorText}>{locationError}</Text>}


        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search Products</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanButton} onPress={() => Alert.alert('Scan', 'Scan feature coming soon!')}>
          <Ionicons name="scan-outline" size={22} color="#007AFF" style={styles.scanIcon} />
          <Text style={styles.scanButtonText}>Scan Barcode or Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.storesNearYouButton} onPress={goToStoresNearYou}>
            <Ionicons name="location-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.storesNearYouButtonText}>Stores Near You</Text>
        </TouchableOpacity>


        {/* Recently Viewed Section - Placeholder */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <TouchableOpacity onPress={handleViewRecentlyViewed}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollContainer}>
          {recentlyViewedData.map(item => (
            <TouchableOpacity key={item.id} style={styles.productCardSmall} onPress={() => Alert.alert("Product", item.name)}>
              <Image source={{ uri: item.imageUri }} style={styles.productImageSmall} />
              <Text style={styles.productNameSmall} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Categories Section */}
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollContainer}
        >
          {popularCategoriesData.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category)}
            >
              <Ionicons name={category.icon} size={28} color="#007AFF" />
              <Text style={styles.categoryName} numberOfLines={2}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10, // Adjusted for potential notch/status bar
    paddingBottom: 30,
  },
  headerContainer: {
    width: '100%', // Ensure it takes full width
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'android' ? 15 : 10, // Add some top margin
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
  },
  cartIconContainer: {
    padding: 5, // Make it easier to tap
  },
  cartBadge: {
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: '#FF3B30', // A common badge color
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 24,
    lineHeight: 20,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24, // More rounded
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 10, // Reduced margin
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5, // Slight horizontal padding for the text
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchOptionText: {
    fontSize: 15,
    color: '#333333',
  },
   locationErrorText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5, // Slightly thicker border
    borderColor: '#007AFF',
    marginBottom: 12,
  },
  scanIcon: {
    marginRight: 8,
  },
  scanButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  storesNearYouButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759', // Green color
    paddingVertical: 14,
    borderRadius: 24,
    marginBottom: 25,
  },
  storesNearYouButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  horizontalScrollContainer: {
    marginBottom: 20,
  },
  productCardSmall: {
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center', // Center content
  },
  productImageSmall: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#E0E0E0',
  },
  productNameSmall: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '500',
  },
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '500',
    marginTop: 8,
  },
});