import React from "react";
import { SafeAreaView, Image, StatusBar } from "react-native";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";

import Toolbar, { BackHeader } from "./labeler_toolbar";
import { queueLocation, server_url } from "../config/constants";
import { getFileName, queueToSavedName } from "../util/utils";
import { uploadImage } from "../util/image_utils";
import { labelScreenStyles as styles } from "../styles/styles";
import { loadCaptures, addCapture, delCapture } from "../reducers/captures";
import { setCurrent } from "../reducers/current_capture";
import { moveToSaved } from "../reducers/saved";
import { getCaptureByIdx } from "../selectors";

class LabelScreen extends React.Component {
  state = { savedPhotos: null, hasCameraRollPermission: null };
  navigation = this.props.navigation;

  handleGoBack = () => this.navigation.navigate("cameraPage");

  handleCancel = async () => {
    const {
      captures,
      current,
      idx,
      loadCaptures,
      delCapture,
      setCurrent,
    } = this.props;

    try {
      await FileSystem.deleteAsync(current);
    } catch (err) {
      alert(err);
      const queueImgs = await FileSystem.readDirectoryAsync(queueLocation);
      loadCaptures(queueImgs.map((name) => queueLocation + name));
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

    //move from queue to saved
    // try {
    //   await FileSystem.copyAsync({
    //     from: current,
    //     to: queueToSavedName(current),
    //   });
    // } catch (error) {
    //   console.log(error);
    //   alert(error);
    //   return;
    // }
    this.props.moveToSaved(current);
    this.handleCancel();
  };

  async componentDidMount() {
    StatusBar.setHidden(true);
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

// TODO: make the names less confusing here
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
  loadCaptures,
  addCapture,
  delCapture,
  moveToSaved,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelScreen);
