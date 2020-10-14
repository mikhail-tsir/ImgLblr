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
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import Toolbar, { BackHeader } from "./labeler.toolbar";
import * as FileSystem from "expo-file-system";
import { queueLocation } from "./constants";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default class LabelScreen extends React.Component {
  state = { savedPhotos: null, hasCameraRollPermission: null };
  navigation = this.props.navigation;
  handleGoBack = this.navigation.goBack;

  //handleCancel = () => console.log("Not actually cancelling... yet");
  handleCancel = async () => {
    let location = this.props.route.params.location;
    await FileSystem.deleteAsync(location);
    const queueImgs = await FileSystem.readDirectoryAsync(queueLocation);

    if (queueImgs.length == 0) {
      this.navigation.navigate("cameraPage");
      return;
    }

    this.navigation.navigate("LabelScreen", {
      location: queueLocation + queueImgs[0],
    });
  };

  handleUpload = () => console.log("Not actually uploading... yet");
  handleSave = async () => {
    let { hasCameraRollPermission } = this.state;
    if (!hasCameraRollPermission) {
      alert(
        "Permission Denied",
        "Camera Roll permission has been denied. Please allow access to camera roll."
      );
      const camroll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      let perm = camroll.status === "granted";
      this.setState({ hasCameraRollPermission: perm });
    } else {
      console.log("Not saving... yet");
    }
  };

  async componentDidMount() {
    StatusBar.setHidden(true);
    const camroll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let hasCameraRollPermission = camroll.status === "granted";
    this.setState({ hasCameraRollPermission });
  }

  // async getPhotosAsync() {
  //   let photos = await MediaLibrary.getAssetsAsync({ first: 2 });
  //   this.setState({ savedPhotos: photos.assets });
  // }

  render() {
    const { hasCameraRollPermission } = this.state;
    if (!hasCameraRollPermission) {
      return <Text>Camera Roll permission has been denied</Text>;
    }

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
    width: winWidth,
    height: winWidth,
  },
});
