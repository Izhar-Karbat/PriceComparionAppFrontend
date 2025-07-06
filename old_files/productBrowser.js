// In a new component, e.g., HahishukProductBrowser.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { API_URL } from '../../config';

const HahishukProductBrowser = ({ onProductAddedToAppCart }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHahishukProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/products/hahishuk`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch Hahishuk products:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHahishukProducts();
  }, []);

  const handleAddItem = (product) => {
    const itemForAppCart = {
      id_in_your_system: `hahishuk-${product.hahishuk_site_product_id}`, // Or use masterproductid
      name: product.productname,
      productId: product.hahishuk_site_product_id, // This is crucial for Hahishuk
      quantity: 1, // Default quantity, user can change later in app cart
      price: product.current_price, // For display in app cart
      imageUrl: product.imageurl,
      retailer: 'Hahishuk'
    };
    onProductAddedToAppCart(itemForAppCart); // This function comes from a parent component
    alert(`${product.productname} added to your app cart!`);
  };

  if (isLoading) {
    return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  }
  if (error) {
    return <View style={styles.centered}><Text style={styles.errorText}>Error loading products: {error}</Text></View>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.hahishuk_site_product_id || item.masterproductid.toString()}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          {item.imageurl && <Image source={{ uri: item.imageurl }} style={styles.productImage} resizeMode="contain" />}
          <Text style={styles.productName}>{item.productname}</Text>
          <Text>Price: ₪{parseFloat(item.current_price).toFixed(2)}</Text>
          <Text style={styles.stockStatus}>
            Stock: {item.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
          </Text>
          <Button 
            title="Add to App Cart" 
            onPress={() => handleAddItem(item)} 
            disabled={item.stock_status !== 'instock'}
          />
        </View>
      )}
      ListEmptyComponent={<Text>No Hahishuk products found.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', textAlign: 'center'},
  productItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  productImage: { width: 100, height: 100, alignSelf: 'center', marginBottom: 10 },
  productName: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  stockStatus: { fontSize: 12, color: 'gray', textAlign: 'center', marginBottom: 5 }
});

export default HahishukProductBrowser;