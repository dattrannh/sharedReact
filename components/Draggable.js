import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View,
    PanResponder, 
    Animated,
} from 'react-native';
const tag = 'myDraggable: '
export default class Draggable extends Component{
    constructor(props){
        super(props);
        this.state={
            pan: new Animated.ValueXY,
            opacity: new Animated.Value(1),
            showDraggable: true,
        }
    }
    isDropArea(gesture) {
        return gesture.moveY < 200;
    }
    parallel=()=>{
        Animated.parallel([
          this.alpha(),
          this.translate()
        ]).start;
    }
    translate(){
        Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            duration:100,
            friction: 5
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
          onPanResponderGrant:(e,gesture)=>{
            //start moving
            this.state.pan.setOffset({x:this.state.pan.x._value, y:this.state.pan.y._value});
            this.state.pan.setValue({x:0,y:0});
          },
          onPanResponderMove: Animated.event([
            null, {dx: this.state.pan.x, dy: this.state.pan.y},
          ]),
        // onPanResponderMove: (event, gestureState) => {
        //     console.log(tag+JSON.stringify(event))
        // },
          onPanResponderRelease: (e, gesture) => {//{vx, vy}
            this.state.pan.flattenOffset();
            if (this.isDropArea(gesture)) {
                Animated.timing(this.state.opacity, {
                toValue: 0.5,
                duration: 500
              }).start(() =>
              this.props.onRemove('10')
                // this.setState({
                //    showDraggable: false
                // })
              );
            } else {
                this.parallel()
            }
          }
        });
    }
    render(){
        const transform={
            transform : this.state.pan.getTranslateTransform()
        }
        return(
            <Animated.View 
            {...this.panResponder.panHandlers} 
            style={[styles.circle,transform,{opacity:this.state.opacity}]}>
            {this.props.children}
            </Animated.View>
        );
    }
}
const radius=30;
const styles=StyleSheet.create({
    circle:{
        backgroundColor: 'red',
        width: radius*2,
        height: radius*2,
        borderRadius:radius,
    }
})
 
Draggable.propTypes = {
    onRemove: PropTypes.func,
}
Draggable.defaultProps = {
    onRemove: () => {},
}