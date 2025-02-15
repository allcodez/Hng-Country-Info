import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "../hooks/ThemeContext"; // Import ThemeProvider
import { FilterProvider } from "../hooks/FilterContext"; // Import FilterProvider

// Prevent splash screen from hiding before assets load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        AxiformaRegular: require("../assets/fonts/Axiforma-Regular.ttf"),
        AxiformaSemiBold: require("../assets/fonts/Axiforma-SemiBold.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) return null;

    return (
        <ThemeProvider>
            <FilterProvider>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="CountryDetails"
                        options={{ title: "Country Details", headerShown: false }}
                    />
                </Stack>
            </FilterProvider>
        </ThemeProvider>
    );
}
