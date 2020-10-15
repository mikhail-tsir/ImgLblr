import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
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

const getBlob = async (fileUri) => {
  const res = await fetch(fileUri);
  const imgBody = await res.blob();
  return imgBody;
};

const uploadImage = async (url, fields, imgPath) => {
  const form = new FormData();
  Object.keys(fields).forEach((key) => {
    form.append(key, fields[key]);
  });
  const imgBody = await getBlob(imgPath);
  form.append("file", imgBody);

  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/xml",
      "Content-Type": "multipart/form-data",
    },
    body: form,
  });
};

export default class LabelScreen extends React.Component {
  state = { savedPhotos: null, hasCameraRollPermission: null };
  navigation = this.props.navigation;
  handleGoBack = this.navigation.goBack;
  location = this.props.route.params.location;

  handleCancel = async () => {
    let location = this.props.route.params.location;
    await FileSystem.deleteAsync(location);
    const queueImgs = await FileSystem.readDirectoryAsync(queueLocation);

    if (queueImgs.length == 0) {
      this.navigation.navigate("cameraPage");
      return;
    }

    // TODO: show next image, not first image
    this.navigation.navigate("LabelScreen", {
      location: queueLocation + queueImgs[0],
    });
  };

  handleUpload = async () => {
    console.log("hello");
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
      console.log("DATA:\n" + JSON.stringify(data));
      let res = await uploadImage(data.url, data.fields, this.location);
      let bruh = await res.text();
      console.log("RESULT: " + bruh);
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
    let location = this.location;

    try {
      await FileSystem.moveAsync({
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
    if (!hasCameraRollPermission) {
      return <Text>Camera Roll permission has been denied</Text>;
    }

    const { navigation, route } = this.props;
    const imgLocation = route.params.location;

    return (
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="contain"
          source={{ uri: imgLocation }}
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
