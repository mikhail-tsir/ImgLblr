import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
    //justifyContent: "center",
  },
  preview: {
    height: winWidth,
    width: winWidth,
    //position: "absolute",
    left: 0,
    //top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    top: "15%",
    right: 0,
    bottom: 0,
    backgroundColor: "dodgerblue",
  },
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backbutton: {
    position: "absolute",
    height: 100,
    top: 0,
    right: 0,
    alignSelf: "flex-end",
    paddingRight: 20,
    paddingTop: 20,
  },
  bottomToolbar: {
    width: winWidth,
    position: "absolute",
    height: 100,
    bottom: 0,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: "red",
    borderColor: "transparent",
  },
  galleryContainer: {
    bottom: 100,
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5,
  },
  galleryImage: {
    width: 75,
    height: 75,
  },
});

export const labelScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#171717",
  },
  image: {
    width: winWidth,
    height: winWidth,
  },
});
