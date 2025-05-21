// src/components/BottomNavigationBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './BottomNavigationBar.css';

function BottomNavigationBar() {
  const { t } = useTranslation(); // Initialize t function

  return (
    <nav className="bottom-nav">
      <NavLink 
        to="/supermarket" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        {t('supermarketTab')} {/* Use translation key */}
      </NavLink>
      <NavLink 
        to="/pharma" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        {t('pharmaTab')} {/* Use translation key */}
      </NavLink>
      <NavLink 
        to="/electronics" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        {t('electronicsTab')} {/* Use translation key */}
      </NavLink>
    </nav>
  );
}

export default BottomNavigationBar;