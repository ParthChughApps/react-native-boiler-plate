/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Text, Colors} from 'react-native-ui-lib';
import Home from '../screens/contents/Home';
import Notification from '../screens/contents/Notification';
import {Layout} from '../screens/Layout';
import {DrawerActions} from '@react-navigation/native';
import SingleNotification from '../screens/contents/Notification/SingleNotification';

const HomeStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const HomeNavigator = ({navigation}) => {
  return (
    <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HomeStackNavigator.Screen
        name="Home"
        component={Layout(Home)}
        // options={{headerShown: false}}
        options={{
          headerLeft: () => (
            <Text
              marginL-10
              text60
              style={{color: Colors.white, padding: 5}}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}>
              三
            </Text>
          ),
          headerRight: () => (
            <Text
              marginR-10
              text60
              style={{color: Colors.white, padding: 5}}
              onPress={() => {
                navigation.navigate('Notification');
              }}>
              🔔
            </Text>
          ),
        }}
      />
      <HomeStackNavigator.Screen
        name="Notification"
        component={Layout(Notification)}
        options={{
          title: 'Notification',
          headerStyle: {
            backgroundColor: Colors.skyBlue,
          },
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'SofiaProRegular',
          },
        }}
      />
      <HomeStackNavigator.Screen
        name="SingleNotification"
        component={Layout(SingleNotification)}
        options={{
          title: 'Notification',
          headerStyle: {
            backgroundColor: Colors.skyBlue,
          },
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'SofiaProRegular',
          },
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};
