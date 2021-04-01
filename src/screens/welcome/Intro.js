import React from 'react';
import { View, Text } from 'react-native';
import { Layout } from '../Layout';

function Intro(props) {
  const {navigation: {navigate}} = props;

  return (
    <View>
      <Text>Intro Screen</Text>
      <Text onPress={() => navigate('getStarted')}>Go to Get Started Screen</Text>
    </View>
  )
}

export default Intro