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
  _isMounted = false;
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

    saveToQueue(photoData.uri)
      .then((path) =>
        this.setState({
          capturing: false,
          captures: [path, ...this.state.captures],
        })
      )
      .catch((err) => alert(err));

      if (this.props.route.params) {
        this.props.route.params = undefined;
      }
  };

  async componentDidMount() {
    this._isMounted = true;

    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === "granted";
    this.setState({ hasCameraPermission });

    const queueImgs = await FileSystem.readDirectoryAsync(queueLocation);
    // console.log("Currently in queue: " + queueImgs);
    this.setState({ captures: queueImgs.map((name) => queueLocation + name) });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
    } = this.state;
    
    // if captures need to be updated (img deleted), then the new captures is stored in this.props.route.params
    const captures = this.props.route.params ? this.props.route.params.captures : this.state.captures;

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
            ratio="1:1" // only works on android
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
