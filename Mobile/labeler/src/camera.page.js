import React from "react";
import { View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import styles from "./styles";

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    hasCameraPermission: null,
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 25 : 0,
          flex: 1,
        }}
      >
        <Camera
          style={styles.preview}
          ref={(camera) => (this.camera = camera)}
          ratio="1:1"
        />
      </SafeAreaView>
    );
  }
}
