import React, { FC } from "react";
import styles from "./CustomTextInputStyles";
import { TextInput } from "react-native-gesture-handler";

type CustomTextInputProps = {
  value: string;
  onChangeText: Function;
  placeholder: string;
};

const CustomTextInput: FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={(text) => onChangeText(text)}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default CustomTextInput;
