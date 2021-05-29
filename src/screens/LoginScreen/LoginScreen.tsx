import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { login } from "../../../utils/firebaseWrapper";
import { validateEmail, validatePassword } from "../../../utils/helpers";
import { PrimaryButton } from "../../components/Button/Button";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { TextStyle } from "../../components/Styled/Styled";
import { AppContext } from "../../context";
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
  const { theme, user } = useContext(AppContext);
  const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect", user);
    if (!user.firebaseUserInfo) return;

    // TODO: When we want to start making users have to verify first we can uncomment this...
    // if (!user.emailVerified) {
    //   alert("User is not verified!");
    //   return;
    // }
    console.log("user is ", user);
    if (!!user.userDetails) {
      console.log("home");
      navigation.navigate("Home");
    } else {
      console.log("onboarding");
      navigation.navigate("Onboarding");
    }
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
        keyboardType="email-address"
      />
      <CustomTextInput
        value={userDetails.password}
        onChangeText={handleChangeText("password")}
        placeholder="Password"
        secureTextEntry
      />
      <PrimaryButton onPress={handleLogin} text="LOGIN" />
      <Text>{errorMessage}</Text>
      <View style={styles.textWrapper}>
        <TextStyle
          color={theme.PRIMARY_BUTTON_BACKGROUND_COLOR}
          fontWeight="bold"
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot your password?
        </TextStyle>
      </View>
    </View>
  );
};

export default LoginScreen;
