import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Swiper, TitleBar, TabBar } from 'react-native-awesome-viewpager';

export default class page extends Component{
  state = {
    scrollEnabled: true,
    type: 1,
  }

  render() {
    
    return(
          <Swiper
            ref='ViewPager'
            loop={false}
            autoplay={false}
            interval={2000}
            indicator = {false}
            onPageScroll={(e) => console.log(e, 'onPageScroll')}
            onPageScrollStateChanged={(e) => console.log(e, 'onPageScrollStateChanged')}
            onPageSelected={(e) => console.log(e, 'onPageSelected')}
            scrollEnabled={this.state.scrollEnabled}
            style={styles.container}>
            {
                data.map((item,index)=>{
                    return(
                        <View style={{backgroundColor:item.color,justifyContent:'center',alignItems:'center'}}>
                            <Text>{item.text}</Text>
                        </View>
                    )
                })
            }

          </Swiper>
        )
    }
}
const data = [
    {
        key:1,
        text:'page 1',
        color:'green'
    },
    {
        key:2,
        text:'page 2',
        color:'blue'
    },
    {   key:3,
        text:'page 3',
        color:'grey'
    }
]
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efdeed',
    flexDirection: 'column',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});