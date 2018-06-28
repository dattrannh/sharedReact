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
  BackHandler,
  PanResponder,
  ScrollView
} from 'react-native';
import Transition from "./Transition";

const maxWidth = Dimensions.get('window').width;

export default class DetailScreen extends Component {
  constructor(){
    super()
    this.state={
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      showDraggable: true,
      localPhoto: null,
      scroll: true
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
        if(isMoving && gestureState.dy>0){
          Animated.event([ null, {dx: 0, dy: this.state.pan.y}, ])(e, gestureState)
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        console.log('myInfo',JSON.stringify(gestureState))
        this.state.pan.flattenOffset();
        if(isMoving){
          if(gestureState.vy > 0.8){
            this.props.onClose(this.state.localPhoto.id,gestureState.dy)
          }else if(gestureState.dy < 200){
              this.translate()
            }else{
                this.props.onClose(this.state.localPhoto.id,gestureState.dy)
            }
        }
        this.setState({scroll:true})
        isMoving = false
      }
    });
  }
  resetAnim(){
    this.state.pan.setValue({x:0,y:0});
  }
  render() {
    const { onClose, openProgress } = this.props;
    const { localPhoto } = this.state;
    // if (localPhoto) {
      return (
      
        <Animated.View
         {...this.panResponder.panHandlers}
          style={[StyleSheet.absoluteFill,{transform:[{translateY:this.state.pan.y}]}]}
          pointerEvents={this.props.photo ? 'auto' : 'none'}
        >
          <Animated.Image
            ref={r => (this._openingImageRef = r)}
            source={localPhoto ? localPhoto.source : null}
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
              - {localPhoto ? localPhoto.postedBy : null}
            </Text>
              <Text style={styles.description}>
              Component that wraps platform ScrollView
               while providing integration with touch 
               locking "responder" system.
              Keep in mind that 
              ScrollViews must have a bounded height in
              order to work, since they contain unbounded-height
               children into a bounded container 
               (via a scroll interaction). 
               In order to bound the height of
                a ScrollView, either set the height
                 of the view directly (discouraged) 
                 or make sure all parent views have bounded
                  height. Forgetting to transfer
                   down the view stack can lead 
                   to errors here, which the element 
                   inspector makes easy to debug.
                   Component that wraps platform ScrollView
               while providing integration with touch 
               locking "responder" system.
              Keep in mind that 
              ScrollViews must have a bounded height in
              order to work, since they contain unbounded-height
               children into a bounded container 
               (via a scroll interaction). 
               In order to bound the height of
                a ScrollView, either set the height
                 of the view directly (discouraged) 
                 or make sure all parent views have bounded
                  height. Forgetting to transfer
                   down the view stack can lead 
                   to errors here, which the element 
                   inspector makes easy to debug.
              </Text>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              opacity: openProgress
            }}
            pointerEvents={ 'auto'}
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
    // }
    // return null;
  }
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.onBackPress.bind(this)
    );
  }
  onBackPress() {
    if(this.props.photo !=null){
      this.props.onClose(this.state.localPhoto.id)
      return true;
    }
    return false
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
