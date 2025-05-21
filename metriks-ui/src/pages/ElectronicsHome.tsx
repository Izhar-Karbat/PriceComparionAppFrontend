import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const ElectronicsHome = () => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock categories
  const categories = [
    { id: 'all', name: t('all', 'All') },
    { id: 'phones', name: t('phones', 'Phones') },
    { id: 'laptops', name: t('laptops', 'Laptops') },
    { id: 'appliances', name: t('appliances', 'Appliances') },
    { id: 'accessories', name: t('accessories', 'Accessories') },
  ];
  
  // Mock featured products
  const featuredProducts = [
    {
      id: 301,
      name: 'Samsung Galaxy S21',
      price: 2599.00,
      originalPrice: 2999.00,
      retailerName: 'KSP',
      image: 'https://via.placeholder.com/150?text=GalaxyS21',
      category: 'phones'
    },
    {
      id: 302,
      name: 'MacBook Air M1',
      price: 4299.00,
      retailerName: 'iDigital',
      image: 'https://via.placeholder.com/150?text=MacBookAir',
      category: 'laptops'
    },
    {
      id: 303,
      name: 'Nespresso Coffee Machine',
      price: 599.00,
      originalPrice: 699.00,
      retailerName: 'Electra',
      image: 'https://via.placeholder.com/150?text=Nespresso',
      category: 'appliances'
    },
    {
      id: 304,
      name: 'AirPods Pro',
      price: 899.00,
      retailerName: 'iDigital',
      image: 'https://via.placeholder.com/150?text=AirPods',
      category: 'accessories'
    },
    {
      id: 305,
      name: 'LG Smart TV 55"',
      price: 2199.00,
      originalPrice: 2599.00,
      retailerName: 'Electra',
      image: 'https://via.placeholder.com/150?text=LGTV',
      category: 'appliances'
    }
  ];
  
  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? featuredProducts
    : featuredProducts.filter(product => product.category === activeCategory);
  
  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <Layout
      title={t('electronics')}
      showBackButton={false}
      showCart={true}
    >
      <div className="space-y-4">
        {/* Search bar */}
        <SearchBar
          categoryPath="/electronics"
          placeholder={t('searchElectronics', 'Search electronics, appliances...')}
        />
        
        {/* Quick actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => navigate('/smart-table')}
            className="flex-1 flex items-center justify-center py-2 border border-primary text-primary rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {t('smartTable')}
          </button>
          
          <button
            onClick={() => navigate('/stats')}
            className="flex-1 flex items-center justify-center py-2 border border-primary text-primary rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {t('stats', 'Price Trends')}
          </button>
        </div>
        
        {/* Categories filter */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`py-1.5 px-3 rounded-full whitespace-nowrap text-sm font-medium ${
                  activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            {activeCategory === 'all' 
              ? t('featuredProducts', 'Featured Products') 
              : categories.find(c => c.id === activeCategory)?.name
            }
          </h2>
          
          <div className="space-y-3">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                retailerName={product.retailerName}
                image={product.image}
                category="electronics"
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ElectronicsHome;