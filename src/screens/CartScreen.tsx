import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { designTokens } from '../theme/designTokens';
import { mockCartItems, mockCartComparison } from '../data/mock-data';
import CartItem from '../components/cart/CartItem';
import SmartTable from '../components/cart/SmartTable';

const CartScreen = () => {
  const hasItems = mockCartItems.length > 0;

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Add products to your cart to see the smart comparison.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cart</Text>
      {hasItems ? (
        <>
          <FlatList
            data={mockCartItems}
            keyExtractor={(item) => item.masterproductid}
            renderItem={({ item }) => <CartItem {...item} />}
            ListFooterComponent={<SmartTable comparisonData={mockCartComparison} />}
          />
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designTokens.colors.background,
  },
  header: {
    fontSize: designTokens.fontSizes.title,
    fontWeight: 'bold',
    color: designTokens.colors.text,
    paddingHorizontal: designTokens.spacing.large,
    paddingTop: designTokens.spacing.large,
    paddingBottom: designTokens.spacing.medium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: designTokens.spacing.large,
  },
  emptyTitle: {
    fontSize: designTokens.fontSizes.title,
    fontWeight: 'bold',
    color: designTokens.colors.text,
  },
  emptySubtitle: {
    fontSize: designTokens.fontSizes.body,
    color: designTokens.colors.textSecondary,
    textAlign: 'center',
    marginTop: designTokens.spacing.small,
  },
  checkoutButton: {
    backgroundColor: designTokens.colors.primary,
    padding: designTokens.spacing.medium,
    borderRadius: designTokens.borderRadius.medium,
    alignItems: 'center',
    margin: designTokens.spacing.large,
  },
  checkoutButtonText: {
    color: designTokens.colors.white,
    fontSize: designTokens.fontSizes.button,
    fontWeight: 'bold',
  },
});

export default CartScreen;