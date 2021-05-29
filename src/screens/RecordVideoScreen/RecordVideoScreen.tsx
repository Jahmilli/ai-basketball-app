import React, { FC, useContext } from "react";
import styles from "./RecordVideoScreenStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { View } from "react-native";
import Recorder from "../../components/Recorder/Recorder";
import { RouteProp } from "@react-navigation/native";
import { UserContext } from "../../context";
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
  const user = useContext(UserContext);

  if (!user) {
    navigation.navigate("Login");
    return null;
  }

  return (
    <View style={styles.container}>
      <Recorder
        userId={user.uid}
        typeOfShot={typeOfShot}
        angleOfShot={angleOfShot}
        navigation={navigation}
      />
    </View>
  );
};

export default RecordVideoScreen;
