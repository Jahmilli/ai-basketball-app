import React, { FC, useState } from "react";
import styles from "./styles";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { Button, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { validateEmail } from "../../../utils/helpers";
import {
  sendPasswordResetEmail,
} from "../../../utils/firebaseWrapper";

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;

type ForgotPasswordScreenProps = {
  navigation: ForgotPasswordScreenNavigationProp;
};

const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeText = (text: string) => {
    setEmail(text);
  };

  const handleForgotPassword = async () => {
    try {
      validateEmail(email);
      await sendPasswordResetEmail(email);
      navigation.goBack();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={email}
        onChangeText={handleChangeText}
        placeholder="Email"
      />
      <Button title="Reset Password" onPress={handleForgotPassword} />
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default ForgotPasswordScreen;
