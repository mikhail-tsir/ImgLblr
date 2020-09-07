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
  navigation = this.props.navigation;

  handleGoBack = this.navigation.goBack;
  handleCancel = () => console.log("Not actually cancelling... yet");
  handleUpload = () => console.log("Not actually uploading... yet");
  handleSave = () => console.log("Not actually saving... yet");

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    const { navigation, route } = this.props;
    const imgLocation = route.params.location;

    return (
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="contain"
          source={{ uri: imgLocation }}
          style={styles.image}
        />
        <BackHeader onBack={this.handleGoBack} />
        <Toolbar
          onCancel={this.handleCancel}
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
    backgroundColor: "#171717",
  },
  image: {
    //top: 50,
    width: winWidth,
    height: winWidth,
  },
});
