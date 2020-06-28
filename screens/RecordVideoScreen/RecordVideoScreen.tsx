import React, { FC } from "react";
import styles from "./RecordVideoScreenStyles";
import { Button, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type RecordVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
type RecordVideoScreenProps = {
  navigation: RecordVideoScreenNavigationProp;
};
const RecordVideoScreen: FC<RecordVideoScreenProps> = ({ navigation }) => {
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
