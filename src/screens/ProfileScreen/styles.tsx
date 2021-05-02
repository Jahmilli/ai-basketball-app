import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    width: "100%",
    height: "100%",
  },
});

export const TextLockup = styled.View`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ThemeOptionLockup = styled.View`
  flex: 1;
  justify-content: space-around;
  flex-flow: row;
  flex-wrap: wrap;
  /* align-items: center; */
  height: 50%;
  width: 100%;
`;

export const ThemeOption = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background-color: ${(props: any) => props.backgroundColor ?? "black"};
`;
export default styles;
