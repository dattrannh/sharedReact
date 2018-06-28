import React,{Component} from 'react';
import { Button, Text, View } from 'react-native';

export default class SettingsScreen extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'green' }}>
          <Text>Settings!</Text>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Transparent')}
          />
        </View>
      );
    }
  }