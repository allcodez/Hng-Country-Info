import React, { useState } from "react";
import { Dimensions, KeyboardAvoidingView, SafeAreaView, View, StyleSheet } from "react-native";
import SearchBar from '../components/SearchBar';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import LanguageFilter from '../components/LanguageFilter';
import FilterButton from '../components/FilterButton';
import { theme } from './theme';
import CountryList from '../components/CountryList';
import { useTheme } from "@/hooks/ThemeContext";

const { width, height } = Dimensions.get('window');

export default function Index() {
	const { theme, toggleTheme, themeMode } = useTheme();

	const navigation = useNavigation();
	const [searchText, setSearchText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
			<KeyboardAvoidingView behavior="padding" enabled>
				<CustomHeader navigation={navigation} />

				{/* Pass searchText and setSearchText to SearchBar */}
				<SearchBar searchText={searchText} setSearchText={setSearchText} />

				<View style={styles.containerFilter}>

					<LanguageFilter visible={modalVisible} onClose={toggleModal} />
					<FilterButton visible={modalVisible2} onClose={() => setModalVisible2(!modalVisible2)} />
				</View>

				{/* Pass searchText to CountryList */}
				<CountryList searchText={searchText} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	containerFilter: {
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: 'space-between',
		marginTop: 20,
	},
});
