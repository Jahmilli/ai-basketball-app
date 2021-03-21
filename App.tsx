// @refresh reset

import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import AppNavigator from "./src/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { UserContext } from "./src/context";
import { firebaseConfig } from "./firebaseConf";

if (firebase.apps.length === 0) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: firebase.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserContext.Provider value={user}>
          <AppNavigator />
        </UserContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
