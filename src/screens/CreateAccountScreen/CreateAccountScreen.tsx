import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { createAccount } from "../../../utils/firebaseWrapper";
import { validateEmail, validatePassword } from "../../../utils/helpers";
import { PrimaryButton } from "../../components/Button/Button";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { TextStyle } from "../../components/Styled/Styled";
import { lightTheme } from "../../styles/theme.styles";
import { RootStackParamList } from "../../types/types";
import styles from "./styles";

type CreateAccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateAccount"
>;

type CreateAccountScreenProps = {
  navigation: CreateAccountScreenNavigationProp;
};

const CreateAccountScreen: FC<CreateAccountScreenProps> = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleChangeText = (key: string) => (text: string) => {
    setUserDetails((currentDetails) => ({
      ...currentDetails,
      [key]: text,
    }));
  };

  const handleCreateFirebaseAccount = async () => {
    const email = userDetails.email.trim();
    const password = userDetails.password.trim();
    try {
      validateEmail(email);
      validatePassword(password);
      await createAccount(email, password);
    } catch (err) {
      setErrorMessage("Could not create user");
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
      <PrimaryButton onPress={handleCreateFirebaseAccount} text="SIGN UP" />
      <Text>{errorMessage}</Text>
      <TextStyle
        color={lightTheme.PRIMARY_BUTTON_BACKGROUND_COLOR}
        fontWeight="bold"
        onPress={() => navigation.goBack()}
      >
        Already have an account? Go back
      </TextStyle>
    </View>
  );
};

export default CreateAccountScreen;
