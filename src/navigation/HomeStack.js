import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../screens/contents/Home';
import {Layout} from '../screens/Layout'

const HomeStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const HomeNavigator = () => { 
  return (
    <>
      <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <HomeStackNavigator.Screen
          name="Home"
          component={Layout(Home)}
          options={{headerShown: false}}
        />
      </HomeStackNavigator.Navigator>
    </>
  );
};
