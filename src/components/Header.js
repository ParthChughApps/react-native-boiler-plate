/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';

const Header = () => {
  let Seperator = () => {
    return (
      <View
        style={{
          color: '#cbcbcb',
          marginTop: 2,
          marginLeft: 25.5,
          marginRight: 19.5,
          borderWidth: 0.2,
        }}
      />
    );
  };
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.image}>
          <Image assetName="logo" style={{height: 99, width: 99}}/>
        </View>
        <View style={styles.headerText}>
          <Text
            style={{
              fontSize: 20,
              color: '#4d4d4d',
              textAlign: 'center',
              fontFamily: 'SofiaProRegular',
            }}>
            RENUKAI CHEMISTRY CLASSES
          </Text>
        </View>
      </View>
      <Seperator />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  image: {
    marginTop: '3.1%',
    marginLeft: 18.9,
    height: '11%',
    width: '23.9%',
  },
  headerText: {
    flex: 1,
    marginLeft: 20.1,
    marginRight: 20.1,
    width: '61.8%',
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Header;