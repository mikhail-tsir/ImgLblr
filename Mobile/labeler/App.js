import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as FileSystem from "expo-file-system";
import { Provider } from "react-redux";
import { Text } from "react-native";

import CameraPage from "./src/components/camera_page";
import LabelScreen from "./src/components/labelscreen";
import SavedScreen from "./src/components/saved";
import {
  dirLocation,
  queueLocation,
  savedLocation,
} from "./src/config/constants.js";
import store from "./src/store.js";

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator /*headerMode={false}*/>
            <Drawer.Screen
              name="cameraPage"
              component={CameraPage}
              options={{ title: "Camera" }}
            />
            <Drawer.Screen
              name="LabelScreen"
              component={LabelScreen}
              options={{ title: "Add labels" }}
            />
            <Drawer.Screen
              name="savedScreen"
              component={SavedScreen}
              options={{ title: "Saved Images" }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
