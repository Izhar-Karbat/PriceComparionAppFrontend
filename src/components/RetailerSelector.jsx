import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RetailerSelector = ({ retailers, selectedRetailers = [], onChange }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredRetailers = retailers.filter(retailer => 
    retailer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleRetailerToggle = (retailerId) => {
    let newSelected;
    
    if (selectedRetailers.includes(retailerId)) {
      newSelected = selectedRetailers.filter(id => id !== retailerId);
    } else {
      newSelected = [...selectedRetailers, retailerId];
    }
    
    onChange && onChange(newSelected);
  };
  
  const handleSelectAll = () => {
    onChange && onChange(retailers.map(r => r.id));
  };
  
  const handleClearAll = () => {
    onChange && onChange([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
            placeholder={t('searchRetailers', 'Search retailers...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between mt-3">
          <button 
            onClick={handleSelectAll}
            className="text-sm text-primary"
          >
            {t('selectAll', 'Select All')}
          </button>
          <button 
            onClick={handleClearAll}
            className="text-sm text-gray-500"
          >
            {t('clearAll', 'Clear All')}
          </button>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {filteredRetailers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {t('noRetailersFound', 'No retailers found')}
          </div>
        ) : (
          filteredRetailers.map(retailer => (
            <div 
              key={retailer.id}
              className="flex items-center p-4 border-b border-gray-100"
            >
              <input
                type="checkbox"
                id={`retailer-${retailer.id}`}
                checked={selectedRetailers.includes(retailer.id)}
                onChange={() => handleRetailerToggle(retailer.id)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded"
              />
              <label 
                htmlFor={`retailer-${retailer.id}`}
                className="flex items-center ml-3 flex-1 cursor-pointer"
              >
                {retailer.logo ? (
                  <img 
                    src={retailer.logo} 
                    alt={retailer.name} 
                    className="w-8 h-8 mr-3 rounded-full" 
                  />
                ) : (
                  <div className="w-8 h-8 mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {retailer.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-medium">{retailer.name}</div>
                  {retailer.distance && (
                    <div className="text-sm text-gray-500">
                      {retailer.distance} {t('km', 'km')}
                    </div>
                  )}
                </div>
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RetailerSelector;