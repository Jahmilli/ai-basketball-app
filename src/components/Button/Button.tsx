import React, { FC } from "react";
import { lightTheme } from "../../styles/theme.styles";
import { PrimaryButtonStyle, PrimaryButtonTextStyle } from "../Styled/Styled";

type ButtonProps = {
  text: string;
  onPress: any;
};

export const PrimaryButton: FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <PrimaryButtonStyle
      onPress={onPress}
      backgroundColor={lightTheme.PRIMARY_BUTTON_BACKGROUND_COLOR}
      color={lightTheme.PRIMARY_BUTTON_COLOR}
    >
      {/* <Text>{text}</Text> */}
      <PrimaryButtonTextStyle color={lightTheme.PRIMARY_BUTTON_COLOR}>
        {text}
      </PrimaryButtonTextStyle>
    </PrimaryButtonStyle>
  );
};
