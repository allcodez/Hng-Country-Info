import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeContext';
import LanguageList from './LanguageList';

const LanguageFilter = ({ visible, onClose }) => {
    const { theme } = useTheme();
    const slideAnim = useRef(new Animated.Value(700)).current; // Initialize off-screen

    // Animate modal when visibility changes
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
            {/* Language Filter Button */}
            <TouchableOpacity style={[styles.container, { borderColor: theme.border }]} onPress={onClose}>
                <View style={styles.iconContainer}>
                    <Feather name="globe" size={23} color={theme.text} />
                </View>
                <Text style={[styles.languageText, { color: theme.text }]}>EN</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { backgroundColor: theme.background, transform: [{ translateY: slideAnim }] }]}>
                        <LanguageList onClose={onClose} />
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
    languageText: {
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
        height: 600,
    },
});

export default LanguageFilter;
