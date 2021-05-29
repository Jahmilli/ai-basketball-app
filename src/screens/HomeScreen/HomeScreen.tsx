import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { UserContext } from "../../context";
import { IVideo } from "../../interfaces/IVideo";
import { getVideos } from "../../logic/functions/video";
import { RootStackParamList } from "../../types/types";
import styles from "./HomeScreenStyles";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const user = useContext(UserContext);
  const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleNavigate = () => {
    navigation.navigate("RecordShotSetup");
  };

  useEffect(() => {
    if (!user) {
      return navigation.navigate("Login");
    }
    if (isLoading) {
      return;
    }

    const callGetVideos = async () => {
      try {
        setIsLoading(true);
        const videos = await getVideos(user.uid);
        setVideos(videos);
      } catch (err) {
        console.log("An error occurred when getting videos", err);
      } finally {
        setIsLoading(false);
      }
    };
    callGetVideos();
  }, [isFocused, user]);

  const handleNavigateToVideoFeedback = (video: IVideo) => {
    navigation.navigate("VideoFeedback", {
      video,
    });
  };

  const renderItem = ({ item }: { item: IVideo }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemBody}>
        <View style={styles.listItemTextLockup}>
          <View style={styles.listItemTitleLockup}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <Text>{item.description}</Text>
          <Text>
            Uploaded date:{" "}
            {new Date(item.createdTimestamp).toLocaleDateString()}
          </Text>
          <Text>
            Uploaded time:{" "}
            {new Date(item.createdTimestamp).toLocaleTimeString()}
          </Text>
          <Text>
            Processed status: {item.isProcessed ? "Complete" : "Pending"}
          </Text>
          {!item.isProcessed ? (
            <View style={styles.viewFeedbackLockup}>
              <Button
                title="View Feedback"
                onPress={() => handleNavigateToVideoFeedback(item)}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.noUploadsLockup}>
          <Text style={styles.getStartedText}>Loading...</Text>
          <Button
            title="Profile"
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      {videos.length > 0 ? (
        <>
          <View style={styles.uploadVideoLockup}>
            <Text style={styles.uploadVideoText}>Upload another video?</Text>
            <Button title="Record Shot" onPress={handleNavigate} />
          </View>
          <FlatList
            data={videos}
            style={styles.list}
            renderItem={renderItem}
            keyExtractor={(item: IVideo) => item.id}
          />
        </>
      ) : (
        <View style={styles.noUploadsLockup}>
          <Text style={styles.getStartedText}>
            Looks like you haven't uploaded videos yet!
          </Text>
          <Button title="Get Started!" onPress={handleNavigate} />
          {/* <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleNavigate}
        >
          <Text>Get</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
