import React ,{Component}from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder
} from 'react-native';

const maxWidth = Dimensions.get('window').width;

export default class DetailScreen extends Component {
  constructor(){
    super()
    this.state={
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      showDraggable: true,
      localPhoto: null
    }
  }
  componentWillReceiveProps(nextProps) {
    const { photo } = nextProps;
    if (photo) {
      this.setState({ localPhoto: photo });
    }
  }
 translate(){
    Animated.timing(this.state.pan, {
        toValue: { x: 0, y: 0 },
        duration:100,
      }).start()
  }
    alpha(){
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 100
      }).start()
    }
  componentWillMount() {
    this.panResponder=PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant:(e,gestureState)=>{
        if(gestureState.y0 < 300){
          isMoving = true
          this.state.pan.setOffset({x:this.state.pan.x._value, y:this.state.pan.y._value});
          this.state.pan.setValue({x:0,y:0});
        }else{
          isMoving = false
        }
      },
      onPanResponderMove:(e, gestureState) => {
        if(isMoving){
          Animated.event([ null, {dx: 0, dy: this.state.pan.y}, ])(e, gestureState)
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        this.state.pan.flattenOffset();
        if(isMoving){
          if(gestureState.vy > 0.8){
            this.props.onClose(this.state.localPhoto.id)
            this.state.pan.setValue({x:0,y:0});
          }else if(gestureState.dy < 150){
              this.translate()
            }else{
                this.props.onClose(this.state.localPhoto.id)
                this.state.pan.setValue({x:0,y:0});
            }
        }
        isMoving = false
      }
    });
}


  render() {
    const transform={
      transform : this.state.pan.getTranslateTransform()
     }
    const { onClose, openProgress, isAnimating } = this.props;
    const { localPhoto } = this.state;
    if (localPhoto) {
      return (
        <Animated.View
         {...this.panResponder.panHandlers}
          style={[StyleSheet.absoluteFill,transform]}
          pointerEvents={isAnimating || this.props.photo ? 'auto' : 'none'}
        >
          <Animated.Image
            ref={r => (this._openingImageRef = r)}
            source={localPhoto.source}
            style={{
              width: maxWidth,
              height: 300,
              opacity: openProgress.interpolate({
                inputRange: [0, 0.99, 0.995],
                outputRange: [0, 0, 1]
              })
            }}
          />
          <Animated.View
            style={[
              styles.body,
              {
                opacity: openProgress,
                backgroundColor: '#fff',
                transform: [
                  {
                    translateY: openProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={styles.title}>
              - {localPhoto.postedBy}
            </Text>
            <Text style={styles.description}>
            Pass params to a route by putting them in an 
            object as a second parameter to the 
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              opacity: openProgress
            }}
            pointerEvents={isAnimating ? 'none' : 'auto'}
          >
            <TouchableOpacity
              onPress={() => onClose(localPhoto.id)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    // fontFamily: 'Avenir Next',
    lineHeight: 50
  },
  description: {
    color: '#333',
    fontSize: 14
    // fontFamily: 'Avenir Next'
  },
  body: { flex: 1, padding: 15 },
  closeText: { color: 'white', backgroundColor: 'transparent' },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    borderRadius: 5
  }
});
