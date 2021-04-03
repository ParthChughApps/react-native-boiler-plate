/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image, Colors} from 'react-native-ui-lib';
import Separator from './Separator';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoAndText}>
        <View style={styles.imageContainer}>
          <Image assetName="logo" style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>RENUKAI CHEMISTRY CLASSES</Text>
        </View>
      </View>
      <Separator />
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: 'peru',
  },
  logoAndText: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginTop: 15,
    marginLeft: 19,
  },
  image: {
    height: 85,
    width: 85,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: Colors.darkGray,
    textAlign: 'center',
    fontFamily: 'SofiaProRegular',
  },
});
export default Header;
