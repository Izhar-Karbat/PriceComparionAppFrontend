import { create } from 'zustand';
import type { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateItemQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (product, quantity = 1) => set((state) => {
    const existingItem = state.items.find(item => item.masterproductid === product.masterproductid);
    
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.masterproductid === product.masterproductid
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    }
    
    return { items: [...state.items, { ...product, quantity }] };
  }),
  
  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter((item) => item.masterproductid !== productId),
  })),
  
  updateItemQuantity: (productId, newQuantity) => set((state) => ({
    items: state.items.map(item =>
      item.masterproductid === productId
        ? { ...item, quantity: newQuantity }
        : item
    )
  })),
  
  clearCart: () => set({ items: [] }),
  
  getCartTotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  },
  
  getCartItemCount: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));