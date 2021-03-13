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
      imageContainerStyles={{ margin: 0, padding: 0 }}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <View
              style={{
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Image
                style={{
                  height: "60%",
                  resizeMode: "contain",
                }}
                source={require("../../../assets/images/basketball-1.jpg")}
              />
              <Text
                style={{
                  marginTop: 10,
                  padding: 0,
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                I am great at free throws. Seriously, free throws are, like, my
                best thing.
              </Text>
            </View>
          ),
          title: "",
          subtitle: "",
        },
        {
          backgroundColor: "#fff",
          image: (
            <View
              style={{
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Image
                style={{
                  height: "60%",
                  width: "100%",
                  resizeMode: "center",
                }}
                source={require("../../../assets/images/the-rock.jpg")}
              />
              <Text
                style={{
                  marginTop: 10,
                  padding: 0,
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                See you in the 🏀 NBA 🏀 Champ 😉
              </Text>
            </View>
          ),
          title: "",
          subtitle: "",
        },
        {
          backgroundColor: "#fff",
          image: (
            <View
              style={{
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Image
                style={{
                  height: "60%",
                  width: "100%",
                  resizeMode: "center",
                }}
                source={require("../../../assets/images/ben.jpg")}
              />
              <Text
                style={{
                  marginTop: 10,
                  padding: 0,
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Built with ❤ by the AI Basketball Analytics
              </Text>
            </View>
          ),
          title: "",
          subtitle: "",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
