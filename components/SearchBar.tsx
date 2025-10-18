import { searchLocations, searchResult, searchWeatherByCoords, WeatherData } from "@/services/weatherApi";
import { CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Cloudy, Sun } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { ThemedView } from "./themed-view";

const { width } = Dimensions.get("window")

export const SearchBar = (/* { onAddBookmark }: {onAddBookmark: (city: string) => void } */) => {
    const [query, setSearchQuery] = useState("");
    const [results, setResults] = useState<searchResult[]>([]);
	const [selection, setSelection] = useState<WeatherData | null>(null);
    const searchQueryPlaceholder = "Enter the name of a city..."

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
			setResults([])
			return
		}
        try {
			const searchQuery = await searchLocations(query)
			setResults(searchQuery)
        } catch (e) {
            console.error("There was an error executing the search.")
			setResults([])
        }
    }

	const handleSelection = async (selectionName: searchResult) => {
		try {
			console.log('Selecting:', selectionName); // Debug log
    		console.log('Coords:', selectionName.lat, selectionName.lon); // Debug log
			const query = await searchWeatherByCoords(selectionName.lat, selectionName.lon)
			console.log('Weather data:', query); // Debug log
			setSelection(query)
			setResults([]);
		} catch (e) {
			console.error("Failed to load the weather for this location.", e)
			setResults([])
		}
	}

    return (
		<View>
			<View style={styles.InputContainer}>
				<TextInput style={styles.inputfield}
					value={query}
					onChangeText={(text) => {
						setSearchQuery(text)
						handleSearch(text)
					}}
					placeholder={searchQueryPlaceholder} />

{/* 				<TouchableOpacity style={styles.sendButton} onPress={handleSearch}>
					<Cat size={25} color={"pink"} />
				</TouchableOpacity> */}
			</View>
			{/* Search Results List */}
			{results.length > 0 && (
				<FlatList
					data={results}
					keyExtractor={(item, index) => `${item.name}-${item.lat}-${index}`}
					renderItem={({ item }: {item: searchResult }) => (
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

			{selection && (
				<ThemedView style={styles.selectionContainer}>
				<Text style={styles.selectionTitle}>{selection.name}, {selection.sys.country}
					<View style={styles.tempSelection}>
						<Text style={styles.tempValue}>{Math.round(selection.main.temp)}°C</Text>
						<Text style={styles.selectionName}>{selection.name}, {selection.sys.country}</Text>
					</View>
				</Text>
					<View style={styles.weatherInfo}>
						<View style={styles.infoButton}>
							<Text style={styles.infoText}>{selection.main.temp} °C - {selection.weather[0].description}</Text>
						</View>
						<View style={styles.infoButton}>
							<Text style={styles.infoText}>{selection.weather[0].main}</Text>
						</View>
							{(() => {
								const WeatherIcon = getWeatherIcon(selection.weather[0].main)
								return <WeatherIcon style={{}} size={60} color="#C68A9E" />;
							})()}
					</View>


				</ThemedView>
			)}
	</View>
    )
}

const getWeatherIcon = (weather: string) => {
	const weatherMap: { [key: string]: any } = {
		"Clear": Sun,
		"Clouds": Cloudy,
		"Rain": CloudRain,
		"Drizzle": CloudDrizzle,
		"Thunderstorm": CloudLightning,
		"Snow": CloudSnow,
		"Mist": CloudFog,
	}
	return weatherMap[weather] || Sun;
}

const styles = StyleSheet.create({
    InputContainer: {
		display: "flex",
		flexDirection: "row",
		backgroundColor: "#C68A9E",
		alignItems: "center",
		elevation: 5,
		width: width,
		maxHeight: 60,
		//minHeight: "fit-content",
		marginTop: 25,
		top: 5,
		borderRadius: 24,
	},
    inputfield: {
		flex: 1,
		width: width -60,
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
		marginLeft: 20,
		marginRight: 20,
		backgroundColor: "#553671",
		borderRadius: 16,
		paddingLeft: 8,
		paddingRight: 8,
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
	selectionContainer: {
		borderWidth: 2,
		borderRadius: 25,
		padding: 20,
		marginTop: 16,
		marginLeft: 20,
		marginRight: 20,
		backgroundColor: "#553671",
	},
	selectionTitle: {
		display: "flex",
		flexDirection: "row", //figure out why this isn't fixing itself angy
		fontSize: 20,
		justifyContent: "space-evenly";
		marginBottom: 16,
		backgroundColor: "#C68A9E",
		borderWidth: 4,
		borderRadius: 24,
		padding: 20
	},
	weatherInfo: {
		flexDirection: "row",
		marginBottom: 12,
	},
	infoButton: {
		borderWidth: 4,
		borderRadius: 15,
		paddingHorizontal: 8,
		paddingVertical: 8,
		marginHorizontal: 2,
		minWidth: 50,
		maxWidth: 110,
		justifyContent: "space-evenly",
		backgroundColor: "#C68A9E",
	},
	infoText: {
		fontSize: 18,
	},
	weatherIcon: {
		backgroundColor: "#553671",
		justifyContent: "center",
		alignItems: "center",
		width: 90,
		height: 90,
		borderRadius: 24,
		margin: 5,
		marginRight: 5,
		color: "#C68A9E",
	},
	tempSelection: {
		borderWidth: 2,	
		borderRadius: 10,
		justifyContent: "center"
	},
	tempValue: {
		fontSize: 24,
		textAlign: "center",
	},
	selectionName: {
		fontSize: 16,
		textAlign: "center",
	}
})