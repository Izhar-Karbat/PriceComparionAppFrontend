import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BottomTabBar = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t flex justify-around items-center h-16 z-20">
      <NavLink 
        to="/supermarket" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-full py-1 ${isActive ? 'text-primary' : 'text-gray-500'}`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <span className="text-xs mt-1">{t('supermarketTab')}</span>
      </NavLink>

      <NavLink 
        to="/pharma" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-full py-1 ${isActive ? 'text-primary' : 'text-gray-500'}`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 1-.659 1.591L9.5 14.5m3.75-11.729V3.104A2.25 2.25 0 0 1 15 5.25h.01a2.25 2.25 0 0 1 2.25 2.25v.25" />
        </svg>
        <span className="text-xs mt-1">{t('pharmaTab')}</span>
      </NavLink>

      <NavLink 
        to="/electronics" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center w-full py-1 ${isActive ? 'text-primary' : 'text-gray-500'}`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
        <span className="text-xs mt-1">{t('electronicsTab')}</span>
      </NavLink>
    </nav>
  );
};

export default BottomTabBar;