import React from 'react';
import { View, Text } from 'react-native';

export default function SignUp(props) {
  const {navigation: {navigate}} = props;
  return (
    <View>
      <Text>Sign Up Screen</Text>
      <Text onPress={() => navigate('Home')}>Go to Home</Text>
    </View>
  )
}