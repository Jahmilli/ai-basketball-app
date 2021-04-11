import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useState } from "react";
import { View } from "react-native";
import { UserContext } from "../../context";
import { RootStackParamList } from "../../types/types";
import { OnboardingInitialScreen } from "./OnboardingInitialScreen";
import { OnboardingUserCreation } from "./OnboardingUserCreation";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;
type OnboardingScreenProps = {
  navigation: OnboardingScreenNavigationProp;
};

enum Page {
  INITIAL,
  FIRST_TIME_USER,
  USER_CREATION,
}

const OnboardingScreen: FC<OnboardingScreenProps> = ({ navigation }) => {
  const user = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState<Page>(Page.INITIAL);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  const handleUserCreated = () => {
    navigation.navigate("Home"); // TODO: Navigate to 'Find your Rank' Screen
  };

  const renderContent = () => {
    console.log("user is ", user);
    switch (currentPage) {
      case Page.INITIAL:
        return (
          <OnboardingInitialScreen
            handleNewUser={() => handlePageChange(Page.USER_CREATION)}
            handlePreviousUser={() => handlePageChange(Page.USER_CREATION)}
          />
        );
      case Page.FIRST_TIME_USER:
        return (
          <OnboardingInitialScreen
            handleNewUser={() => handlePageChange(Page.FIRST_TIME_USER)}
            handlePreviousUser={() => handlePageChange(Page.FIRST_TIME_USER)}
          />
        );
      case Page.USER_CREATION:
        return (
          <OnboardingUserCreation
            // Just note that it's not great to use non-null assertion here but im feeling a bit lazy atm... Fix in future
            userId={user.firebaseUserInfo!.uid}
            email={user.firebaseUserInfo!.email!}
            handleUserCreated={handleUserCreated}
            handleBack={() => handlePageChange(Page.INITIAL)}
          />
        );
      default:
        return (
          <OnboardingInitialScreen
            handleNewUser={() => handlePageChange(Page.FIRST_TIME_USER)}
            handlePreviousUser={() => handlePageChange(Page.FIRST_TIME_USER)}
          />
        );
    }
  };

  return <View style={{ flex: 1, width: "100%" }}>{renderContent()}</View>;
};

export default OnboardingScreen;
