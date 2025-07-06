// screens/HahishukProductListScreen.js
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config';

const HahishukProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchHahishukProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/products/hahishuk`);
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`HTTP error ${response.status}: ${errorData}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch Hahishuk products:", e);
        Alert.alert("Error", `Failed to load Hahishuk products: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHahishukProducts();
  }, []);

  const handleAddItemToCart = (product) => {
    const cartItem = {
      id: `hahishuk-${product.hahishuk_site_product_id || product.masterproductid || Date.now()}`, // Ensure a unique ID
      name: product.productname,
      price: parseFloat(product.current_price) || 0,
      image: product.imageurl,
      productId: product.hahishuk_site_product_id, // Hahishuk's specific product ID
      retailer: 'Hahishuk',
      // quantity will be handled by addItemToCart in context
    };
    addItemToCart(cartItem);
    Alert.alert('Item Added', `${product.productname} has been added to your cart.`);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      {item.imageurl ? (
        <Image source={{ uri: item.imageurl.startsWith('//') ? `https:${item.imageurl}` : item.imageurl }} style={styles.productImage} resizeMode="contain" />
      ) : (
        <View style={[styles.productImage, styles.placeholderImage]}>
          <Ionicons name="camera-outline" size={40} color="#ccc" />
        </View>
      )}
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={2}>{item.productname}</Text>
        <Text style={styles.productPrice}>₪{(parseFloat(item.current_price) || 0).toFixed(2)}</Text>
        <Text style={item.stock_status === 'instock' ? styles.inStock : styles.outOfStock}>
          {item.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.addToCartButton, item.stock_status !== 'instock' && styles.disabledButton]}
        onPress={() => handleAddItemToCart(item)}
        disabled={item.stock_status !== 'instock' || isLoading}
      >
        <Ionicons name="add-circle-outline" size={24} color="#FFF" />
        <Text style={styles.addToCartButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Hahishuk Products...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Ionicons name="cloud-offline-outline" size={60} color="#FF3B30" />
        <Text style={styles.errorText}>Error loading products.</Text>
        <Text style={styles.errorDetailText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => useEffect(() => { fetchHahishukProducts() }, [])}>
            <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => (item.hahishuk_site_product_id || item.masterproductid || item.productname + Math.random()).toString()}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Ionicons name="storefront-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No Hahishuk products found at the moment.</Text>
          </View>
        }
        contentContainerStyle={products.length === 0 ? styles.centered : styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorDetailText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
    marginHorizontal: 20,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  productItemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#F0F0F0', // Placeholder background
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  inStock: {
    fontSize: 12,
    color: '#34C759', // Green
    fontWeight: '500',
  },
  outOfStock: {
    fontSize: 12,
    color: '#FF3B30', // Red
    fontWeight: '500',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  addToCartButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default HahishukProductListScreen;