import React, { FC } from "react";
import { Image, View } from "react-native";
import { lightTheme } from "../../styles/theme.styles";
import styles, { Container, Key, Value } from "./ListOptionWithIconStyles";

type ListOptionWithIconProps = {
  title: string;
  selected: string;
  onPress: any;
  icon: any; // TODO: Update
};
const ListOptionWithIcon: FC<ListOptionWithIconProps> = ({
  title,
  selected,
  onPress,
  icon,
}) => {
  return (
    <Container
      borderColor={lightTheme.PRIMARY_BUTTON_BACKGROUND_COLOR}
      onPress={onPress}
    >
      <View style={styles.body}>
        <Key style={styles.title}>{title}</Key>
        <Value>{selected || "None"}</Value>
      </View>
      <Image style={styles.icon} source={icon} />
    </Container>
  );
};

export default ListOptionWithIcon;
