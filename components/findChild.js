import React, { Component } from 'react';

import ReactNative, { View, StyleSheet, Text, findNodeHandle, TouchableOpacity, Platform } from 'react-native';

export default class MyProject extends Component
{
    constructor()
    {
        super();

        this.state = { 

          X_Dimension: '',
          Y_Dimension: '', 
          Child_View_Width: '', 
          Child_View_Height: '' 
        
        }
    }

    calculate_ChildView_Dimension =()=>
    {
        this.refs.Child_View.measureLayout(
          ReactNative.findNodeHandle(this.refs.Root_View),
           (X_Position, Y_Position, Width, Height ) =>{
                this.setState({ 
                X_Dimension : X_Position,
                Y_Dimension: Y_Position,
                Child_View_Height: Width, 
                Child_View_Width: Height 
            });
        });
    }

    render()
    {
        return(
            <View ref = "Root_View" style = { styles.MainContainer }>

                <View ref = "Child_View" style = { styles.ChildView }>

                    <Text style={styles.TextStyle}> X = {this.state.X_Dimension} </Text>
                    <Text style={styles.TextStyle}> Y = {this.state.Y_Dimension} </Text>
                    <Text style={styles.TextStyle}> Height = {this.state.Child_View_Height} </Text>
                    <Text style={styles.TextStyle}> Width = {this.state.Child_View_Width} </Text>

                </View>


                <TouchableOpacity
                style={styles.TouchableOpacityStyle}
                activeOpacity = { .6 }
                onPress={ this.calculate_ChildView_Dimension }
                >
 
                    <Text style={styles.TextStyle}> Calculate Child View Dimensions </Text>
            
                </TouchableOpacity>
              
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECEFF1',
        marginTop: (Platform.OS === 'ios') ? 20 : 0
    },

    ChildView:
    {
        width: 200,
        height: 200,
        backgroundColor: '#00BCD4',
        justifyContent: 'center',
    },

    TouchableOpacityStyle: {
 
      marginTop:30,
      marginLeft:10,
      marginRight:10,
      paddingTop:15,
      paddingBottom:15,
      borderWidth: 1,
      borderColor: '#fff',
      backgroundColor:'#004D40',
      borderRadius:7,
      width: '90%'
    },
   
    TextStyle:{

        color:'#fff',
        textAlign:'center',
        
    }

});