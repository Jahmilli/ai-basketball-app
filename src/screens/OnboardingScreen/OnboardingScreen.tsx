import React, { FC, useEffect, useState } from "react";
import styles from "./OnboardingScreenStyles";
import { Button, Text, View, Image, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { getVideos } from "../../logic/functions/uploadVideo";
import { IUploadedVideo } from "../../interfaces/IUploadedVideo";
import { FlatList } from "react-native-gesture-handler";
import Onboarding from "react-native-onboarding-swiper";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;
type OnboardingScreenProps = {
  navigation: OnboardingScreenNavigationProp;
};
const OnboardingScreen: FC<OnboardingScreenProps> = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const handleCompleteOnboarding = () => {
    navigation.navigate("Home");
  };

  return (
    <Onboarding
      onDone={handleCompleteOnboarding}
      onSkip={handleCompleteOnboarding}
      pages={[
        {
          backgroundColor: "#fff",
          // image: (
          //   <Image
          //     style={{
          //       width: win.width,
          //       height: height * ratio,
          //     }}
          //     source={require("../../../assets/images/basketball-2.jpg")}
          //   />
          // ),
          title: "Page 1",
          subtitle: "This is the first page of the onboarding sequence",
        },
        {
          backgroundColor: "#fff",
          // image: (
          //   <Image
          //     style={{
          //       width: win.width,
          //       height: basketball2Height * basketball2Ratio,
          //     }}
          //     source={require("../../../assets/images/basketball-2.jpg")}
          //   />
          // ),
          title: "Page 2",
          subtitle: "This is the second page of the onboarding sequence",
        },
        {
          backgroundColor: "#fff",
          // image: (
          //   <Image
          //     resizeMode="contain"
          //     style={{
          //       width: win.width,
          //       height: height * ratio,
          //     }}
          //     source={require("../../../assets/images/the-rock.jpg")}
          //   />
          // ),
          title: "Page 3",
          subtitle: "This is the third page of the onboarding sequence",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
