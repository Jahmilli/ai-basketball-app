import React, { FC } from "react";
import styles from "./styles";
import { Text, View } from "../../components/Themed";
import { Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type RecordShotSetupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecordShotSetup"
>;
type RecordShotSetupScreenProps = {
  navigation: RecordShotSetupScreenNavigationProp;
};
const RecordShotSetupScreen: FC<RecordShotSetupScreenProps> = ({
  navigation,
}) => {
  const handleNavigate = () => {
    navigation.navigate("RecordShotSetup");
  };
  return (
    <View style={styles.container}>
      <Text>You've reached the home screen, wow!</Text>
      <Button title="Record Shot" onPress={handleNavigate} />
    </View>
  );
};

export default RecordShotSetupScreen;
