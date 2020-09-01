import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CameraPage from "./src/camera.page";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="cameraPage" component={CameraPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
