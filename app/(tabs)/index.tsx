import { ThemedView } from '@/components/themed-view';
import { KeyboardAvoidingView, StyleSheet, Text, ScrollView, useColorScheme, } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
//import  WeatherCardDisplay from "@/components/WeatherCardDisplay";
import { Searchbar } from "../../components/SearchBar";

const CAPITALS = ['London', 'Tokyo', 'New York'];

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    //const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <ThemedView style={ styles.container }>
      <KeyboardAvoidingView>
        <SafeAreaView>
          <ThemeProvider value={colorScheme=== 'dark' ? DarkTheme : DefaultTheme}>
            <SearchBar onAddBookmark={addBookmark}/>
            <ScrollView>
            </ScrollView>

          </ThemeProvider>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  titleContainer: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 8,
  },
    darkContainer: {
      backgroundColor: "#222"
  },
  lightContainer: {
    backgroundColor: "#fff"
  },
});
