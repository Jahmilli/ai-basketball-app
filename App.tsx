// @refresh reset

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { firebaseConfig } from "./firebaseConf";
import AppNavigator from "./src/AppNavigator";
import { NotFoundStatusCode } from "./src/constants/Http";
import { AppContext } from "./src/context";
import useCachedResources from "./src/hooks/useCachedResources";
import { IUser } from "./src/interfaces/IUser";
import { getUser } from "./src/logic/functions/user";
import { themes } from "./src/styles/theme.styles";

if (firebase.apps.length === 0) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<IUser>({});
  const [themeKey, setThemeKey] = useState("");
  const [theme, setTheme] = useState(themes.bullsPrimaryTheme);

  // Handle user state changes
  const onAuthStateChanged = async (user: firebase.User | null) => {
    console.log("appts user is ", user);
    if (!user) {
      setUser({});
      return;
    }

    console.log("heeeeeeeere");
    try {
      const result = await getUser(user.uid);
      console.log("getUser", result);
      setUser({
        firebaseUserInfo: user,
        userDetails: result,
      });
    } catch (err) {
      // If this happens then we have a new user that we need to onboard
      console.log("app use", user);
      if (err.response?.status === NotFoundStatusCode) {
        setUser({
          firebaseUserInfo: user,
          userDetails: undefined,
        });
        return;
      }
      setUser({});
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    console.log("App.tsx useEffect");
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const updateTheme = (key: string) => {
    // @ts-ignore
    const newTheme = themes[key];

    // Just incase anything weird is done...
    if (!newTheme) {
      console.log("Using default theme");
      setTheme(themes.initialTheme);
      return;
    }

    setTheme(newTheme);
  };

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("@theme_key");
        if (value !== null) {
          // value previously stored
          updateTheme(value);
        }
      } catch (err) {
        console.warn("An error occurred when getting key", err);
        // error reading value
      }
    })();
  }, []);

  useEffect(() => {
    updateTheme(themeKey);
  }, [themeKey]);

  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppContext.Provider
          value={{
            user,
            themeKey,
            setThemeKey,
            theme,
          }}
        >
          <AppNavigator />
        </AppContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
