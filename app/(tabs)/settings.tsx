import { ThemedView } from '@/components/themed-view';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Appearance, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {}

// Settings page, meant to handle switching themes and the celcius/fahrenheit swap, but only handles the theme for now
export default function SettingsScreen() {
      const colorScheme = useColorScheme();
  return (
    <ThemedView style={ styles.container }>
      <KeyboardAvoidingView>
        <SafeAreaView>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ScrollView>
              <View style={styles.settingsContainer}>
                <Text style={styles.settingsSwitchText}>Change theme: Light/Dark:</Text>
                <Switch value={colorScheme === 'dark'} onChange={() => {
                    Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}}/>
              </View>
              <View style={styles.settingsContainer}>
                <Text style={styles.settingsSwitchText}>Change Metric/Imperial:</Text>
                <Switch  onChange={() => {}}/>
              </View>
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
  },
  darkContainer: {
      backgroundColor: "#222"
  },
  lightContainer: {
    backgroundColor: "#fff"
  },
  switchButton: {
    alignSelf: "center",
  },
  settingsContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#C68A9E",
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    borderWidth: 2,
    marginLeft: "2%"
  },
  settingsSwitchText: {
    fontSize: 24,
    alignSelf: "center",
    justifyContent: "center",
    elevation: 5
  }
});
