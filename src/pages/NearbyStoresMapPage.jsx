import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MapViewer from '../components/MapViewer';

const NearbyStoresMapPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock store data
  const mockStores = [
    {
      id: 1,
      name: 'Shufersal Deal',
      category: 'supermarket',
      distance: 0.7,
      address: '123 Main Street, Tel Aviv',
      isOpen: true,
      closingTime: '22:00',
      isSelected: false
    },
    {
      id: 2,
      name: 'Super-Pharm',
      category: 'pharma',
      distance: 1.2,
      address: '45 Health Blvd, Tel Aviv',
      isOpen: true,
      closingTime: '21:00',
      isSelected: false
    },
    {
      id: 3,
      name: 'KSP',
      category: 'electronics',
      distance: 1.8,
      address: '67 Tech Road, Tel Aviv',
      isOpen: true,
      closingTime: '20:00',
      isSelected: true
    },
    {
      id: 4,
      name: 'Rami Levy',
      category: 'supermarket',
      distance: 2.3,
      address: '89 Discount Ave, Tel Aviv',
      isOpen: true,
      closingTime: '23:00',
      isSelected: false
    },
    {
      id: 5,
      name: 'Bug',
      category: 'electronics',
      distance: 3.1,
      address: '101 Computer Street, Tel Aviv',
      isOpen: false,
      closingTime: 'Closed',
      isSelected: false
    }
  ];
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleMarkerClick = (marker) => {
    console.log('Marker clicked:', marker);
    // In a real app, this would show more details about the store or select it
  };
  
  const filteredStores = mockStores
    .filter(store => selectedCategory === 'all' || store.category === selectedCategory)
    .filter(store => searchQuery === '' || store.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full"
            placeholder={t('searchStores', 'Search stores...')}
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
      </div>
      
      <div className="mb-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange('all')}
          >
            {t('allStores', 'All Stores')}
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === 'supermarket' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange('supermarket')}
          >
            {t('supermarketTab')}
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === 'pharma' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange('pharma')}
          >
            {t('pharmaTab')}
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === 'electronics' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange('electronics')}
          >
            {t('electronicsTab')}
          </button>
        </div>
      </div>
      
      <div className="mb-5">
        <MapViewer 
          initialLocation={{ lat: 32.0853, lng: 34.7818 }} // Tel Aviv coordinates
          markers={filteredStores}
          onMarkerClick={handleMarkerClick}
          showUserLocation={true}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-bold mb-3">{t('nearbyStores', 'Nearby Stores')} ({filteredStores.length})</h2>
        
        {filteredStores.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-500">{t('noStoresFound', 'No stores found matching your criteria')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredStores.map(store => (
              <div 
                key={store.id}
                className={`bg-white rounded-2xl shadow-md p-4 ${store.isSelected ? 'border-2 border-primary' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold">{store.name}</h3>
                      {store.isSelected && (
                        <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          {t('selected', 'Selected')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{store.address}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span className="text-gray-500">{store.distance} km</span>
                      </div>
                      <div className="mx-2 text-gray-400">•</div>
                      <div className={`text-sm ${store.isOpen ? 'text-green-600' : 'text-red-500'}`}>
                        {store.isOpen ? `${t('openUntil', 'Open until')} ${store.closingTime}` : t('closed', 'Closed')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button className="flex-1 py-2 border border-primary text-primary rounded-full text-sm font-medium">
                    {t('viewProducts', 'View Products')}
                  </button>
                  <button className="flex-1 py-2 bg-primary text-white rounded-full text-sm font-medium">
                    {t('getDirections', 'Get Directions')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyStoresMapPage;