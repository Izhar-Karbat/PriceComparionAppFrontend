// src/components/product/ProductCardSkeleton.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from '../ui/Skeleton';
import { designTokens } from '../../theme/designTokens';

const ProductCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <Skeleton width={80} height={80} />
      <View style={styles.infoContainer}>
        <Skeleton width={100} height={16} />
        <View style={{ height: designTokens.spacing.small }} />
        <Skeleton width="80%" height={20} />
        <View style={styles.bottomRow}>
          <Skeleton width={60} height={24} />
          <Skeleton width={40} height={40} style={{ borderRadius: 20 }}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: designTokens.colors.white,
    borderRadius: designTokens.borderRadius.medium,
    padding: designTokens.spacing.medium,
    marginBottom: designTokens.spacing.medium,
  },
  infoContainer: {
    flex: 1,
    marginLeft: designTokens.spacing.medium,
    justifyContent: 'space-between',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: designTokens.spacing.small,
  },
});

export default ProductCardSkeleton;