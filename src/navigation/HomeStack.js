import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { Text, Colors } from 'react-native-ui-lib';
import Home from '../screens/contents/Home';
import {Layout} from '../screens/Layout'
import { DrawerActions } from '@react-navigation/native';

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
    <>
      <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <HomeStackNavigator.Screen
          name="Home"
          component={Layout(Home)}
          // options={{headerShown: false}}
          options={{ 
            headerLeft: () => (
            <Text marginL-10 text60 style={{color: Colors.white, padding: 5}} onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
              }}>三
            </Text>
            ),
            headerRight: () => (
              <Text marginR-10 text60 style={{color: Colors.white, padding: 5}} onPress={() => {
                // navigation.dispatch();
                }}>🔔
              </Text>
            )
          }}
        />
      </HomeStackNavigator.Navigator>
    </>
  );
};
