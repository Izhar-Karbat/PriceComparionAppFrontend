import React from 'react';
import { useTranslation } from 'react-i18next';

const PriceComparisonRow = ({ retailer, price, distance, isLowestPrice, onClick }) => {
  const { t } = useTranslation();
  
  return (
    <div 
      className={`flex items-center p-3 mb-2 rounded-xl border ${isLowestPrice ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <h4 className="font-medium">{retailer.name}</h4>
          {isLowestPrice && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
              {t('lowestPrice', 'Lowest Price')}
            </span>
          )}
        </div>
        
        {distance && (
          <div className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {distance} {t('km', 'km')}
          </div>
        )}
      </div>
      
      <div className="text-right">
        <div className="font-bold text-lg">₪{price.toFixed(2)}</div>
        <button className="text-primary text-sm">
          {t('goToStore', 'Go to Store')}
        </button>
      </div>
    </div>
  );
};

export default PriceComparisonRow;