import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import React, { FC, useEffect, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { AngleOfShot } from "../../enums/AngleOfShot";
import { TypeOfShot } from "../../enums/TypeOfShot";
import { useInterval } from "../../hooks/useInterval";
import { IVideo } from "../../interfaces/IVideo";
import { createVideoEntry, streamVideo } from "../../logic/functions/video";
import { RootStackParamList } from "../../types/types";
import styles from "./RecorderStyles";

type RecordVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecordVideo"
>;

type RecorderProps = {
  navigation: RecordVideoScreenNavigationProp;
  userId: string;
  typeOfShot: TypeOfShot;
  angleOfShot: AngleOfShot;
};

const Recorder: FC<RecorderProps> = ({
  userId,
  typeOfShot,
  angleOfShot,
  navigation,
}) => {
  const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const [recordingSecs, setRecordingSecs] = useState(0);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [didUploadVideo, setDidUploadVideo] = useState(false);
  const MAX_RECORDING_TIME_SEC = 8;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      const audioRecordingStatus = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      const cameraRollStatus = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      setHasPermission(
        status === MediaLibrary.PermissionStatus.GRANTED &&
          audioRecordingStatus.granted &&
          cameraRollStatus.granted
      );
    })();
  }, []);

  // Keep track of current recording time
  useEffect(() => {
    if (recordingSecs === MAX_RECORDING_TIME_SEC) {
      console.log("TIMES UP BRAH");
      handleRecordingPress();
    }
  }, [recordingSecs]);

  useEffect(() => {
    if (!videoUri || !isFocused) return;
    displayInitialSuccessAlertMessage(videoUri);
  }, [videoUri, isFocused]);

  useEffect(() => {
    if (!didUploadVideo) return;

    displayUploadSuccessAlertMessage();
  }, [didUploadVideo]);

  useInterval(() => {
    if (recording) {
      setRecordingSecs((currentVal) => currentVal + 1);
    } else {
      // Reset time :p
      setRecordingSecs(0);
    }
  }, 1000);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleRecordingPress = async () => {
    if (!cameraRef) {
      alert(
        `An error occurred when setting up camera sooo you cant take a video...`
      );
      return;
    }

    if (!!recording) {
      setRecording(false);
      cameraRef.stopRecording();
      return;
    }
    setRecording(true);
    const video = await cameraRef.recordAsync();
    setVideoUri(video.uri);
  };

  const handleUploadVideo = async (uri: string) => {
    if (Platform.OS === "android") {
      await handleRecordingAndroid(uri);
    } else {
      await handleRecordingIOS(uri);
    }
  };

  const handleRecordingAndroid = async (uri: string) => {
    try {
      const result = await MediaLibrary.createAssetAsync(uri);

      const resultAdditionalInfo = await MediaLibrary.getAssetInfoAsync(result);
      if (!resultAdditionalInfo.localUri) {
        throw new Error("Missing localURI");
      }
      await handleSubmitVideo(resultAdditionalInfo.localUri);
      setDidUploadVideo(true);
    } catch (err) {
      console.log("An error occurred in recording", err);
      alert("An error occurred when submitting video, try again!");
    }
  };

  const handleRecordingIOS = async (uri: string) => {
    try {
      await handleSubmitVideo(uri);
      setDidUploadVideo(true);
    } catch (err) {
      console.log("An error occurred in recording", err);
      alert("An error occurred when submitting video, try again!");
    }
  };

  const handleViewRecording = (uri: string) => {
    navigation.navigate("VideoPlayer", {
      uri,
    });
  };

  const displayInitialSuccessAlertMessage = (uri: string) => {
    Alert.alert("Recording Complete!", "", [
      {
        text: "Upload video",
        onPress: () => handleUploadVideo(uri),
      },
      {
        text: "View recording",
        onPress: () => handleViewRecording(uri),
      },
      {
        text: "Record another video",
        onPress: () => setVideoUri(null),
        style: "cancel",
      },
    ]);
  };

  const displayUploadSuccessAlertMessage = () => {
    Alert.alert(
      "Recording Complete!",
      "You recording has been uploaded and is currently processing. Check soon for your results",
      [
        {
          text: "Go to Home page",
          onPress: () => navigation.navigate("Home"),
        },
        {
          text: "Record another video",
          onPress: () => {
            setDidUploadVideo(false);
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
      ]
    );
  };

  const handleReverseCameraPress = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleSubmitVideo = async (uri: string) => {
    try {
      const result: IVideo = await createVideoEntry(
        userId,
        typeOfShot,
        angleOfShot
      );
      await streamVideo(result.id, uri);
    } catch (err) {
      console.warn("An error occurred when submitting video", err);
    }
  };

  return (
    <Camera
      style={styles.camera}
      type={type}
      ref={(ref) => {
        setCameraRef(ref);
      }}
    >
      <View style={styles.topLockup}>
        <TouchableOpacity
          style={styles.reverseCameraButton}
          onPress={handleReverseCameraPress}
        >
          <Ionicons
            name={
              Platform.OS === "ios" ? "ios-reverse-camera" : "md-reverse-camera"
            }
            size={40}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.countdownText}>
          {recording ? MAX_RECORDING_TIME_SEC - recordingSecs : ""}
        </Text>
      </View>
      <View style={styles.bottomLockup}>
        <View style={styles.optionsLockup}>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={handleRecordingPress}
          >
            <View style={styles.recordVideoOuterCircle}>
              <View
                style={
                  recording
                    ? styles.recordVideoInnerSquare
                    : styles.recordVideoInnerCircle
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
};

export default Recorder;
