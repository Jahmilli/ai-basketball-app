import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  topLockup: {
    paddingLeft: 25,
    paddingTop: 25,
  },
  bottomLockup: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  optionsLockup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  reverseCameraButton: {
    alignSelf: "flex-start",
  },
  recordVideoOuterCircle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "red",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  recordVideoInnerCircle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "red",
    height: 40,
    width: 40,
    backgroundColor: "red",
  },
});

export default styles;
