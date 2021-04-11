import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { signout } from "../../../utils/firebaseWrapper";
import { UserContext } from "../../context";
import { IUserDetails } from "../../interfaces/IUser";
import { getUser } from "../../logic/functions/user";
import { RootStackParamList } from "../../types/types";
import styles from "./styles";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;
type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};
const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const user = useContext(UserContext);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user.firebaseUserInfo) {
      return navigation.navigate("Login");
    }
    if (isLoading) {
      return;
    }

    const callGetUser = async () => {
      if (!user.firebaseUserInfo) return;

      try {
        setIsLoading(true);
        const result = await getUser(user.firebaseUserInfo?.uid);
        console.log("result is ", result);
        setUserDetails(result);
      } catch (err) {
        console.log("An error occurred when getting user", err);
      } finally {
        setIsLoading(false);
      }
    };
    callGetUser();
  }, [isFocused, user]);

  const handleSignout = async () => {
    try {
      await signout();
    } catch (err) {
      console.warn("An error occurred when signing out", err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View>
          <Text>Loading...</Text>
          <Button title="Signout" onPress={handleSignout} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Signout" onPress={handleSignout} />
      {userDetails !== null ? (
        <>
          <Text>Email: {userDetails.email}</Text>
          <Text>First Name: {userDetails.firstName}</Text>
          <Text>Last Name: {userDetails.lastName}</Text>
          <Text>
            Date of Birth:{" "}
            {new Date(userDetails.dateOfBirth).toLocaleDateString()}
          </Text>
          <Text>
            Account Creation Date:{" "}
            {new Date(userDetails.createdTimestamp).toLocaleDateString()}
          </Text>
        </>
      ) : (
        <Text>An error occurred when getting user</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
