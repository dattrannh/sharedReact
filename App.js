/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableOpacity,
   Button, Alert, FlatList, DrawerLayoutAndroid, ToolbarAndroid, StatusBar,
   Animated,
  Dimensions,
  Easing,
  } from 'react-native';
import Header from './components/header.js';
import AlbumList from './components/AlbumList';
import Draggable from './components/Draggable';
import CameraExample from './components/CameraComponent';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var {width,height}=Dimensions.get('window')
class Greeting extends Component {
  render() {
    return (
      <Text>{this.props.name}!</Text>
    );
  }
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      fadeAnim: new Animated.Value(1),
      moveAnim: new Animated.Value(0),
      springAnim: new Animated.Value(1.0),
      rotationAnim: new Animated.Value(0),
      isShow: true
    };
    let check=true;
  }
  clickMe(){
    console.log("click me");
  }
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  
  onActionSelected(pos) {
    if (pos === 0) {
      showSettings();
    }
  }
  _animator=()=>{
    // alert('hello');
    // Animated.timing(                  
    //   this.state.fadeAnim,           
    //   {
    //     toValue: 0,                 
    //     duration: 1000,    
    //   }
    // ).start();   
    Animated.timing(                  
      this.state.moveAnim,           
      {
        toValue: width-200,                 
        duration: 1000,
        // easing: Easing.linear,    
        easing:Easing.back(),
      }
    ).start(()=>{
      //call after finish anim top
      Animated.timing(
        this.state.moveAnim,
      {
        toValue: 0,
        duration:1000,
        easing:Easing.back(),
      }
    ).start(this._animator)
  });   
  }
  _spring=()=>{
    Animated.spring(this.state.springAnim,
    {
       toValue:1.5,
       duration:1000,
       friction: 1,
    }).start();
  }

  _rotation=()=>{
    Animated.sequence([
      Animated.timing(
        this.state.rotationAnim,
        {
          toValue:100,
          duration:1000,
          easing:Easing.linear,
        }
      ),
      Animated.timing(
        this.state.rotationAnim,
        {
          toValue:0,
          duration:0,
        }
      ),
    ]).start(()=>{
        this._rotation()
    });
  }
  _parallel=()=>{
    Animated.parallel([
      this._rotation(),
      this._animator()
    ]).start;
  }

  render() {
 
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#8E24AA' animated={true}/> 
        <Header text={'How are you'}/>
        {/* {this._animView()} */}
        <View style={{flex:1,justifyContent:'center'}}>
            <Draggable onRemove={ (index) => {
              // this.setState({isShow: false})
               }}/>
            {/* <CameraExample/> */}
        </View>
      </View>
    );
  }
  _animView(){
    const interpolated=this.state.rotationAnim.interpolate({
      inputRange:[0,100],
      outputRange:['0deg','360deg']
    })
    return <Animated.View style={[{width:200,height:40, backgroundColor: 'red'}, 
    {
      left: this.state.moveAnim,
      transform:[{rotate:interpolated},
      // {translateX:20}
      ],
    }
    ]}>
    <TouchableOpacity style={{width:200,height:40,justifyContent:'center',alignItems:'center',}} activeOpacity={0.8}
     onPress={this._parallel}
     >
        <Text style={{fontSize:20,color:'black',}}>Click me</Text>
    </TouchableOpacity>
    {/* <AlbumList/> */}
    {/* <FadeInView style={{width: 250, height: 50, backgroundColor: 'red',justifyContent:'center',alignItems:'center'}}>
    </FadeInView> */}
    </Animated.View>;
  }
}
var navigationView = (
  <View style={{flex:1,backgroundColor:'red',flexDirection:'column'}}>
    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
  </View>
);

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(1),
  }

  _startAnim() {
     alert('hello');
    // Animated.timing(                
    //   this.state.fadeAnim,          
    //   {
    //     toValue: 0,                
    //     duration: 10000,             
    //   }
    // ).start();                     
  }

  render() {
    let { fadeAnim } = this.state;
    return (
      <Animated.View style={{...this.props.style, opacity: fadeAnim,}} onPress={this._startAnim} > 
      {this.props.children}
      </Animated.View>
    );
  }
}


let CIRCLE_RADIUS = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#31c1f7',
    marginBottom: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  but:{
    color:'white',
    fontSize:24,
    textAlign:'center',
    padding:10,
    paddingHorizontal: 30, 
  },
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  row: {
    flexDirection: "row"
  }, 
  test:{
    paddingTop:100,
  }
});