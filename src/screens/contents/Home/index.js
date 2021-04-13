import React from 'react';
import { View, Text } from 'react-native';

export default function Home({navigation}) {
  navigation.setOptions({
    title: 'Kapil Bhosale'
  });
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}