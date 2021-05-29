import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  description: {
    fontSize: 20,
  },
  bodyLockup: {},
  textLockup: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    flexWrap: "wrap",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textValue: {
    fontSize: 16,
    flexWrap: "wrap",
  },
});

export const ButtonLockup = styled.View`
  width: 100%;
  flex-grow: 1;
  align-self: flex-end;
  justify-content: flex-end;
`;

export default styles;
