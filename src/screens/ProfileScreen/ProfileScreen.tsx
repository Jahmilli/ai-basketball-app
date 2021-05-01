import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { signout } from "../../../utils/firebaseWrapper";
import { PrimaryButton } from "../../components/Button/Button";
import { TextStyle } from "../../components/Styled/Styled";
import { UserContext } from "../../context";
import { IUserDetails } from "../../interfaces/IUser";
import { getUser } from "../../logic/functions/user";
import { RootStackParamList } from "../../types/types";
import styles, { TextLockup } from "./styles";

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
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!mounted) return;

    if (!user.firebaseUserInfo) {
      setMounted(false);
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
        if (!mounted) return;
        setUserDetails(result);
      } catch (err) {
        console.log("An error occurred when getting user", err);
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    };
    callGetUser();
  }, [isFocused, user, mounted]);

  const handleSignout = async () => {
    try {
      await signout();
    } catch (err) {
      console.warn("An error occurred when signing out", err);
    }
  };

  // if (!isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <TextStyle fontSize="L">Loading...</TextStyle>
  //       {/* <Button title="Signout" onPress={handleSignout} /> */}
  //       <PrimaryButton text="SIGNOUT" onPress={handleSignout} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {userDetails !== null ? (
        <TextLockup>
          <TextStyle>Email: {userDetails.email}</TextStyle>
          <TextStyle>First Name: {userDetails.firstName}</TextStyle>
          <TextStyle>Last Name: {userDetails.lastName}</TextStyle>
          <TextStyle>
            Date of Birth:{" "}
            {new Date(userDetails.dateOfBirth).toLocaleDateString()}
          </TextStyle>
          <TextStyle>
            Account Creation Date:{" "}
            {new Date(userDetails.createdTimestamp).toLocaleDateString()}
          </TextStyle>
        </TextLockup>
      ) : (
        <View
          style={{
            flexGrow: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      <PrimaryButton text="SIGNOUT" onPress={handleSignout} />
    </View>
  );
};

export default ProfileScreen;
