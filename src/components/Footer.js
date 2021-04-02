/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Footer = () => {
  let Seprator = () => {
    return (
      <View
        style={{
          color: '#cbcbcb',
          marginTop: 15,
          marginLeft: 25.5,
          marginRight: 19.5,
          borderWidth: 0.2,
        }}
      />
    );
  };
  return (
    <View>
      <View style={{marginTop: '2.5%'}} />
      <Seprator />
      <View style={styles.footer}>
        <Text
          style={{
            color: '#4d4d4d',
            fontSize: 15.9,
            fontFamily: 'SofiaProRegular',
            textAlign: 'center',
          }}>
          (©) Renukai Coaching Classes Privacy policy | Terms of use
        </Text>
        <View style={{margin: 10}} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '90.3%',
    marginLeft: '6.3%',
    marginTop: '10%',
    padding: 8,
    backgroundColor: '#3087d9',
  },
  footer: {
    marginLeft: '16.4%',
    marginRight: '16.4%',
    width: '67.1%',
    marginTop: '2.9%',
    marginBottom: '3.9%',
  },
});
export default Footer;