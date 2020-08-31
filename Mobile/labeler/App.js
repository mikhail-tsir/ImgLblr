import React from "react";

import CameraPage from "./src/camera.page";

export default class App extends React.Component {
  render() {
    console.log("app started");
    return <CameraPage />;
  }
}
