import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const PharmaHome = () => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock categories
  const categories = [
    { id: 'all', name: t('all', 'All') },
    { id: 'medication', name: t('medication', 'Medication') },
    { id: 'vitamins', name: t('vitamins', 'Vitamins') },
    { id: 'skincare', name: t('skincare', 'Skincare') },
    { id: 'babycare', name: t('babycare', 'Baby Care') },
  ];
  
  // Mock featured products
  const featuredProducts = [
    {
      id: 201,
      name: 'Paracetamol 20 Tabs',
      price: 19.90,
      retailerName: 'Super-Pharm',
      image: 'https://via.placeholder.com/150?text=Paracetamol',
      category: 'medication'
    },
    {
      id: 202,
      name: 'Vitamin C 500mg',
      price: 39.90,
      retailerName: 'Be Pharm',
      image: 'https://via.placeholder.com/150?text=VitaminC',
      category: 'vitamins'
    },
    {
      id: 203,
      name: 'Facial Moisturizer',
      price: 54.90,
      originalPrice: 69.90,
      retailerName: 'Super-Pharm',
      image: 'https://via.placeholder.com/150?text=Moisturizer',
      category: 'skincare'
    },
    {
      id: 204,
      name: 'Baby Wipes (72 pcs)',
      price: 12.90,
      retailerName: 'Be Pharm',
      image: 'https://via.placeholder.com/150?text=BabyWipes',
      category: 'babycare'
    },
    {
      id: 205,
      name: 'Allergy Relief Pills',
      price: 29.90,
      originalPrice: 34.90,
      retailerName: 'Super-Pharm',
      image: 'https://via.placeholder.com/150?text=Allergy',
      category: 'medication'
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
      title={t('pharma')}
      showBackButton={false}
      showCart={true}
    >
      <div className="space-y-4">
        {/* Search bar */}
        <SearchBar
          categoryPath="/pharma"
          placeholder={t('searchPharmaProducts', 'Search medications, vitamins...')}
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
            onClick={() => navigate('/nearby-stores')}
            className="flex-1 flex items-center justify-center py-2 border border-primary text-primary rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('nearbyStores', 'Nearby Stores')}
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
                category="pharma"
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PharmaHome;