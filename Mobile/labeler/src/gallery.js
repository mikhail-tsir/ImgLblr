import React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";

import styles from "./styles";

export default ({ captures = [], navigation }) => (
  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {captures.map(({ uri }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("LabelScreen", { location: uri })}
      >
        <View style={styles.galleryImageContainer} key={uri}>
          <Image source={{ uri }} style={styles.galleryImage} />
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);
