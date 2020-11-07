import React, { Component } from 'react';
import {View, Text} from 'react-native';

class HOC extends Component {
  
  render() {
    return(
      <View style={{flex: 1}}>
        {this.props.children}
      </View>
    )
  }
}

HOC.navigationOptions = {
  headerLeft: () => (
    <Text>some random</Text>
  ),
};

export default HOC