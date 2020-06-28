import React, { FC, useEffect, useState } from "react";
import styles from "./RecordVideoScreenStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { Button, Text, View } from "react-native";
// import { Camera } from "expo";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";

type RecordVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
type RecordVideoScreenProps = {
  navigation: RecordVideoScreenNavigationProp;
};

// const recordingPermissions: IPermissionRequest[] = [
//   {
//     title: "Record Audio Permission",
//     message: " Please give access",
//     permission: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//   },
//   {
//     title: "Record Read External Storage Permission",
//     message: " Please give access",
//     permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//   },
//   {
//     title: "Record Write External Storage Permission",
//     message: " Please give access",
//     permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//   },
// ];

const RecordVideoScreen: FC<RecordVideoScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default RecordVideoScreen;
