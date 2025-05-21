import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BottomTabBar = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const tabs = [
    { 
      path: '/supermarket', 
      label: t('supermarket'), 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ) 
    },
    { 
      path: '/pharma', 
      label: t('pharma'), 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      path: '/electronics', 
      label: t('electronics'), 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-around bg-white border-t border-gray-200 h-16">
      {tabs.map((tab) => (
        <Link 
          to={tab.path} 
          key={tab.path}
          className={`flex flex-col items-center justify-center w-full ${
            isActive(tab.path) ? 'text-primary' : 'text-gray-500'
          }`}
        >
          <div>{tab.icon}</div>
          <div className="mt-1 text-xs font-medium">{tab.label}</div>
        </Link>
      ))}
    </div>
  );
};

export default BottomTabBar;