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
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

// Adjust placeholder data to include Hahishuk specific fields for some items
const recentlyViewedData = [
  { id: '1', name: 'Oreo Cookies', imageUri: 'https://via.placeholder.com/100x100.png?text=Oreo', price: 10.50, isHahishuk: false },
  { id: 'h1', name: 'Hahishuk Coffee Beans', imageUri: 'https://via.placeholder.com/100x100.png?text=HahishukCoffee', price: 35.00, isHahishuk: true, productId: '15164' /* Example Hahishuk Product ID */ },
  { id: '2', name: 'Generic Shampoo', imageUri: 'https://via.placeholder.com/100x100.png?text=Shampoo', price: 15.00, isHahishuk: false },
  { id: 'h2', name: 'Hahishuk Tuna', imageUri: 'https://via.placeholder.com/100x100.png?text=HahishukTuna', price: 7.50, isHahishuk: true, productId: '200128' /* Example Hahishuk Product ID */ },
];

export default function SupermarketHomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const { addItemToCart } = useCart(); // Get the function from context

  const handleSearch = () => {
    console.log('Searching for:', searchText);
    // Example: navigation.navigate('SearchResultsScreen', { query: searchText, category: 'supermarket' });
  };

  const handleScan = () => {
    console.log('Scan button pressed');
    // Example: navigation.navigate('ScannerScreen');
  };

  const handleRecentlyViewedItemPress = (item) => {
    console.log('Adding to cart:', item.name);
    const cartItem = {
      id: item.id, // App's unique ID for the cart item
      name: item.name,
      price: item.price,
      image: item.imageUri,
      // Hahishuk specific data
      productId: item.isHahishuk ? item.productId : null, // This is Hahishuk's site_product_id
      retailer: item.isHahishuk ? 'Hahishuk' : 'GenericSupermarket',
      // quantity is handled by addItemToCart in context
    };
    addItemToCart(cartItem);
    Alert.alert("Item Added", `${item.name} has been added to your cart.`);
  };

  const goToCart = () => {
    navigation.navigate('ShoppingCart'); // Navigate to the new cart screen
  };

  const goToHahishukProducts = () => {
    navigation.navigate('HahishukProducts');
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

        {/* Add this button for Hahishuk Products */}
        <TouchableOpacity style={[styles.searchButton, styles.hahishukListButton]} onPress={goToHahishukProducts}>
          <Text style={styles.searchButtonText}>Browse Hahishuk Products</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Recently viewed</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.recentlyViewedContainer}
        >
          {recentlyViewedData.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.recentItemCard}
              onPress={() => handleRecentlyViewedItemPress(item)}
            >
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
  hahishukListButton: {
    backgroundColor: '#f09b3c', // Hahishuk-like orange or your app's secondary color
    marginTop: 10, // Add some space
  },
});