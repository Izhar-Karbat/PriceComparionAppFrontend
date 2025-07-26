// src/components/product/ProductCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { designTokens } from '../../theme/designTokens';
import HealthScoreBadge from './HealthScoreBadge';

export interface Product { // Exporting for reuse
  masterproductid: string;
  productName: string;
  brand: string;
  imageUrl: string;
  healthScore?: 'A' | 'B' | 'C' | 'D';
  price?: number;
}

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void; // Changed to callback
  isTracked?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  isTracked,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.productName} numberOfLines={2}>
          {product.productName}
        </Text>
        <View style={styles.bottomRow}>
          {product.price && <Text style={styles.price}>₪{product.price.toFixed(2)}</Text>}
          {product.healthScore && <HealthScoreBadge score={product.healthScore} />}
        </View>
      </View>
      {isTracked && (
        <View style={styles.trackingIconContainer}>
          <Text style={styles.trackingIcon}>🔔</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: designTokens.colors.white,
      borderRadius: designTokens.borderRadius.medium,
      padding: designTokens.spacing.medium,
      marginBottom: designTokens.spacing.medium,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: designTokens.borderRadius.small,
    },
    infoContainer: {
      flex: 1,
      marginLeft: designTokens.spacing.medium,
      justifyContent: 'space-between',
    },
    brand: {
      fontSize: designTokens.fontSizes.small,
      color: designTokens.colors.textSecondary,
    },
    productName: {
      fontSize: designTokens.fontSizes.body,
      fontWeight: 'bold',
      color: designTokens.colors.text,
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: designTokens.spacing.small,
    },
    price: {
      fontSize: designTokens.fontSizes.large,
      fontWeight: 'bold',
      color: designTokens.colors.primary,
    },
    trackingIconContainer: {
      position: 'absolute',
      top: designTokens.spacing.small,
      right: designTokens.spacing.small,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 15,
      padding: 4,
    },
    trackingIcon: {
      fontSize: 16,
    },
});

export default ProductCard;