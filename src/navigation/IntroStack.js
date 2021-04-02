import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Intro from '../screens/welcome/Intro';
import GetStarted from '../screens/welcome/GetStarted';
import {AuthNavigator} from './AuthStack';
import {Layout} from '../screens/Layout'
const IntroStackNavigator = createStackNavigator();

const defaultNavOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerTitleAlign: {
    fontFamily: 'SofiaProRegular'
  }
};

export const IntroNavigator = () => {
  return (
    <IntroStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <IntroStackNavigator.Screen
        name="intro"
        title="Intro"
        component={Layout(Intro)}
      />
      <IntroStackNavigator.Screen
        name="getStarted"
        component={Layout(GetStarted)}
      />
      <IntroStackNavigator.Screen
        name="signIn"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
    </IntroStackNavigator.Navigator>
  );
};
