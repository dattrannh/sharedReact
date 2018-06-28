import React, { Component } from "react";
import {
  View,
  Animated,
  FlatList,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
  BackHandler,
} from "react-native";
import data from "./data";
import Transition from "./Transition";
import PropTypes from "prop-types";
import Photo from './Photo'
import DetailScreen from './DetailScreen'
const { width, height } = Dimensions.get("window");
const ratio = 1.2;
const margin = 2;
export default class main extends Component {
  _images = {};

  _imageOpacitySetters = {};
  constructor() {
    super();
    this.state = {
      photo: null,
      openProgress: new Animated.Value(0),
      isAnimating: false,
      pageY:0
    };
  }
  static childContextTypes = {
    onImageRef: PropTypes.func
  };
  getChildContext() {
    console.log('myInfo: ' )
    return { onImageRef: this._onImageRef };
  }

  _onImageRef = (photo, imageRef, setOpacity) => {
    this._images[photo.id] = imageRef;
    this._imageOpacitySetters[photo.id] = setOpacity;
  };

  open = photo => {
    this.props.navigation.setParams({show:false})
    this._imageOpacitySetters[photo.id](
      this.state.openProgress.interpolate({
        inputRange: [0.005, 0.01],
        outputRange: [1, 0]
      })
    );
    this.setState({ photo}, () => {
      Animated.timing(this.state.openProgress, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        // this.setState({isAnimating: false });
      });
    });
  };

  close = (photoId,pageY = 0) => {
    this.props.navigation.setParams({show:true})
    this.setState({pageY: pageY})
      Animated.timing(this.state.openProgress, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        this._imageOpacitySetters[photoId](1);
        this.setState({photo: null,pageY:0});
        this.detailScreen.resetAnim()
      });
    // });
  };
  render() {
    const { photo, openProgress, isAnimating } = this.state;
    w = (width - margin*6) / 2;
    h = w / ratio;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={this.renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
        <Transition
          openProgress={openProgress}
          photo={photo}
          sourceImageRefs={this._images}
          pageY={this.state.pageY}
        />
        <DetailScreen
          ref = {v=>{this.detailScreen=v}}
          photo={photo}
          sourceImageRefs={this._images}
          onClose={this.close.bind(this)}
          openProgress={openProgress}
          // isAnimating={isAnimating}
          data={data}
        />
      </View>
    );
  }
  renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        style={{ marginTop: 4*margin, marginRight: index % 2 == 0 ? margin : 0 ,borderRadius:w/2}}
        onPress={e => {
            this.open(item)
        }}
      >
        <Photo style={{ height: w, width: w,borderRadius:w/2 }} photo={item} />
      </TouchableHighlight>
    );
  };
}
