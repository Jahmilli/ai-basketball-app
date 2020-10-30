import { Alert, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // padding: 20,
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
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textValue: {
    fontSize: 16,
  },
});

export default styles;
