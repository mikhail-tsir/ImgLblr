import React from "react";
import { connect } from "react-redux";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";

import styles from "../styles/styles";
import { setCurrent } from "../reducers/current_capture";

const mapCaptures = ({ captures, setCurrent, navigation }) => (idx) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setCurrent(idx);
        navigation.navigate("LabelScreen");
      }}
      key={captures[idx]}
    >
      <View style={styles.galleryImageContainer} key={captures[idx]}>
        <Image
          source={{ uri: captures[idx] }}
          style={styles.galleryImage}
          key={captures[idx]}
        />
      </View>
    </TouchableOpacity>
  );
};

const gallery = (props) => {
  return (
    <ScrollView
      horizontal={true}
      style={[styles.bottomToolbar, styles.galleryContainer]}
    >
      {[...Array(props.captures.length).keys()].map(mapCaptures(props))}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    captures: state.captures,
  };
};

export default connect(mapStateToProps, { setCurrent })(gallery);
