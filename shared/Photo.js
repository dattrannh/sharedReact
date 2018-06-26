
import React, { Component } from "react";
import {
  Animated,
} from "react-native";
import PropTypes from "prop-types";

export default class PhotoGalleryPhoto extends Component {
    state = {
      opacity: 1
    };
  
    static contextTypes = {
      onImageRef: PropTypes.func
    };
  
    setOpacity = opacity => {
      this.setState({ opacity });
    };
  
    render() {
      const { style, photo } = this.props;
      const { opacity } = this.state;
      return (
        <Animated.Image
          ref={i => {
            this.context.onImageRef(photo, i, this.setOpacity);
          }}
          style={[
            style,
            {
              opacity
            }
          ]}
          source={photo.source}
        />
      );
    }
  }