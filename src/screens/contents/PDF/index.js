import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function PDF() {
  return (
    <View style={styles.container}>
      <Text>PDF Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
