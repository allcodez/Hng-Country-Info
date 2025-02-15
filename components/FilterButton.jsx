import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeContext';
import FilterList from './FilterList';

const FilterButton = ({ visible, onClose, setSelectedContinents, setSelectedTimezones }) => {
    const { theme } = useTheme();
    const slideAnim = useRef(new Animated.Value(700)).current;

    useEffect(() => {
        if (visible) {
            slideAnim.setValue(700);
            Animated.timing(slideAnim, {
                toValue: 20,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <>
            <TouchableOpacity style={[styles.container, { borderColor: theme.border }]} onPress={onClose}>
                <View style={styles.iconContainer}>
                    <Feather name="filter" size={23} color={theme.text} />
                </View>
                <Text style={[styles.filterText, { color: theme.text }]}>Filter</Text>
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { backgroundColor: theme.background, transform: [{ translateY: slideAnim }] }]}>
                        <FilterList
                            onClose={onClose}
                            setSelectedContinents={setSelectedContinents}
                            setSelectedTimezones={setSelectedTimezones}
                        />
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
        height: 220,
        padding: 20,
    },
});

export default FilterButton;
