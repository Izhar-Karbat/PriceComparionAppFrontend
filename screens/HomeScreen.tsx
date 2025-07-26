// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { designTokens } from '../theme/designTokens';
import { mockTrendingProducts } from '../data/mock-data';
import ProductCard, { Product } from '../components/product/ProductCard';
import ProductCardSkeleton from '../components/product/ProductCardSkeleton';
import QuickViewModal from '../components/product/QuickViewModal';

type RootStackParamList = {
    Home: undefined;
    Scanner: undefined;
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [isLoading, setIsLoading] = useState(true);
    
    // State for the modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);
    
    // Function to open the modal
    const handleProductPress = (product: Product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    };

    // Function to add to cart (this would come from a Context in a real app)
    const handleAddToCart = (product: Product) => {
        Alert.alert('Added to Cart', `${product.productName} has been added to your cart.`);
    };

    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Find Your Product</Text>
                
                <TouchableOpacity style={styles.searchInput} onPress={() => { /* Navigate to search screen */ }}>
                    <Text style={styles.searchText}>Search products...</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scanner')}>
                    <Text style={styles.scanButtonIcon}>📷</Text>
                    <Text style={styles.scanButtonText}>Scan Barcode</Text>
                </TouchableOpacity>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trending Deals</Text>
                    {isLoading ? (
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    ) : (
                        mockTrendingProducts.map((item) => (
                            <ProductCard
                                key={item.masterproductid}
                                product={item}
                                onPress={handleProductPress} // Use the new handler
                            />
                        ))
                    )}
                </View>
            </ScrollView>
            
            <QuickViewModal 
                product={selectedProduct}
                visible={modalVisible}
                onClose={handleCloseModal}
                onAddToCart={handleAddToCart}
            />
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
    },
    searchInput: {
        backgroundColor: designTokens.colors.white,
        borderRadius: designTokens.borderRadius.medium,
        padding: designTokens.spacing.medium,
        margin: designTokens.spacing.large,
        borderWidth: 1,
        borderColor: designTokens.colors.gray.light,
    },
    searchText: {
        color: designTokens.colors.textSecondary,
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: designTokens.colors.primary,
        padding: designTokens.spacing.medium,
        borderRadius: designTokens.borderRadius.medium,
        marginHorizontal: designTokens.spacing.large,
        marginTop: -designTokens.spacing.small,
        marginBottom: designTokens.spacing.large,
    },
    scanButtonIcon: {
        fontSize: 20,
        marginRight: designTokens.spacing.medium,
    },
    scanButtonText: {
        color: designTokens.colors.white,
        fontSize: designTokens.fontSizes.button,
        fontWeight: 'bold',
    },
    section: {
        paddingHorizontal: designTokens.spacing.large,
    },
    sectionTitle: {
        fontSize: designTokens.fontSizes.large,
        fontWeight: 'bold',
        color: designTokens.colors.text,
        marginBottom: designTokens.spacing.medium,
    },
});

export default HomeScreen;