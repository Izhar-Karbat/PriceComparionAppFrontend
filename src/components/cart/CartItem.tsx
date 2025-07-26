import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { designTokens } from '../../theme/designTokens';

interface CartItemProps {
  productName: string;
  brand: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  productName,
  brand,
  imageUrl,
  price,
  quantity,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.productName} numberOfLines={1}>
          {productName}
        </Text>
        <Text style={styles.price}>ª{price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: designTokens.colors.white,
    padding: designTokens.spacing.medium,
    marginBottom: designTokens.spacing.small,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: designTokens.borderRadius.small,
  },
  infoContainer: {
    flex: 1,
    marginLeft: designTokens.spacing.medium,
    justifyContent: 'center',
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
  price: {
    fontSize: designTokens.fontSizes.body,
    color: designTokens.colors.primary,
    marginTop: designTokens.spacing.xsmall,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: designTokens.colors.gray.light,
    borderRadius: designTokens.borderRadius.large,
  },
  quantityButton: {
    paddingHorizontal: designTokens.spacing.medium,
    paddingVertical: designTokens.spacing.small,
  },
  quantityButtonText: {
    fontSize: 20,
    color: designTokens.colors.primary,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
});

export default CartItem;