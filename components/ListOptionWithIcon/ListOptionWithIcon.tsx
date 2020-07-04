import React, { FC } from "react";
import styles from "./ListOptionWithIconStyles";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>{title}</Text>
        <Text>Selected: {selected || "None"}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.icon} source={icon} />
      </TouchableOpacity>
    </View>
  );
};

export default ListOptionWithIcon;
