import React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";

import styles from "./styles";
var idx = 0; // keeps track of image when displaying captures. This is needed to obtain the next image

const mapCaptures = (captures, navigation) => (path) => {
  idx += 1;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("LabelScreen", {
          location: path,
          nextIdx: idx == captures.length ? -1 : idx,
        });
      }}
      key={path}
    >
      <View style={styles.galleryImageContainer} key={path}>
        <Image source={{ uri: path }} style={styles.galleryImage} key={path} />
      </View>
    </TouchableOpacity>
  );
};

export default ({ captures = [], navigation }) => (
  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {captures.map(mapCaptures(captures, navigation))}
  </ScrollView>
);
