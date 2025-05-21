// src/pages/supermarket/MyCartPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductItem from '../../components/ProductItem'; // To display each cart item

// Accept cartItems as a prop
function MyCartPage({ cartItems = [] }) { 
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('myCartPageTitle')}</h2>

      {cartItems.length === 0 ? (
        <p>{t('cartIsEmpty', 'Your cart is currently empty.')}</p> // Add this translation key
      ) : (
        <div>
          {cartItems.map(item => (
            // We can reuse ProductItem, or create a dedicated CartItem component later
            // For now, no onAddToCart prop is needed here as items are already in cart
            <ProductItem key={item.id} product={item} /> 
          ))}
          {/* We can add cart summary (total price, etc.) here later */}
        </div>
      )}
    </div>
  );
}

export default MyCartPage;