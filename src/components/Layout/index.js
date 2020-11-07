import React from 'react';
import {View, StatusBar} from 'react-native';

const Layout = props => {
  return (
    <View style={[{flex: 1, backgroundColor: 'black'}, props.style]}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {props.children}
    </View>
  );
};

export default Layout;
