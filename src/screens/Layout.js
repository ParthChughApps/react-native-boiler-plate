import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

export const Layout = (WrappedComponent) => {
  return function (props) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
          <WrappedComponent {...props} />
        </ScrollView>
      </SafeAreaView>
    )        
  }
};