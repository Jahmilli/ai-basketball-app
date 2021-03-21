import React, { FC, useState } from "react";
import styles from "./styles";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { Button, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { validateEmail, validatePassword } from "../../../utils/helpers";
import { createAccount } from "../../../utils/firebaseWrapper";
import { createUser } from "../../logic/functions/user";

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

      if (!firebaseUser) {
        throw new Error("Unable to create user...");
      }

      firebaseUser.sendEmailVerification();

      // Using non-null for email as we should always have email here...
      await createUser({
        id: firebaseUser.uid,
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
      <Button title="Create Account" onPress={handleCreateAccount} />
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default CreateAccountScreen;
