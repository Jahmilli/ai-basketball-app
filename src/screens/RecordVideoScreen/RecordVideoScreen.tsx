import React, { FC, useEffect } from "react";
import styles from "./RecordVideoScreenStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { PermissionsAndroid, View } from "react-native";
import Recorder from "../../components/Recorder/Recorder";
import { RouteProp } from "@react-navigation/native";
import {
  IPermissionRequest,
  requestPermissions,
} from "../../../utils/AndroidPermissions";

type SelectAngleScreenRouteProp = RouteProp<RootStackParamList, "RecordVideo">;

type RecordVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecordVideo"
>;

type RecordVideoScreenProps = {
  navigation: RecordVideoScreenNavigationProp;
  route: SelectAngleScreenRouteProp;
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

const RecordVideoScreen: FC<RecordVideoScreenProps> = ({
  navigation,
  route,
}) => {
  const { typeOfShot, angleOfShot } = route.params;

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
  });
  return (
    <View style={styles.container}>
      <Recorder
        typeOfShot={typeOfShot}
        angleOfShot={angleOfShot}
        navigation={navigation}
      />
    </View>
  );
};

export default RecordVideoScreen;
