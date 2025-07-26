import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';
import { API_URL } from '../config';

// This hook is used by your ShoppingCartScreen to access the cart's state and functions.
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { userToken } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    // RENAMED: from 'loading' to 'cartLoading' to perfectly match your ShoppingCartScreen.js
    const [cartLoading, setCartLoading] = useState(false);
    const [activeCartId, setActiveCartId] = useState(null);

    useEffect(() => {
        if (userToken) {
            fetchUserCartsAndItems(userToken);
        } else {
            setCartItems([]);
            setActiveCartId(null);
        }
    }, [userToken]);

    const fetchUserCartsAndItems = async (token) => {
        setCartLoading(true);
        try {
            // Add timeout to prevent hanging requests
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const cartsResponse = await fetch(`${API_URL}/api/carts`, {
                headers: { 'x-access-token': token },
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            
            const cartsData = await cartsResponse.json();
            if (!cartsResponse.ok) throw new Error(cartsData.message || 'Failed to fetch carts');

            if (cartsData.carts && cartsData.carts.length > 0) {
                const mainCart = cartsData.carts[0];
                setActiveCartId(mainCart.cart_id);

                const itemsController = new AbortController();
                const itemsTimeoutId = setTimeout(() => itemsController.abort(), 10000); // 10 second timeout
                
                const itemsResponse = await fetch(`${API_URL}/api/carts/${mainCart.cart_id}/items`, {
                    headers: { 'x-access-token': token },
                    signal: itemsController.signal,
                });
                clearTimeout(itemsTimeoutId);
                
                const itemsData = await itemsResponse.json();
                if (!itemsResponse.ok) throw new Error(itemsData.message || 'Failed to fetch cart items');
                
                // NOTE: The backend returns masterproductid. Ensure your UI uses this as the unique key.
                setCartItems(itemsData || []);
            } else {
                console.log("User has no shopping carts on the backend.");
                setCartItems([]);
            }
        } catch (error) {
            console.error("Failed to fetch user cart:", error);
            if (error.name === 'AbortError') {
                Alert.alert("Network Timeout", "Unable to connect to server. Please check your connection and try again.");
            } else {
                Alert.alert("Error", "Could not load your saved shopping list.");
            }
        } finally {
            setCartLoading(false);
        }
    };

    const addToCart = async (product, quantity = 1) => {
        // IMPORTANT: Ensure the product object has `masterproductid`
        if (!product.masterproductid) {
            console.error("addToCart failed: product is missing masterproductid", product);
            Alert.alert("Error", "Cannot add item without a product ID.");
            return;
        }

        if (userToken && activeCartId) {
            try {
                await fetch(`${API_URL}/api/carts/${activeCartId}/items`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': userToken },
                    body: JSON.stringify({ masterproductid: product.masterproductid, quantity }),
                });
                await fetchUserCartsAndItems(userToken); // Re-sync to get the latest state
            } catch (error) {
                Alert.alert('Sync Error', `Could not add ${product.productname} to your list.`);
            }
        } else {
            setCartItems((prevItems) => {
                const existingItem = prevItems.find(item => item.masterproductid === product.masterproductid);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.masterproductid === product.masterproductid
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }
                return [...prevItems, { ...product, quantity }];
            });
        }
    };
    
    const updateItemQuantity = async (masterproductid, newQuantity) => {
        if (userToken && activeCartId) {
            try {
                await fetch(`${API_URL}/api/carts/${activeCartId}/items/${masterproductid}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': userToken },
                    body: JSON.stringify({ quantity: newQuantity }),
                });
                await fetchUserCartsAndItems(userToken); // Re-sync
            } catch (error) {
                Alert.alert('Sync Error', `Could not update item quantity.`);
            }
        } else {
            setCartItems(prev => prev.map(item => item.masterproductid === masterproductid ? {...item, quantity: newQuantity} : item));
        }
    };
    
    const removeItemFromCart = async (masterproductid) => {
        if (userToken && activeCartId) {
            try {
                await fetch(`${API_URL}/api/carts/${activeCartId}/items/${masterproductid}`, {
                    method: 'DELETE',
                    headers: { 'x-access-token': userToken },
                });
                await fetchUserCartsAndItems(userToken); // Re-sync
            } catch (error) {
                Alert.alert('Sync Error', 'Could not remove item from your list.');
            }
        } else {
            setCartItems(prev => prev.filter(item => item.masterproductid !== masterproductid));
        }
    };

    // NEW: Implemented clearCart function
    const clearCart = async () => {
        if (userToken && activeCartId) {
            try {
                // This assumes a backend endpoint that deletes all items for a cart_id.
                // If it doesn't exist, we would need to loop and delete one by one.
                // For now, we'll just clear the local state and log a TODO.
                console.log("TODO: Implement DELETE /api/carts/<cart_id>/items/all endpoint on backend.");
                
                // Optimistic UI update: clear locally right away.
                setCartItems([]);
                // In a real scenario, you might want to call a bulk delete endpoint
                // and then re-fetch.
            } catch (error) {
                 Alert.alert('Sync Error', 'Could not clear your list.');
            }
        } else {
            setCartItems([]);
        }
    };

    const getCartTotal = () => cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const getCartItemCount = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        cartItems,
        cartLoading, // Use the renamed state variable
        activeCartId,
        addToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart, // Export the new function
        getCartTotal,
        getCartItemCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
