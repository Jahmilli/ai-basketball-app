import React, { FC, useState } from "react";
import styles from "./LoginScreenStyles";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { Button, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const handleChangeText = (key: string) => (text: string) => {
    setUserDetails((currentDetails) => ({
      ...currentDetails,
      [key]: text,
    }));
  };

  const handleLogin = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={userDetails.username}
        onChangeText={handleChangeText("username")}
        placeholder="Username"
      />
      <CustomTextInput
        value={userDetails.password}
        onChangeText={handleChangeText("password")}
        placeholder="Password"
      />
      <Button title="LOG IN" onPress={handleLogin} />
      <View style={styles.textWrapper}>
        <Text style={styles.subText}>Forgot your password?</Text>
        <Text style={styles.subText}>Reset</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.subText}>Don't have an account?</Text>
        <Text style={styles.subText}>Register</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
