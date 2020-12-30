import React from "react";
import { Text, SafeAreaView, Image, StatusBar } from "react-native";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";

import Toolbar, { BackHeader } from "./labeler.toolbar";
import { queueLocation, server_url } from "../config/constants";
import { getFileName, queueToSavedName } from "../util/utils";
import { uploadImage } from "../util/image_utils";
import { labelScreenStyles as styles } from "../styles/styles";
import { loadCaptures, addCapture } from "../reducers/captures";
import { setCurrent } from "../reducers/current_capture";

class LabelScreen extends React.Component {
  state = { savedPhotos: null, hasCameraRollPermission: null };
  navigation = this.props.navigation;

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      captures: props.route.params.captures,
      idx: props.route.params.index,
      location: props.route.params.captures[props.route.params.index],
    };
  }

  handleGoBack = () =>
    this.navigation.navigate("cameraPage", { captures: this.state.captures });

  handleCancel = async () => {
    const { captures, idx, location } = this.state;

    try {
      await FileSystem.deleteAsync(location);
    } catch (err) {
      alert(err);
      const queueImgs = await FileSystem.readDirectoryAsync(queueLocation);
      this.setState({
        captures: queueImgs.map((name) => queueLocation + name),
      });
    }

    let newCaptures = captures;
    newCaptures.splice(idx, 1);

    // if this was the last image
    if (newCaptures.length == 0) {
      this.navigation.navigate("cameraPage", { captures: newCaptures });
      return;
    }
    let newidx = idx >= newCaptures.length ? idx - 1 : idx;

    // go to labelscreen with next image after current image is deleted
    this.setState({
      captures: newCaptures,
      idx: newidx,
      location: newCaptures[newidx],
    });
  };

  handleUpload = async () => {
    let response;

    // generate presigned url
    try {
      console.log("attempting to upload");
      response = await fetch(
        server_url + "generateurl?name=" + getFileName(this.state.location)
      );
    } catch (err) {
      alert(err);
      return;
    }

    try {
      const data = await response.json();
      const res = await uploadImage(data.url, data.fields, this.state.location);
      alert("Image uploaded successfully");
    } catch (err) {
      alert(err);
    }
  };

  handleSave = async () => {
    let { hasCameraRollPermission, location } = this.state;
    if (!hasCameraRollPermission) {
      alert(
        "Permission Denied",
        "Camera Roll permission has been denied. Please allow access to camera roll."
      );
      const camroll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      let perm = camroll.status === "granted";
      this.setState({ hasCameraRollPermission: perm });
    }

    //move from queue to saved
    try {
      await FileSystem.copyAsync({
        from: location,
        to: queueToSavedName(location),
      });
    } catch (err) {
      console.log(error);
      alert(error);
      return;
    }
    this.handleCancel();
  };

  async componentDidMount() {
    StatusBar.setHidden(true);
    const camroll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let hasCameraRollPermission = camroll.status === "granted";
    this.setState({ hasCameraRollPermission });
  }

  render() {
    const { hasCameraRollPermission, location } = this.state;
    if (!hasCameraRollPermission) {
      return <Text>Camera Roll permission has been denied</Text>;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="contain"
          source={{ uri: location }}
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

const mapStateToProps = ({ captures, current }) => {
  return {
    captures: captures,
    current: current,
  };
};

const mapDispatchToProps = {
  setCurrent,
  loadCaptures,
  addCapture,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelScreen);
