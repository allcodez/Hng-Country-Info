import React, { createContext, useState, useEffect, useContext } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define Light and Dark Themes
const lightTheme = {
    background: "#ffffff",
    text: "#000000",
    border: "#A9B8D4",
    placeholder: "#888",
    icon: "#000",
    search: "#F2F4F7",
    textLight: "#000000",
    textLight2: "#000000",
};

const darkTheme = {
    background: "#000F24",
    text: "#ffffff",
    textLight: "#98A2B3",
    textLight2: "#F2F4F7",
    border: "#A9B8D4",
    placeholder: "#EAECF0",
    icon: "#fff",
    search: "#98A2B333"
};

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
    const systemTheme = useColorScheme(); // Detect system theme
    const [themeMode, setThemeMode] = useState(systemTheme);

    // Load stored theme from AsyncStorage
    useEffect(() => {
        (async () => {
            const savedTheme = await AsyncStorage.getItem("appTheme");
            if (savedTheme) {
                setThemeMode(savedTheme);
            }
        })();
    }, []);

    // Function to toggle the theme
    const toggleTheme = async () => {
        const newTheme = themeMode === "dark" ? "light" : "dark";
        setThemeMode(newTheme);
        await AsyncStorage.setItem("appTheme", newTheme);
    };

    // Select theme colors based on themeMode
    const theme = themeMode === "dark" ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom Hook to use Theme Context
export const useTheme = () => useContext(ThemeContext);
