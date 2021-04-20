import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  list: {
    width: "100%",
  },
  listItem: {
    height: 150,
    width: "100%",
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  listItemBody: {
    height: "100%",
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  listItemTextLockup: {
    height: "100%",
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
  },
  listItemIconLockup: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemIcon: {
    height: 20,
    width: 20,
  },
});

export const ListItem = styled.TouchableOpacity`
  height: 150px;
  width: 100%;
  margin-top: 10px;
  background-color: ${(props: any) =>
    props.isSelected ? props.borderColor : "transparent"};
  border: ${(props: any) => `2px solid ${props.borderColor ?? "black"}`};
  border-radius: 10px;
`;

export const ListItemBody = styled.View`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
`;

export const ListItemTextLockup = styled.View`
  height: 100%;
  flex: 1;
  padding: 10px;
`;

export default styles;
