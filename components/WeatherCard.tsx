import { UIBookmark } from "@/hooks/useWeatherCards";
import { StyleSheet, Text, useColorScheme, View } from "react-native";


type WeatherCardProps = {
  bookmarked: UIBookmark;
}

export default function WeatherCard({ bookmarked }: WeatherCardProps) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightThemeOverlap : styles.darkThemeOverlap;

    if (bookmarked.tag === "bookmarked") {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.text}>{bookmarked.bookmarked}</Text>
                </View>
            </View>
        )
    } else if (bookmarked.tag === "notBookmarked") {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.text}>{bookmarked.bookmarked}</Text>
                </View>
            </View>
        )
    }
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
})
