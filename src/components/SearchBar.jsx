// src/components/SearchBar.jsx
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function SearchBar({ onSearchSubmit, onImageSubmit }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(inputValue);
      }
    }
    // Optional: Clear input after search
    // setInputValue('');
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file in SearchBar:", file);
      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size, "bytes");

      if (onImageSubmit) {
        onImageSubmit(file);
      }
      
      // Reset the file input's value so the onChange event fires
      // even if the same file is selected again.
      event.target.value = null;
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={inputValue}
          onChange={handleInputChange}
          style={{ padding: '10px', fontSize: '16px', width: '300px' }}
        />
        
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelected}
        />

        <button
          type="button"
          onClick={handleImageUploadClick}
          style={{ padding: '10px 15px', fontSize: '16px' }}
        >
          {t('uploadImageButton')}
        </button>
        <button
          type="submit"
          style={{ padding: '10px 15px', fontSize: '16px' }}
        >
          {t('searchButton')}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;