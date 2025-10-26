import { useBookmarks } from "@/hooks/useWeatherCards";
import { WeatherData } from "@/services/weatherApi";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Cat, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Cloudy, Sun } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedView } from "./themed-view";

const { width } = Dimensions.get("window")

type WeatherCardProps = {
  data: WeatherData
}

export default function WeatherCard({ data }: WeatherCardProps) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightThemeOverlap : styles.darkThemeOverlap;
    const {isBookmarked} = useBookmarks();
/* 	const [bookmark, setBookmark] = useState<boolean>(false);

	const saveBookmark = async(itemId: string) => {
		await useAsyncStorage.getItem('bookmark').then((token) => {
			const res = JSON.parse(token);
			if( res !== null ) {
				let data = res.find((val: string) => val === itemId);
				if( data == null ) {
					res.push(itemId);
					AsyncStorage.setItem('bookmark', JSON.stringify(res));
					alert('Location bookmarked!')
				}
			} else {
				let bookmark = [];
				bookmark.push(itemId);
				AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
				alert('Location bookmarked!')
			}
		})
	} */
    
		// mmm, weather card that was meant to be used both for selection on the main page and bookmarks, but alas
        return (
        <ThemedView style={styles.dataContainer}>
					<View style={styles.dataTitleContainer}>
						<View style={styles.dataMainBox}>
							<Text style={styles.dataTitle}>{data.name}, {data.sys.country}</Text>
							<View style={styles.tempdata}>
								<Text style={styles.tempValue}>{Math.round(data.main.temp)}°C</Text>
								<Text style={styles.dataName}>{data.name}, {data.sys.country}, {data.timezone}</Text>
							</View>
						</View>
						<View style={styles.dataSecondBox}>
							<TouchableOpacity style={styles.favouriteButton}>
								<Cat size={25} color={isBookmarked(data.name)?"#E8D900":"#553671"} absoluteStrokeWidth={false} strokeWidth={3} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.weatherInfo}>
						<View style={styles.infoButton}>
							<Text style={styles.infoText}>{data.main.temp} °C - {data.weather[0].description}</Text>
						</View>
						<View style={styles.infoButton}>
							<Text style={styles.infoText}>{data.weather[0].main}</Text>
						</View>
						{(() => {
							const WeatherIcon = getWeatherIcon(data.weather[0].main)
							return <WeatherIcon style={styles.weatherIcon} size={60} color="#C68A9E" />;
						})()}
					</View>
				</ThemedView>
        )
}

// Makes use out of the lucide icons to display the weather that way
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
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#C68A9E",
    padding: 10,
    marginLeft: "45%",
    marginRight: "5%",
    borderRadius: 20,
    marginTop: 5,
    maxWidth: "50%",
    alignSelf: "flex-end"
  },
  text: {
    fontSize: 16,
    color: "#fff"
  },
  darkThemeOverlap: {
    backgroundColor: "#222"
  },
  lightThemeOverlap: {
    backgroundColor: "#fff"
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
	dataContainer: {
		borderWidth: 2,
		borderRadius: 25,
		padding: 6,
		marginTop: 16,
		backgroundColor: "#553671",
	},
	dataTitle: {
		
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
	},
	dataTitleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#C68A9E",
		borderWidth: 4,
		borderRadius: 24,
		marginBottom: 8,
	},
	dataMainBox: {
		flexDirection: "column",
	},
	dataSecondBox: {
		justifyContent: "flex-start",
		marginTop: 8,
		marginRight: 8
	},
	tempdata: {
		justifyContent: "center",
		paddingLeft: 10,
		paddingBottom: 10
	},
	tempValue: {
		fontSize: 24,
	},
	dataName: {
		fontSize: 16,
	},
	weatherInfo: {
		flexDirection: "row",
		marginBottom: 12,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	infoButton: {
		borderWidth: 4,
		borderRadius: 15,
		paddingHorizontal: 8,
		paddingVertical: 8,
		marginHorizontal: 2,
		minWidth: 50,
		maxWidth: 150,
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
		color: "#C68A9E",
	},
	favouriteButton: {

	},
})
