import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';
import HealthScoreBadge from './HealthScoreBadge';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  healthScore: number;
  onPress: () => void;
  onCompare?: () => void;
  isTracked?: boolean; // New prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  healthScore,
  onPress,
  onCompare,
  isTracked, // New prop
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.badgeContainer}>
          <HealthScoreBadge score={healthScore} size="small" />
        </View>
        {isTracked && (
          <View style={styles.trackingIconContainer}>
            <Text style={styles.trackingIcon}>🔔</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {onCompare && (
            <TouchableOpacity style={styles.compareButton} onPress={onCompare}>
              <Text style={styles.compareText}>Compare</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    width: 160,
    marginRight: theme.spacing.md,
    ...theme.shadows.sm,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: theme.colors.gray.light,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
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
    marginBottom: theme.spacing.sm,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.primary,
  },
  compareButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  compareText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.sm,
    fontWeight: theme.fonts.weight.medium,
  },
  trackingIconContainer: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 4,
  },
  trackingIcon: {
    fontSize: 16,
  },
});

export default ProductCard;