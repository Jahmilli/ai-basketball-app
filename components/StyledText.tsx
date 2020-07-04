import * as React from "react";

import { TextProps } from "./Themed";
import { Text } from "react-native";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}
