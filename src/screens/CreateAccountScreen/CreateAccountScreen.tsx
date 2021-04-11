import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { createAccount } from "../../../utils/firebaseWrapper";
import { validateEmail, validatePassword } from "../../../utils/helpers";
import { PrimaryButton } from "../../components/Button/Button";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { TextStyle } from "../../components/Styled/Styled";
import { createUser } from "../../logic/functions/user";
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

  const handleCreateAccount = async () => {
    const email = userDetails.email.trim();
    const password = userDetails.password.trim();
    try {
      validateEmail(email);
      validatePassword(password);

      const firebaseUser = await createAccount(email, password);

      // TODO: Ideally we want users to be verified first, then we want them to go to a screen
      // where they can fill in additional details about themselves in which case we would move
      // this function elsewhere...
      await createUser({
        id: firebaseUser.uid,
        // Using non-null for email as we use an email to create a user in Firebase. Therefore, this must exist!
        email: firebaseUser.email!,
        firstName: "first",
        lastName: "last",
        dateOfBirth: Date.now(),
      });
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
      <PrimaryButton onPress={handleCreateAccount} text="SIGN UP" />
      <Text>{errorMessage}</Text>
      <TextStyle
        color={lightTheme.SECONDARY_TEXT_COLOR}
        fontWeight="bold"
        onPress={() => navigation.goBack()}
      >
        Already have an account? Go back
      </TextStyle>
    </View>
  );
};

export default CreateAccountScreen;
