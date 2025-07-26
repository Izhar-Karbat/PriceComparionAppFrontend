import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ProductCard from '../../components/ProductCard';

const MOCK_SAVED_ITEMS = [
  {
    id: '123',
    name: 'שמפו לשיער יבש פינוק',
    image: 'https://via.placeholder.com/150',
    price: 14.9,
    healthScore: 85,
  },
  {
    id: '456',
    name: 'קרם הגנה SPF50',
    image: 'https://via.placeholder.com/150',
    price: 49.9,
    healthScore: 75,
  },
];

const SavedItemsScreen = () => {
  const hasItems = MOCK_SAVED_ITEMS.length > 0;

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💾</Text>
      <Text style={styles.emptyTitle}>No Saved Items Yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the save icon on any product to start tracking prices.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Saved Items</Text>
      {hasItems ? (
        <FlatList
          data={MOCK_SAVED_ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                healthScore={item.healthScore}
                onPress={() => {}}
                isTracked={true}
              />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default SavedItemsScreen;