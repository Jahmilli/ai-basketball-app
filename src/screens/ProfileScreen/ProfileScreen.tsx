import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { signout } from "../../../utils/firebaseWrapper";
import { UserContext } from "../../context";
import { IUser } from "../../interfaces/IUser";
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
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const isFocused = useIsFocused(); // Keeps track of whether we've navigated away from the screen
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return navigation.navigate("Login");
    }
    if (isLoading) {
      return;
    }

    const callGetUser = async () => {
      try {
        setIsLoading(true);
        const result = await getUser(user.uid);
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
        <View style={styles.noUploadsLockup}>
          <Text style={styles.getStartedText}>Loading...</Text>
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
          <Text style={styles.getStartedText}>Email: {userDetails.email}</Text>
          <Text style={styles.getStartedText}>
            First Name: {userDetails.firstName}
          </Text>
          <Text style={styles.getStartedText}>
            Last Name: {userDetails.lastName}
          </Text>
          <Text style={styles.getStartedText}>
            Date of Birth:{" "}
            {new Date(userDetails.dateOfBirth).toLocaleDateString()}
          </Text>
          <Text style={styles.getStartedText}>
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
