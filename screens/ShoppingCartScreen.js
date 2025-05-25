import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
const ShoppingCartScreen = ({ navigation }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [selectedStores, setSelectedStores] = useState(['rami-levy', 'shufersal', 'victory']);
  const [priceComparisons, setPriceComparisons] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      fetchPriceComparisons();
    }
  }, [cart, selectedStores]);

  const fetchPriceComparisons = async () => {
    setLoading(true);
    try {
      // Simulate API call - Replace with actual API endpoint
      const mockPrices = {
        'rami-levy': cart.reduce((sum, item) => sum + (item.price * item.quantity * 0.95), 0),
        'shufersal': cart.reduce((sum, item) => sum + (item.price * item.quantity * 1.05), 0),
        'victory': cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        'yohananof': cart.reduce((sum, item) => sum + (item.price * item.quantity * 1.02), 0),
      };
      setPriceComparisons(mockPrices);
    } catch (error) {
      console.error('Error fetching price comparisons:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const storeInfo = {
    'rami-levy': {
      name: 'Rami Levy',
      logo: 'https://upload.wikimedia.org/wikipedia/he/thumb/5/5f/Rami_levy_hashikma_marketing_logo.svg/200px-Rami_levy_hashikma_marketing_logo.svg.png',
      color: '#E31E24',
    },
    'shufersal': {
      name: 'Shufersal',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Shufersal_logo.svg/200px-Shufersal_logo.svg.png',
      color: '#00A859',
    },
    'victory': {
      name: 'Victory',
      logo: 'https://www.victory.co.il/media/logo/stores/1_1.png',
      color: '#FF6B00',
    },
    'yohananof': {
      name: 'Yohananof',
      logo: 'https://www.yohananof.co.il/images/logo.png',
      color: '#004B87',
    },
  };

  const handleQuantityChange = (id, change) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity);
      } else {
        Alert.alert(
          'Remove Item',
          'Are you sure you want to remove this item from your cart?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Remove', onPress: () => removeFromCart(id), style: 'destructive' }
          ]
        );
      }
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: clearCart, style: 'destructive' }
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₪{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => handleQuantityChange(item.id, -1)}
          style={styles.quantityButton}
        >
          <Ionicons name="remove-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => handleQuantityChange(item.id, 1)}
          style={styles.quantityButton}
        >
          <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  const renderPriceComparison = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Comparing prices...</Text>
        </View>
      );
    }
    const { 
      cartItems, // The context provides cartItems
      updateItemQuantity, 
      removeItemFromCart, 
      getCartTotal, 
      getCartItemCount 
      // ... add other functions you need from the context value like clearCart, addItemToCart etc.
    } = useCart();

    const sortedStores = Object.entries(priceComparisons)
      .filter(([storeId]) => selectedStores.includes(storeId))
      .sort(([, a], [, b]) => a - b);

    if (sortedStores.length === 0) {
      return null;
    }

    const [, cheapestPrice] = sortedStores[0];
    const savings = calculateTotal() - cheapestPrice;

    return (
      <View style={styles.priceComparisonSection}>
        <Text style={styles.sectionTitle}>Price Comparison</Text>
        <TouchableOpacity
          style={styles.storeSelector}
          onPress={() => navigation.navigate('StoreSelector', { 
            selectedStores, 
            onStoresSelected: setSelectedStores 
          })}
        >
          <Text style={styles.storeSelectorText}>
            Comparing {selectedStores.length} stores
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        {sortedStores.map(([storeId, price], index) => {
          const store = storeInfo[storeId];
          const isCheapest = index === 0;
          return (
            <View
              key={storeId}
              style={[
                styles.storePrice,
                isCheapest && styles.cheapestStore
              ]}
            >
              <Image source={{ uri: store.logo }} style={styles.storeLogo} />
              <View style={styles.storePriceDetails}>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={[styles.storeTotal, { color: store.color }]}>
                  ₪{price.toFixed(2)}
                </Text>
              </View>
              {isCheapest && (
                <View style={styles.cheapestBadge}>
                  <Text style={styles.cheapestText}>Cheapest!</Text>
                  <Text style={styles.savingsText}>Save ₪{savings.toFixed(2)}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#C7C7CC" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('SupermarketHome')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartSummary}>
          <Text style={styles.itemCount}>{calculateItemCount()} items</Text>
          <Text style={styles.totalPrice}>₪{calculateTotal()}</Text>
        </View>

        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {renderPriceComparison()}

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => Alert.alert('Checkout', 'Checkout functionality coming soon!')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    marginTop: 1,
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginLeft: 88,
  },
  priceComparisonSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  storeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 12,
  },
  storeSelectorText: {
    fontSize: 16,
    color: '#666',
  },
  storePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  cheapestStore: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  storeLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
  },
  storePriceDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '500',
  },
  storeTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cheapestBadge: {
    alignItems: 'flex-end',
  },
  cheapestText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  savingsText: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 2,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShoppingCartScreen;