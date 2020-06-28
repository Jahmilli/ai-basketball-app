import { StatusBar } from "expo-status-bar"; // Might be able to just remove this...
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import AppNavigator from "./AppNavigator";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme(); // This may be good to use later on, but for now, no...
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
