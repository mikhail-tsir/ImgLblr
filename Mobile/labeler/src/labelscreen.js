import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";

//import styles from "./styles";
import Toolbar, { BackHeader } from "./labeler.toolbar";
import Config from "./config/config";

const buttonSize = Config.BUTTON_SIZE;
const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default class LabelScreen extends React.Component {
  handleGoBack = () => console.log("Not actually going back... yet");
  handleCancel = () => console.log("Not actually cancelling... yet");
  handleUpload = () => console.log("Not actually uploading... yet");
  handleSave = () => console.log("Not actually saving... yet");

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    const { navigation, route } = this.props;
    const location = route.params.location;

    return (
      <SafeAreaView style={styles.container}>
        <BackHeader onPress={this.handleGoBack} />
        <Image
          resizeMode="contain"
          source={{ uri: location }}
          style={[styles.image, { top: buttonSize + StatusBar.currentHeight }]}
        />
        <Toolbar
          onBack={this.handleGoBack}
          onUpload={this.handleUpload}
          onSave={this.handleSave}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    //top: 50,
    width: winWidth,
    height: winWidth,
  },
});
