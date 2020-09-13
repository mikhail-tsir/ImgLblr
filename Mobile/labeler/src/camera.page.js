import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";

import styles from "./styles";
import Toolbar from "./toolbar";
import Gallery from "./gallery";
import { queueLocation } from "./constants";
import { saveToQueue } from "./utils";

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    captures: [],
    // setting flash to be turned off by default
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    // start the back camera by default
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
  };

  setFlashMode = (flashMode) => this.setState({ flashMode });
  setCameraType = (cameraType) => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync({ quality: 1 });
    // console.log("Photo has been taken: ");
    // console.log(photoData);

    saveToQueue(photoData.uri)
      .then((path) =>
        this.setState({
          capturing: false,
          captures: [path, ...this.state.captures],
        })
      )
      .catch((err) => console.log("WTF??? " + err));

    // console.log("Queue folder: ");
    // let res = await FileSystem.readDirectoryAsync(
    //   FileSystem.documentDirectory + "labeler/queue"
    // );
    // console.log(res);
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === "granted";
    this.setState({ hasCameraPermission });

    const queueImgs = await FileSystem.readDirectoryAsync(queueLocation);
    console.log("Currently in queue: " + queueImgs);
    this.setState({ captures: queueImgs.map((name) => queueLocation + name) });
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures,
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <SafeAreaView style={styles.previewContainer}>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={async (camera) => (this.camera = camera)}
            ratio="1:1"
          />
          {captures.length > 0 && (
            <Gallery captures={captures} navigation={this.props.navigation} />
          )}
          <Toolbar
            capturing={capturing}
            flashMode={flashMode}
            cameraType={cameraType}
            setFlashMode={this.setFlashMode}
            setCameraType={this.setCameraType}
            onCaptureIn={this.handleCaptureIn}
            onCaptureOut={this.handleCaptureOut}
            onShortCapture={this.handleShortCapture}
          />
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
