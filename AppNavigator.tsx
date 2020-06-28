import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RecordShotSetupScreen from "./screens/RecordShotSetupScreen/RecordShotSetupScreen";

const Stack = createStackNavigator();

// TODO: Spamming Stack Screen isn't great, create a config object and map through it :)
const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login Screen" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home Screen" }}
      />
      <Stack.Screen
        name="RecordShotSetup"
        component={RecordShotSetupScreen}
        options={{ title: "Record Shot Setup Screen" }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
