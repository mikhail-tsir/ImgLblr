import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import Toolbar, { BackHeader } from "./labeler.toolbar";
import * as FileSystem from "expo-file-system";
import { queueLocation } from "./constants";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

function getFileName(path) {
  let temp = path.split("/");
  return temp[temp.length - 1];
}

function queueToSavedName(queuePath) {
  return savedLocation + getFileName(queuePath);
}

const uploadImage = async (url, fields, imgPath) => {
  const form = new FormData();
  Object.keys(fields).forEach((key) => {
    form.append(key, fields[key]);
  });
  form.append("file", { uri: imgPath, type: "image/jpeg" });

  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    body: form,
  });
};

export default class LabelScreen extends React.Component {
  state = { savedPhotos: null, hasCameraRollPermission: null };
  navigation = this.props.navigation;
  
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      captures: props.route.params.captures,
      idx: props.route.params.index,
      location: props.route.params.captures[props.route.params.index]
    }
  }

  handleGoBack = () => this.navigation.navigate("cameraPage", {captures: this.state.captures});

  handleCancel = async () => {
    const {captures, idx, location} = this.state;
    
    try {
      await FileSystem.deleteAsync(location);
    }
    catch(err) {
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
      this.navigation.navigate("cameraPage", {captures: newCaptures});
      return;
    }
    let newidx = idx >= newCaptures.length ? idx-1 : idx

    // go to labelscreen with next image after current image is deleted
    this.setState({captures: newCaptures, idx: newidx, location: newCaptures[newidx]})
  };

  handleUpload = async () => {
    let response;
    try {
      response = await fetch(
        "http://192.168.0.30:5000/generateurl?name=" +
          getFileName(this.location)
      );
    } catch (err) {
      alert(err);
      return;
    }

    try {
      const data = await response.json();
      const res = await uploadImage(data.url, data.fields, this.location);
      alert("Image uploaded successfully");
    } catch (err) {
      alert(err);
    }
  };

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
    }

    //move from queue to saved
    try {
      await FileSystem.moveAsync({
        from: this.location,
        to: queueToSavedName(this.location),
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
    if (!hasCameraRollPermission) {
      return <Text>Camera Roll permission has been denied</Text>;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="contain"
          source={{ uri: this.state.location }}
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
