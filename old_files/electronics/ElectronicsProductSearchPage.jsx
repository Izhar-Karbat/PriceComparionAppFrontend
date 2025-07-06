// src/pages/electronics/ElectronicsProductSearchPage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import ResultsList from '../../components/ResultsList';

function ElectronicsProductSearchPage() {
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedImageName, setSearchedImageName] = useState('');

  const handleSearchSubmit = (query) => {
    console.log("Text search submitted in ElectronicsProductSearchPage:", query);
    setSearchTerm(query);
    setSearchedImageName('');
    setIsLoading(true);
    setSearchResults([]);

    setTimeout(() => {
      let mockResults = [];
      if (query.toLowerCase().includes("phone") || query.toLowerCase().includes("smartphone")) {
        mockResults = [
          { id: 201, name: "Smartphone XYZ Pro", imageUrl: "https://via.placeholder.com/50/0000FF/FFFFFF?Text=Phone1" },
          { id: 202, name: "Budget Phone ABC", imageUrl: "https://via.placeholder.com/50/1E90FF/FFFFFF?Text=Phone2" },
        ];
      } else if (query.toLowerCase().includes("laptop") || query.toLowerCase().includes("notebook")) {
        mockResults = [
          { id: 203, name: "Laptop Ultra Thin", imageUrl: "https://via.placeholder.com/50/00BFFF/FFFFFF?Text=Laptop" },
        ];
      } else if (query) {
        mockResults = [
          { id: 204, name: `Electronics results for "${query}"`, imageUrl: "https://via.placeholder.com/50/87CEEB/000000?Text=ElecGen" },
        ];
      }
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  const handleImageSearchSubmit = (file) => {
    console.log("Image search submitted in ElectronicsProductSearchPage with file:", file.name);
    setSearchedImageName(file.name);
    setSearchTerm('');
    setIsLoading(true);
    setSearchResults([]);

    setTimeout(() => {
      const mockResults = [
        { id: 301, name: `Electronic device recognized from: ${file.name}`, imageUrl: "https://via.placeholder.com/50/4169E1/FFFFFF?Text=ElecImg" },
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
      <h2>{t('electronicsProductSearchPageTitle', 'Electronics Product Search')}</h2>
      <SearchBar
        onSearchSubmit={handleSearchSubmit}
        onImageSubmit={handleImageSearchSubmit}
      />

      {isLoading && searchTerm && <p>{t('loadingResultsFor', { searchTerm: searchTerm })}</p>}
      {isLoading && searchedImageName && <p>{t('loadingResultsFor', { searchTerm: `image "${searchedImageName}"` })}</p>}

      {!isLoading && searchResults.length === 0 && (searchTerm || searchedImageName) && (
        <p>{t('noResultsFoundFor', { searchTerm: searchTerm || `image "${searchedImageName}"` })}</p>
      )}

      {!isLoading && searchResults.length > 0 && (
        <ResultsList
          products={searchResults}
          productType="electronics"
        />
      )}
    </div>
  );
}

export default ElectronicsProductSearchPage;