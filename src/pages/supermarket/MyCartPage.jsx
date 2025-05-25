// MyCartPage.jsx

import React, { useState, useEffect } from "react";
// If you are in a React Native environment, you'd use 'react-native' components
// and react-native-webview. If this is a React web app, 'Modal' and 'WebView'
// would come from web libraries or you'd handle window.open directly.
// Since you mentioned React Native build, I'll assume a native context for WebView.
// If this is for web, window.open is simpler than managing a WebView modal.

// For React Native:
// import { View, Text, Button, FlatList, StyleSheet, Modal, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';

// For React Web (this example will use window.open as WebViews are not standard):
// No WebView import needed for web.

// Replace with your actual backend URL
const YOUR_BACKEND_API_BASE_URL = 'http://192.168.1.11:5001'; // Your computer's IP
const response = await fetch(`${YOUR_BACKEND_API_BASE_URL}/api/hahishuk/prepare-cart-url`, { /* ... */ });
export default function MyCartPage({ initialCartItems }) {
  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const [itemLoadingStates, setItemLoadingStates] = useState({});
  const [globalFeedback, setGlobalFeedback] = useState("");

  // If cartItems is a prop that can change, update the local state
  useEffect(() => {
    if (initialCartItems) {
        // Filter for Hahishuk items if your initialCartItems can contain items from other stores
        const hahishukOnlyItems = initialCartItems.filter(item => item.retailer === 'Hahishuk');
        setCartItems(hahishukOnlyItems);
    }
  }, [initialCartItems]);


  const handleAddItemToHahishukCart = async (itemToAdd) => {
    if (!itemToAdd || !itemToAdd.productId || !itemToAdd.quantity) {
        setGlobalFeedback(`Invalid data for item: ${itemToAdd.name || 'Unknown item'}`);
        return;
    }

    setItemLoadingStates(prev => ({ ...prev, [itemToAdd.productId]: true }));
    setGlobalFeedback(`Processing ${itemToAdd.name}...`);

    const payload = {
      items: [{
        productId: itemToAdd.productId,
        quantity: itemToAdd.quantity
      }]
    };

    try {
      const response = await fetch(`${YOUR_BACKEND_API_BASE_URL}/api/hahishuk/prepare-cart-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Failed to prepare Hahishuk URL. Server status: ${response.status}`);
      }

      if (result.redirectUrl) {
        setGlobalFeedback(`Adding ${itemToAdd.name} to Hahishuk. A new tab/window will open.`);
        // For a web application, window.open is standard.
        // For React Native, you would navigate a WebView component.
        window.open(result.redirectUrl, "_blank"); 
        // After opening, provide feedback. The user interacts with Hahishuk in the new tab.
        // You might want to give the user a moment before clearing feedback or item state.
        setTimeout(() => {
            setGlobalFeedback(`${itemToAdd.name} has been sent to Hahishuk. Check the new tab/window.`);
        }, 1500);
      } else {
        setGlobalFeedback(result.summary || result.error || `Could not get redirect URL for ${itemToAdd.name}.`);
      }

    } catch (error) {
      console.error(`Error adding ${itemToAdd.name} to Hahishuk:`, error);
      setGlobalFeedback(`Error for ${itemToAdd.name}: ${error.message || "Failed to process."}`);
    }
    setItemLoadingStates(prev => ({ ...prev, [itemToAdd.productId]: false }));
  };
  
  // This component assumes `cartItems` prop only contains Hahishuk items
  // or items that are meant to be processed by this specific checkout logic.
  // If `cartItems` can come from multiple stores, you might filter them here or in the parent.
  const hahishukItemsToDisplay = cartItems.filter(item => item.retailer === 'Hahishuk');


  // --- For TESTING: Function to add example Hahishuk items to the cartItems state ---
  const loadExampleItems = () => {
    setCartItems([
      { 
        id_in_your_system: `hs_ex_1`, 
        name: 'פולי קפה אספרסו ערביקה Khamsin (Example)', 
        productId: '15164', 
        quantity: 1, 
        retailer: 'Hahishuk' 
      },
      {
        id_in_your_system: `hs_ex_2`,
        name: 'קפסולות אספרסו ערביקה House Blend (Example)',
        productId: '167231', 
        quantity: 1, // User wants 1 pack (Hahishuk might make it 10 units)
        retailer: 'Hahishuk'
      },
      {
        id_in_your_system: `hs_ex_3`,
        name: 'טונה בשמן סויה (Example)',
        productId: '200128', 
        quantity: 3,       
        retailer: 'Hahishuk'
      }
    ]);
    setGlobalFeedback("Example Hahishuk items loaded. Click 'Add to Hahishuk Cart' for each.");
  };
  // --- End For TESTING ---

  return (
    // Using web-like div and className for this example. Adapt to React Native <View> and StyleSheet.
    <div className="p-4 max-w-lg mx-auto my-5 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Hahishuk Cart Transfer</h1>
      
      {/* Button to load example items for testing */}
      <button 
        onClick={loadExampleItems}
        className="mb-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
      >
        Load Example Hahishuk Items
      </button>

      {hahishukItemsToDisplay.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          Your list for Hahishuk is empty. Add products to see them here.
        </p>
      )}

      <div className="space-y-4">
        {hahishukItemsToDisplay.map((item) => (
          <div 
            key={item.id_in_your_system || item.productId} 
            className="p-4 border border-gray-200 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0"
          >
            <div className="flex-grow">
              <p className="font-semibold text-lg text-gray-700">{item.name}</p>
              <p className="text-sm text-gray-500">Desired Quantity: {item.quantity}</p>
              <p className="text-xs text-gray-400">Hahishuk Product ID: {item.productId}</p>
            </div>
            <button
              onClick={() => handleAddItemToHahishukCart(item)}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50 disabled:opacity-50 whitespace-nowrap"
              disabled={itemLoadingStates[item.productId]}
            >
              {itemLoadingStates[item.productId] ? "Adding..." : "Add to Hahishuk"}
            </button>
          </div>
        ))}
      </div>

      {hahishukItemsToDisplay.length > 0 && (
        <div className="text-center mt-8 p-4 bg-blue-50 border-t-4 border-blue-400 text-blue-700 rounded-b-lg">
          <p className="font-medium mb-2">Instructions:</p>
          <p className="text-sm">
            1. Click "Add to Hahishuk" for each item. A new tab will open for Hahishuk.
          </p>
          <p className="text-sm">
            2. Hahishuk will process the item. You may need to switch back to this app to add the next item.
          </p>
          <p className="text-sm">
            3. After adding all desired items, click "Go to Hahishuk Cart" to review and complete your purchase on their site.
          </p>
          <button 
            onClick={() => window.open('https://hahishook.com/cart/', '_blank')}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
          >
            View Hahishuk Cart
          </button>
        </div>
      )}

      {globalFeedback && <div className="mt-4 p-3 text-sm text-center text-gray-800 bg-gray-100 rounded-lg shadow">{globalFeedback}</div>}
    </div>
  );
}