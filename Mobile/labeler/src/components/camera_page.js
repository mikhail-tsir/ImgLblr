import React from "react";
import { Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { Camera } from "expo-camera";

import styles from "../styles/styles";
import Toolbar from "./toolbar";
import Gallery from "./gallery";
import { BackHeader } from "./labeler_toolbar";
import {
  loadCapturesFromQueue,
  saveCaptureToQueue,
} from "../reducers/captures.js";
import { cameraPermissionAction } from "../reducers/permissions";

class CameraPage extends React.Component {
  camera = null;

  state = {
    // setting flash to be turned off by default
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    // start the back camera by default
    cameraType: Camera.Constants.Type.back,
  };

  setFlashMode = (flashMode) => this.setState({ flashMode });
  setCameraType = (cameraType) => this.setState({ cameraType });

  handleShortCapture = async () => {
    this.setState({ capturing: true });
    this.camera
      .takePictureAsync({ quality: 0 })
      .then((photoData) => {
        this.setState({
          capturing: false,
        });
        this.props.saveCaptureToQueue(photoData.uri);
      })
      .catch((err) => alert(err));
  };

  showSaved = () => {
    this.props.navigation.navigate("savedScreen");
  };

  async componentDidMount() {
    this.props.cameraPermissionAction();
    this.props.loadCapturesFromQueue();
  }

  render() {
    const { flashMode, cameraType, capturing } = this.state;

    const { hasCameraPermission, captures } = this.props;

    if (hasCameraPermission === false) {
      return <Text>Access to camera has not been granted.</Text>;
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
          <BackHeader onBack={this.showSaved} />
          <Toolbar
            capturing={capturing}
            flashMode={flashMode}
            cameraType={cameraType}
            setFlashMode={this.setFlashMode}
            setCameraType={this.setCameraType}
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
  loadCapturesFromQueue,
  cameraPermissionAction,
  saveCaptureToQueue,
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
