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
import { loadCaptures, addCapture, delCapture } from "../reducers/captures";
import { setCurrent } from "../reducers/current_capture";
import { getCaptureByIdx } from "../selectors";

class LabelScreen extends React.Component {
  state = { savedPhotos: null, hasCameraRollPermission: null };
  navigation = this.props.navigation;

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ...this.state,
  //     captures: props.route.params.captures,
  //     idx: props.route.params.index,
  //     location: props.route.params.captures[props.route.params.index],
  //   };
  // }

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

    delCapture(current);

    // if this was the last image
    if (captures.length == 0) {
      this.navigation.navigate("cameraPage");
      return;
    }

    let newidx = idx >= newCaptures.length ? idx - 1 : idx;
    setCurrent(newidx);
    // go to labelscreen with next image after current image is deleted
    // this.setState({
    //   captures: newCaptures,
    //   idx: newidx,
    //   location: newCaptures[newidx],
    // });
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
    const { hasCameraRollPermission } = this.state;
    const { current } = this.props;

    if (!hasCameraRollPermission) {
      return <Text>Camera Roll permission has been denied</Text>;
    }

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
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelScreen);
