import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeContext';
import { theme } from '../app/theme';
import { useFilter } from '@/hooks/FilterContext';

const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica'];
const timezones = ['UTC -12', 'UTC -11', 'UTC -10', 'UTC -9', 'UTC -8', 'UTC -7', 'UTC -6', 'UTC -5', 'UTC -4', 'UTC -3', 'UTC -2', 'UTC -1', 'UTC 0', 'UTC +1', 'UTC +2', 'UTC +3', 'UTC +4', 'UTC +5', 'UTC +6', 'UTC +7', 'UTC +8', 'UTC +9', 'UTC +10', 'UTC +11', 'UTC +12'];
const { width } = Dimensions.get('window');

const FilterList = ({ onClose }) => {
    const { theme } = useTheme();
    const {
        selectedContinents, setSelectedContinents,
        selectedTimezones, setSelectedTimezones,
        handleShowResults
    } = useFilter();

    const [continentExpanded, setContinentExpanded] = useState(false);
    const [timezoneExpanded, setTimezoneExpanded] = useState(false);

    const modalHeight = useRef(new Animated.Value(200)).current;

    useEffect(() => {
        let baseHeight = 280;
        if (continentExpanded) baseHeight += continents.length * 40;
        if (timezoneExpanded) baseHeight += timezones.length * 15;
        Animated.timing(modalHeight, {
            toValue: baseHeight,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [continentExpanded, timezoneExpanded]);

    const toggleSelection = (item, type) => {
        if (type === 'continent') {
            setSelectedContinents(prev => prev.includes(item) ? prev.filter(c => c !== item) : [...prev, item]);
        } else {
            setSelectedTimezones(prev => prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]);
        }
    };

    return (
        <Animated.View style={[styles.container, { backgroundColor: theme.background, height: modalHeight }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>Filter</Text>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                    <Feather name="x" size={13} color="white" />
                </TouchableOpacity>
            </View>

            {/* Continent Filter */}
            <TouchableOpacity style={styles.filterItem} onPress={() => setContinentExpanded(!continentExpanded)}>
                <Text style={[styles.filterTitle, { color: theme.text }]}>Continent</Text>
                <Feather name={continentExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.text} />
            </TouchableOpacity>

            {continentExpanded && (
                <FlatList
                    data={continents}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.optionItem} onPress={() => toggleSelection(item, 'continent')}>
                            <Text style={[styles.optionText, { color: theme.text }]}>{item}</Text>
                            <View style={[styles.radioButton, { borderColor: theme.border }]}>
                                {selectedContinents.includes(item) && <Feather name="check" size={14} color={theme.text} />}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Timezone Filter */}
            <TouchableOpacity style={styles.filterItem} onPress={() => setTimezoneExpanded(!timezoneExpanded)}>
                <Text style={[styles.filterTitle, { color: theme.text }]}>Timezone</Text>
                <Feather name={timezoneExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.text} />
            </TouchableOpacity>

            {timezoneExpanded && (
                <FlatList
                    data={timezones}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.optionItem} onPress={() => toggleSelection(item, 'timezone')}>
                            <Text style={[styles.optionText, { color: theme.text }]}>{item}</Text>
                            <View style={[styles.radioButton, { borderColor: theme.border }]}>
                                {selectedTimezones.includes(item) && <Feather name="check" size={14} color={theme.text} />}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.resetButton, {borderColor: theme.text}]} onPress={() => { setSelectedContinents([]); setSelectedTimezones([]); }}>
                    <Text style={[styles.buttonText, { color: theme.text }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.showResultsButton]} onPress={()=>{handleShowResults(); onClose();}}>
                    <Text style={[styles.buttonText, { color: "#fff" }]}>Show Results</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: width,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        position: 'absolute',
        bottom: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
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
        fontFamily: theme.font.minimal,
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
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        borderWidth: 1,
    },
    showResultsButton: {
        backgroundColor: '#FF6C00',
    }
});

export default FilterList;
