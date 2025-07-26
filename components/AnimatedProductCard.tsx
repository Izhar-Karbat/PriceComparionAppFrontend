import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';
import HealthScoreBadge from './HealthScoreBadge';
import { useCartStore } from '../src/store/cartStore';
import type { Product } from '../src/types';

interface AnimatedProductCardProps {
  product: Product;
  onPress: () => void;
  onCompare?: () => void;
}

const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({
  product,
  onPress,
  onCompare,
}) => {
  const { addToCart } = useCartStore();
  
  const handleAddToCart = async (event: any) => {
    // Prevent the card onPress from triggering
    event.stopPropagation();
    
    try {
      // Haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      // Add to cart
      addToCart(product);
      
      // Optional: Show success feedback
      Alert.alert(
        'Added to Cart',
        `${product.productname} has been added to your cart.`,
        [{ text: 'OK', style: 'default' }]
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Could not add item to cart. Please try again.');
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.touchable}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.imageurl }} 
            style={styles.image}
            defaultSource={{ uri: 'https://via.placeholder.com/120x120.png?text=No+Image' }}
          />
          {product.healthScore && (
            <View style={styles.badgeContainer}>
              <HealthScoreBadge score={product.healthScore} size="small" />
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>
            {product.productname}
          </Text>
          
          {product.brand && (
            <Text style={styles.brand} numberOfLines={1}>
              {product.brand}
            </Text>
          )}
          
          {product.storename && (
            <Text style={styles.store} numberOfLines={1}>
              {product.storename}
            </Text>
          )}
          
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              {product.price ? (
                <Text style={styles.price}>₪{product.price.toFixed(2)}</Text>
              ) : (
                <Text style={styles.priceNA}>Price N/A</Text>
              )}
            </View>
            
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={16} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
          
          {onCompare && (
            <TouchableOpacity style={styles.compareButton} onPress={onCompare}>
              <Text style={styles.compareText}>Compare</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.spacing.xs,
  },
  touchable: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: theme.colors.gray.light,
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    fontSize: theme.fonts.size.base,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    minHeight: 36,
  },
  brand: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xs,
  },
  store: {
    fontSize: theme.fonts.size.xs,
    color: theme.colors.gray.medium,
    marginBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.primary,
  },
  priceNA: {
    fontSize: theme.fonts.size.base,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.gray.medium,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  compareButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'center',
    marginTop: theme.spacing.sm,
  },
  compareText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.sm,
    fontWeight: theme.fonts.weight.medium,
  },
});

export default AnimatedProductCard;