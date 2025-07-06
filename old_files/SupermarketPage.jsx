// src/pages/SupermarketPage.jsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function SupermarketPage() {
  const { t } = useTranslation(); // Initialize t function
  const location = useLocation();

  const buttonStyle = {
    display: 'block',
    margin: '20px auto',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
  };

  const showSubPageNavigation = location.pathname === '/supermarket' || location.pathname === '/supermarket/' || location.pathname === '/';


  return (
    <div>
      <h1>{t('supermarketPageTitle')}</h1> {/* Use translation */}

      {showSubPageNavigation && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="search" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>{t('productSearchButton')}</button> {/* Use translation */}
          </Link>
          <Link to="my-cart" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>{t('myCartButton')}</button> {/* Use translation */}
          </Link>
          <Link to="statistics" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>{t('statisticsButton')}</button> {/* Use translation */}
          </Link>
        </div>
      )}

      <Outlet /> 
    </div>
  );
}

export default SupermarketPage;