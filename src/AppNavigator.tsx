import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RecordShotSetupScreen from "./screens/RecordShotSetupScreen/RecordShotSetupScreen";
import RecordShotOptionsScreen from "./screens/RecordShotOptionsScreen/RecordShotOptionsScreen";
import RecordVideoScreen from "./screens/RecordVideoScreen/RecordVideoScreen";
import OnboardingScreen from "./screens/OnboardingScreen/OnboardingScreen";
import VideoFeedbackScreen from "./screens/VideoFeedback/VideoFeedback";
import CreateAccountScreen from "./screens/CreateAccountScreen/CreateAccountScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen/ForgotPasswordScreen";

const Stack = createStackNavigator();

const screens = [
  {
    name: "Login",
    component: LoginScreen,
    options: { title: "Login Screen" },
  },
  {
    name: "CreateAccount",
    component: CreateAccountScreen,
    options: { title: "Create Account Screen" },
  },
  {
    name: "ForgotPassword",
    component: ForgotPasswordScreen,
    options: { title: "Forgot Password Screen" },
  },
  {
    name: "Onboarding",
    component: OnboardingScreen,
    options: { title: "Onboarding Screen" },
  },
  {
    name: "Home",
    component: HomeScreen,
    options: { title: "Home Screen" },
  },
  {
    name: "VideoFeedback",
    component: VideoFeedbackScreen,
    options: { title: "Feedback Screen" },
  },
  {
    name: "RecordShotSetup",
    component: RecordShotSetupScreen,
    options: { title: "Record Shot Setup Screen" },
  },
  {
    name: "RecordShotOptions",
    component: RecordShotOptionsScreen,
    options: { title: "Select Angle Setup Screen" },
  },
  {
    name: "RecordVideo",
    component: RecordVideoScreen,
    options: { title: "Record Video Screen" },
  },
];

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default Routes;
