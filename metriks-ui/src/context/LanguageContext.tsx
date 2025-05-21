import { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
type Language = 'en' | 'he';

// Simple translations (in a real app, would be more extensive and in separate files)
const translations = {
  en: {
    supermarket: 'Supermarket',
    pharma: 'Pharma & Cosmetics',
    electronics: 'Electronics',
    cart: 'Cart',
    addToCart: 'Add to Cart',
    search: 'Search',
    myCart: 'My Cart',
    total: 'Total',
    checkout: 'Checkout',
    smartTable: 'Smart Table',
    statistics: 'Statistics',
    scanReceipt: 'Scan Receipt',
    // Add more translations as needed
  },
  he: {
    supermarket: 'סופרמרקט',
    pharma: 'פארם וקוסמטיקה',
    electronics: 'אלקטרוניקה',
    cart: 'עגלה',
    addToCart: 'הוסף לעגלה',
    search: 'חיפוש',
    myCart: 'העגלה שלי',
    total: 'סה״כ',
    checkout: 'לתשלום',
    smartTable: 'טבלה חכמה',
    statistics: 'סטטיסטיקה',
    scanReceipt: 'סרוק חשבונית',
    // Add more translations as needed
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context
const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    // @ts-ignore: Dynamic access
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};