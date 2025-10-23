import { ThemedView } from '@/components/themed-view';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { KeyboardAvoidingView, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {}

export default function SettingsScreen() {
      const colorScheme = useColorScheme();
  return (
    <ThemedView style={ styles.container }>
      <KeyboardAvoidingView>
        <SafeAreaView>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 8,
  },
  switchButton: {
    display: "flex",
    alignSelf: "flex-start",
  },
});
