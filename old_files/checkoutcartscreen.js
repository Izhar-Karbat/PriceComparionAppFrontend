// Example: MyHahishukCartScreen.js (React Native Component)
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Linking, Modal, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { API_URL } from '../../config';

export default function MyHahishukCartScreen({ route }) {
  // Assuming cart items are passed via navigation or come from a global state/context
  // For this example, let's use mock data that would eventually come from your app's state.
  // Each item MUST have 'productId' (Hahishuk's site_product_id) and 'quantity'.
  const [appCartItems, setAppCartItems] = useState([
    { 
      id_in_your_system: 'hs_item_1', 
      name: 'פולי קפה אספרסו ערביקה Khamsin', 
      productId: '15164', // Hahishuk's site_product_id
      quantity: 1, 
      retailer: 'Hahishuk' 
    },
    {
      id_in_your_system: 'hs_item_2',
      name: 'קפסולות אספרסו ערביקה House Blend',
      productId: '167231', // Hahishuk's site_product_id
      quantity: 1, // User wants 1 "pack" (Hahishuk makes it 10 units)
      retailer: 'Hahishuk'
    },
    {
      id_in_your_system: 'hs_item_3',
      name: 'טונה בשמן סויה',
      productId: '200128', 
      quantity: 3,       
      retailer: 'Hahishuk'
    }
    // In a real app, this would be populated from your app's global cart state
  ]);

  const [loadingItem, setLoadingItem] = useState(null); // To show loading for a specific item
  const [feedback, setFeedback] = useState('');
  const [webViewUrl, setWebViewUrl] = useState('');
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);

  const handleAddItemToHahishuk = async (itemToAdd) => {
    if (!itemToAdd || !itemToAdd.productId || !itemToAdd.quantity) {
      setFeedback("Invalid item data.");
      return;
    }

    setLoadingItem(itemToAdd.productId);
    setFeedback(`Processing ${itemToAdd.name}...`);

    const payload = {
      items: [{
        productId: itemToAdd.productId,
        quantity: itemToAdd.quantity
      }]
    };

    try {
      const response = await fetch(`${API_URL}/api/hahishuk/prepare-cart-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error ${response.status}`);
      }

      if (result.redirectUrl) {
        setFeedback(`Adding ${itemToAdd.name} to Hahishuk cart...`);
        setWebViewUrl(result.redirectUrl);
        setIsWebViewVisible(true); 
        // User will see the WebView load Hahishuk. They'll need to manually close/navigate back.
      } else {
        setFeedback(result.summary || result.error || `Could not get redirect URL for ${itemToAdd.name}.`);
      }
    } catch (error) {
      console.error(`Error adding ${itemToAdd.name} to Hahishuk:`, error);
      setFeedback(`Error for ${itemToAdd.name}: ${error.message || "Failed to process."}`);
    }
    setLoadingItem(null);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemDetail}>Hahishuk ID: {item.productId}</Text>
      </View>
      <Button
        title={loadingItem === item.productId ? "Adding..." : "Add to Hahishuk"}
        onPress={() => handleAddItemToHahishuk(item)}
        disabled={loadingItem === item.productId}
        color="#f09b3c" // Orange-ish color
      />
    </View>
  );

  if (isWebViewVisible) {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: webViewUrl }}
          onNavigationStateChange={(navState) => {
            console.log("WebView Nav State Change:", navState.url);
            // You could try to detect if Hahishuk has landed on its cart page
            // if (navState.url.includes('hahishook.com/cart') && navState.url !== webViewUrl) {
            //   // Consider auto-closing WebView or providing a clear "Done" button
            // }
          }}
        />
        <Button title="Close Hahishuk View & Return to App" onPress={() => setIsWebViewVisible(false)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My App's Hahishuk List</Text>
      {appCartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>No Hahishuk items in your list.</Text>
      ) : (
        <FlatList
          data={appCartItems.filter(item => item.retailer === 'Hahishuk')} // Ensure only Hahishuk items
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id_in_your_system || item.productId}
          extraData={loadingItem}
        />
      )}
      {feedback ? <Text style={styles.feedbackText}>{feedback}</Text> : null}
      
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructionsText}>
          1. Click "Add to Hahishuk" for each item. A view will open showing Hahishuk.
        </Text>
        <Text style={styles.instructionsText}>
          2. Hahishuk will add the item. Close the Hahishuk view to return to this app and add the next item.
        </Text>
        <Text style={styles.instructionsText}>
          3. After adding all items, click "Go to Hahishuk Cart" to finalize.
        </Text>
        <Button
            title="View Hahishuk Cart"
            onPress={() => {
                setWebViewUrl("https://hahishook.com/cart/");
                setIsWebViewVisible(true);
            }}
            color="#28a745" // Green color
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemDetail: {
    fontSize: 12,
    color: '#555',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginTop: 20,
  },
  feedbackText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  instructionsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 5,
  }
});