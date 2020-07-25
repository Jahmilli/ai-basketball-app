import React, { useState, useEffect, FC } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import styles from "./RecorderStyles";
import {
  createVideoEntry,
  streamVideo,
} from "../../logic/functions/uploadVideo";
import { IUploadedVideo } from "../../interfaces/IUploadedVideo";

const Recorder: FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === MediaLibrary.PermissionStatus.GRANTED);
    })();
  }, []);

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

    try {
      setRecording(true);
      const video = await cameraRef.recordAsync();
      const result = await MediaLibrary.createAssetAsync(video.uri);

      const resultAdditionalInfo = await MediaLibrary.getAssetInfoAsync(result);
      if (!resultAdditionalInfo.localUri) {
        throw new Error("Missing localURI");
      }
      await handleSubmitVideo(resultAdditionalInfo.localUri);
    } catch (err) {
      console.log("An error occurred in recording", err);
    }
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
      const result: IUploadedVideo = await createVideoEntry();
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
      </View>
      <View style={styles.bottomLockup}>
        <View style={styles.optionsLockup}>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={handleRecordingPress}
          >
            <View style={styles.recordVideoOuterCircle}>
              <View style={styles.recordVideoInnerCircle} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
};

export default Recorder;
