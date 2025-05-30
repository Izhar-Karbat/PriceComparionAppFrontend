// screens/ProductSearchScreen.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const API_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5001' : 'http://localhost:5001';
const ITEMS_PER_PAGE = 20;
const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/80x80.png?text=No+Image';

const SearchResultItem = React.memo(({ item, onPress }) => {
  const imageUrl = item.imageurl && item.imageurl.startsWith('http') ? item.imageurl : FALLBACK_IMAGE_URL;
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.itemImage} 
        onError={(e) => console.log("[SearchResultItem] Image load error:", item.imageurl, e.nativeEvent.error)} 
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.productname || 'N/A'}</Text>
        {item.brand && <Text style={styles.itemBrand} numberOfLines={1}>Brand: {item.brand}</Text>}
        <Text style={styles.itemRetailer} numberOfLines={1}>
          At: {item.storename || 'N/A'} ({item.retailername || 'Unknown Retailer'})
        </Text>
        {item.current_price !== null && item.current_price !== undefined ? (
          <Text style={styles.itemPrice}>₪{parseFloat(item.current_price).toFixed(2)}</Text>
        ) : (
          <Text style={styles.itemPrice}>Price N/A</Text>
        )}
        {item.distance_km !== null && item.distance_km !== undefined && (
            <Text style={styles.itemDistance}>~{parseFloat(item.distance_km).toFixed(1)} km away</Text>
        )}
      </View>
      <Ionicons name="chevron-forward-outline" size={22} color="#C7C7CC" />
    </TouchableOpacity>
  );
});

export default function ProductSearchScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  
  const initialParams = route.params || {};
  const initialQuery = initialParams.searchQuery || '';
  const category = initialParams.category || 'supermarket';
  const initialSearchNearby = initialParams.searchNearby || false;
  const initialUserLocation = initialParams.userLocation || null;

  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialQuery);
  const [displayedQuery, setDisplayedQuery] = useState(''); // Will be set when search is actually performed
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // For initial load
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // For subsequent page loads
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const activeSearchParamsRef = useRef({
    query: '',
    searchType: 'master',
    latitude: null,
    longitude: null,
  });
  const initialLoadPerformedRef = useRef(false); // To prevent double initial load

  const fetchSearchResults = useCallback(async (queryToFetch, pageToFetch = 1, searchParamsForCall) => {
    if (!queryToFetch || queryToFetch.length < 2) {
      setSearchResults([]);
      setError(queryToFetch ? 'Search query must be at least 2 characters.' : null);
      if (pageToFetch === 1) setLoading(false);
      setIsLoadingMore(false);
      setAllDataLoaded(true);
      return;
    }

    if (pageToFetch === 1) {
      setLoading(true);
      setSearchResults([]); 
      setAllDataLoaded(false); // Reset for new search
    } else {
      setIsLoadingMore(true);
    }
    setError(null); // Clear previous errors
    
    const currentActiveParams = searchParamsForCall || activeSearchParamsRef.current;

    let endpoint = `${API_BASE_URL}/api/search/${category}?q=${encodeURIComponent(queryToFetch)}&page=${pageToFetch}&limit=${ITEMS_PER_PAGE}`;
    endpoint += `&searchType=${currentActiveParams.searchType}`;
    if (currentActiveParams.searchType === 'nearby' && currentActiveParams.latitude && currentActiveParams.longitude) {
      endpoint += `&latitude=${currentActiveParams.latitude}&longitude=${currentActiveParams.longitude}`;
    }

    console.log(`[ProductSearchScreen] Fetching: Page ${pageToFetch}, URL=${endpoint}`);

    try {
      const response = await fetch(endpoint);
      const responseText = await response.text(); // Get text first for debugging
      
      if (!response.ok) {
        console.error("[ProductSearchScreen] Fetch error response text:", responseText);
        let errData;
        try {
            errData = JSON.parse(responseText);
        } catch (e) {
            errData = { error: `HTTP error ${response.status}. Non-JSON response.` };
        }
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data = JSON.parse(responseText); // Parse after checking response.ok
      console.log('[ProductSearchScreen] Received data for page', pageToFetch, 'Products count:', data.products ? data.products.length : 'N/A');
      // console.log('[ProductSearchScreen] Full data object:', JSON.stringify(data, null, 2));


      if (data.products && Array.isArray(data.products)) {
        if (data.products.length > 0) {
          setSearchResults(prevResults => (pageToFetch === 1 ? data.products : [...prevResults, ...data.products]));
          setAllDataLoaded(data.products.length < ITEMS_PER_PAGE);
        } else { // No products in this page's response
          if (pageToFetch === 1) setSearchResults([]);
          setAllDataLoaded(true); 
          if (pageToFetch === 1) { // Only set "no products found" error if it's the first page and no results
            setError(`No products found for "${queryToFetch}".`);
          }
        }
      } else { // products array is missing or not an array
        console.error('[ProductSearchScreen] Invalid data.products structure:', data.products);
        if (pageToFetch === 1) setSearchResults([]);
        setError('Received invalid data structure from server.');
        setAllDataLoaded(true);
      }
      setCurrentPage(pageToFetch); // Update current page after successful fetch
    } catch (e) {
      console.error("[ProductSearchScreen] Fetch/Processing error:", e);
      setError(e.message || 'An error occurred while searching.');
      if (pageToFetch === 1) setSearchResults([]);
      setAllDataLoaded(true); // Assume all loaded on error to prevent infinite loops
    } finally {
      if (pageToFetch === 1) setLoading(false);
      setIsLoadingMore(false);
    }
  }, [category]);

  // Effect for initial search when parameters from route are available
  useEffect(() => {
    if (initialQuery && !initialLoadPerformedRef.current) {
      console.log("[ProductSearchScreen] Initial useEffect triggered with query:", initialQuery);
      const paramsForFetch = {
        query: initialQuery,
        searchType: initialSearchNearby ? 'nearby' : 'master',
        latitude: initialUserLocation?.latitude,
        longitude: initialUserLocation?.longitude,
      };
      activeSearchParamsRef.current = paramsForFetch; // Set active params for this initial search
      setDisplayedQuery(initialQuery); // Set the query that is being searched for
      setCurrentSearchQuery(initialQuery); // Also update the input field
      
      fetchSearchResults(initialQuery, 1, paramsForFetch);
      initialLoadPerformedRef.current = true; // Mark that initial load has been attempted
    }
  }, [initialQuery, initialSearchNearby, initialUserLocation, fetchSearchResults]);


  const handleProductPress = (product) => {
    console.log("[ProductSearchScreen] Product pressed:", product.masterproductid, product.productname);
    Alert.alert("Navigate", `Details for ${product.productname} (MasterID: ${product.masterproductid}) - To be implemented.`);
    // navigation.navigate('ProductDetailScreen', { masterProductId: product.masterproductid, listingId: product.listingid });
  };
  
  const handleNewSearchSubmit = () => {
    console.log("[ProductSearchScreen] New search submitted for:", currentSearchQuery);
    if (!currentSearchQuery || currentSearchQuery.length < 2) {
        setError('Search query must be at least 2 characters.');
        setSearchResults([]);
        setDisplayedQuery(currentSearchQuery); // Show what was attempted
        setAllDataLoaded(true);
        return;
    }
    // For a new search from the input bar, use the initial 'searchNearby' and 'location' settings
    // or add UI elements on this screen to change them. For now, uses initial route params.
    const paramsForNewSearch = {
        query: currentSearchQuery,
        searchType: initialSearchNearby ? 'nearby' : 'master',
        latitude: initialSearchNearby ? initialUserLocation?.latitude : null,
        longitude: initialSearchNearby ? initialUserLocation?.longitude : null,
    };
    activeSearchParamsRef.current = paramsForNewSearch;
    setDisplayedQuery(currentSearchQuery);
    setCurrentPage(1); 
    setAllDataLoaded(false);
    fetchSearchResults(currentSearchQuery, 1, paramsForNewSearch);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && !allDataLoaded && !loading && searchResults.length > 0) {
      console.log("[ProductSearchScreen] handleLoadMore: Fetching page", currentPage + 1, "for query", activeSearchParamsRef.current.query);
      fetchSearchResults(activeSearchParamsRef.current.query, currentPage + 1, activeSearchParamsRef.current);
    }
  };
  
  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={styles.footerLoadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.footerText}>Loading more...</Text>
        </View>
      );
    }
    if (allDataLoaded && searchResults.length > 0 && !loading) { // Show only if there were initial results
      return (
        <View style={styles.footerLoadingContainer}>
          <Text style={styles.footerText}>No more products to load.</Text>
        </View>
      );
    }
    return null;
  };

  const renderHeader = () => (
    <View style={styles.searchHeaderContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={28} color="#007AFF" />
        </TouchableOpacity>
        <TextInput
            style={styles.headerSearchInput}
            placeholder="Search again..."
            value={currentSearchQuery}
            onChangeText={setCurrentSearchQuery}
            onSubmitEditing={handleNewSearchSubmit}
            returnKeyType="search"
            // autoFocus={!initialQuery} // Can be annoying if it always autofocuses
        />
        <TouchableOpacity style={styles.headerSearchButton} onPress={handleNewSearchSubmit}>
            <Ionicons name="search-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
    </View>
  );

  // Determine what to show in the main content area
  let mainContent = null;
  if (loading) { // Initial loading state
    mainContent = (
      <View style={styles.centeredMessageContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.messageText}>Searching for "{displayedQuery}"...</Text>
      </View>
    );
  } else if (error) { // Error state (and no results)
    mainContent = (
      <View style={styles.centeredMessageContainer}>
        <Ionicons name="warning-outline" size={40} color="#FF3B30" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  } else if (searchResults.length === 0 && displayedQuery && allDataLoaded) { // No results found after search
     mainContent = (
        <View style={styles.centeredMessageContainer}>
            <Ionicons name="information-circle-outline" size={40} color="#8E8E93" />
            <Text style={styles.messageText}>No products found for "{displayedQuery}". Try a different search term.</Text>
        </View>
     );
  } else if (searchResults.length > 0) { // Results available
    mainContent = (
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <SearchResultItem item={item} onPress={handleProductPress} />}
        keyExtractor={(item, index) => `${item.listingid || item.masterproductid}_${index}`}
        contentContainerStyle={styles.listContentContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    );
  } else if (!displayedQuery) { // Initial state before any search is triggered
    mainContent = (
        <View style={styles.centeredMessageContainer}>
            <Ionicons name="search-circle-outline" size={40} color="#8E8E93" />
            <Text style={styles.messageText}>Enter a search term above to find products.</Text>
        </View>
    );
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      {searchResults.length > 0 && !loading && !error && ( // Show "Showing results for" only if there are results
         <Text style={styles.resultsInfoText}>
            Showing results for "{displayedQuery}"
          </Text>
      )}
      {mainContent}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 5,
    marginRight: 5,
  },
  headerSearchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  headerSearchButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  resultsInfoText: {
    fontSize: 14,
    color: '#666666',
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#FFFFFF', // Changed to white for better contrast if list items are also white
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  listContentContainer: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 30, // Ensure space for footer
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#E0E0E0',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  itemBrand: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 2,
  },
  itemRetailer: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  itemDistance: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  footerLoadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footerText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666666',
  },
});
