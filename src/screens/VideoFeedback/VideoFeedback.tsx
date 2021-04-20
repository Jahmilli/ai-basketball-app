import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { Text, View } from "react-native";
import AppConfig from "../../../AppConfig";
import { parseS3Uri } from "../../../utils/helpers";
import { PrimaryButton } from "../../components/Button/Button";
import { IVideo } from "../../interfaces/IVideo";
import { RootStackParamList } from "../../types/types";
import styles, { ButtonLockup } from "./VideoFeedbackStyles";

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
  video: IVideo;
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
            {video.isProcessed ? "Complete" : "Pending"}
          </Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Uploaded date: </Text>
          <Text style={styles.textValue}>
            {new Date(video.createdTimestamp).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Uploaded time: </Text>
          <Text style={styles.textValue}>
            {new Date(video.createdTimestamp).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Type of Shot: </Text>
          <Text style={styles.textValue}>{video.typeOfShot}</Text>
        </View>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Angle of Shot: </Text>
          <Text style={styles.textValue}>{video.angleOfShot}</Text>
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
      <ButtonLockup>
        <PrimaryButton
          text="View Video"
          onPress={() =>
            navigation.navigate("VideoPlayer", {
              uri: `${AppConfig.s3Hostname}/${parseS3Uri(video.storageUri)}`,
              // uri: `${AppConfig.s3Hostname}/46f487d3-8128-45aa-81bf-f74afc2f3420.mp4`,
            })
          }
        />
      </ButtonLockup>
    </View>
  );
};

export default VideoFeedbackScreen;
