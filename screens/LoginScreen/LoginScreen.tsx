import React, { FC, useState } from "react";
import styles from "./styles";
import { Text, View } from "../../components/Themed";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
type LoginScreenProps = {
  navigation: ProfileScreenNavigationProp;
};
const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const handleChangeText = (key: string) => (text: string) => {
    setUserDetails({
      ...userDetails,
      [key]: text,
    });
  };

  const handleLogin = () => {
    try {
      // navigation.navigate("HomeScreen");
      navigation.navigate("Home");
    } catch (err) {
      alert(`An err occurred ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Rest Time (Seconds)</Text>
      <CustomTextInput
        value={userDetails.username}
        onChangeText={handleChangeText("username")}
        placeholder="Input your username"
      />
      <CustomTextInput
        value={userDetails.password}
        onChangeText={handleChangeText("password")}
        placeholder="Input your password"
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

// // @ts-ignore
// LoginScreen.navigationOptions = {
//   title: "LoginScreen",
// } as NavigationStackOptions;

export default LoginScreen;
