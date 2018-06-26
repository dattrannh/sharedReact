import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; 
import home from './home'
import setting from './setting'
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
        Main: { screen: tabNav},
   
    },
    {
		initialRouteName: "Main",
		headerMode: "none",
	}
)
