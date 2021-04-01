import React from 'react';
import { View, Text } from 'react-native';

export default function SignIn(props) {
  const {navigation: {navigate}} = props;
  return (
    <View>
      <Text>Sign In Screen</Text>
      <Text onPress={() => navigate('SignUp')}>Go to Get Sign Up</Text>
      <Text onPress={() => navigate('forgotPassword')}>Go to Get Forgot Password</Text>
    </View>
  )
}