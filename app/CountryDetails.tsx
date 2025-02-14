import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Linking, TouchableOpacity } from "react-native";
import { theme } from './theme';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/ThemeContext";


const { width } = Dimensions.get("window");

const CountryDetails = () => {
    const { theme } = useTheme();

    const { country } = useLocalSearchParams();
    const router = useRouter();

    if (!country) {
        return <Text>Loading...</Text>;
    }

    let parsedCountry;
    try {
        parsedCountry = typeof country === "string" ? JSON.parse(country) : country;
    } catch (error) {
        return <Text>Error loading country details</Text>;
    }

    const images = [
        parsedCountry.flags?.png,
        parsedCountry.maps?.googleMaps
            ? `https://maps.googleapis.com/maps/api/staticmap?center=${parsedCountry.capital?.[0]}&zoom=5&size=400x400&key=YOUR_GOOGLE_MAPS_API_KEY`
            : null,
    ].filter(Boolean);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
            <ScrollView style={[styles.containerContent, {backgroundColor: theme.background}]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={30} color={theme.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, {color:theme.text}]}>{parsedCountry.name?.common}</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <View style={styles.imageSliderContainer}>
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageSlider}>
                        {images.map((image, index) => (
                            <Image key={index} source={{ uri: image }} style={styles.image} />
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.info}>
                    <View>
                        <Text style={[styles.label, {color: theme.text}]}>Population: <Text style={[styles.value, {color: theme.textLight2}]}>{parsedCountry.population?.toLocaleString() || "N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Region: <Text style={[styles.value, {color: theme.textLight2}]}>{parsedCountry.region || "N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Capital: <Text style={[styles.value, {color: theme.textLight2}]}>{parsedCountry.capital?.[0] || "N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Motto: <Text style={[styles.value, {color: theme.textLight2}]}>{"N/A"}</Text></Text>
                    </View>

                    <View>

                        <Text style={[styles.label, {color: theme.text}]}>Official Language: <Text style={[styles.value, {color: theme.textLight2}]}>{Object.values(parsedCountry.languages || {})[0] || "N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Ethnic Group: <Text style={[styles.value, {color: theme.textLight2}]}>{"N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Religion: <Text style={[styles.value, {color: theme.textLight2}]}>{"N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Government: <Text style={[styles.value, {color: theme.textLight2}]}>{"N/A"}</Text></Text>
                    </View>

                    <View>

                        <Text style={[styles.label, {color: theme.text}]}>Independence: <Text style={[styles.value, {color: theme.textLight2}]}>{"N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Area: <Text style={[styles.value, {color: theme.textLight2}]}>{parsedCountry.area ? `${parsedCountry.area.toLocaleString()} km²` : "N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Currency:
                            <Text style={[styles.value, {color: theme.textLight2}]}>
                                {Object.values( parsedCountry.currencies || {})[0]?.name || "N/A"}
                                ({Object.values(parsedCountry.currencies || {})[0]?.symbol || "N/A"})
                            </Text>
                        </Text>
                        <Text style={[styles.label, {color: theme.text}]}>GDP: <Text style={[styles.value, {color: theme.textLight2}]}>{"N/A"}</Text></Text>
                    </View>



                    <View>
                        <Text style={[styles.label, {color: theme.text}]}>Timezone: <Text style={[styles.value, {color: theme.textLight2}]}>{parsedCountry.timezones?.join(", ") || "N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Date Format: <Text style={[styles.value, {color: theme.textLight2}]}>{"N/A"}</Text></Text>
                        <Text style={[styles.label, {color: theme.text}]}>Dialing Code:
                            <Text style={[styles.value, {color: theme.textLight2}]}>
                                {parsedCountry.idd?.root ? ` ${parsedCountry.idd.root}${parsedCountry.idd.suffixes?.[0] || ""}` : "N/A"}
                            </Text>
                        </Text>
                        <Text style={[styles.label, {color: theme.text}]}>Driving Side: <Text style={[styles.value, {color: theme.textLight2}]}>{parsedCountry.car?.side || "N/A"}</Text></Text>

                    </View>
                </View>

                {/* {parsedCountry.maps?.googleMaps && (
                    <Text style={styles.mapLink} onPress={() => Linking.openURL(parsedCountry.maps.googleMaps)}>
                        🌍 View on Google Maps
                    </Text>
                )} */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    containerContent: {
        flex: 1,
        backgroundColor: theme.color.bgWhite,
    },
    imageSlider: {
        height: 250,
    },
    imageSliderContainer: {
        padding: 10,
    },
    image: {
        width: width / 1.06,
        height: 250,
        resizeMode: "cover",
        borderRadius: 15,
    },
    info: { padding: 20, gap: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#333" },
    subTitle: { fontSize: 16, fontStyle: "italic", color: "#666", marginBottom: 10 },
    label: { fontSize: 16, fontWeight: "bold", color: "#444", marginTop: 5, fontFamily: theme.font.bold, lineHeight: 30 },
    value: { fontWeight: "normal", color: "#555", fontFamily: theme.font.minimal },
    mapLink: { color: "#007AFF", marginTop: 10, textDecorationLine: "underline" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1, color: theme.color.bgBlack, fontFamily: theme.font.bold },
    headerSpacer: { width: 30 },
});

export default CountryDetails;
