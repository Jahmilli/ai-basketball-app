import { StyleSheet } from "react-native";

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
    height: 200,
    width: "100%",
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
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

export default styles;
