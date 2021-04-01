/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {IntroNavigator} from './src/navigation/IntroStack';

const App =  () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <IntroNavigator />
        {/* <Text>asdasd</Text> */}
      </NavigationContainer>
    </>
  );
};


export default App;
