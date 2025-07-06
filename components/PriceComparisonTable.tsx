import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import theme from '../theme';

interface PriceItem {
  platform: string;
  price: number;
  id: string;
}

interface PriceComparisonTableProps {
  prices: PriceItem[];
  currentPlatform?: string;
}

const PriceComparisonTable: React.FC<PriceComparisonTableProps> = ({ prices, currentPlatform }) => {
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0]?.price;

  const renderPriceRow = ({ item }: { item: PriceItem }) => {
    const isLowest = item.price === lowestPrice;
    const isCurrent = item.platform === currentPlatform;

    return (
      <View style={[styles.row, isCurrent && styles.currentRow]}>
        <View style={styles.platformContainer}>
          <Text style={styles.platform}>{item.platform}</Text>
          {isCurrent && <Text style={styles.currentLabel}>(Current)</Text>}
        </View>
        <Text style={[styles.price, isLowest && styles.lowestPrice]}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Comparison</Text>
      <FlatList
        data={sortedPrices}
        renderItem={renderPriceRow}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  title: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.light,
  },
  currentRow: {
    backgroundColor: theme.colors.background,
    marginHorizontal: -theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  platform: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    fontWeight: theme.fonts.weight.medium,
  },
  currentLabel: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.gray.medium,
    marginLeft: theme.spacing.sm,
  },
  price: {
    fontSize: theme.fonts.size.md,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text,
  },
  lowestPrice: {
    color: theme.colors.success,
    fontWeight: theme.fonts.weight.bold,
  },
});

export default PriceComparisonTable;