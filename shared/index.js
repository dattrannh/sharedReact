import React from 'react';
import { Button, Text, View ,Easing,Animated} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; 
import home from './home'
import setting from './setting'
import Transparent from './transparent'
const tabBarVisible = (navigation) => {
    state = navigation.state;   
    showTabBar = true 
    if(state.routeName == 'Home'){
        params = state.params
       if(params != undefined){
            showTabBar = params.show
       }
       
    }
    return showTabBar;
  };
  
const tabNav = TabNavigator(
	{
		Home: { screen: home, },
		Setting: { screen: setting},
	},
	{
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: tabBarVisible(navigation),
            tabBarIcon: ({ focused, tintColor }) => {
              const { routeName } = navigation.state;      
              // You can return any component that you like here! We usually use an
              // icon component from react-native-vector-icons
              return <Text style = {{fontSize:20,color:tintColor}}>{routeName}</Text>;
            },
          }),
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: false,
		tabBarOptions: {
			showLabel: false,
			style: {
				borderTopColor: "#C59659",
				borderTopWidth: 1,
				backgroundColor: "#FFFFFF"
			}
		},
	}
);

export default StackNavigator({
        main: { screen: tabNav},
        Transparent:{screen:Transparent,backgroundColor:'transparent'}
    },
    {
      initialRouteName:'Transparent',
      headerMode: 'none',
      mode: 'modal',
      navigationOptions: {
        gesturesEnabled: false,
      },
      transitionConfig: () => ({
        transitionSpec: {
          duration: 1000,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
  
          const height = layout.initHeight;
          const translateY = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [height, 0, 0],
          });
  
          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
          });
  
          return { opacity, transform: [{ translateY }] };
        },
      }),
    }
)
