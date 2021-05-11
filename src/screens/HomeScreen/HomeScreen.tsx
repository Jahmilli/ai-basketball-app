import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { PrimaryButton } from "../../components/Button/Button";
import { TextStyle, TitleStyle } from "../../components/Styled/Styled";
import { Tabs } from "../../components/Tabs/Tabs";
import { UploadedVideos } from "../../components/UploadedVideos/UploadedVideos";
import { UserContext } from "../../context";
import { getVideos } from "../../logic/functions/video";
import { RootStackParamList } from "../../types/types";
import styles from "./HomeScreenStyles";
import { getScores } from "../../logic/functions/leaderBoard";
import { IScore } from "../../interfaces/IVideo";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

enum TabTitles {
  STATS = "STATS",
  VIDEOS = "VIDEOS",
}
const tabs = [TabTitles.STATS, TabTitles.VIDEOS];

// TODO: Prevent users from being able to press backbutton...

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const user = useContext(UserContext);
  const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  const [videos, setVideos] = useState([]);
  const [scores, setScores] = useState<IScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  useEffect(() => {
    if (!user.firebaseUserInfo) {
      return navigation.navigate("Login");
    }
    if (isLoading) {
      return;
    }

    const callGetVideos = async () => {
      if (!user.firebaseUserInfo) return;

      try {
        setIsLoading(true);
        const videos = await getVideos(user.firebaseUserInfo.uid);
        setVideos(videos);
      } catch (err) {
        console.log("An error occurred when getting videos", err);
      } finally {
        setIsLoading(false);
      }
    };

    const callGetScores = async () => {
      try {
        setIsLoading(true);
        const scores: IScore[] = await getScores();
        setScores(scores);
      } catch (err) {
        console.log(
          "An error occurred when getting scores for leader board",
          err
        );
      } finally {
        setIsLoading(false);
      }
    };

    callGetScores();
    callGetVideos();
  }, [isFocused, user]);

  const handleNavigateLeaderBoard = () => {
    navigation.navigate("LeaderBoard", { scores });
  };

  const renderSelectedContent = (currentTab: TabTitles) => {
    switch (currentTab) {
      case TabTitles.STATS:
        return (
          <PrimaryButton
            text="LeaderBoard"
            onPress={handleNavigateLeaderBoard}
          />
        );
      case TabTitles.VIDEOS:
        return <UploadedVideos videos={videos} navigation={navigation} />;
      default:
        return (
          <TitleStyle>You shouldn't have been able to get here...</TitleStyle>
        );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <TextStyle fontSize="L">Loading...</TextStyle>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Tabs
        items={tabs}
        onTabSelect={(key: any) => setCurrentTab(key)}
        currentSelectedTab={currentTab}
      />
      <View
        style={{
          width: "100%",
          height: "90%",
        }}
      >
        {renderSelectedContent(currentTab)}
      </View>
    </View>
  );
};

export default HomeScreen;
