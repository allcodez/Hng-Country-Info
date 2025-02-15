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
	const { theme } = useTheme();
	const navigation = useNavigation();

	const [searchText, setSearchText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);

	// Store selected filters
	const [selectedContinents, setSelectedContinents] = useState([]);
	const [selectedTimezones, setSelectedTimezones] = useState([]);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
			<KeyboardAvoidingView behavior="padding" enabled>
				<CustomHeader navigation={navigation} />

				<SearchBar searchText={searchText} setSearchText={setSearchText} />

				<View style={styles.containerFilter}>
					<LanguageFilter visible={modalVisible} onClose={toggleModal} />
					<FilterButton
						visible={modalVisible2}
						onClose={() => setModalVisible2(!modalVisible2)}
						setSelectedContinents={setSelectedContinents}
						setSelectedTimezones={setSelectedTimezones}
					/>
				</View>

				<CountryList
					searchText={searchText}
					selectedContinents={selectedContinents}
					selectedTimezones={selectedTimezones}
				/>
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
