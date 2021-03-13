import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  topLockup: {
    paddingLeft: 25,
    paddingTop: 25,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countdownText: {
    color: "red",
    fontSize: 24,
    marginRight: 20,
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
    borderColor: "white",
    backgroundColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  recordVideoInnerCircle: {
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "red",
    borderColor: "red",
    height: 20,
    width: 20,
  },
  recordVideoInnerSquare: {
    borderWidth: 2,
    borderRadius: 2,
    backgroundColor: "black",
    borderColor: "black",
    height: 20,
    width: 20,
  },
});

export default styles;
