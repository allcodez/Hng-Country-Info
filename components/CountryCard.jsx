import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from '../app/theme';
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/ThemeContext";

const CountryCard = ({ country }) => {
    const { theme } = useTheme();

    const router = useRouter();

    const goToCountryDetails = () => {
        const countryData = {
            name: country.name,
            capital: country.capital,
            flags: country.flags,
            region: country.region,
            population: country.population,
            area: country.area,
            currencies: country.currencies,
            timezones: country.timezones,
            idd: country.idd,
            car: country.car,
            maps: country.maps,
        };

        router.push({
            pathname: "/CountryDetails",
            params: { country: JSON.stringify(countryData) },
        });
    };


    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={goToCountryDetails}>
            <View style={styles.card}>
                <Image source={{ uri: country.flags?.png }} style={styles.flag} />
                <View style={styles.info}>
                    <Text style={[styles.name, {color: theme.text}]}>{country.name.common}</Text>
                    <Text style={[styles.capital, {color: theme.textLight}]}>{country.capital}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        // backgroundColor: '#f8f9fa',
        borderRadius: 8,
        marginVertical: 10,
        elevation: 3,
    },
    flag: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 5,
        gap: 5
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: theme.font.minimal
    },
    official: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#555',
    },
    capital: {
        fontSize: 14,
        color: '#333',
    },
    region: {
        fontSize: 14,
        color: '#007bff',
    },
    population: {
        fontSize: 14,
        color: '#28a745',
    },
});

export default CountryCard;
