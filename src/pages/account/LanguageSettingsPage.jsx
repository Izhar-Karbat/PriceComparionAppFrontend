import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
  ];
  
  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      i18n.changeLanguage(selectedLanguage);
      setIsSaving(false);
      setSuccessMessage(t('languageSettingsSaved', 'Language settings have been saved'));
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="py-4">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t('languageSettings', 'Language Settings')}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {t('languageSettingsDesc', 'Choose your preferred language for the app interface')}
          </p>
        </div>
        
        <div className="px-4 py-5 sm:px-6">
          <div className="space-y-4">
            {languages.map((language) => (
              <div
                key={language.code}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedLanguage === language.code
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                
                <button
                  type="button"
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    selectedLanguage === language.code
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {selectedLanguage === language.code && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleSave}
              disabled={isSaving || selectedLanguage === i18n.language}
              className={`w-full py-3 px-4 rounded-lg font-medium flex justify-center ${
                selectedLanguage !== i18n.language
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {t('saveChanges', 'Save Changes')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t('translateApp', 'Help Translate')}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {t('translateAppDesc', 'Help us improve translations or add new languages')}
          </p>
        </div>
        
        <div className="px-4 py-5 sm:px-6">
          <p className="text-gray-600 mb-4">
            {t('translateAppInfo', 'We welcome contributions to improve our translations or add support for new languages. If you\'d like to help, please get in touch with our translation team.')}
          </p>
          
          <button className="text-primary font-medium">
            {t('contactTranslationTeam', 'Contact Translation Team')}
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>
          {t('languageDisclaimer', 'Some content may not be available in all languages. Machine translation might be used for certain elements.')}
        </p>
      </div>
    </div>
  );
};

export default LanguageSettingsPage;