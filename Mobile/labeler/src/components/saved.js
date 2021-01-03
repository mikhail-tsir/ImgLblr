import React from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  FlatList,
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { savedScreenStyles } from "../styles/styles";

const SavedScreen = (props) => {
  const { savedImgs, navigation } = props;
  const { width } = Dimensions.get("window");
  const numCols = 4;

  function renderItem(item) {
    return (
      <TouchableOpacity
        style={{ flex: 1, aspectRatio: 1 }}
        onPress={() => {
          navigation.navigate("cameraPage");
        }}
      >
        <View style={savedScreenStyles(numCols)}>
          <Image
            style={savedScreenStyles(numCols)}
            resizeMode="cover"
            source={{ uri: item }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#171717" }}
    >
      <FlatList
        style={{
          paddingTop: StatusBar.currentHeight,
          backgroundColor: "#171717",
        }}
        horizontal={false}
        numColumns={numCols}
        data={savedImgs}
        renderItem={({ item }) => renderItem(item, navigation)}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    savedImgs: state.savedImgs,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen);
