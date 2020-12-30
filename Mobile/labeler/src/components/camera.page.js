import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";

import styles from "../styles/styles";
import Toolbar from "./toolbar";
import Gallery from "./gallery";
import { queueLocation } from "../config/constants";
import { saveToQueue } from "../util/utils";
import { loadCaptures, addCapture } from "../reducers/captures.js";

class CameraPage extends React.Component {
  camera = null;

  state = {
    //captures: [],
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
    const photoData = await this.camera.takePictureAsync({ quality: 0 });

    saveToQueue(photoData.uri)
      .then((path) => {
        this.setState({
          capturing: false,
        });

        this.props.addCapture(path);
      })
      .catch((err) => alert(err));
  };

  async componentDidMount() {
    // TODO: put all permissions in redux state
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === "granted";
    this.setState({ hasCameraPermission });

    const queueImgs = await FileSystem.readDirectoryAsync(queueLocation);
    this.props.loadCaptures(queueImgs.map((name) => queueLocation + name));
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
    } = this.state;

    // if captures need to be updated (img deleted), then the new captures is stored in this.props.route.params
    // const captures = this.props.route.params
    //   ? this.props.route.params.captures
    //   : this.state.captures;

    const captures = this.props.captures;

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
            <Gallery
              captures={this.props.captures}
              navigation={this.props.navigation}
            />
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

const mapStateToProps = (state) => {
  return {
    captures: state.captures,
    hasCameraPermission: state.permissions.cameraPermission,
  };
};

const mapDispatchToProps = {
  loadCaptures,
  addCapture,
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
