import React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";

import styles from "./styles";

const mapCaptures = (captures, navigation) => (idx) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("LabelScreen", {
          index: idx,
          captures: captures
        });
      }}
      key={captures[idx]}
    >
      <View style={styles.galleryImageContainer} key={captures[idx]}>
        <Image source={{ uri: captures[idx] }} style={styles.galleryImage} key={captures[idx]} />
      </View>
    </TouchableOpacity>
  );
};

export default ({ captures = [], navigation }) => {
  return (
  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {[...Array(captures.length).keys()].map(mapCaptures(captures, navigation))}
  </ScrollView>);
};
