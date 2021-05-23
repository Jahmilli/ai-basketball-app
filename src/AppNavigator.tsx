import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { NavigationHeader } from "./components/NavigationHeader/NavigationHeader";
import CreateAccountScreen from "./screens/CreateAccountScreen/CreateAccountScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LeaderBoardScreen from "./screens/LeaderBoardScreen/LeaderBoardScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen/OnboardingScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import RecordShotOptionsScreen from "./screens/RecordShotOptionsScreen/RecordShotOptionsScreen";
import RecordShotSetupScreen from "./screens/RecordShotSetupScreen/RecordShotSetupScreen";
import RecordVideoScreen from "./screens/RecordVideoScreen/RecordVideoScreen";
import VideoFeedbackScreen from "./screens/VideoFeedback/VideoFeedback";
import VideoPlayerScreen from "./screens/VideoPlayerScreen/VideoPlayerScreen";

const Stack = createStackNavigator();

const screens = [
  {
    name: "Login",
    component: LoginScreen,
    // options: { title: "Login Screen" },
    options: (props: any) => ({
      headerTitle: () => (
        <NavigationHeader
          title="Login"
          rightButton={{
            title: "Sign Up",
            onPress: () => {
              props.navigation.navigate("CreateAccount");
            },
          }}
        />
      ),
    }),
  },
  {
    name: "CreateAccount",
    component: CreateAccountScreen,
    options: (props: any) => ({
      headerTitle: () => <NavigationHeader title="Sign Up" />,
    }),
  },
  {
    name: "ForgotPassword",
    component: ForgotPasswordScreen,
    options: (props: any) => ({ title: "Forgot Password" }),
  },
  {
    name: "Onboarding",
    component: OnboardingScreen,
    options: (props: any) => ({ title: "Onboarding" }),
  },
  {
    name: "Home",
    component: HomeScreen,
    options: (props: any) => ({
      headerLeft: null,
      gesturesEnabled: false,
      headerTitle: () => (
        <NavigationHeader
          title="Player Profile"
          rightButton={{
            title: "Settings",
            onPress: () => {
              props.navigation.navigate("Profile");
            },
          }}
        />
      ),
    }),
  },
  {
    name: "Profile",
    component: ProfileScreen,
    options: (props: any) => ({ title: "Profile Screen" }),
  },
  {
    name: "VideoFeedback",
    component: VideoFeedbackScreen,
    options: (props: any) => ({ title: "Feedback" }),
  },
  {
    name: "RecordShotSetup",
    component: RecordShotSetupScreen,
    options: (props: any) => ({ title: "Record" }),
  },
  {
    name: "RecordShotOptions",
    component: RecordShotOptionsScreen,
    options: (props: any) => ({ title: "Select Angle" }),
  },
  {
    name: "RecordVideo",
    component: RecordVideoScreen,
    options: (props: any) => ({ title: "Record Video" }),
  },
  {
    name: "VideoPlayer",
    component: VideoPlayerScreen,
    options: (props: any) => ({ title: "Video Player" }),
  },
  {
    name: "LeaderBoard",
    component: LeaderBoardScreen,
    options: (props: any) => ({ title: "Leader Board" }),
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
