import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Video } from "expo-av";
import VideoPlayers from "expo-video-player";
import React, { FC, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { RootStackParamList } from "../../types/types";
import styles from "./styles";

type VideoPlayerScreenRouteProp = RouteProp<RootStackParamList, "VideoPlayer">;

type VideoPlayerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VideoPlayer"
>;
type VideoPlayerScreenProps = {
  navigation: VideoPlayerScreenNavigationProp;
  route: VideoPlayerScreenRouteProp;
  uri: string;
};
const VideoPlayerScreen: FC<VideoPlayerScreenProps> = ({
  navigation,
  route,
}) => {
  const { uri } = route.params;
  // Using any rather than AVPlaybackStatus which is returned from playCallback doesn't seem to be correctly typed...
  const [status, setStatus] = React.useState<any | null>({
    positionMillis: 0,
  });
  const [isEndOfVideo, setIsEndOfVideo] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Check if at end of video (and we haven't already executed this logic)
    if (!status || !mounted) return;
    if (status.positionMillis !== status.playableDurationMillis) return;
    if (isEndOfVideo) return;
    setIsEndOfVideo(true);
    displayEndOfVideoAlert();
  }, [status.positionMillis, setIsEndOfVideo, mounted]);

  const displayEndOfVideoAlert = () => {
    Alert.alert("Video complete", "", [
      {
        text: "Go back",
        onPress: () => {
          setMounted(false);
          navigation.goBack();
        },
      },
      {
        text: "Replay Video",
        onPress: () => {
          if (!mounted) return;

          setIsEndOfVideo(false);
          setStatus({
            positionMillis: 0,
          });
        },
        style: "cancel",
      },
    ]);
  };

  if (!mounted) return null;

  // TODO: Figure out how to reset the video to start of it when we press replay video
  return (
    <View style={styles.container}>
      <VideoPlayers
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri:
              uri ??
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
          onLoadStart: () => console.log("loaded"),
        }}
        inFullscreen={true}
        playbackCallback={(status) => {
          if (!mounted) return;
          setStatus(status);
        }}
      />
    </View>
  );
};

export default VideoPlayerScreen;
