/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {IntroNavigator} from './src/navigation/IntroStack';
import {UserProvider} from './src/contexts/user'

const App =  () => {
  return (
    <UserProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <NavigationContainer>
        <IntroNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};


export default App;
