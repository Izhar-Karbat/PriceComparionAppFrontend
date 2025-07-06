// Create this file, e.g., components/HahishukProductList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { API_URL } from '../../config';

// The onAddToCart prop will be a function passed from the parent component
// to handle adding the selected product to your app's main cart state.
const HahishukProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHahishukProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log(`Fetching products from: ${API_URL}/api/products/hahishuk`);
        const response = await fetch(`${API_URL}/api/products/hahishuk`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
        }
        const data = await response.json();
        console.log("Fetched products: ", data.length > 0 ? data[0] : "No data or empty array"); // Log first product or message
        setProducts(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch Hahishuk products:", e);
        setProducts([]); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchHahishukProducts();
  }, []);

  const handlePressAddToCart = (product) => {
    const itemForAppCart = {
      appSpecificId: `hahishuk-${product.hahishuk_site_product_id || product.masterproductid}`, // Unique key for React list
      name: product.productname,
      // 'productId' MUST map to Hahishuk's site_product_id for the later cart transfer step
      productId: product.hahishuk_site_product_id, 
      quantity: 1, // Default quantity to add, can be adjusted later
      price: product.current_price, // For display in your app's cart
      imageUrl: product.imageurl,
      retailer: 'Hahishuk' 
    };
    onAddToCart(itemForAppCart); // Call the callback prop
    alert(`${product.productname} added to your app's list!`); // Simple feedback
  };

  if (isLoading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#0000ff" /><Text>Loading Hahishuk products...</Text></View>;
  }
  if (error) {
    return <View style={styles.centered}><Text style={styles.errorText}>Error loading products: {error}</Text></View>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => (item.hahishuk_site_product_id || item.masterproductid || `prod-${Math.random()}`).toString()}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          {item.imageurl && 
            <Image 
              source={{ uri: item.imageurl.startsWith('//') ? `https:${item.imageurl}` : item.imageurl }} 
              style={styles.productImage} 
              resizeMode="contain" 
            />
          }
          <Text style={styles.productName}>{item.productname}</Text>
          <Text style={styles.description}>{item.short_description}</Text>
          {item.current_price !== null && item.current_price !== undefined && (
            <Text style={styles.price}>Price: ₪{parseFloat(item.current_price).toFixed(2)}</Text>
          )}
          {item.current_unit_price && item.current_unit_of_measure && (
            <Text style={styles.unitPrice}>
              (₪{parseFloat(item.current_unit_price).toFixed(2)} / {item.current_unit_of_measure})
            </Text>
          )}
          <Text style={[styles.stockStatus, item.stock_status === 'instock' ? styles.inStock : styles.outOfStock]}>
            {item.stock_status === 'instock' ? 'In Stock' : (item.stock_status === 'outofstock' ? 'Out of Stock' : 'Stock Unknown')}
          </Text>
          <TouchableOpacity 
            style={[styles.button, item.stock_status !== 'instock' && styles.buttonDisabled]}
            onPress={() => handlePressAddToCart(item)} 
            disabled={item.stock_status !== 'instock'}
          >
            <Text style={styles.buttonText}>Add to App List</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={<View style={styles.centered}><Text>No Hahishuk products found or backend is not responding.</Text></View>}
      contentContainerStyle={products.length === 0 ? styles.centered : {}}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', textAlign: 'center', fontSize: 16 },
  productItem: { padding: 15, marginVertical: 8, marginHorizontal:10, backgroundColor: '#fff', borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, },
  productImage: { width: '100%', height: 150, alignSelf: 'center', marginBottom: 10, borderRadius: 4 },
  productName: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  description: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 5},
  price: { fontSize: 16, fontWeight: 'bold', color: '#27ae60', textAlign: 'center', marginBottom: 2},
  unitPrice: { fontSize: 12, color: 'gray', textAlign: 'center', marginBottom: 5},
  stockStatus: { fontSize: 13, fontWeight: '500', textAlign: 'center', marginBottom: 10 },
  inStock: { color: 'green' },
  outOfStock: { color: 'red' },
  button: { backgroundColor: '#007bff', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#aaa' },
  buttonText: { color: '#fff', fontWeight: 'bold'}
});

export default HahishukProductList;