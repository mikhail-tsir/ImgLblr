import React from "react";
import { SafeAreaView, Image, StatusBar } from "react-native";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";

import Toolbar, { BackHeader } from "./labeler_toolbar";
import { queueLocation, server_url } from "../config/constants";
import { getFileName, queueToSavedName } from "../util/utils";
import { uploadImage } from "../util/image_utils";
import { labelScreenStyles as styles } from "../styles/styles";
import {
  loadCapturesFromQueue,
  addCapture,
  delCapture,
} from "../reducers/captures";
import { setCurrent } from "../reducers/current_capture";
import { moveToSaved } from "../reducers/saved";
import { getCaptureByIdx } from "../selectors";
import { resizeAndCompress } from "../util/image_utils";

class LabelScreen extends React.Component {
  state = { savedPhotos: null, hasCameraRollPermission: null };
  navigation = this.props.navigation;

  handleGoBack = () => this.navigation.navigate("cameraPage");

  handleCancel = async () => {
    const {
      captures,
      current,
      idx,
      loadCapturesFromQueue,
      delCapture,
      setCurrent,
    } = this.props;

    try {
      await FileSystem.deleteAsync(current);
    } catch (err) {
      alert(err);
      loadCapturesFromQueue();
    }

    if (captures.length == 1) {
      this.navigation.navigate("cameraPage");
    } else {
      let newidx = idx >= captures.length - 1 ? idx - 1 : idx;
      setCurrent(newidx);
    }

    delCapture({ idx: idx });
  };

  handleUpload = async () => {
    let response;

    // generate presigned url
    try {
      console.log("attempting to upload");
      response = await fetch(
        server_url + "generateurl?name=" + getFileName(this.props.current)
      );
    } catch (err) {
      alert(err);
      return;
    }

    try {
      const data = await response.json();
      const res = await uploadImage(data.url, data.fields, this.props.current);
      alert("Image uploaded successfully");
    } catch (err) {
      alert(err);
    }
  };

  handleSave = async () => {
    const { current } = this.props;

    const newUri = await resizeAndCompress(current, 0.5);
    this.props.moveToSaved(newUri);
    this.handleCancel();
  };

  async componentDidMount() {
    //StatusBar.setHidden(true);
  }

  render() {
    const { current } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="contain"
          source={{ uri: current }}
          style={styles.image}
        />
        <Toolbar
          onCancel={this.handleCancel}
          onUpload={this.handleUpload}
          onSave={this.handleSave}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { captures, currentIdx } = state;
  return {
    captures: captures,
    current: getCaptureByIdx(state, currentIdx),
    idx: currentIdx,
  };
};

const mapDispatchToProps = {
  setCurrent,
  loadCapturesFromQueue,
  addCapture,
  delCapture,
  moveToSaved,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelScreen);
