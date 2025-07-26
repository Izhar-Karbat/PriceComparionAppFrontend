// src/screens/ProductSearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { designTokens } from '../theme/designTokens';
import axios from 'axios';
import SearchResultItem from '../components/search/SearchResultItem'; // Assuming this exists
import { API_URL } from '../config/config'; // Assuming this exists

// Mock list of all possible product names for live suggestions
const MOCK_PRODUCT_NAMES = [
    'שמפו לשיער יבש פינוק', 'קרם הגנה SPF50', 'משחת שיניים קולגייט', 'סבון ידיים דאב',
    'דאודורנט ספריי לגבר', 'מגבונים לחים לתינוק', 'ויטמין C 1000 מ"ג', 'אדוויל פורטה'
];

const ProductSearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (query.length > 1) {
            const filteredSuggestions = MOCK_PRODUCT_NAMES.filter(name =>
                name.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleSearch = async (searchQuery) => {
        if (isLoading || !searchQuery) return;
        
        setQuery(searchQuery);
        setSuggestions([]); // Hide suggestions once search is triggered
        setIsLoading(true);
        setSearchResults([]);

        try {
            const response = await axios.post(`${API_URL}/api/search/pharma`, { query: searchQuery });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Failed to fetch search results:", error);
            // You can add user-facing error handling here
        } finally {
            setIsLoading(false);
        }
    };

    const renderSuggestion = ({ item }) => (
        <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSearch(item)}>
            <Text style={styles.suggestionText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for a pharmacy product..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={() => handleSearch(query)}
            />
            
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    renderItem={renderSuggestion}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.suggestionsContainer}
                />
            )}
            
            {isLoading && <ActivityIndicator size="large" color={designTokens.colors.primary} style={styles.loader} />}

            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.masterproductid.toString()}
                renderItem={({ item }) => <SearchResultItem item={item} navigation={navigation} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: designTokens.colors.background,
    },
    input: {
        backgroundColor: designTokens.colors.white,
        padding: designTokens.spacing.medium,
        margin: designTokens.spacing.medium,
        borderRadius: designTokens.borderRadius.medium,
        fontSize: designTokens.fontSizes.body,
        borderWidth: 1,
        borderColor: designTokens.colors.gray.medium,
    },
    suggestionsContainer: {
        maxHeight: 200,
        marginHorizontal: designTokens.spacing.medium,
        backgroundColor: designTokens.colors.white,
        borderRadius: designTokens.borderRadius.medium,
        borderWidth: 1,
        borderColor: designTokens.colors.gray.light,
        position: 'absolute',
        top: 80, // Adjust based on input position
        left: 10,
        right: 10,
        zIndex: 10,
    },
    suggestionItem: {
        padding: designTokens.spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: designTokens.colors.gray.light,
    },
    suggestionText: {
        fontSize: designTokens.fontSizes.body,
    },
    loader: {
        marginTop: 20,
    },
});

export default ProductSearchScreen;