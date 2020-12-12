import React from 'react';
import {View, StatusBar} from 'react-native';

const Layout = props => {
  return (
    <View style={[{flex: 1, backgroundColor: 'white'}, props.style]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {props.children}
    </View>
  );
};

export default Layout;
