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
export default styles;
