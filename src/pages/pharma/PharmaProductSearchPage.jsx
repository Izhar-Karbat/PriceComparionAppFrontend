import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const PharmaProductSearchPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedImageName, setSearchedImageName] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearchSubmit = (query) => {
    console.log("Text search submitted in PharmaProductSearchPage:", query);
    setSearchTerm(query);
    setSearchedImageName('');
    setIsLoading(true);
    setSearchResults([]);

    setTimeout(() => {
      let mockResults = [];
      if (query.toLowerCase().includes("vitamin") || query.toLowerCase().includes("supplement")) {
        mockResults = [
          { 
            id: 401, 
            name: "Vitamin C 500mg (100 tablets)", 
            imageUrl: "https://via.placeholder.com/100/FFA500/FFFFFF?Text=VitC",
            price: 39.90,
            originalPrice: 49.90,
            retailer: "Super-Pharm",
            category: "vitamins"
          },
          { 
            id: 402, 
            name: "Multivitamin Complex", 
            imageUrl: "https://via.placeholder.com/100/FFD700/FFFFFF?Text=Multi",
            price: 69.90,
            retailer: "Be Pharm",
            category: "vitamins"
          },
          { 
            id: 403, 
            name: "Vitamin D3 2000IU Drops", 
            imageUrl: "https://via.placeholder.com/100/FFD700/FFFFFF?Text=VitD",
            price: 54.90,
            originalPrice: 79.90,
            retailer: "Super-Pharm",
            category: "vitamins"
          },
        ];
      } else if (query.toLowerCase().includes("cream") || query.toLowerCase().includes("lotion")) {
        mockResults = [
          { 
            id: 404, 
            name: "Moisturizing Day Cream SPF15", 
            imageUrl: "https://via.placeholder.com/100/F0E68C/000000?Text=Cream",
            price: 89.90,
            originalPrice: 129.90,
            retailer: "Be Pharm",
            category: "skincare"
          },
          { 
            id: 405, 
            name: "Hydrating Body Lotion 400ml", 
            imageUrl: "https://via.placeholder.com/100/F5F5DC/000000?Text=Lotion",
            price: 49.90,
            retailer: "Good Pharm",
            category: "skincare"
          },
          { 
            id: 406, 
            name: "Anti-Aging Night Cream 50ml", 
            imageUrl: "https://via.placeholder.com/100/F0E68C/000000?Text=Night",
            price: 199.90,
            originalPrice: 249.90,
            retailer: "Super-Pharm",
            category: "skincare"
          },
        ];
      } else if (query.toLowerCase().includes("pain") || query.toLowerCase().includes("relief")) {
        mockResults = [
          { 
            id: 407, 
            name: "Ibuprofen 200mg (20 tablets)", 
            imageUrl: "https://via.placeholder.com/100/ADD8E6/000000?Text=Pain",
            price: 24.90,
            retailer: "Super-Pharm",
            category: "medication"
          },
          { 
            id: 408, 
            name: "Muscle Relief Gel 100ml", 
            imageUrl: "https://via.placeholder.com/100/B0E0E6/000000?Text=Gel",
            price: 39.90,
            retailer: "Be Pharm",
            category: "medication"
          },
        ];
      } else if (query) {
        mockResults = [
          { 
            id: 409, 
            name: `Pharma product for "${query}"`, 
            imageUrl: "https://via.placeholder.com/100/FAFAD2/000000?Text=Pharma",
            price: 59.90,
            retailer: "Super-Pharm",
            category: "other"
          },
        ];
      }
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  const handleImageSearchSubmit = (file) => {
    console.log("Image search submitted in PharmaProductSearchPage with file:", file.name);
    setSearchedImageName(file.name);
    setSearchTerm('');
    setIsLoading(true);
    setSearchResults([]);

    setTimeout(() => {
      const mockResults = [
        { 
          id: 501, 
          name: "Allergy Relief Tablets", 
          imageUrl: "https://via.placeholder.com/100/F5DEB3/000000?Text=Allergy",
          price: 34.90,
          retailer: "Super-Pharm",
          category: "medication"
        },
        { 
          id: 502, 
          name: "Similar product: Antihistamine 10mg", 
          imageUrl: "https://via.placeholder.com/100/FAEBD7/000000?Text=Similar",
          price: 29.90,
          retailer: "Be Pharm",
          category: "medication"
        },
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredResults = activeFilter === 'all' 
    ? searchResults 
    : searchResults.filter(product => product.category === activeFilter);

  return (
    <div>
      <SearchBar
        onSearchSubmit={handleSearchSubmit}
        onImageSubmit={handleImageSearchSubmit}
        placeholder={t('pharmaSearchPlaceholder', 'Search medications, vitamins, skincare...')}
      />

      {(searchTerm || searchedImageName) && !isLoading && searchResults.length > 0 && (
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => handleFilterChange('all')}
            >
              {t('allCategories', 'All Categories')}
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'medication' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => handleFilterChange('medication')}
            >
              {t('medications', 'Medications')}
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'vitamins' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => handleFilterChange('vitamins')}
            >
              {t('vitamins', 'Vitamins & Supplements')}
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'skincare' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => handleFilterChange('skincare')}
            >
              {t('skincare', 'Skincare')}
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-4"></div>
          <p>{searchTerm ? t('loadingResultsFor', { searchTerm }) : t('loadingResultsFor', { searchTerm: `image "${searchedImageName}"` })}</p>
        </div>
      )}

      {!isLoading && searchResults.length === 0 && (searchTerm || searchedImageName) && (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-gray-500">{t('noResultsFoundFor', { searchTerm: searchTerm || `image "${searchedImageName}"` })}</p>
          <p className="text-gray-500 mt-1">{t('tryDifferentSearch', 'Try a different search term or browse categories')}</p>
        </div>
      )}

      {!isLoading && !searchTerm && !searchedImageName && (
        <div className="py-6">
          <h2 className="text-lg font-bold mb-4">{t('popularCategories', 'Popular Categories')}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div 
              className="bg-blue-100 rounded-2xl p-5 h-32 flex flex-col justify-between"
              onClick={() => handleSearchSubmit('pain relief')}
            >
              <h3 className="font-bold">{t('painRelief', 'Pain Relief')}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 self-end text-blue-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <div 
              className="bg-green-100 rounded-2xl p-5 h-32 flex flex-col justify-between"
              onClick={() => handleSearchSubmit('vitamins')}
            >
              <h3 className="font-bold">{t('vitamins', 'Vitamins')}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 self-end text-green-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z" />
              </svg>
            </div>
            <div 
              className="bg-orange-100 rounded-2xl p-5 h-32 flex flex-col justify-between"
              onClick={() => handleSearchSubmit('skin cream')}
            >
              <h3 className="font-bold">{t('skincare', 'Skincare')}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 self-end text-orange-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
              </svg>
            </div>
            <div 
              className="bg-purple-100 rounded-2xl p-5 h-32 flex flex-col justify-between"
              onClick={() => handleSearchSubmit('allergy')}
            >
              <h3 className="font-bold">{t('allergies', 'Allergies')}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 self-end text-purple-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {!isLoading && filteredResults.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">
            {searchResults.length} {t('resultsFound', 'Results')}
          </h2>
          <div className="space-y-4">
            {filteredResults.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                showAddToCart={false}
              />
            ))}
          </div>
        </div>
      )}

      {!isLoading && filteredResults.length > 0 && (
        <div className="mt-8 mb-4">
          <button 
            onClick={() => navigate('/pharma/smart-table')}
            className="bg-primary text-white py-3 px-6 rounded-full w-full font-medium hover:bg-primary/90"
          >
            {t('compareAllPrices', 'Compare All Prices')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PharmaProductSearchPage;