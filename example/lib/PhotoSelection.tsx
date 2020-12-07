import * as React from "react";
import { Text, View, Image, FlatList } from "react-native";
import MediaPicker from "@paraboly/react-native-media-picker";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import styles from "./PhotoSelection.style";

interface IPhotoSelectionProps {}

interface IState {
  images: Array<IImage>;
}

export interface IImage {
  mime: string;
  uri: string;
  width: number;
  height: number;
  path?: string;
  size?: number;
  cropRect?: any;
  data?: any;
  exif?: any;
  filename?: string;
  sourceURL?: string;
  creationDate?: string;
  localIdentifier?: string;
  modificationDate?: string;
}

export interface IDataImage {
  id?: string;
  type?: string;
  uri: string;
  mime: string;
  width: number;
  height: number;
}

export default class PhotoSelection extends React.Component<
  IPhotoSelectionProps,
  IState
> {
  mediaPickerRef = React.createRef<MediaPicker>();

  constructor(props: IPhotoSelectionProps) {
    super(props);
    this.state = {
      images: Array<IImage>(),
    };
  }

  handleGalleryPressed = (images: Array<IImage>) => {
    if (images && images.length > 0) {
      const newImages: Array<IImage> = this.state.images.concat(
        images.map((image: any) => {
          return {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          };
        }),
      );
      this.setState({
        images: newImages,
      });
    }
  };

  handleCameraPressed = (image: IImage) => {
    if (image && image.path) {
      const newImages: Array<IImage> = this.state.images.concat({
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
      });
      this.setState({ images: newImages });
    }
  };

  handleImageRemovePressed = (index: number) => {
    const newImages = this.state.images;
    newImages.splice(index, 1);
    this.setState({ images: newImages }, () => this.forceUpdate());
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  renderPhotoList = () => (
    <FlatList
      horizontal
      data={this.state.images}
      style={styles.photoListStyle}
      renderItem={this.renderPhotoItem}
    />
  );

  renderImageRemoveButton = (index: number) => (
    <RNBounceable
      style={styles.imageRemoveButtonStyle}
      onPress={() => this.handleImageRemovePressed(index)}
    >
      <Image
        resizeMode="contain"
        source={require("./local-assets/close.png")}
        style={styles.imageRemoveButtonImageStyle}
      />
    </RNBounceable>
  );

  renderPhotoItem = (data: any) => {
    const { item, index } = data;
    return (
      <RNBounceable onPress={() => {}}>
        <Image source={item} key={item.path} style={styles.photoImageStyle} />
        {this.renderImageRemoveButton(index)}
      </RNBounceable>
    );
  };

  renderPhotoUploadButton = () => (
    <RNBounceable
      style={{
        height: 50,
        width: 350,
        alignItems: "center",
        backgroundColor: "red",
        justifyContent: "center",
      }}
      onPress={() => this.mediaPickerRef.openModal()}
    >
      <Text>Upload Photo</Text>
    </RNBounceable>
  );

  renderPhotoContainer = () => {
    const { images } = this.state;
    return (
      <View style={{ marginTop: 15, marginBottom: 35 }}>
        {this.renderPhotoUploadButton()}
        {images && images.length > 0 && this.renderPhotoList()}
      </View>
    );
  };

  renderMediaPicker = () => (
    <MediaPicker
      multiple
      ref={(ref: any) => (this.mediaPickerRef = ref)}
      galleryIconType="MaterialIcons"
      galleryIconColor="#90a1fc"
      galleryIconName="collections"
      cameraOnPress={(image: any) => this.handleCameraPressed(image)}
      galleryOnPress={(images: any) => this.handleGalleryPressed(images)}
      {...this.props}
    />
  );

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderPhotoContainer()}
        {this.renderMediaPicker()}
      </View>
    );
  }
}
