import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useProductSearch } from '../src/hooks/useProductSearch';
import AnimatedProductCard from '../components/AnimatedProductCard';
import ProductSkeletonLoader from '../components/ProductSkeletonLoader';
import theme from '../theme';
import type { Product } from '../src/types';

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  const { data, isLoading, error, isLoadingMore, allDataLoaded, search, loadMore, reset } = useProductSearch({
    category: 'pharma',
    searchType: 'master',
    itemsPerPage: 20,
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setHasSearched(true);
      search(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setHasSearched(false);
    reset();
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails' as never, { productId: product.masterproductid } as never);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <AnimatedProductCard
      product={item}
      onPress={() => handleProductPress(item)}
    />
  );

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={styles.footerLoader}>
          <Text style={styles.footerText}>Loading more...</Text>
        </View>
      );
    }
    if (allDataLoaded && data.length > 0) {
      return (
        <View style={styles.footerLoader}>
          <Text style={styles.footerText}>No more products to load</Text>
        </View>
      );
    }
    return null;
  };

  const renderEmptyState = () => {
    if (!hasSearched) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="search-circle-outline" size={80} color={theme.colors.gray.medium} />
          <Text style={styles.emptyTitle}>Search for Products</Text>
          <Text style={styles.emptySubtitle}>Enter a product name to start searching</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="warning-outline" size={80} color={theme.colors.danger} />
          <Text style={styles.errorTitle}>Search Error</Text>
          <Text style={styles.errorSubtitle}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleSearch}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (data.length === 0 && !isLoading) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="information-circle-outline" size={80} color={theme.colors.gray.medium} />
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptySubtitle}>Try searching with different keywords</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color={theme.colors.gray.medium} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search pharmacy products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={theme.colors.gray.medium} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Results Info */}
      {hasSearched && data.length > 0 && !isLoading && (
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            Found {data.length} products for "{searchQuery}"
          </Text>
        </View>
      )}

      {/* Content */}
      {isLoading && !isLoadingMore ? (
        <ProductSkeletonLoader />
      ) : (
        <FlatList
          data={data}
          renderItem={renderProduct}
          keyExtractor={(item) => item.masterproductid.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.light,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray.light,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.md,
    marginRight: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.fonts.size.base,
    paddingVertical: Platform.OS === 'ios' ? theme.spacing.md : theme.spacing.sm,
    color: theme.colors.text,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  searchButtonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.base,
    fontWeight: theme.fonts.weight.medium,
  },
  resultsInfo: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.light,
  },
  resultsText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.gray.dark,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  footerLoader: {
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.gray.medium,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.fonts.size.xl,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: theme.fonts.size.base,
    color: theme.colors.gray.medium,
    textAlign: 'center',
    lineHeight: 22,
  },
  errorTitle: {
    fontSize: theme.fonts.size.xl,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.danger,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: theme.fonts.size.base,
    color: theme.colors.gray.medium,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  retryButtonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.base,
    fontWeight: theme.fonts.weight.medium,
  },
});

export default SearchScreen;