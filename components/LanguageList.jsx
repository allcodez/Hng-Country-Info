import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Make sure you have Feather icons installed
import { useTheme } from '@/hooks/ThemeContext';

const { width } = Dimensions.get('window');

const languages = [
    'Bahasa', 'Deutsch', 'English', 'Español', 'Françiase',
    'Italiano', 'Portugues', 'Pycckuu', 'Svenska', 'Turkce', 'العربية'
];

const LanguageList = ({ onClose }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header with Cancel Button */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>Languages</Text>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                    <Feather name="x" size={14} color="white" />
                </TouchableOpacity>

            </View>

            {/* Language List */}
            <FlatList
                data={languages}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.languageItem}
                        onPress={() => console.log(`Selected: ${item}`)}
                    >
                        <Text style={[styles.languageText, { color: theme.text }]}>{item}</Text>
                        <View style={[styles.radioButton, { borderColor: theme.border }]} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        padding: 2,
        backgroundColor: "#98A2B3",
        borderRadius: 5,
        color: "red"
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    languageText: {
        fontSize: 16,
        fontFamily: 'minimal',
        marginBottom: 10
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
    },
});

export default LanguageList;
