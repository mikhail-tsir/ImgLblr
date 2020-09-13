import React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";

import styles from "./styles";

export default ({ captures = [], navigation }) => (
  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {captures.map((path) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("LabelScreen", { location: path });
          console.log("going to LabelScreen");
        }}
      >
        <View style={styles.galleryImageContainer} key={path}>
          <Image
            source={{ uri: path }}
            style={styles.galleryImage}
            key={path}
          />
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);
