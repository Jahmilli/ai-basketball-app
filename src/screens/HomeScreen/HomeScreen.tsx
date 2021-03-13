import React, { FC, useEffect, useState } from "react";
import styles from "./HomeScreenStyles";
import { Button, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { getVideos } from "../../logic/functions/uploadVideo";
import { IUploadedVideo } from "../../interfaces/IUploadedVideo";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleNavigate = () => {
    navigation.navigate("RecordShotSetup");
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const callGetVideos = async () => {
      try {
        setIsLoading(true);
        const videos = await getVideos("test");
        setVideos(videos);
      } catch (err) {
        console.log("An error occurred when getting videos", err);
      } finally {
        setIsLoading(false);
      }
    };
    callGetVideos();
  }, [isFocused]);

  const handleNavigateToVideoFeedback = (video: IUploadedVideo) => {
    navigation.navigate("VideoFeedback", {
      video,
    });
  };

  const renderItem = ({ item }: { item: IUploadedVideo }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemBody}>
        <View style={styles.listItemTextLockup}>
          <View style={styles.listItemTitleLockup}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <Text>{item.description}</Text>
          <Text>
            Uploaded date:{" "}
            {new Date(item.uploaded_timestamp).toLocaleDateString()}
          </Text>
          <Text>
            Uploaded time:{" "}
            {new Date(item.uploaded_timestamp).toLocaleTimeString()}
          </Text>
          <Text>
            Processed status: {item.is_processed ? "Complete" : "Pending"}
          </Text>
          {item.is_processed ? (
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
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            keyExtractor={(item: IUploadedVideo) => item.id}
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
