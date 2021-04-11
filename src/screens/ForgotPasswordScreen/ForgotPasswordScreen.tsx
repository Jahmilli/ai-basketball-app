import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { sendPasswordResetEmail } from "../../../utils/firebaseWrapper";
import { validateEmail } from "../../../utils/helpers";
import { PrimaryButton } from "../../components/Button/Button";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { RootStackParamList } from "../../types/types";
import styles from "./styles";

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
        keyboardType="email-address"
      />
      <PrimaryButton onPress={handleForgotPassword} text="RESET PASSWORD" />
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default ForgotPasswordScreen;
