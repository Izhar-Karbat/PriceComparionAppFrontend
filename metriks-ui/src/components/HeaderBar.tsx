import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

type HeaderBarProps = {
  title: string;
  showBackButton?: boolean;
  showCart?: boolean;
  showLanguageToggle?: boolean;
  actions?: React.ReactNode;
};

const HeaderBar = ({
  title,
  showBackButton = false,
  showCart = false,
  showLanguageToggle = false,
  actions,
}: HeaderBarProps) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-white shadow-md h-16">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={handleGoBack}
            className="p-2 mr-2 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        {actions}
        
        {showLanguageToggle && (
          <button
            onClick={toggleLanguage}
            className="p-2 text-sm font-medium text-primary"
          >
            {language === 'en' ? 'עב' : 'EN'}
          </button>
        )}
        
        {showCart && (
          <button 
            onClick={handleGoToCart}
            className="p-2 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;