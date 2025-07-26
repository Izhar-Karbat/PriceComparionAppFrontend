// Example of how to integrate Zustand cart store with existing components

// In ShoppingCartScreen.tsx, replace the CartContext with Zustand:
import { useCartStore } from '../src/store/cartStore';

// Instead of:
// const { cartItems, removeItemFromCart, clearCart, getCartTotal, getCartItemCount } = useCart();

// Use:
const ShoppingCartScreenExample = () => {
  const { items, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCartStore();
  
  // The rest of the component remains the same, just replace:
  // - cartItems with items
  // - removeItemFromCart with removeFromCart
};

// In ProductCard or any component that adds to cart:
import { useCartStore } from '../src/store/cartStore';
import * as Haptics from 'expo-haptics';

const ProductCardExample = ({ product }) => {
  const { addToCart } = useCartStore();
  
  const handleAddToCart = async () => {
    // Add haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Add to cart
    addToCart(product);
  };
  
  return (
    <TouchableOpacity onPress={handleAddToCart}>
      <Text>Add to Cart</Text>
    </TouchableOpacity>
  );
};