import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Main sections
import SupermarketPage from './pages/SupermarketPage';
import PharmaPage from './pages/PharmaPage';
import ElectronicsPage from './pages/ElectronicsPage';

// Supermarket pages
import SupermarketProductSearchPage from './pages/supermarket/SupermarketProductSearchPage';
import MyCartPage from './pages/supermarket/MyCartPage';
import SupermarketStatisticsPage from './pages/supermarket/SupermarketStatisticsPage';
import ReceiptUploadPage from './pages/supermarket/ReceiptUploadPage';

// Pharma pages
import PharmaProductSearchPage from './pages/pharma/PharmaProductSearchPage';
import PharmaStatisticsPage from './pages/pharma/PharmaStatisticsPage';
import SmartTablePage from './pages/pharma/SmartTablePage';

// Electronics pages
import ElectronicsProductSearchPage from './pages/electronics/ElectronicsProductSearchPage';
import ElectronicsStatisticsPage from './pages/electronics/ElectronicsStatisticsPage';
import ElectronicsSmartTablePage from './pages/electronics/ElectronicsSmartTablePage';

// Core app features
import SmartTableAssistantPage from './pages/SmartTableAssistantPage';
import InsightsAlertsPage from './pages/InsightsAlertsPage';
import StoreSelectorPage from './pages/StoreSelectorPage';
import NearbyStoresMapPage from './pages/NearbyStoresMapPage';
import ProductDetailPage from './pages/ProductDetailPage';

// Account & Auth pages
import LoginPage from './pages/account/LoginPage';
import SignupPage from './pages/account/SignupPage';
import ResetPasswordPage from './pages/account/ResetPasswordPage';
import AccountPage from './pages/account/AccountPage';
import SettingsPage from './pages/account/SettingsPage';
import LanguageSettingsPage from './pages/account/LanguageSettingsPage';
import PricingPage from './pages/account/PricingPage';
import PaymentPage from './pages/account/PaymentPage';
import OrderHistoryPage from './pages/account/OrderHistoryPage';

// Layout and components
import MobileLayout from './components/MobileLayout';

function App() {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(item => item.id === productToAdd.id);
      if (existingProduct) {
        console.log(`${productToAdd.name} is already in the cart.`);
        return prevCartItems; 
      } else {
        console.log("Adding to cart:", productToAdd);
        return [...prevCartItems, productToAdd];
      }
    });
  };

  // For debugging
  React.useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  return (
    <Routes>
      {/* Supermarket Section */}
      <Route path="/" element={<MobileLayout><SupermarketPage /></MobileLayout>} />
      <Route path="/supermarket" element={<MobileLayout><SupermarketPage /></MobileLayout>} />
      <Route path="/supermarket/search" element={<MobileLayout title={t('supermarketProductSearchPageTitle')} showBackButton><SupermarketProductSearchPage onAddToCart={handleAddToCart} /></MobileLayout>} />
      <Route path="/supermarket/cart" element={<MobileLayout title={t('myCartPageTitle')} showBackButton><MyCartPage cartItems={cartItems} /></MobileLayout>} />
      <Route path="/supermarket/statistics" element={<MobileLayout title={t('supermarketStatisticsPageTitle')} showBackButton><SupermarketStatisticsPage /></MobileLayout>} />
      <Route path="/supermarket/receipt-upload" element={<MobileLayout title={t('receiptUploadPageTitle', 'Receipt Upload')} showBackButton><ReceiptUploadPage /></MobileLayout>} />

      {/* Pharma Section */}
      <Route path="/pharma" element={<MobileLayout><PharmaPage /></MobileLayout>} />
      <Route path="/pharma/search" element={<MobileLayout title={t('pharmaProductSearchPageTitle')} showBackButton><PharmaProductSearchPage /></MobileLayout>} />
      <Route path="/pharma/smart-table" element={<MobileLayout title={t('pharmaSmartTablePageTitle')} showBackButton><SmartTablePage /></MobileLayout>} />
      <Route path="/pharma/statistics" element={<MobileLayout title={t('pharmaStatisticsPageTitle')} showBackButton><PharmaStatisticsPage /></MobileLayout>} />

      {/* Electronics Section */}
      <Route path="/electronics" element={<MobileLayout><ElectronicsPage /></MobileLayout>} />
      <Route path="/electronics/search" element={<MobileLayout title={t('electronicsProductSearchPageTitle')} showBackButton><ElectronicsProductSearchPage /></MobileLayout>} />
      <Route path="/electronics/smart-table" element={<MobileLayout title={t('electronicsSmartTablePageTitle')} showBackButton><ElectronicsSmartTablePage /></MobileLayout>} />
      <Route path="/electronics/statistics" element={<MobileLayout title={t('electronicsStatisticsPageTitle')} showBackButton><ElectronicsStatisticsPage /></MobileLayout>} />

      {/* Core App Features */}
      <Route path="/ai-assistant" element={<MobileLayout title={t('smartTableAssistantPageTitle', 'Smart Table Assistant')} showBackButton><SmartTableAssistantPage /></MobileLayout>} />
      <Route path="/insights" element={<MobileLayout title={t('insightsAlertsPageTitle', 'Insights & Alerts')} showBackButton><InsightsAlertsPage /></MobileLayout>} />
      <Route path="/stores" element={<MobileLayout title={t('storeSelectorPageTitle', 'Store Selector')} showBackButton><StoreSelectorPage /></MobileLayout>} />
      <Route path="/map" element={<MobileLayout title={t('nearbyStoresMapPageTitle', 'Nearby Stores')} showBackButton><NearbyStoresMapPage /></MobileLayout>} />
      <Route path="/product/:id" element={<MobileLayout title={t('productDetailPageTitle', 'Product Details')} showBackButton><ProductDetailPage onAddToCart={handleAddToCart} /></MobileLayout>} />

      {/* Account & Auth Pages */}
      <Route path="/login" element={<MobileLayout showHeader={false} showBottomNav={false}><LoginPage /></MobileLayout>} />
      <Route path="/signup" element={<MobileLayout showHeader={false} showBottomNav={false}><SignupPage /></MobileLayout>} />
      <Route path="/reset-password" element={<MobileLayout showHeader={false} showBottomNav={false}><ResetPasswordPage /></MobileLayout>} />
      <Route path="/account" element={<MobileLayout title={t('accountPageTitle', 'My Account')} showBackButton><AccountPage /></MobileLayout>} />
      <Route path="/settings" element={<MobileLayout title={t('settingsPageTitle', 'Settings')} showBackButton><SettingsPage /></MobileLayout>} />
      <Route path="/language" element={<MobileLayout title={t('languageSettingsPageTitle', 'Language Settings')} showBackButton><LanguageSettingsPage /></MobileLayout>} />
      <Route path="/pricing" element={<MobileLayout title={t('pricingPageTitle', 'Pricing Plans')} showBackButton><PricingPage /></MobileLayout>} />
      <Route path="/payment" element={<MobileLayout title={t('paymentPageTitle', 'Payment')} showBackButton><PaymentPage /></MobileLayout>} />
      <Route path="/order-history" element={<MobileLayout title={t('orderHistoryPageTitle', 'Order History')} showBackButton><OrderHistoryPage /></MobileLayout>} />
    </Routes>
  );
}

export default App;