import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { designTokens } from '../theme/designTokens';
import { mockProductDetails } from '../data/mock-data';
import HealthScoreBadge from '../components/product/HealthScoreBadge';
import PriceComparisonTable from '../components/product/PriceComparisonTable';
import TrustLabel from '../components/product/TrustLabel';

const ProductDetailsScreen = () => {
  const product = mockProductDetails; // Using mock data

  return (
    <ScrollView style={styles.container}>
      {/* --- Main Product Section --- */}
      <View style={styles.mainProductContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.mainImage} />
        <View style={styles.mainInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.productName}</Text>
          {product.healthScore && <HealthScoreBadge score={product.healthScore} />}
        </View>
      </View>

      {/* --- Israeli Prices Section --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price in Israel</Text>
        <PriceComparisonTable prices={product.israeliPrices} />
      </View>
      
      {/* --- International Alternatives Section --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>International Alternatives</Text>
        {product.internationalAlternatives.map((alt, index) => (
          <View key={index} style={styles.altCard}>
            <Image source={{ uri: alt.imageUrl }} style={styles.altImage} />
            <View style={styles.altInfo}>
              <Text style={styles.brand}>{alt.brand}</Text>
              <Text style={styles.altProductName}>{alt.productName}</Text>
              <TrustLabel type={alt.trustLabel as any} />
              <View style={styles.altBottomRow}>
                <Text style={styles.altPrice}>~₪{alt.finalPriceNIS.toFixed(2)}</Text>
                <View style={styles.votingContainer}>
                  <TouchableOpacity style={styles.voteButton}>
                    <Text>👍 {alt.userVotes.good}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.voteButton}>
                    <Text>👎 {alt.userVotes.bad}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={{height: 50}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designTokens.colors.background,
  },
  mainProductContainer: {
    backgroundColor: designTokens.colors.white,
    paddingBottom: designTokens.spacing.large,
    marginBottom: designTokens.spacing.medium,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  mainInfo: {
    paddingHorizontal: designTokens.spacing.large,
  },
  brand: {
    fontSize: designTokens.fontSizes.body,
    color: designTokens.colors.textSecondary,
    marginBottom: designTokens.spacing.xsmall,
  },
  productName: {
    fontSize: designTokens.fontSizes.title,
    fontWeight: 'bold',
    color: designTokens.colors.text,
    marginBottom: designTokens.spacing.medium,
  },
  section: {
    backgroundColor: designTokens.colors.white,
    padding: designTokens.spacing.large,
    marginBottom: designTokens.spacing.medium,
  },
  sectionTitle: {
    fontSize: designTokens.fontSizes.large,
    fontWeight: 'bold',
    color: designTokens.colors.text,
    marginBottom: designTokens.spacing.medium,
  },
  altCard: {
    flexDirection: 'row',
    marginBottom: designTokens.spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: designTokens.colors.gray.light,
    paddingBottom: designTokens.spacing.large,
  },
  altImage: {
    width: 100,
    height: 100,
    borderRadius: designTokens.borderRadius.medium,
  },
  altInfo: {
    flex: 1,
    marginLeft: designTokens.spacing.medium,
  },
  altProductName: {
    fontSize: designTokens.fontSizes.body,
    fontWeight: 'bold',
    color: designTokens.colors.text,
    marginBottom: designTokens.spacing.small,
  },
  altBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: designTokens.spacing.medium,
  },
  altPrice: {
    fontSize: designTokens.fontSizes.large,
    fontWeight: 'bold',
    color: designTokens.colors.primary,
  },
  votingContainer: {
    flexDirection: 'row',
  },
  voteButton: {
    marginLeft: designTokens.spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    padding: designTokens.spacing.small,
    backgroundColor: designTokens.colors.gray.light,
    borderRadius: designTokens.borderRadius.medium,
  },
});

export default ProductDetailsScreen;