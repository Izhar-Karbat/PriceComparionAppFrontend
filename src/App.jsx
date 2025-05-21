// src/App.jsx
import React, { useState } from 'react'; // Make sure useState is imported
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

import SupermarketPage from './pages/SupermarketPage';
import PharmaPage from './pages/PharmaPage';
import ElectronicsPage from './pages/ElectronicsPage';

import SupermarketProductSearchPage from './pages/supermarket/SupermarketProductSearchPage';
import MyCartPage from './pages/supermarket/MyCartPage';
import SupermarketStatisticsPage from './pages/supermarket/SupermarketStatisticsPage';

import PharmaProductSearchPage from './pages/pharma/PharmaProductSearchPage';
import PharmaStatisticsPage from './pages/pharma/PharmaStatisticsPage';
import SmartTablePage from './pages/pharma/SmartTablePage';

import ElectronicsProductSearchPage from './pages/electronics/ElectronicsProductSearchPage';
import ElectronicsStatisticsPage from './pages/electronics/ElectronicsStatisticsPage';
import ElectronicsSmartTablePage from './pages/electronics/ElectronicsSmartTablePage';

import BottomNavigationBar from './components/BottomNavigationBar';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]); // State for cart items

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevCartItems) => {
      // Check if product already in cart (optional: can allow duplicates or increment quantity)
      const existingProduct = prevCartItems.find(item => item.id === productToAdd.id);
      if (existingProduct) {
        // Optional: If product exists, you could increment quantity here instead of adding duplicate
        console.log(`${productToAdd.name} is already in the cart.`);
        //alert(`${productToAdd.name} ${t('alreadyInCartAlert', 'is already in the cart!')}`); 
        return prevCartItems; 
      } else {
        console.log("Adding to cart:", productToAdd);
        //alert(`${t('addedToCartAlert', 'Added')} ${productToAdd.name} ${t('toCartAlert', 'to cart!')}`); // Add translations
        return [...prevCartItems, productToAdd];
      }
    });
    //console.log("Current cart:", cartItems); // Note: cartItems might not show the immediate update here due to closure
  };

  // For debugging, to see cartItems update
  React.useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>{t('appTitle')}</h1>
        <div style={{ padding: '10px', position: 'absolute', top: '10px', right: '10px' }}>
          <button onClick={() => changeLanguage('he')} style={{ marginRight: '5px' }}>עברית (Hebrew)</button>
          <button onClick={() => changeLanguage('en')}>English</button>
        </div>
      </header>

      <main style={{ paddingBottom: '80px', paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<SupermarketPage onAddToCart={handleAddToCart} />}> {/* Pass onAddToCart */}
          </Route>

          <Route path="supermarket" element={<SupermarketPage onAddToCart={handleAddToCart} />}> {/* Pass onAddToCart */}
            {/* Pass onAddToCart down to the page that will render the ProductItems */}
            <Route path="search" element={<SupermarketProductSearchPage onAddToCart={handleAddToCart} />} />
            {/* MyCartPage will need cartItems later */}
            <Route path="my-cart" element={<MyCartPage cartItems={cartItems} />} /> {/* Pass cartItems */}
            <Route path="statistics" element={<SupermarketStatisticsPage />} />
          </Route>

          {/* For now, other sections won't have add to cart functionality from search */}
          <Route path="pharma" element={<PharmaPage />}>
            <Route path="search" element={<PharmaProductSearchPage />} /> 
            <Route path="statistics" element={<PharmaStatisticsPage />} />
            <Route path="smart-table" element={<SmartTablePage />} />
          </Route>

          <Route path="electronics" element={<ElectronicsPage />}>
            <Route path="search" element={<ElectronicsProductSearchPage />} />
            <Route path="statistics" element={<ElectronicsStatisticsPage />} />
            <Route path="smart-table" element={<ElectronicsSmartTablePage />} />
          </Route>
        </Routes>
      </main>

      <BottomNavigationBar />
    </div>
  );
}

export default App;