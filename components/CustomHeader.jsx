import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/ThemeContext"; // Import useTheme

const { width } = Dimensions.get('window');

export default function CustomHeader({ navigation }) {
    const { theme, toggleTheme, themeMode } = useTheme();

    return (
        <SafeAreaView
            style={[styles.header, { backgroundColor: theme.background }]}
        >

            <Image
                source={themeMode === "dark"
                    ? require("../assets/images/icon-light.png")
                    : require("../assets/images/icon.png")
                }
                style={[
                    themeMode === "dark"
                        ? { width: 110, height: 35 }
                        : { width: 115, height: 40 },
                    { marginLeft: 30, resizeMode: "contain" }
                ]}
            />


            <TouchableOpacity
                onPress={toggleTheme} // Toggle theme on click
                style={{ marginLeft: 'auto', paddingHorizontal: 15, marginRight: 15 }}
            >
                <Ionicons
                    name={themeMode === "dark" ? "moon" : "sunny"}
                    size={24}
                    color={themeMode === "dark" ? "white" : "black"}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});
