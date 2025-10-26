import { searchLocations, searchResult, searchWeatherByCoords, WeatherData } from "@/services/weatherApi";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import WeatherCard from "./WeatherCard";

const { width } = Dimensions.get("window")

export const SearchBar = () => {
	const [query, setSearchQuery] = useState("");
	const [results, setResults] = useState<searchResult[]>([]);
	const [selection, setSelection] = useState<WeatherData | null>(null);
	const searchQueryPlaceholder = "Enter the name of a city..."

	// handles the search for the different locations and lists them in a list of 5
	const handleSearch = async (query: string) => {
		if (!query.trim()) {
			setResults([])
			return
		}
		try {
			const searchQuery = await searchLocations(query)
			setResults(searchQuery)
		} catch (e) {
			console.error("There was an error executing the search. ", e)
			setResults([])
		}
	}

	// does what it says on the tin, handles the selection and searches for the weather by latitude and longitude
	const handleSelection = async (selectionName: searchResult) => {
		try {
			const query = await searchWeatherByCoords(selectionName.lat, selectionName.lon)
			setSelection(query)
			setResults([]);
		} catch (e) {
			console.error("Failed to load the weather for this location. ", e)
			setResults([])
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.InputContainer}>
				<TextInput style={styles.inputfield}
					value={query}
					onChangeText={(text) => {
						setSearchQuery(text)
						handleSearch(text)
					}}
					placeholder={searchQueryPlaceholder} />
			</View>
			{/* Displays the results that the user has searched for */}
			{results.length > 0 && (
				<FlatList
					data={results}
					keyExtractor={(item, index) => `${item.name}-${item.lat}-${index}`}
					renderItem={({ item }: { item: searchResult }) => (
						<TouchableOpacity style={styles.resultItem}
							onPress={() => handleSelection(item)}>
							<Text
								style={styles.resultText}>
								{item.name}, {item.state ? `${item.state}, ` : ""}{item.country}
							</Text>
						</TouchableOpacity>
					)}
					style={styles.resultsList}
					/*<TouchableOpacity style={style.sendButton} onPress={() => onAddBookmark(result.name)}>
						<Book size={25} color={"pink"} />
					</TouchableOpacity>*//>
			)}
			{/* Weather card pops up after the user has selected one of the search results */}
			{selection && (
				<WeatherCard data={selection}/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: width - 10,
	},
	InputContainer: {
		flexDirection: "row",
		backgroundColor: "#C68A9E",
		elevation: 5,
		maxHeight: 60,
		top: 5,
		borderRadius: 24,
		
	},
	inputfield: {
		flex: 1,
		width: width - 60,
		fontSize: 20,
		paddingLeft: 20,
	},
	sendButton: {
		backgroundColor: "#553671",
		justifyContent: "center",
		alignItems: "center",
		width: 45,
		height: 45,
		borderRadius: 24,
		margin: 5,
		marginRight: 5,
	},
	resultsList: {
		marginTop: 16,
/* 		marginLeft: 20,
		marginRight: 20, */
		backgroundColor: "#553671",
		borderRadius: 16,
		paddingLeft: 28,
		paddingRight: 28,
		paddingTop: 8,
		borderWidth: 2,
	},
	resultItem: {
		borderWidth: 2,
		borderRadius: 25,
		padding: 16,
		marginBottom: 8,
		backgroundColor: "#C68A9E",
	},
	resultText: {
		textAlign: "center",
		fontSize: 20,
		margin: -7,
	},
})