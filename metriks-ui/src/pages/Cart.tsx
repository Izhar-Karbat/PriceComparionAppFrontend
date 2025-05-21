import { useState } from 'react';
import Layout from '../components/Layout';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Cart = () => {
  const { cart, clearCart, getTotal } = useCart();
  const { t } = useLanguage();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      // In a real app, we would navigate to a confirmation page
      alert('Order placed successfully!');
    }, 2000);
  };
  
  const cartTotal = getTotal();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Layout
      title={t('myCart')}
      showBackButton={true}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {cartCount > 0 
              ? `${cartCount} ${t('itemsInCart', 'items in cart')}` 
              : t('emptyCart', 'Your cart is empty')}
          </h2>
          
          {cartCount > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-gray-500"
            >
              {t('clearCart', 'Clear All')}
            </button>
          )}
        </div>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 mb-4">{t('noItemsInCart', 'No items in your cart yet')}</p>
            <Button 
              variant="primary"
              onClick={() => window.history.back()}
            >
              {t('continueShopping', 'Continue Shopping')}
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                />
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">{t('subtotal', 'Subtotal')}</span>
                <span className="font-semibold">₪{cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">{t('delivery', 'Delivery')}</span>
                <span className="font-semibold">₪15.00</span>
              </div>
              
              <div className="flex justify-between items-center mb-4 text-lg font-bold pt-2 border-t border-gray-100">
                <span>{t('total', 'Total')}</span>
                <span>₪{(cartTotal + 15).toFixed(2)}</span>
              </div>
              
              <Button
                variant="primary"
                fullWidth
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? t('processing', 'Processing...') : t('checkout', 'Checkout')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;