import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const Supermarket = () => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock categories
  const categories = [
    { id: 'all', name: t('all', 'All') },
    { id: 'dairy', name: t('dairy', 'Dairy & Eggs') },
    { id: 'produce', name: t('produce', 'Fruits & Veg') },
    { id: 'meat', name: t('meat', 'Meat & Poultry') },
    { id: 'bakery', name: t('bakery', 'Bakery') },
    { id: 'drinks', name: t('drinks', 'Drinks') },
  ];
  
  // Mock featured products
  const featuredProducts = [
    {
      id: 101,
      name: 'Organic Milk 3% 1L',
      price: 6.90,
      originalPrice: 7.90,
      retailerName: 'Shufersal',
      image: 'https://via.placeholder.com/150?text=Milk',
      category: 'dairy'
    },
    {
      id: 102,
      name: 'Eggs Large (12 pcs)',
      price: 14.50,
      retailerName: 'Rami Levy',
      image: 'https://via.placeholder.com/150?text=Eggs',
      category: 'dairy'
    },
    {
      id: 103,
      name: 'Whole Wheat Bread',
      price: 8.90,
      originalPrice: 10.90,
      retailerName: 'Victory',
      image: 'https://via.placeholder.com/150?text=Bread',
      category: 'bakery'
    },
    {
      id: 104,
      name: 'Bananas 1kg',
      price: 5.90,
      retailerName: 'Shufersal',
      image: 'https://via.placeholder.com/150?text=Bananas',
      category: 'produce'
    },
    {
      id: 105,
      name: 'Ground Beef 500g',
      price: 28.90,
      retailerName: 'Rami Levy',
      image: 'https://via.placeholder.com/150?text=Beef',
      category: 'meat'
    },
    {
      id: 106,
      name: 'Coca Cola 1.5L',
      price: 7.50,
      originalPrice: 8.90,
      retailerName: 'Victory',
      image: 'https://via.placeholder.com/150?text=Coke',
      category: 'drinks'
    },
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
      title={t('supermarket')}
      showBackButton={false}
      showCart={true}
    >
      <div className="space-y-4">
        {/* Search bar */}
        <SearchBar
          categoryPath="/supermarket"
          placeholder={t('searchProducts', 'Search products...')}
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
            onClick={() => navigate('/scanner')}
            className="flex-1 flex items-center justify-center py-2 border border-primary text-primary rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('scanReceipt')}
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
                category="supermarket"
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Supermarket;