import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableOpacity,
   Button, Alert, FlatList, DrawerLayoutAndroid, ToolbarAndroid, StatusBar,
   Animated,
  Dimensions,
  Easing,
  } from 'react-native';
  import {FluidNavigator,Transition} from 'react-navigation-fluid-transitions'
  import { StackNavigator, DrawerNavigator, TabNavigator, TabBarBottom } from "react-navigation";

  class Screen1 extends React.Component {
    render() {
      return (
        <View style={styles.container}>
        <Transition shared="logo">
          <TouchableOpacity style={{backgroundColor:'green',width:100,height:100}} onPress={() => this.props.navigation.navigate("screen2")}/>
          </Transition>
          <Text style={styles.paragraph}>
            Welcome to this fantastic app!
          </Text>  
          {/* <Button title="Next" onPress={() => this.props.navigation.navigate("screen2")} /> */}
        </View>
      );
    }
  }
  
  class Screen2 extends React.Component {
    render() {
      return (
        <View style={[styles.container,{backgroundColor:'cyan'}]}>
                 <Transition shared="logo">

            <TouchableOpacity style={{backgroundColor:'green',height:160,width:Dimensions.get('window').width}}/>
            </Transition>

          <Text style={styles.paragraph}>
            <Text style={{fontWeight:'normal'}}>
              Now you should have a basic understanding of how this app works. 
              Please sign up and take part in this fantastic user experience!
            </Text>
          </Text>  
          <Text style={styles.paragraph}>
              This is the last page of the onboarding.
          </Text>  
          <Button title="Back" onPress={() => this.props.navigation.goBack()} />

        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#ecf0f1',
    },
    largeLogo: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
    smallLogo: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    paragraph: {
      margin: 24,
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  });
  const Navigator = FluidNavigator({
    screen1: {screen: Screen1},
    screen2: {screen: Screen2}
  },{
      initialRouteName: "screen1",
      headerMode: "none",
    })
  export default class Main extends Component{
    render() {
        return (
           <Navigator/>
        );
      }
  }
