import { connect } from "react-redux";
import { Dimensions, FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import styles from "../styles/styles";
import { BackHeader } from "./labeler_toolbar";

const SavedScreen = ({ savedImgs, navigation }) => {
  const { width } = Dimensions.get("window");
  const indices = [...Array(savedImgs.length).keys()];
  return (
    <FlatList
      numColumns={(width - 10) / styles.galleryImage.width}
      data={indices}
      renderItem={({ idx }) => renderItem(idx, savedImgs[idx], navigation)}
    />
  );
};

function renderItem(idx, item, navigation) {
  return (
    <TouchableOpacity
      style={{ flex: 1, aspectRatio: 1 }}
      onPress={() => {
        navigation.navigate("cameraPage");
      }}
    >
      <View style={styles.galleryImageContainer} key={idx}>
        <Image
          style={{ ...styles.galleryImage, flex: 1 }}
          resizeMode="cover"
          source={{ uri: item }}
        />
      </View>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => {
  return {
    savedImgs: state.savedImgs,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen);
