import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeContext';
import { theme } from '../app/theme';

const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica'];
const timezones = ['UTC -12', 'UTC -11', 'UTC -10', 'UTC -9', 'UTC -8', 'UTC -7', 'UTC -6', 'UTC -5', 'UTC -4', 'UTC -3', 'UTC -2', 'UTC -1', 'UTC 0', 'UTC +1', 'UTC +2', 'UTC +3', 'UTC +4', 'UTC +5', 'UTC +6', 'UTC +7', 'UTC +8', 'UTC +9', 'UTC +10', 'UTC +11', 'UTC +12'];

const FilterList = ({ onClose }) => {
    const { theme } = useTheme();
    const [continentExpanded, setContinentExpanded] = useState(false);
    const [timezoneExpanded, setTimezoneExpanded] = useState(false);
    const [selectedContinent, setSelectedContinent] = useState(null);
    const [selectedTimezone, setSelectedTimezone] = useState(null);

    const toggleContinent = () => setContinentExpanded(!continentExpanded);
    const toggleTimezone = () => setTimezoneExpanded(!timezoneExpanded);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>Filter</Text>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                    <Feather name="x" size={14} color="white" />
                </TouchableOpacity>
            </View>

            {/* Continent Filter */}
            <TouchableOpacity style={styles.filterItem} onPress={toggleContinent}>
                <Text style={[styles.filterTitle, { color: theme.text }]}>Continent</Text>
                <Feather name={continentExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.text} />
            </TouchableOpacity>

            {continentExpanded && (
                <FlatList
                    data={continents}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.optionItem} onPress={() => setSelectedContinent(item)}>
                            <Text style={[styles.optionText, { color: theme.text }]}>{item}</Text>
                            <View style={[styles.radioButton, { borderColor: theme.border }]}>
                                {selectedContinent === item && <View style={styles.radioSelected} />}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Timezone Filter */}
            <TouchableOpacity style={styles.filterItem} onPress={toggleTimezone}>
                <Text style={[styles.filterTitle, { color: theme.text }]}>Timezone</Text>
                <Feather name={timezoneExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.text} />
            </TouchableOpacity>

            {timezoneExpanded && (
                <FlatList
                    data={timezones}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.optionItem} onPress={() => setSelectedTimezone(item)}>
                            <Text style={[styles.optionText, { color: theme.text }]}>{item}</Text>
                            <View style={[styles.radioButton, { borderColor: theme.border }]}>
                                {selectedTimezone === item && <View style={styles.radioSelected} />}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 18,
        fontFamily: theme.font.bold,
    },
    cancelButton: {
        padding: 2,
        backgroundColor: "#98A2B3",
        borderRadius: 5,
    },
    filterItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    filterTitle: {
        fontSize: 16,
        fontFamily: theme.font.minimal
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingLeft: 20,
    },
    optionText: {
        fontSize: 16,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
    },
});

export default FilterList;
