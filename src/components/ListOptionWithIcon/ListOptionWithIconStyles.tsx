import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
  body: {},
  title: {
    fontWeight: "bold",
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
  padding: 15px;
  border-radius: 10px;
  border: ${(props: any) => `2px solid ${props.borderColor ?? "black"}`};
`;

export const Key = styled.Text`
  font-size: 14px;
  color: black;
`;

export const Value = styled.Text`
  font-size: 24px;
  color: black;
`;

export default styles;
