// src/components/ProductItem.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // For button text

// Expect product (which includes id, name, imageUrl) and onAddToCart function as props
function ProductItem({ product, onAddToCart }) { 
  const { t } = useTranslation();

  if (!product) {
    return null; // Don't render if no product data
  }

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product); // Pass the whole product object
    } else {
      // Fallback if no onAddToCart prop is provided (for testing/standalone use)
      console.log("Add to cart clicked for:", product.name);
      alert(`${product.name} would be added to cart!`);
    }
  };

  return (
    <div style={{ 
        border: '1px solid #ccc', 
        margin: '10px 0', // Adjusted margin
        padding: '10px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' // To push button to the right
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
            src={product.imageUrl || "https://via.placeholder.com/50"} // Fallback image
            alt={product.productName || product.name || "Product Image"} // Use productName or name
            style={{ width: '50px', height: '50px', marginRight: '15px', objectFit: 'cover' }} 
        />
        <p style={{ margin: 0 }}>{product.productName || product.name}</p> {/* Use productName or name */}
      </div>
      <button 
        onClick={handleAddToCartClick}
        style={{ padding: '8px 12px', fontSize: '14px', cursor: 'pointer' }}
      >
        {t('addToCartButton', 'Add to Cart')} {/* Default text if key not found */}
      </button>
    </div>
  );
}

export default ProductItem;