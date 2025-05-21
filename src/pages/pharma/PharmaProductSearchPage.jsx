// src/pages/pharma/PharmaProductSearchPage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import ResultsList from '../../components/ResultsList';

function PharmaProductSearchPage() {
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedImageName, setSearchedImageName] = useState('');

  const handleSearchSubmit = (query) => {
    console.log("Text search submitted in PharmaProductSearchPage:", query);
    setSearchTerm(query);
    setSearchedImageName('');
    setIsLoading(true);
    setSearchResults([]);

    setTimeout(() => {
      let mockResults = [];
      if (query.toLowerCase().includes("vitamin") || query.toLowerCase().includes("supplement")) {
        mockResults = [
          { id: 401, name: "Vitamin C 500mg", imageUrl: "https://via.placeholder.com/50/FFA500/FFFFFF?Text=VitC" },
          { id: 402, name: "Multivitamin Complex", imageUrl: "https://via.placeholder.com/50/FFD700/FFFFFF?Text=Multi" },
        ];
      } else if (query.toLowerCase().includes("cream") || query.toLowerCase().includes("lotion")) {
        mockResults = [
          { id: 403, name: "Moisturizing Cream 250ml", imageUrl: "https://via.placeholder.com/50/F0E68C/000000?Text=Cream" },
        ];
      } else if (query) {
        mockResults = [
          { id: 404, name: `Pharma results for "${query}"`, imageUrl: "https://via.placeholder.com/50/FAFAD2/000000?Text=PharmaGen" },
        ];
      }
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  const handleImageSearchSubmit = (file) => {
    console.log("Image search submitted in PharmaProductSearchPage with file:", file.name);
    setSearchedImageName(file.name);
    setSearchTerm('');
    setIsLoading(true);
    setSearchResults([]);

    setTimeout(() => {
      const mockResults = [
        { id: 501, name: `Pharmaceutical product recognized from: ${file.name}`, imageUrl: "https://via.placeholder.com/50/F5DEB3/000000?Text=PharmaImg" },
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
      <h2>{t('pharmaProductSearchPageTitle', 'Pharma & Cosmetics Product Search')}</h2>
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
          productType="pharma"
        />
      )}
    </div>
  );
}

export default PharmaProductSearchPage;