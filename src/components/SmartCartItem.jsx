import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SmartCartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(item.quantity || 1);
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity && onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-3">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <button 
              onClick={() => onRemove && onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
          
          {item.retailer && (
            <p className="text-sm text-gray-500">{item.retailer}</p>
          )}
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-baseline">
              <span className="text-lg font-bold">₪{(item.price * quantity).toFixed(2)}</span>
              {item.unit && <span className="text-sm text-gray-500 ml-1">/ {item.unit}</span>}
            </div>
            
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-3">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCartItem;