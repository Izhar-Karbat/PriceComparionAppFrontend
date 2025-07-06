import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  Image,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';
import ProductCard from '../components/ProductCard';

// Dummy data for demonstration
const cleanPicks = [
  {
    id: '1',
    name: 'Organic Vitamin C Serum',
    image: 'https://via.placeholder.com/200x200?text=Vitamin+C',
    price: 24.99,
    healthScore: 92,
  },
  {
    id: '2',
    name: 'Natural Pain Relief Gel',
    image: 'https://via.placeholder.com/200x200?text=Pain+Relief',
    price: 18.99,
    healthScore: 88,
  },
  {
    id: '3',
    name: 'Probiotic Supplement',
    image: 'https://via.placeholder.com/200x200?text=Probiotic',
    price: 32.99,
    healthScore: 95,
  },
];

const priceDrops = [
  {
    id: '4',
    name: 'Allergy Relief Tablets',
    image: 'https://via.placeholder.com/200x200?text=Allergy',
    price: 12.99,
    healthScore: 75,
  },
  {
    id: '5',
    name: 'Omega-3 Fish Oil',
    image: 'https://via.placeholder.com/200x200?text=Omega+3',
    price: 22.99,
    healthScore: 90,
  },
];

const HomeScreen = ({ navigation }: any) => {
  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const handleScanPress = () => {
    navigation.navigate('Scan');
  };

  const renderProductCard = ({ item }: any) => (
    <ProductCard
      id={item.id}
      name={item.name}
      image={item.image}
      price={item.price}
      healthScore={item.healthScore}
      onPress={() => handleProductPress(item.id)}
      onCompare={() => console.log('Compare', item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>PharmMate</Text>
            <Text style={styles.tagline}>Your health companion</Text>
          </View>
          <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
            <Ionicons name="scan" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        {/* Today's Clean Picks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Clean Picks</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={cleanPicks}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productList}
          />
        </View>

        {/* Price Drops Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Price Drops</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={priceDrops}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productList}
          />
        </View>

        {/* Scan CTA Section */}
        <TouchableOpacity style={styles.scanCTA} onPress={handleScanPress}>
          <View style={styles.scanCTAContent}>
            <Ionicons name="scan-circle" size={60} color={theme.colors.primary} />
            <View style={styles.scanCTAText}>
              <Text style={styles.scanCTATitle}>Scan a Product</Text>
              <Text style={styles.scanCTASubtitle}>
                Check ingredients and compare prices instantly
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
  logo: {
    fontSize: theme.fonts.size.xxl,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.primary,
  },
  tagline: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.gray.medium,
  },
  scanButton: {
    backgroundColor: theme.colors.primary,
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  section: {
    marginVertical: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fonts.size.xl,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  seeAll: {
    fontSize: theme.fonts.size.base,
    color: theme.colors.primary,
    fontWeight: theme.fonts.weight.medium,
  },
  productList: {
    paddingHorizontal: theme.spacing.lg,
  },
  scanCTA: {
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.xl,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  scanCTAContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanCTAText: {
    marginLeft: theme.spacing.lg,
    flex: 1,
  },
  scanCTATitle: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  scanCTASubtitle: {
    fontSize: theme.fonts.size.base,
    color: theme.colors.gray.medium,
  },
});

export default HomeScreen;