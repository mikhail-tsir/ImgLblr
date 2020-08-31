import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  preview: {
    height: winWidth,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: StatusBar.currentHeight,
    right: 0,
    bottom: 0,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
