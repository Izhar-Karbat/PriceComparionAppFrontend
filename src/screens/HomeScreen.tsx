// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { designTokens } from '../theme/designTokens';
import { mockTrendingProducts } from '../data/mock-data';
import ProductCard from '../components/product/ProductCard';
import ProductCardSkeleton from '../components/product/ProductCardSkeleton';

type RootStackParamList = {
    Home: undefined;
    Scanner: undefined; 
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
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
                            productName={item.productName}
                            brand={item.brand}
                            imageUrl={item.imageUrl}
                            price={item.price}
                            healthScore={item.healthScore}
                        />
                    ))
                )}
            </View>
        </ScrollView>
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