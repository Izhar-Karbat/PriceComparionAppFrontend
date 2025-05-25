import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, showBackButton = false, showLanguageToggle = true, actions = [] }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    i18n.changeLanguage(currentLang === 'he' ? 'en' : 'he');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-20 h-16 flex items-center px-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)} 
              className="mr-2 p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-semibold">{title || t('appTitle')}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {actions.map((action, index) => (
            <button key={index} onClick={action.onClick} className="p-2 rounded-full hover:bg-gray-100">
              {action.icon}
            </button>
          ))}
          
          {showLanguageToggle && (
            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100">
              <span className="font-medium">{i18n.language === 'he' ? 'EN' : 'עב'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;