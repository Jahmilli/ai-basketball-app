import React, { useState, useEffect, FC } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import styles from "./RecorderStyles";

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
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
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
            onPress={async () => {
              if (!!cameraRef) {
                if (!recording) {
                  setRecording(true);
                  const video = await cameraRef.recordAsync();
                  console.log("video", video);
                  await MediaLibrary.createAssetAsync(video.uri);
                } else {
                  setRecording(false);
                  cameraRef.stopRecording();
                }
              } else {
                alert(
                  `An error occurred when setting up camera sooo you cant take a video...`
                );
              }
            }}
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
