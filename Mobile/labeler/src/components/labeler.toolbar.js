import React from "react";
import {
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import styles from "../styles/styles";
import config from "../config/config";

const buttonSize = config.BUTTON_SIZE;

export default ({ onSave, onUpload, onCancel }) => (
  <Grid style={styles.bottomToolbar}>
    <Row>
      <Col style={styles.alignCenter}>
        <TouchableOpacity onPress={onCancel}>
          <AntDesign name="close" color="white" size={buttonSize} />
        </TouchableOpacity>
      </Col>
      <Col style={styles.alignCenter}>
        <TouchableOpacity onPress={onUpload}>
          {/* <MaterialIcons
            name="cloud-upload"
            color="white"
            size={buttonSize * 2}
          /> */}
          <Ionicons name="ios-add-circle-outline" size={buttonSize * 2} color="white"/>
        </TouchableOpacity>
      </Col>
      <Col style={styles.alignCenter}>
        <TouchableOpacity onPress={onSave}>
          <AntDesign name="check" color="white" size={buttonSize} />
        </TouchableOpacity>
      </Col>
    </Row>
  </Grid>
);

export function BackHeader({ onBack }) {
  return (
    <View style={styles.backbutton}>
      <TouchableOpacity onPress={onBack}>
        <AntDesign
          name="back"
          color="white"
          size={buttonSize}
          style={shadowstyle.shadow}
        />
      </TouchableOpacity>
    </View>
  );
}

const shadowstyle = StyleSheet.create({
  shadow: {
    textShadowColor: "#171717",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});
