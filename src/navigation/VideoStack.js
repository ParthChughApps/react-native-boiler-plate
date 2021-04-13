import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Layout} from '../screens/Layout'
import Video from '../screens/contents/Video';

const VideoStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const VideoStack = () => {
  return (
    <>
      <VideoStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <VideoStackNavigator.Screen
          name="Video"
          component={Layout(Video)}
          options={{headerShown: false}}
        />
      </VideoStackNavigator.Navigator>
    </>
  );
};
