import React, { FC } from "react";
import styles from "./RecordVideoScreenStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { View } from "react-native";
import Recorder from "../../components/Recorder/Recorder";

type RecordVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type RecordVideoScreenProps = {
  navigation: RecordVideoScreenNavigationProp;
};

const RecordVideoScreen: FC<RecordVideoScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Recorder />
    </View>
  );
};

export default RecordVideoScreen;
