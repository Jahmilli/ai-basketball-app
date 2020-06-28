import React, { FC, useEffect } from "react";
import styles from "./RecordVideoScreenStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { Button, Text, View, PermissionsAndroid } from "react-native";
import {
  requestPermissions,
  IPermissionRequest,
} from "../../utils/AndroidPermissions";

type RecordVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
type RecordVideoScreenProps = {
  navigation: RecordVideoScreenNavigationProp;
};

const recordingPermissions: IPermissionRequest[] = [
  {
    title: "Record Audio Permission",
    message: " Please give access",
    permission: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  },
  {
    title: "Record Read External Storage Permission",
    message: " Please give access",
    permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  },
  {
    title: "Record Write External Storage Permission",
    message: " Please give access",
    permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  },
];

const RecordVideoScreen: FC<RecordVideoScreenProps> = ({ navigation }) => {
  // Potentially need to keep track of camera permissions in state
  useEffect(() => {
    const callCheckPermissions = async () => {
      // If not already granted, ask the user to give us access
      const didGetPermissions = await requestPermissions(recordingPermissions);
      // Since user did not give us access, lets go back to previous screen
      if (!didGetPermissions) {
        alert("Did not allow access so will navigate back...");
        navigation.goBack();
      }
    };
    callCheckPermissions();
  }, []);

  const handleNavigate = () => {
    navigation.navigate("RecordVideo");
  };
  return (
    <View style={styles.container}>
      <Text>You've reached the record video screen, so cool!</Text>
      <Button title="Record Shot" onPress={handleNavigate} />
    </View>
  );
};

export default RecordVideoScreen;
