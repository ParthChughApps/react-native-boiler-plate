import React from 'react';
import { View, Text } from 'react-native';

export default function SignIn(props) {
  const {navigation: {navigate}} = props;
  return (
    <View>
      <Text>Sign In Screen</Text>
      <Text onPress={() => navigate('Home')}>Go to Home</Text>
    </View>
  )
}