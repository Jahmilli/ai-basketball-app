import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { login } from "../../../utils/firebaseWrapper";
import { validateEmail, validatePassword } from "../../../utils/helpers";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { UserContext } from "../../context";
import { RootStackParamList } from "../../types/types";
import styles from "./LoginScreenStyles";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const user = useContext(UserContext);
  const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("In login screen with user", user);
    if (!user) return;
    navigation.navigate("Home");
    // TODO: We should not really need isFocusedHere as its just so we can login back to Homescreen if user navigates away by pressing back..
    // If user presses back, they should be alerted if they want to sign out and if they click yes then sign them out.
  }, [user, isFocused]);

  const handleChangeText = (key: string) => (text: string) => {
    setUserDetails((currentDetails) => ({
      ...currentDetails,
      [key]: text,
    }));
  };

  const handleLogin = async (): Promise<void> => {
    const email = userDetails.email.trim();
    const password = userDetails.password.trim();
    try {
      validateEmail(email);
      validatePassword(password);
      await login(email, password);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={userDetails.email}
        onChangeText={handleChangeText("email")}
        placeholder="Email"
      />
      <CustomTextInput
        value={userDetails.password}
        onChangeText={handleChangeText("password")}
        placeholder="Password"
      />
      <Button title="LOG IN" onPress={handleLogin} />
      <Text>{errorMessage}</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.subText}>Forgot your password?</Text>
        <Text
          style={styles.subText}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Reset
        </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.subText}>Don't have an account?</Text>
        <Text
          style={styles.subText}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          Register
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
