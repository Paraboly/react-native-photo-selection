import { ViewStyle, ImageStyle, TextStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
  photoListStyle: ViewStyle;
  imageRemoveButtonStyle: ViewStyle;
  imageRemoveButtonImageStyle: ImageStyle;
  photoImageStyle: ImageStyle;
}

export default StyleSheet.create<Style>({
  container: {},
  photoListStyle: {
    top: 16,
  },
  imageRemoveButtonStyle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f54242",
  },
  imageRemoveButtonImageStyle: {
    width: 12,
    height: 12,
  },
  photoImageStyle: {
    margin: 8,
    width: 75,
    height: 75,
    borderRadius: 12,
    overflow: "hidden",
  },
});
