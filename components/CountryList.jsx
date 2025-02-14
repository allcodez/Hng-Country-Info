import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import CountryCard from './CountryCard';
import CountryService from '../service/CountryService';
import Loading from './Loading';
import { theme } from '../app/theme';
import { useTheme } from '@/hooks/ThemeContext';

const CountryList = ({ searchText }) => {
    const { theme } = useTheme();

    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const fetchedCountries = await CountryService.fetchCountries();
                const groupedCountries = groupCountriesByLetter(fetchedCountries);
                setCountries(groupedCountries);
            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const groupCountriesByLetter = (countries) => {
        const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        const grouped = sortedCountries.reduce((acc, country) => {
            const firstLetter = country.name.common[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(country);
            return acc;
        }, {});

        return Object.keys(grouped).map(letter => ({
            title: letter,
            data: grouped[letter]
        }));
    };

    // Filter countries based on searchText
    const filteredCountries = countries.map(section => ({
        title: section.title,
        data: section.data.filter(country =>
            country.name.common.toLowerCase().includes(searchText.toLowerCase())
        )
    })).filter(section => section.data.length > 0); // Remove empty sections

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={filteredCountries}
                style={{color: theme.text}}
                keyExtractor={(item) => item?.name?.common || Math.random().toString()}
                renderItem={({ item }) => item ? <CountryCard country={item} /> : null}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={[styles.header, {color: theme.text}]}>{title}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        fontFamily: theme.font.minimal,
    },
});

export default CountryList;
