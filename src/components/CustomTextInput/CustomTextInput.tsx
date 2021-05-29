import React, { FC, useContext } from "react";
import { KeyboardTypeOptions } from "react-native";
import { AppContext } from "../../context";
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
  const { theme } = useContext(AppContext);
  return (
    <TextInputContainer>
      {label && <InputLabelTextStyle color="gray">{label}</InputLabelTextStyle>}
      <InputStyle
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder={placeholder}
        borderColor={theme.INPUT_BORDER_COLOR}
        backgroundColor={theme.INPUT_BACKGROUND_COLOR}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </TextInputContainer>
  );
};

export default CustomTextInput;
