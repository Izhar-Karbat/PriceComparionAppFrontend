// src/pages/supermarket/SupermarketProductSearchPage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar'; 
import ResultsList from '../../components/ResultsList';

// Accept onAddToCart as a prop
function SupermarketProductSearchPage({ onAddToCart }) { 
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedImageName, setSearchedImageName] = useState('');   

  const handleSearchSubmit = (query) => { 
    console.log("Text search submitted in SupermarketProductSearchPage:", query);
    setSearchTerm(query);
    setSearchedImageName(''); 
    setIsLoading(true);
    setSearchResults([]); 

    setTimeout(() => {
      let mockResults = [];
      if (query.toLowerCase() === "bamba") {
        mockResults = [
          { id: 1, name: "Bamba (Osem) 80g", imageUrl: "https://via.placeholder.com/50/FF0000/FFFFFF?Text=BambaO" },
          { id: 2, name: "Bamba Noogát (Osem) 60g", imageUrl: "https://via.placeholder.com/50/FF6347/FFFFFF?Text=BambaN" },
        ];
      } else if (query.toLowerCase() === "bisli") {
        mockResults = [
          { id: 3, name: "Bisli Grill (Osem) 70g", imageUrl: "https://via.placeholder.com/50/00FF00/FFFFFF?Text=BisliG" },
        ];
      } else if (query) { 
         mockResults = [
          { id: 4, name: `Results for "${query}"`, imageUrl: "https://via.placeholder.com/50/808080/FFFFFF?Text=Mock" },
        ];
      }
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1500); 
  };

  const handleImageSearchSubmit = (file) => {
    console.log("Image search submitted in SupermarketProductSearchPage with file:", file.name);
    setSearchedImageName(file.name); 
    setSearchTerm(''); 
    setIsLoading(true);
    setSearchResults([]);

    setTimeout(() => {
      const mockResults = [
        { id: 101, name: `Identified from: ${file.name}`, imageUrl: "https://via.placeholder.com/50/0000FF/FFFFFF?Text=ImgResult" },
        { id: 102, name: "Another possible match for image", imageUrl: "https://via.placeholder.com/50/ADD8E6/000000?Text=ImgAlt" },
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 2000); 
  };

  return (
    <div>
      <h2>{t('supermarketProductSearchPageTitle', 'Supermarket Product Search')}</h2>
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
          onAddToCart={onAddToCart}
          productType="supermarket" 
        /> 
      )}
    </div>
  );
}

export default SupermarketProductSearchPage;