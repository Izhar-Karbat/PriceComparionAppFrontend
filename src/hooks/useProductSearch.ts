import { useState, useCallback } from 'react';
import type { Product } from '../types';
import { API_URL } from '../../config';

interface UseProductSearchParams {
  category?: string;
  searchType?: 'master' | 'nearby';
  latitude?: number;
  longitude?: number;
  itemsPerPage?: number;
}

interface UseProductSearchResult {
  data: Product[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  isLoadingMore: boolean;
  allDataLoaded: boolean;
  search: (query: string) => void;
  loadMore: () => void;
  reset: () => void;
}

export const useProductSearch = ({
  category = 'pharma',
  searchType = 'master',
  latitude,
  longitude,
  itemsPerPage = 20,
}: UseProductSearchParams = {}): UseProductSearchResult => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const fetchSearchResults = useCallback(async (query: string, page: number = 1) => {
    if (!query || query.length < 2) {
      setData([]);
      setError(query ? 'Search query must be at least 2 characters.' : null);
      setIsLoading(false);
      setIsLoadingMore(false);
      setAllDataLoaded(true);
      return;
    }

    if (page === 1) {
      setIsLoading(true);
      setData([]);
      setAllDataLoaded(false);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    let endpoint = `${API_URL}/api/search/${category}?q=${encodeURIComponent(query)}&page=${page}&limit=${itemsPerPage}`;
    endpoint += `&searchType=${searchType}`;
    
    if (searchType === 'nearby' && latitude && longitude) {
      endpoint += `&latitude=${latitude}&longitude=${longitude}`;
    }

    console.log(`[useProductSearch] Fetching: ${endpoint}`);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(endpoint, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const responseText = await response.text();
      
      if (!response.ok) {
        let errData;
        try {
          errData = JSON.parse(responseText);
        } catch (e) {
          errData = { error: `HTTP error ${response.status}. Non-JSON response.` };
        }
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const result = JSON.parse(responseText);
      console.log('[useProductSearch] API Response:', result);
      
      // Handle both direct array response and object with products array
      const productsData = Array.isArray(result) ? result : result.products || result;

      if (productsData && Array.isArray(productsData)) {
        // Transform the data to match our Product interface
        const transformedProducts = productsData.map((item: any) => ({
          masterproductid: item.masterproductid,
          productname: item.productname || 'N/A',
          brand: item.brand || '',
          price: item.price ? parseFloat(item.price) : undefined,
          imageurl: (item.image_url && item.image_url.startsWith('http')) 
            ? item.image_url 
            : (item.imageurl && item.imageurl.startsWith('http')) 
              ? item.imageurl 
              : 'https://via.placeholder.com/120x120.png?text=No+Image',
          producturl: item.producturl,
          storename: item.storename,
          unitofmeasure: item.unitofmeasure,
          quantity: item.quantity || 1,
        }));

        if (transformedProducts.length > 0) {
          setData(prevData => (page === 1 ? transformedProducts : [...prevData, ...transformedProducts]));
          setAllDataLoaded(transformedProducts.length < itemsPerPage);
        } else {
          if (page === 1) setData([]);
          setAllDataLoaded(true);
          if (page === 1) {
            setError(`No products found for "${query}".`);
          }
        }
      } else {
        console.error('[useProductSearch] Invalid data structure:', result);
        if (page === 1) setData([]);
        setError('Received invalid data structure from server.');
        setAllDataLoaded(true);
      }
      setCurrentPage(page);
    } catch (e) {
      console.error("[useProductSearch] Fetch error:", e);
      if (e instanceof Error && e.name === 'AbortError') {
        setError("Network timeout. Please check your connection and try again.");
      } else {
        setError(e instanceof Error ? e.message : 'An error occurred while searching.');
      }
      if (page === 1) setData([]);
      setAllDataLoaded(true);
    } finally {
      if (page === 1) setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [category, searchType, latitude, longitude, itemsPerPage]);

  const search = useCallback((query: string) => {
    setCurrentQuery(query);
    setCurrentPage(1);
    setAllDataLoaded(false);
    fetchSearchResults(query, 1);
  }, [fetchSearchResults]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && !allDataLoaded && !isLoading && data.length > 0 && currentQuery) {
      fetchSearchResults(currentQuery, currentPage + 1);
    }
  }, [isLoadingMore, allDataLoaded, isLoading, data.length, fetchSearchResults, currentQuery, currentPage]);

  const reset = useCallback(() => {
    setData([]);
    setIsLoading(false);
    setError(null);
    setCurrentPage(1);
    setIsLoadingMore(false);
    setAllDataLoaded(false);
    setCurrentQuery('');
  }, []);

  return {
    data,
    isLoading,
    error,
    currentPage,
    isLoadingMore,
    allDataLoaded,
    search,
    loadMore,
    reset,
  };
};