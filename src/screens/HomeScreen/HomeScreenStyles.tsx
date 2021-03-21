import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  noUploadsLockup: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  getStartedText: {
    fontSize: 16,
    margin: 0,
    marginBottom: 20,
  },
  uploadVideoLockup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  uploadVideoText: {
    fontSize: 16,
    margin: 0,
  },
  list: {
    width: "100%",
  },
  listItem: {
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
  listItemTitleLockup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  listItemTextLockup: {
    height: "100%",
    flex: 1,
    padding: 10,
  },
  viewFeedbackLockup: {
    margin: 10,
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
