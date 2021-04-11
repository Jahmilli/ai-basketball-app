import React, { FC } from "react";
import { KeyboardTypeOptions, View } from "react-native";
import { lightTheme } from "../../styles/theme.styles";
import { InputStyle } from "../Styled/Styled";
import styles from "./styles";

type CustomTextInputProps = {
  value: string;
  onChangeText: Function;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

const CustomTextInput: FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.inputContainer}>
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
    </View>
  );
};

export default CustomTextInput;
