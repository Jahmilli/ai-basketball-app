import React, { FC } from "react";
import styles from "./HomeScreenStyles";
import { Button, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
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

export default HomeScreen;
