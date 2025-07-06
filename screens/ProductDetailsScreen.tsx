import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';
import HealthScoreBadge from '../components/HealthScoreBadge';
import IngredientTag from '../components/IngredientTag';
import PriceComparisonTable from '../components/PriceComparisonTable';
import ProductCard from '../components/ProductCard';

// Dummy data for demonstration
const productData = {
  id: '1',
  name: 'Organic Vitamin C Serum',
  image: 'https://via.placeholder.com/300x300?text=Vitamin+C',
  healthScore: 92,
  description: 'A powerful antioxidant serum that brightens and evens skin tone.',
  ingredients: [
    { name: 'Vitamin C', type: 'safe' },
    { name: 'Hyaluronic Acid', type: 'safe' },
    { name: 'Vitamin E', type: 'safe' },
    { name: 'Fragrance', type: 'warning' },
    { name: 'Citric Acid', type: 'safe' },
  ],
  prices: [
    { id: '1', platform: 'CVS Pharmacy', price: 24.99 },
    { id: '2', platform: 'Walgreens', price: 22.99 },
    { id: '3', platform: 'Rite Aid', price: 26.99 },
    { id: '4', platform: 'Amazon', price: 21.99 },
  ],
};

const alternativeProduct = {
  id: '2',
  name: 'Pure Vitamin C Complex',
  image: 'https://via.placeholder.com/200x200?text=Alternative',
  price: 19.99,
  healthScore: 96,
};

const ProductDetailsScreen = ({ navigation, route }: any) => {
  const { productId } = route.params || {};

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    console.log('Add to cart');
  };

  const renderIngredients = () => {
    return productData.ingredients.map((ingredient, index) => (
      <IngredientTag
        key={index}
        name={ingredient.name}
        type={ingredient.type as 'danger' | 'warning' | 'safe'}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: productData.image }} style={styles.productImage} />
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <Text style={styles.productName}>{productData.name}</Text>
          
          <View style={styles.scoreContainer}>
            <HealthScoreBadge score={productData.healthScore} size="large" />
            <Text style={styles.scoreLabel}>Health Score</Text>
          </View>

          <Text style={styles.description}>{productData.description}</Text>

          {/* Ingredients Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {renderIngredients()}
            </View>
          </View>

          {/* Price Comparison */}
          <PriceComparisonTable 
            prices={productData.prices} 
            currentPlatform="CVS Pharmacy" 
          />

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          {/* Suggested Alternative */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suggested Alternative</Text>
            <Text style={styles.alternativeSubtitle}>
              Higher health score at a lower price
            </Text>
            <ProductCard
              id={alternativeProduct.id}
              name={alternativeProduct.name}
              image={alternativeProduct.image}
              price={alternativeProduct.price}
              healthScore={alternativeProduct.healthScore}
              onPress={() => navigation.push('ProductDetails', { productId: alternativeProduct.id })}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  shareButton: {
    padding: theme.spacing.sm,
  },
  imageContainer: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  productImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  content: {
    padding: theme.spacing.lg,
  },
  productName: {
    fontSize: theme.fonts.size.xxl,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  scoreLabel: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.gray.medium,
    marginLeft: theme.spacing.md,
  },
  description: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.gray.dark,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginVertical: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addToCartButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
    ...theme.shadows.md,
  },
  addToCartText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.bold,
  },
  alternativeSubtitle: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.gray.medium,
    marginBottom: theme.spacing.md,
  },
});

export default ProductDetailsScreen;