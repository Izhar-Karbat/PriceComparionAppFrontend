import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PriceComparisonRow from '../components/PriceComparisonRow';

const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('prices');
  const [showAllStores, setShowAllStores] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch product details
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock product data
      const mockProduct = {
        id: parseInt(id),
        name: `Product ${id}`,
        description: 'High quality product with excellent features and specifications.',
        imageUrl: `https://via.placeholder.com/300/F5F5F5/000000?text=Product+${id}`,
        price: 79.90,
        originalPrice: 99.90,
        unit: 'unit',
        rating: 4.5,
        reviews: 123,
        retailers: [
          { id: 1, name: 'Mega Market', price: 79.90, distance: 1.2, isLowestPrice: true },
          { id: 2, name: 'Super Deal', price: 84.90, distance: 2.5, isLowestPrice: false },
          { id: 3, name: 'Value Store', price: 89.90, distance: 0.8, isLowestPrice: false },
          { id: 4, name: 'Discount Chain', price: 82.90, distance: 3.7, isLowestPrice: false },
          { id: 5, name: 'Online Shop', price: 86.90, distance: null, isLowestPrice: false },
          { id: 6, name: 'City Market', price: 84.90, distance: 4.2, isLowestPrice: false }
        ],
        priceHistory: [
          { date: '2025-01-01', price: 99.90 },
          { date: '2025-02-01', price: 94.90 },
          { date: '2025-03-01', price: 89.90 },
          { date: '2025-04-01', price: 89.90 },
          { date: '2025-05-01', price: 79.90 }
        ],
        specifications: [
          { name: 'Brand', value: 'Premium Brand' },
          { name: 'Model', value: `Model X-${id}` },
          { name: 'Dimensions', value: '10 x 15 x 5 cm' },
          { name: 'Weight', value: '250g' },
          { name: 'Color', value: 'Silver' },
          { name: 'Material', value: 'Aluminum' }
        ],
        similarProducts: [
          { id: parseInt(id) + 1, name: `Similar Product ${parseInt(id) + 1}`, price: 69.90, imageUrl: `https://via.placeholder.com/100/F5F5F5/000000?text=Similar+${parseInt(id) + 1}` },
          { id: parseInt(id) + 2, name: `Similar Product ${parseInt(id) + 2}`, price: 89.90, imageUrl: `https://via.placeholder.com/100/F5F5F5/000000?text=Similar+${parseInt(id) + 2}` },
          { id: parseInt(id) + 3, name: `Similar Product ${parseInt(id) + 3}`, price: 74.90, imageUrl: `https://via.placeholder.com/100/F5F5F5/000000?text=Similar+${parseInt(id) + 3}` }
        ]
      };
      
      setProduct(mockProduct);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      onAddToCart && onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      });
      
      // Show confirmation
      alert(t('addedToCartConfirmation', 'Product added to cart!'));
    }
  };
  
  const handleNavigateToStore = (retailer) => {
    // In a real app, this would navigate to the retailer's website or show more details
    alert(t('navigateToStore', 'Navigate to {{store}} store page', { store: retailer.name }));
  };
  
  const handleSetAlert = () => {
    // In a real app, this would show a modal to set a price alert
    alert(t('priceAlertSet', 'Price alert set for this product'));
  };
  
  const displayedRetailers = showAllStores ? product?.retailers : product?.retailers.slice(0, 3);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p>{t('loadingProductDetails', 'Loading product details...')}</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p className="text-gray-500">{t('productNotFound', 'Product not found')}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 bg-primary text-white py-2 px-4 rounded-full"
        >
          {t('goBack', 'Go Back')}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Product Image and basic info */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-5">
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-h-full object-contain"
          />
        </div>
        
        <div className="p-4">
          <h1 className="text-xl font-bold mb-1">{product.name}</h1>
          
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating} ({product.reviews} {t('reviews', 'reviews')})</span>
            </div>
          )}
          
          <div className="flex items-baseline mb-3">
            <span className="text-2xl font-bold">₪{product.price.toFixed(2)}</span>
            {product.originalPrice && product.price < product.originalPrice && (
              <>
                <span className="ml-2 text-sm text-gray-500 line-through">₪{product.originalPrice.toFixed(2)}</span>
                <span className="ml-1 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>
          
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-3 px-6 rounded-full font-medium hover:bg-primary/90"
            >
              {t('addToCartButton')}
            </button>
            <button 
              onClick={handleSetAlert}
              className="p-3 bg-gray-100 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>
            <button className="p-3 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs for Prices, Specifications, Reviews */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-5">
        <div className="flex border-b">
          <button 
            className={`flex-1 py-3 text-center ${activeTab === 'prices' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('prices')}
          >
            {t('prices', 'Prices')}
          </button>
          <button 
            className={`flex-1 py-3 text-center ${activeTab === 'specs' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('specs')}
          >
            {t('specifications', 'Specifications')}
          </button>
          <button 
            className={`flex-1 py-3 text-center ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reviews')}
          >
            {t('reviews', 'Reviews')}
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'prices' && (
            <div>
              <div className="mb-4">
                <h3 className="font-medium mb-3">{t('priceHistory', 'Price History')}</h3>
                <div className="h-40 border-b border-l relative">
                  {/* This would be a real chart in a production app */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-end">
                    {product.priceHistory.map((point, index) => (
                      <div 
                        key={index} 
                        className="flex-1 flex flex-col items-center"
                        style={{ 
                          height: '100%',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <div 
                          className="w-full bg-primary/20"
                          style={{ 
                            height: `${(point.price / 100) * 40}%`,
                            maxHeight: '90%',
                            minHeight: '10%'
                          }}
                        >
                          <div className="h-1 bg-primary w-full"></div>
                        </div>
                        <div className="text-xs mt-1 text-gray-500">
                          {new Date(point.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">{t('allStores', 'All Stores')}</h3>
                  <select className="text-sm border border-gray-300 rounded-md p-1">
                    <option value="price">{t('sortByPrice', 'Sort by Price')}</option>
                    <option value="distance">{t('sortByDistance', 'Sort by Distance')}</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  {displayedRetailers.map((retailer) => (
                    <PriceComparisonRow
                      key={retailer.id}
                      retailer={retailer}
                      price={retailer.price}
                      distance={retailer.distance}
                      isLowestPrice={retailer.isLowestPrice}
                      onClick={() => handleNavigateToStore(retailer)}
                    />
                  ))}
                </div>
                
                {!showAllStores && product.retailers.length > 3 && (
                  <button 
                    className="w-full text-center text-primary py-2 mt-2"
                    onClick={() => setShowAllStores(true)}
                  >
                    {t('showAllStores', 'Show All Stores')} ({product.retailers.length})
                  </button>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'specs' && (
            <div>
              <h3 className="font-medium mb-3">{t('specifications', 'Specifications')}</h3>
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between py-2 ${index < product.specifications.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="text-gray-600">{spec.name}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-3">{t('reviewsComingSoon', 'Reviews are coming soon!')}</p>
                <button className="bg-primary text-white py-2 px-4 rounded-full">
                  {t('writeReview', 'Write a Review')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Similar Products */}
      {product.similarProducts && product.similarProducts.length > 0 && (
        <div className="mb-5">
          <h3 className="font-medium mb-3">{t('similarProducts', 'Similar Products')}</h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-3 pb-2">
              {product.similarProducts.map(similarProduct => (
                <div 
                  key={similarProduct.id}
                  className="flex-shrink-0 w-32 bg-white rounded-xl shadow-md overflow-hidden"
                  onClick={() => navigate(`/product/${similarProduct.id}`)}
                >
                  <div className="h-24 bg-gray-100 flex items-center justify-center">
                    <img 
                      src={similarProduct.imageUrl} 
                      alt={similarProduct.name} 
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{similarProduct.name}</p>
                    <p className="text-sm font-bold mt-1">₪{similarProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;