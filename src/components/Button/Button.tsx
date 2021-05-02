import React, { FC, useContext } from "react";
import { AppContext } from "../../context";
import { PrimaryButtonStyle, PrimaryButtonTextStyle } from "../Styled/Styled";

type ButtonProps = {
  text: string;
  onPress: any;
};

export const PrimaryButton: FC<ButtonProps> = ({ text, onPress }) => {
  const { theme } = useContext(AppContext);

  return (
    <PrimaryButtonStyle
      onPress={onPress}
      backgroundColor={theme.PRIMARY_BUTTON_BACKGROUND_COLOR}
      color={theme.PRIMARY_BUTTON_COLOR}
    >
      {/* <Text>{text}</Text> */}
      <PrimaryButtonTextStyle color={theme.PRIMARY_BUTTON_COLOR}>
        {text}
      </PrimaryButtonTextStyle>
    </PrimaryButtonStyle>
  );
};
