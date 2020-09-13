import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as FileSystem from "expo-file-system";

import CameraPage from "./src/camera.page";
import LabelScreen from "./src/labelscreen";
import { dirLocation, queueLocation, savedLocation } from "./src/constants.js";

const Stack = createStackNavigator();

export default class App extends React.Component {
  fileError = null;

  async componentDidMount() {
    try {
      let dir = await FileSystem.getInfoAsync(dirLocation);

      if (!dir.exists) {
        console.log("Making directory Labeler");
        let create = await FileSystem.makeDirectoryAsync(dirLocation);
        if (!create) {
          this.fileError = "Could not create directory";
          return;
        }

        let info = await FileSystem.getInfoAsync(queueLocation);
        if (!info.exists) {
          FileSystem.makeDirectoryAsync(queueLocation);
        }

        let savedinfo = await FileSystem.getInfoAsync(savedLocation);
        if (!savedinfo.exists) {
          FileSystem.makeDirectoryAsync(savedLocation);
        }
      }
    } catch (err) {
      console.log(err);
      this.fileError = err.message;
    }
  }

  render() {
    return this.fileError ? (
      <Text>{this.fileError}</Text>
    ) : (
      <NavigationContainer>
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="cameraPage" component={CameraPage} />
          <Stack.Screen name="LabelScreen" component={LabelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
