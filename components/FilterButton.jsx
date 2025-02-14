import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeContext';
import FilterList from './FilterList';

const FilterButton = ({ visible, onClose }) => {
    const { theme } = useTheme();
    const slideAnim = useRef(new Animated.Value(700)).current; // Start off-screen

    useEffect(() => {
        if (visible) {
            slideAnim.setValue(700);
            Animated.timing(slideAnim, {
                toValue: 20, // Slide into view
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <>
            {/* Filter Button */}
            <TouchableOpacity style={[styles.container, { borderColor: theme.border }]} onPress={onClose}>
                <View style={styles.iconContainer}>
                    <Feather name="filter" size={23} color={theme.text} />
                </View>
                <Text style={[styles.filterText, { color: theme.text }]}>Filter</Text>
            </TouchableOpacity>

            {/* Modal for Filter List */}
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { backgroundColor: theme.background, transform: [{ translateY: slideAnim }] }]}>
                        <FilterList onClose={onClose} />
                    </Animated.View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#A9B8D4',
    },
    iconContainer: {
        marginRight: 8,
    },
    filterText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        height: 250,
        padding: 20,
    },
});

export default FilterButton;
