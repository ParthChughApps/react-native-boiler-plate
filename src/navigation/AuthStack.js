import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import {BottomTabs} from './BottomStack'
import {Layout} from '../screens/Layout'

const AuthStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="signIn"
        component={Layout(SignIn)}
      />
      <AuthStackNavigator.Screen
        name="Home"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </AuthStackNavigator.Navigator>
  );
};
