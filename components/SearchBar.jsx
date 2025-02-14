import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import SearchOutline from '../assets/svg/SearchOutline.js';
import { theme } from '../app/theme.js';
import { useTheme } from '@/hooks/ThemeContext.jsx';

const { width } = Dimensions.get('window');

export default function SearchBar({ searchText, setSearchText }) {
    const { theme } = useTheme();

    return (
        <View style={styles.search}>
            <View style={[styles.searchBox, { backgroundColor: theme.search }]}>
                <SearchOutline color={theme.text} />
                <TextInput
                    style={[styles.searchInput, { color: theme.text }]}
                    placeholder='Search Country'
                    placeholderTextColor={theme.placeholder}
                    value={searchText}
                    onChangeText={setSearchText} // Update search state when typing
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    search: {
        width: width,
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 25,
        alignItems: 'center',
    },
    searchBox: {
        flex: 1,
        paddingVertical: 5,
        borderRadius: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13
    },
    searchInput: {
        fontFamily: theme.font.minimal,
        fontSize: 16,
        color: '#667085',
        flex: 1,
        paddingVertical: 15,
        textAlign: 'center',
        marginRight: 20,
    },
});
