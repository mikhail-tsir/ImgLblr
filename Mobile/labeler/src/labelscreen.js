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

const { width: winWidth, height: winHeight } = Dimensions.get("window");
console.log("width = " + winWidth + ", height = " + winHeight);

export default class LabelScreen extends React.Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    const { navigation, route } = this.props;
    const location = route.params.location;
    //const { location } = route.location;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.statusbar} />
        <Image
          resizeMode="contain"
          source={{ uri: location }}
          style={styles.image}
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
    backgroundColor: "black",
  },
  image: {
    top: 50,
    width: winWidth,
    height: winWidth,
  },
});
