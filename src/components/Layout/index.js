import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';

const Layout = props => {
  return (
    <SafeAreaView style={[{flex: 1}, props.style]}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {props.children}
    </SafeAreaView>
  );
};

export default Layout;
