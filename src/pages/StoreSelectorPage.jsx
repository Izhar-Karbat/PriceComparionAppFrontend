import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const StoreSelectorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'supermarket', 'pharma', 'electronics'
  const [locationAccess, setLocationAccess] = useState(false);
  
  // Mock store data
  const stores = [
    {
      id: 1,
      name: 'Shufersal Deal',
      category: 'supermarket',
      logo: '🛒',
      distance: 1.2, // km
      isOnline: false,
      isOpen: true,
      closingTime: '22:00',
      address: 'Dizengoff Center, Tel Aviv',
    },
    {
      id: 2,
      name: 'Rami Levy',
      category: 'supermarket',
      logo: '🛒',
      distance: 2.5,
      isOnline: false,
      isOpen: true,
      closingTime: '23:00',
      address: 'Ayalon Mall, Ramat Gan',
    },
    {
      id: 3,
      name: 'Victory',
      category: 'supermarket',
      logo: '🛒',
      distance: 0.8,
      isOnline: false,
      isOpen: true,
      closingTime: '21:00',
      address: 'Ibn Gabirol St, Tel Aviv',
    },
    {
      id: 4,
      name: 'Shufersal Online',
      category: 'supermarket',
      logo: '🛒',
      distance: null,
      isOnline: true,
      isOpen: true,
      closingTime: null,
      address: null,
    },
    {
      id: 5,
      name: 'Mega',
      category: 'supermarket',
      logo: '🛒',
      distance: 3.1,
      isOnline: false,
      isOpen: false,
      closingTime: null,
      openingTime: '08:00', // Next day
      address: 'Rothschild Blvd, Tel Aviv',
    },
    {
      id: 6,
      name: 'Super-Pharm',
      category: 'pharma',
      logo: '💊',
      distance: 0.7,
      isOnline: false,
      isOpen: true,
      closingTime: '22:00',
      address: 'Dizengoff Center, Tel Aviv',
    },
    {
      id: 7,
      name: 'Be Pharm',
      category: 'pharma',
      logo: '💊',
      distance: 1.5,
      isOnline: false,
      isOpen: true,
      closingTime: '21:30',
      address: 'Allenby St, Tel Aviv',
    },
    {
      id: 8,
      name: 'GoodPharm',
      category: 'pharma',
      logo: '💊',
      distance: 2.8,
      isOnline: false,
      isOpen: false,
      closingTime: null,
      openingTime: '09:00', // Next day
      address: 'Bograshov St, Tel Aviv',
    },
    {
      id: 9,
      name: 'Super-Pharm Online',
      category: 'pharma',
      logo: '💊',
      distance: null,
      isOnline: true,
      isOpen: true,
      closingTime: null,
      address: null,
    },
    {
      id: 10,
      name: 'KSP',
      category: 'electronics',
      logo: '📱',
      distance: 1.9,
      isOnline: false,
      isOpen: true,
      closingTime: '21:00',
      address: 'Dizengoff Center, Tel Aviv',
    },
    {
      id: 11,
      name: 'Bug',
      category: 'electronics',
      logo: '💻',
      distance: 3.5,
      isOnline: false,
      isOpen: false,
      closingTime: null,
      openingTime: '10:00', // Next day
      address: 'Azrieli Center, Tel Aviv',
    },
    {
      id: 12,
      name: 'Ivory',
      category: 'electronics',
      logo: '🔌',
      distance: 2.7,
      isOnline: false,
      isOpen: true,
      closingTime: '20:00',
      address: 'Ramat Aviv Mall, Tel Aviv',
    },
    {
      id: 13,
      name: 'Amazon.co.il',
      category: 'electronics',
      logo: '📦',
      distance: null,
      isOnline: true,
      isOpen: true,
      closingTime: null,
      address: null,
    },
  ];
  
  // Simulate getting location permission
  useEffect(() => {
    // Simulating permission granted
    setTimeout(() => {
      setLocationAccess(true);
    }, 1000);
  }, []);
  
  // Filter stores based on search term and active filter
  const filteredStores = stores.filter(store => {
    const matchesSearch = searchTerm === '' || 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (store.address && store.address.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || store.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Sort stores by distance
  const sortedStores = [...filteredStores].sort((a, b) => {
    if (a.distance === null) return 1;
    if (b.distance === null) return -1;
    return a.distance - b.distance;
  });
  
  // Toggle store selection
  const toggleStoreSelection = (storeId) => {
    if (selectedStores.includes(storeId)) {
      setSelectedStores(selectedStores.filter(id => id !== storeId));
    } else {
      setSelectedStores([...selectedStores, storeId]);
    }
  };
  
  // Select all stores
  const selectAllStores = () => {
    if (selectedStores.length === filteredStores.length) {
      setSelectedStores([]);
    } else {
      setSelectedStores(filteredStores.map(store => store.id));
    }
  };
  
  // Handle apply selection
  const handleApplySelection = () => {
    console.log('Selected stores:', selectedStores);
    // In a real app, save selection to context/state and navigate back
    navigate(-1);
  };
  
  // Request location access
  const requestLocationAccess = () => {
    console.log('Requesting location access');
    // Simulate successful permission
    setTimeout(() => {
      setLocationAccess(true);
    }, 1000);
  };

  return (
    <div className="py-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {t('selectStores', 'Select Stores')}
        </h1>
        <p className="text-gray-600 text-sm">
          {t('selectStoresDesc', 'Choose stores to compare prices')}
        </p>
      </div>
      
      {/* Location Access Banner */}
      {!locationAccess && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-blue-800">
                {t('locationAccess', 'Enable Location Access')}
              </h3>
              <div className="mt-1 text-sm text-blue-700">
                <p>{t('locationAccessDesc', 'Allow location access to find stores near you')}</p>
              </div>
              <div className="mt-2">
                <button
                  onClick={requestLocationAccess}
                  className="bg-blue-100 px-4 py-1.5 rounded-full text-blue-800 text-sm font-medium hover:bg-blue-200"
                >
                  {t('allowLocation', 'Allow Location')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm mb-5">
        <div className="p-3">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary"
              placeholder={t('searchStores', 'Search stores...')}
            />
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-6 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('allStores', 'All Stores')}
          </button>
          
          <button
            onClick={() => setActiveFilter('supermarket')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === 'supermarket'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('supermarkets', 'Supermarkets')}
          </button>
          
          <button
            onClick={() => setActiveFilter('pharma')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === 'pharma'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('pharmacies', 'Pharmacies')}
          </button>
          
          <button
            onClick={() => setActiveFilter('electronics')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === 'electronics'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('electronics', 'Electronics')}
          </button>
        </div>
      </div>
      
      {/* Selection Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-medium text-gray-700">
          {sortedStores.length} {t('storesFound', 'stores found')}
        </div>
        
        <button
          onClick={selectAllStores}
          className="text-primary text-sm font-medium"
        >
          {selectedStores.length === filteredStores.length
            ? t('deselectAll', 'Deselect All')
            : t('selectAll', 'Select All')}
        </button>
      </div>
      
      {/* Stores List */}
      {sortedStores.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('noStoresFound', 'No stores found')}
          </h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            {t('tryDifferentSearch', 'Try a different search term or filter')}
          </p>
          
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
            }}
            className="mt-6 inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            {t('clearFilters', 'Clear Filters')}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedStores.map(store => (
            <div 
              key={store.id} 
              className={`bg-white rounded-xl shadow-sm overflow-hidden border ${
                selectedStores.includes(store.id) ? 'border-primary' : 'border-transparent'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                    {store.logo}
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{store.name}</h3>
                        {store.address && (
                          <p className="text-sm text-gray-500 mt-0.5">{store.address}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        {!store.isOnline && store.distance !== null && (
                          <span className="text-sm text-gray-600 mr-3">
                            {store.distance} {t('km', 'km')}
                          </span>
                        )}
                        
                        <div onClick={() => toggleStoreSelection(store.id)} className="cursor-pointer">
                          {selectedStores.includes(store.id) ? (
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex mt-2 items-center">
                      {store.isOnline ? (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {t('online', 'Online')}
                        </span>
                      ) : store.isOpen ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {t('openUntil', 'Open until')} {store.closingTime}
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          {t('opensAt', 'Opens at')} {store.openingTime}
                        </span>
                      )}
                      
                      {!store.isOnline && (
                        <button className="ml-auto text-primary text-sm font-medium hover:text-primary/80">
                          {t('viewOnMap', 'View on Map')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Apply Button */}
      {selectedStores.length > 0 && (
        <div className="fixed bottom-20 inset-x-0 px-4">
          <button
            onClick={handleApplySelection}
            className="w-full bg-primary text-white py-3 px-4 rounded-full font-medium hover:bg-primary/90 flex items-center justify-center"
          >
            {t('applySelection', 'Apply Selection')} ({selectedStores.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreSelectorPage;