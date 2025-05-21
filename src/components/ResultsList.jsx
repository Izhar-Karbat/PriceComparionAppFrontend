// src/components/ResultsList.jsx
import React from 'react';
import ProductItem from './ProductItem';
import { useTranslation } from 'react-i18next';

// Accept 'products' and 'onAddToCart' props
function ResultsList({ products = [], onAddToCart }) { 
  const { t } = useTranslation();

  if (!products || products.length === 0) {
    return null; 
  }

  return (
    <div>
      <h2>{t('resultsHeading')}</h2>
      {products.map(product => (
        <ProductItem 
          key={product.id} 
          product={product} // Pass the whole product object
          onAddToCart={onAddToCart} // Pass onAddToCart down to each ProductItem
        />
      ))}
    </div>
  );
}

export default ResultsList;