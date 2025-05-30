// screens/PharmacyHomeScreen.js
import React, { useState } from 'react';
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
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// If you have a specific cart context for pharmacy or a general one:
// import { useCart } from '../context/CartContext'; // Assuming general cart

// Mock data for pharmacy categories or featured items
const popularCategoriesData = [
  { id: 'cat1', name: 'Pain Relief', icon: 'bandage-outline' },
  { id: 'cat2', name: 'Vitamins', icon: 'leaf-outline' },
  { id: 'cat3', name: 'Skincare', icon: 'sparkles-outline' },
  { id: 'cat4', name: 'Cold & Flu', icon: 'thermometer-outline' },
  { id: 'cat5', name: 'Baby Care', icon: 'happy-outline' },
];

const featuredDealsData = [
  { id: 'deal1', name: 'Discount on Allergy Meds', imageUri: 'https://via.placeholder.com/100x100.png?text=Allergy+Deal', description: '20% off selected brands' },
  { id: 'deal2', name: 'BOGO on Vitamins', imageUri: 'https://via.placeholder.com/100x100.png?text=Vitamin+BOGO', description: 'Buy one get one free' },
];

export default function PharmacyHomeScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  // const { getCartItemCount } = useCart(); // If using cart count badge

  const handleSearch = () => {
    if (searchText.trim() === '') {
      Alert.alert('Search', 'Please enter a product to search.');
      return;
    }
    console.log('Searching for (Pharmacy):', searchText);
    // Example: navigation.navigate('PharmacyProductSearch', { query: searchText });
    Alert.alert('Search', `Searching for pharmacy product: ${searchText}`);
  };

  const handleScan = () => {
    console.log('Scan button pressed (Pharmacy)');
    // Example: navigation.navigate('PharmacyScannerScreen');
    Alert.alert('Scan', 'Pharmacy scan feature to be implemented.');
  };

  const goToCart = () => {
    navigation.navigate('ShoppingCart'); // Assuming 'ShoppingCart' is a screen in a shared stack or a root stack
                                        // If it's nested differently, adjust the navigation path.
                                        // For example, if ShoppingCart is in SupermarketStack:
                                        // navigation.navigate('SupermarketTab', { screen: 'ShoppingCart' });
  };

  const handleCategoryPress = (category) => {
    Alert.alert('Category', `Navigating to ${category.name} category.`);
    // navigation.navigate('PharmacyCategoryScreen', { categoryId: category.id });
  };
  
  const handleDealPress = (deal) => {
    Alert.alert('Deal', `Viewing details for ${deal.name}.`);
    // navigation.navigate('PharmacyDealScreen', { dealId: deal.id });
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Metriks Pharmacy</Text>
          <TouchableOpacity onPress={goToCart} style={styles.cartIconContainer}>
            <Ionicons name="cart-outline" size={28} color="#333333" />
            {/* Optional: Add a badge for item count if useCart is integrated
            {getCartItemCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
              </View>
            )}
            */}
          </TouchableOpacity>
        </View>

        <Text style={styles.mainHeading}>Find Medications and Health Products</Text>
        <Text style={styles.subHeading}>
          Search for prescriptions, over-the-counter drugs, vitamins, and personal care items.
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search medications, vitamins..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search Pharmacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
          <Ionicons name="scan-outline" size={22} color="#007AFF" style={styles.scanIcon} />
          <Text style={styles.scanButtonText}>Scan Barcode or Photo</Text>
        </TouchableOpacity>

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

        {/* Featured Deals Section */}
        <Text style={styles.sectionTitle}>Featured Deals</Text>
        <View>
          {featuredDealsData.map(deal => (
            <TouchableOpacity 
              key={deal.id} 
              style={styles.dealCard}
              onPress={() => handleDealPress(deal)}
            >
              <Image source={{ uri: deal.imageUri }} style={styles.dealImage} />
              <View style={styles.dealInfo}>
                <Text style={styles.dealName} numberOfLines={1}>{deal.name}</Text>
                <Text style={styles.dealDescription} numberOfLines={2}>{deal.description}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>

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
    paddingTop: 10,
    paddingBottom: 30,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
  },
  cartIconContainer: {
    padding: 5,
  },
  cartBadge: {
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: '#FF3B30', // Red badge
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
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    borderWidth: 1.5,
    borderColor: '#007AFF',
    marginBottom: 30,
  },
  scanIcon: {
    marginRight: 8,
  },
  scanButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    marginTop: 10,
  },
  horizontalScrollContainer: {
    marginBottom: 20,
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
  dealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
  dealInfo: {
    flex: 1,
  },
  dealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  dealDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
});
