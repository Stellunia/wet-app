import { ThemedView } from '@/components/themed-view';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Appearance, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, useColorScheme, } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
//import  WeatherCardDisplay from "@/components/WeatherCardDisplay";
import { SearchBar } from "../../components/SearchBar";


//  Home screen where the user can search for the weather in places
export default function HomeScreen() {
    const colorScheme = useColorScheme();
    //const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <ThemedView style={ styles.container }>
      <KeyboardAvoidingView>
        <SafeAreaView>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <SearchBar />
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
  switchButton: {
    display: "flex",
    alignSelf: "flex-start",
  },
});
