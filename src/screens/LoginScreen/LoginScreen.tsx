import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./LoginScreenStyles";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { Button, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { UserContext } from "../../context";
import { login } from "../../../utils/firebaseWrapper";
import { validateEmail, validatePassword } from "../../../utils/helpers";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const user = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    navigation.navigate("Home");
  }, [user]);

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
