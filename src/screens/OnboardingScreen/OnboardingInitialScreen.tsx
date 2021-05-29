import React, { FC } from "react";
import { PrimaryButton } from "../../components/Button/Button";
import { TextStyle, TitleStyle } from "../../components/Styled/Styled";
import { OnboardingInitialScreenContainer } from "./styles";

type OnboardingInitialScreenProps = {
  handleNewUser: () => void;
  handlePreviousUser: () => void;
};

export const OnboardingInitialScreen: FC<OnboardingInitialScreenProps> = ({
  handleNewUser,
  handlePreviousUser,
}) => {
  return (
    <OnboardingInitialScreenContainer>
      <TitleStyle>Welcome to AIBasketball</TitleStyle>
      <TextStyle>Taking you from a newbie to the NBA</TextStyle>
      <PrimaryButton text="First time? Click me!" onPress={handleNewUser} />
      {/* <PrimaryButton
        text="I've used this before"
        onPress={handlePreviousUser}
      /> */}
    </OnboardingInitialScreenContainer>
  );
};
