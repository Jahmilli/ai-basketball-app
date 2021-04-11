// @refresh reset

import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { firebaseConfig } from "./firebaseConf";
import AppNavigator from "./src/AppNavigator";
import { NotFoundStatusCode } from "./src/constants/Http";
import { UserContext } from "./src/context";
import useCachedResources from "./src/hooks/useCachedResources";
import { IUser } from "./src/interfaces/IUser";
import { getUser } from "./src/logic/functions/user";

if (firebase.apps.length === 0) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<IUser>({});

  // Handle user state changes
  const onAuthStateChanged = async (user: firebase.User | null) => {
    if (!user) {
      setUser({});
      return;
    }

    try {
      const result = await getUser(user.uid);
      setUser({
        firebaseUserInfo: user,
        userDetails: result,
      });
    } catch (err) {
      // If this happens then we have a new user that we need to onboard
      console.log("app use", user);
      if (err.statusCode === NotFoundStatusCode) {
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
