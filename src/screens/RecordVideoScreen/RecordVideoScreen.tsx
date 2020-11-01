import React, { FC, useEffect } from "react";
import styles from "./RecordVideoScreenStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { PermissionsAndroid, View } from "react-native";
import Recorder from "../../components/Recorder/Recorder";
import { RouteProp } from "@react-navigation/native";
type SelectAngleScreenRouteProp = RouteProp<RootStackParamList, "RecordVideo">;

type RecordVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecordVideo"
>;

type RecordVideoScreenProps = {
  navigation: RecordVideoScreenNavigationProp;
  route: SelectAngleScreenRouteProp;
};

const RecordVideoScreen: FC<RecordVideoScreenProps> = ({
  navigation,
  route,
}) => {
  const { typeOfShot, angleOfShot } = route.params;
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
