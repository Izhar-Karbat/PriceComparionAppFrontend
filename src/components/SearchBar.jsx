import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ onSearchSubmit, onImageSubmit, placeholder }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit && onSearchSubmit(searchQuery.trim());
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSubmit && onImageSubmit(file);
      // Reset the file input's value so the onChange event fires
      // even if the same file is selected again
      e.target.value = null;
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full"
            placeholder={placeholder || t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="ml-2 bg-primary text-white py-3 px-5 rounded-full hover:bg-primary/90"
        >
          {t('searchButton')}
        </button>
        
        {onImageSubmit && (
          <>
            <button
              type="button"
              onClick={triggerFileInput}
              className="ml-2 bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default SearchBar;