// screens/SupermarketHomeScreen.js
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure @expo/vector-icons is installed

// Placeholder data for recently viewed items
const recentlyViewedData = [
  { id: '1', name: 'Oreo Chocolate Sandwich Cookies', imageUri: 'https://via.placeholder.com/100x100.png?text=Oreo' },
  { id: '2', name: 'Shampoo', imageUri: 'https://via.placeholder.com/100x100.png?text=Shampoo' },
  // Add more mock items if you like
  { id: '3', name: 'Apples', imageUri: 'https://via.placeholder.com/100x100.png?text=Apples' },
  { id: '4', name: 'Milk', imageUri: 'https://via.placeholder.com/100x100.png?text=Milk' },
];

export default function SupermarketHomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchText);
    // Example: navigation.navigate('SearchResultsScreen', { query: searchText, category: 'supermarket' });
  };

  const handleScan = () => {
    console.log('Scan button pressed');
    // Example: navigation.navigate('ScannerScreen');
  };

  const navigateToProduct = (item) => {
    console.log('Navigate to product:', item.name);
    // Example: navigation.navigate('ProductDetailScreen', { productId: item.id });
  };

  const goToCart = () => {
    navigation.navigate('ShoppingCart'); // Navigate to the new cart screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}> Metriks</Text>
          <TouchableOpacity onPress={goToCart} style={styles.cartIcon}>
            <Ionicons name="cart-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.mainHeading}>Identify products and compare prices</Text>
        <Text style={styles.subHeading}>
          Search for supermarket, pharmacy, or electronics products by entering text or uploading an image. Compare local prices and make better shopping decisions.
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Enter a product name"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // Allows search on keyboard 'done'
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
          <Ionicons name="scan-outline" size={22} color="#007AFF" style={styles.scanIcon} />
          <Text style={styles.scanButtonText}>Scan barcode or photo</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Recently viewed</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.recentlyViewedContainer}
        >
          {recentlyViewedData.map(item => (
            <TouchableOpacity key={item.id} style={styles.recentItemCard} onPress={() => navigateToProduct(item)}>
              <Image source={{ uri: item.imageUri }} style={styles.recentItemImage} />
              <Text style={styles.recentItemName} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* You can add more sections here, e.g., "Promotions", "Categories" */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Changed to white as per image
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10, // Reduced top padding as SafeAreaView handles some
    paddingBottom: 30, 
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Spacing after "M metriks"
    marginTop: 10, // Spacing from status bar
  },
  headerTitle: {
    fontSize: 26, // Slightly adjusted
    fontWeight: 'bold',
    color: '#1A1A1A', // Darker text
  },
  mainHeading: {
    fontSize: 22, // Adjusted
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 14, // Adjusted
    textAlign: 'center',
    color: '#555555', // Slightly darker grey
    marginBottom: 24,
    lineHeight: 20,
  },
  searchInput: {
    height: 48, // Standard height
    backgroundColor: '#F3F4F6', // Lighter grey
    borderRadius: 24, // More rounded
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Subtle border
  },
  searchButton: {
    backgroundColor: '#007AFF', // Your primary blue
    paddingVertical: 14,
    borderRadius: 24, // Match input field
    alignItems: 'center',
    marginBottom: 12,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600', // Semi-bold
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24, // Match input field
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5, // Slightly thicker border
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
    color: '#1A1A1A',
    marginBottom: 12,
  },
  recentlyViewedContainer: {
    flexDirection: 'row', // Ensure items are laid out horizontally
  },
  recentItemCard: {
    width: 110, // Slightly smaller cards
    marginRight: 12,
    backgroundColor: '#FFFFFF', // White background for cards
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB', // Subtle border for cards
    shadowColor: "#000", // Optional shadow for depth
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
  },
  recentItemImage: {
    width: 70, // Adjusted image size
    height: 70,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#E5E7EB', 
  },
  recentItemName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '500',
  },
  cartIcon: {
    padding: 5,
  },
});