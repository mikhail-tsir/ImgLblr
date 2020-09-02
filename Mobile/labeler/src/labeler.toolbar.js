import React from "react";
import { Camera } from "expo-camera";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";

import styles from "./styles";
import config from "./config/config";

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
          <MaterialIcons
            name="cloud-upload"
            color="white"
            size={buttonSize * 2}
          />
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
    <TouchableOpacity onPress={onBack}>
      <View style={styles.backbutton}>
        <AntDesign name="back" color="white" />
      </View>
    </TouchableOpacity>
  );
}
