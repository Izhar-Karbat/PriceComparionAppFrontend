import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PriceComparisonRow from '../../components/PriceComparisonRow';

const ElectronicsSmartTablePage = () => {
  const { t } = useTranslation();
  const [activeProduct, setActiveProduct] = useState(0);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [filterByDistance, setFilterByDistance] = useState(false);
  
  // Mock data for the smart table
  const mockSmartTableData = [
    {
      id: 1,
      name: "Samsung Galaxy S23 128GB",
      imageUrl: "https://via.placeholder.com/80/000000/FFFFFF?Text=S23",
      retailers: [
        { id: 101, name: "KSP", price: 2499.00, distance: 1.5, isLowestPrice: true },
        { id: 102, name: "Bug", price: 2599.00, distance: 3.2, isLowestPrice: false },
        { id: 103, name: "Ivory", price: 2699.00, distance: 0.7, isLowestPrice: false },
        { id: 104, name: "Machsanei Hashmal", price: 2799.00, distance: 4.1, isLowestPrice: false }
      ]
    },
    {
      id: 2,
      name: "Apple iPad Air 256GB",
      imageUrl: "https://via.placeholder.com/80/A9A9A9/FFFFFF?Text=iPad",
      retailers: [
        { id: 201, name: "iDigital", price: 2799.00, distance: 2.3, isLowestPrice: false },
        { id: 202, name: "iStore", price: 2749.00, distance: 1.9, isLowestPrice: true },
        { id: 203, name: "Ivory", price: 2849.00, distance: 0.7, isLowestPrice: false },
        { id: 204, name: "Bug", price: 2799.00, distance: 3.2, isLowestPrice: false }
      ]
    },
    {
      id: 3,
      name: "Sony WH-1000XM4 Headphones",
      imageUrl: "https://via.placeholder.com/80/000000/FFFFFF?Text=XM4",
      retailers: [
        { id: 301, name: "KSP", price: 1199.00, distance: 1.5, isLowestPrice: false },
        { id: 302, name: "Bug", price: 1099.00, distance: 3.2, isLowestPrice: true },
        { id: 303, name: "Ivory Electronics", price: 1249.00, distance: 0.7, isLowestPrice: false }
      ]
    }
  ];
  
  const handleRefreshPrices = () => {
    setIsPriceLoading(true);
    
    // Simulate price refresh
    setTimeout(() => {
      setIsPriceLoading(false);
    }, 2000);
  };
  
  const handleAddProduct = () => {
    // In a real app, this would open a modal or navigate to a product search page
    alert(t('addProductFeature', 'Add product feature would be implemented here'));
  };
  
  const handleExportTable = () => {
    // In a real app, this would generate and download an Excel file
    alert(t('exportTableFeature', 'Export table feature would be implemented here'));
  };
  
  const handleShareTable = () => {
    // In a real app, this would open a share dialog
    alert(t('shareTableFeature', 'Share table feature would be implemented here'));
  };
  
  const handleStoreClick = (retailer) => {
    // In a real app, this would navigate to the retailer's page or show more details
    alert(t('navigateToStore', 'Navigate to {{store}} store page', { store: retailer.name }));
  };
  
  const getSortedRetailers = (retailers) => {
    if (filterByDistance) {
      return [...retailers].sort((a, b) => a.distance - b.distance);
    }
    return [...retailers].sort((a, b) => a.price - b.price);
  };

  return (
    <div>
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">{t('yourSmartTable', 'Your Smart Table')}</h2>
          <button 
            onClick={handleRefreshPrices}
            className="flex items-center text-primary"
            disabled={isPriceLoading}
          >
            {isPriceLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            )}
            {t('refreshPrices', 'Refresh Prices')}
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
          <div className="flex border-b">
            {mockSmartTableData.map((product, index) => (
              <button
                key={product.id}
                className={`flex-1 py-3 px-2 text-center ${activeProduct === index ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveProduct(index)}
              >
                {product.name.length > 15 ? `${product.name.substring(0, 15)}...` : product.name}
              </button>
            ))}
            <button
              className="p-3 text-gray-500"
              onClick={handleAddProduct}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
                <img 
                  src={mockSmartTableData[activeProduct].imageUrl} 
                  alt={mockSmartTableData[activeProduct].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-lg">{mockSmartTableData[activeProduct].name}</h3>
                <div className="flex mt-2">
                  <div className="text-sm bg-gray-100 px-2 py-1 rounded-full mr-2">
                    {mockSmartTableData[activeProduct].retailers.length} {t('stores', 'stores')}
                  </div>
                  <div className="text-sm text-green-800 bg-green-100 px-2 py-1 rounded-full">
                    {t('priceRange', 'Price range')}: ₪{Math.min(...mockSmartTableData[activeProduct].retailers.map(r => r.price)).toFixed(2)} - ₪{Math.max(...mockSmartTableData[activeProduct].retailers.map(r => r.price)).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <span className="mr-2">{t('sortBy', 'Sort by')}:</span>
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button
                    className={`px-3 py-1 text-sm rounded-full ${!filterByDistance ? 'bg-white shadow' : ''}`}
                    onClick={() => setFilterByDistance(false)}
                  >
                    {t('price', 'Price')}
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-full ${filterByDistance ? 'bg-white shadow' : ''}`}
                    onClick={() => setFilterByDistance(true)}
                  >
                    {t('distance', 'Distance')}
                  </button>
                </div>
              </div>
              <div>
                <select className="text-sm border border-gray-300 rounded-md p-1">
                  <option value="all">{t('allStores', 'All Stores')}</option>
                  <option value="physical">{t('physicalStores', 'Physical Stores')}</option>
                  <option value="online">{t('onlineStores', 'Online Stores')}</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              {getSortedRetailers(mockSmartTableData[activeProduct].retailers).map((retailer) => (
                <PriceComparisonRow
                  key={retailer.id}
                  retailer={retailer}
                  price={retailer.price}
                  distance={retailer.distance}
                  isLowestPrice={retailer.isLowestPrice}
                  onClick={() => handleStoreClick(retailer)}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="flex-1 flex justify-center items-center py-2 border border-primary text-primary rounded-full"
                onClick={handleExportTable}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t('exportTable', 'Export')}
              </button>
              <button 
                className="flex-1 flex justify-center items-center py-2 border border-primary text-primary rounded-full"
                onClick={handleShareTable}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                </svg>
                {t('shareTable', 'Share')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">{t('aiAssistant', 'AI Assistant')}</h2>
          <button className="text-primary text-sm">{t('viewAll', 'View All')}</button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-4">
          <p className="text-gray-600 mb-3">{t('aiAssistantDescription', 'Get personalized shopping advice and recommendations from our AI assistant')}</p>
          
          <div className="mb-4">
            <div className="bg-gray-100 rounded-2xl p-3 mb-3">
              <div className="flex items-start mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
                <p className="flex-1 text-sm">
                  {t('buyingHeadphonesQuestion', 'I noticed you\'re looking at the Sony WH-1000XM4 headphones. Did you know the new XM5 model was just released? Would you like to see a comparison?')}
                </p>
              </div>
              <div className="flex space-x-2 ml-10">
                <button className="text-xs px-3 py-1 bg-primary text-white rounded-full">
                  {t('showComparison', 'Show Comparison')}
                </button>
                <button className="text-xs px-3 py-1 bg-gray-200 rounded-full">
                  {t('noThanks', 'No, Thanks')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full"
              placeholder={t('askQuestion', 'Ask a question about electronics...')}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsSmartTablePage;