import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, showAddToCart = true }) => {
  const { t } = useTranslation();
  
  const {
    id,
    name,
    imageUrl,
    price,
    originalPrice,
    retailer,
    discountPercentage,
    unit = '',
    isOnSale = false
  } = product;

  const discount = originalPrice && price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : discountPercentage;

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-3">
      <Link to={`/product/${id}`} className="block">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{name}</h3>
            
            {retailer && (
              <p className="text-sm text-gray-500 mb-1">{retailer}</p>
            )}
            
            <div className="flex items-end mt-1">
              {price && (
                <div className="flex items-baseline">
                  <span className="text-lg font-bold">₪{price.toFixed(2)}</span>
                  {unit && <span className="text-sm text-gray-500 ml-1">/ {unit}</span>}
                </div>
              )}
              
              {originalPrice && price < originalPrice && (
                <div className="ml-2 flex items-center">
                  <span className="text-sm text-gray-500 line-through">₪{originalPrice.toFixed(2)}</span>
                  <span className="ml-1 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                    -{discount}%
                  </span>
                </div>
              )}
              
              {isOnSale && !originalPrice && (
                <span className="ml-1 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                  {t('onSale', 'On Sale')}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      {showAddToCart && onAddToCart && (
        <div className="mt-3 flex justify-end">
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-primary text-white py-1.5 px-3 rounded-full text-sm hover:bg-primary/90 transition-colors"
          >
            {t('addToCartButton')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;