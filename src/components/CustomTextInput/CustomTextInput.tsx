import React, { FC } from "react";
import { KeyboardTypeOptions } from "react-native";
import { lightTheme } from "../../styles/theme.styles";
import { InputLabelTextStyle, InputStyle } from "../Styled/Styled";
import { TextInputContainer } from "./styles";

type CustomTextInputProps = {
  value: string;
  onChangeText: Function;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
};

const CustomTextInput: FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  label,
}) => {
  return (
    <TextInputContainer>
      {label && <InputLabelTextStyle color="gray">{label}</InputLabelTextStyle>}
      <InputStyle
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder={placeholder}
        borderColor={lightTheme.INPUT_BORDER_COLOR}
        backgroundColor={lightTheme.INPUT_BACKGROUND_COLOR}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        // color={lightTheme.INPUT_COLOR}
      />
    </TextInputContainer>
  );
};

export default CustomTextInput;
