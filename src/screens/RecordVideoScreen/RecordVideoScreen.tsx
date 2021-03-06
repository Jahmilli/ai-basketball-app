import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext } from "react";
import { View } from "react-native";
import Recorder from "../../components/Recorder/Recorder";
import { AppContext } from "../../context";
import { RootStackParamList } from "../../types/types";
import styles from "./RecordVideoScreenStyles";

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
  const { user } = useContext(AppContext);

  if (!user.firebaseUserInfo) {
    navigation.navigate("Login");
    return null;
  }

  return (
    <View style={styles.container}>
      <Recorder
        userId={user.firebaseUserInfo.uid}
        typeOfShot={typeOfShot}
        angleOfShot={angleOfShot}
        navigation={navigation}
      />
    </View>
  );
};

export default RecordVideoScreen;
