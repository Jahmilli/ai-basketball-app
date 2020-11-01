import React, { FC, useEffect, useState } from "react";
import styles from "./VideoFeedbackStyles";
import { Button, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { getVideos } from "../../logic/functions/uploadVideo";
import { IUploadedVideo } from "../../interfaces/IUploadedVideo";
import { FlatList } from "react-native-gesture-handler";
import { RouteProp, useIsFocused } from "@react-navigation/native";

type VideoFeedbackScreenRouteProp = RouteProp<
  RootStackParamList,
  "VideoFeedback"
>;
type VideoFeedbackScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
type VideoFeedbackScreenProps = {
  route: VideoFeedbackScreenRouteProp;
  navigation: VideoFeedbackScreenNavigationProp;
  video: IUploadedVideo;
};
const VideoFeedbackScreen: FC<VideoFeedbackScreenProps> = ({
  navigation,
  route,
}) => {
  const { video } = route.params;

  // const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  // const [videos, setVideos] = useState([]);
  // const handleNavigate = () => {
  //   navigation.navigate("RecordShotSetup");
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{video.name}</Text>
      <Text style={styles.description}>{video.description}</Text>
      <View style={styles.bodyLockup}>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Processed status: </Text>
          <Text style={styles.textValue}>
            {video.is_processed ? "Complete" : "Pending"}
          </Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Uploaded date: </Text>
          <Text style={styles.textValue}>
            {new Date(video.uploaded_timestamp).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Uploaded time: </Text>
          <Text style={styles.textValue}>
            {new Date(video.uploaded_timestamp).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Type of Shot: </Text>
          <Text style={styles.textValue}>{video.type_of_shot}</Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Angle of Shot: </Text>
          <Text style={styles.textValue}>{video.angle_of_shot}</Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>
            Alignment of feet and shoulders:{" "}
          </Text>
          <Text style={styles.textValue}>
            {video.feedback?.multiAxis || "Missing feedback"}
          </Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>
            Alignment of elbow, hip and knee of shooting arm:{" "}
          </Text>
          <Text style={styles.textValue}>
            {video.feedback?.singleAxis || "Missing feedback"}
          </Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Arm extension: </Text>
          <Text style={styles.textValue}>
            {video.feedback?.angle || "Missing feedback"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VideoFeedbackScreen;
