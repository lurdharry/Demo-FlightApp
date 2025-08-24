import { FlightSearchProvider } from "@/context/FlightSearchContext";
import queryClient from "@/services/queryClient/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider theme={DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <FlightSearchProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ title: "Login" }} />
              <Stack.Screen name="search" options={{ title: "Search Flights" }} />
              <Stack.Screen name="results" options={{ title: "Flight Results" }} />
              <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
            </Stack>
            <StatusBar barStyle={"light-content"} />
          </FlightSearchProvider>
        </QueryClientProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
