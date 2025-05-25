import React, { useState } from 'react';
import HahishukProductList from '../../components/HahishukProductList';
import MyCartPage from './MyCartPage';

const HahishukShoppingPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevItems, item];
    });
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="hahishuk-shopping-page">
      <div className="tabs" style={{ marginBottom: '20px', borderBottom: '2px solid #ddd' }}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: activeTab === 'products' ? '#3498db' : 'transparent',
            color: activeTab === 'products' ? 'white' : 'black',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('cart')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: activeTab === 'cart' ? '#3498db' : 'transparent',
            color: activeTab === 'cart' ? 'white' : 'black',
            cursor: 'pointer',
            fontSize: '16px',
            position: 'relative'
          }}
        >
          My Cart {cartItems.length > 0 && `(${cartItems.length})`}
        </button>
      </div>

      {activeTab === 'products' && (
        <HahishukProductList onAddToCart={handleAddToCart} />
      )}

      {activeTab === 'cart' && (
        <MyCartPage initialCartItems={cartItems} />
      )}
    </div>
  );
};

export default HahishukShoppingPage;