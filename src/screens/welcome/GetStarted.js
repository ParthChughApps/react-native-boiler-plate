import React from 'react';
import { View, Text } from 'react-native';

export default function GetStarted(props) {
  const {navigation: {navigate}} = props;
  return (
    <View>
      <Text>Get Started Screen</Text>
      <Text onPress={() => navigate('signIn')}>Go to Get Login</Text>
    </View>
  )
}