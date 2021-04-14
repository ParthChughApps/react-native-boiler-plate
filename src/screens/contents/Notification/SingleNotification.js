/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-ui-lib';

import Separator from '../../../components/Separator';

const width = Dimensions.get('window').width;

const SingleNotification = ({route}) => {
  const notification = route.params.notification;
  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpeg')}
      style={styles.container}>
      <View style={styles.marginHorizontal10}>
        <View style={styles.header}>
          <Text style={styles.date}>{notification.date}</Text>
          <View style={{justifyContent: 'space-evenly'}}>
            <Text style={styles.title}>{notification.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name="checkmark-done"
                size={20}
                color={notification.seen ? Colors.skyBlue : Colors.darkGray}
              />
              <Text style={styles.seenTime}>{notification.seenTime}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator}>
          <Separator />
        </View>
        <View>
          <Text style={styles.data}>{notification.data}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'space-evenly',
  },
  date: {
    textAlign: 'center',
    width: 40,
    height: 80,
    fontSize: 16,
    borderColor: Colors.skyBlue,
    borderWidth: 2,
    color: Colors.gray,
    backgroundColor: '#f2f6f9',
    fontFamily: 'SofiaProRegular',
  },
  title: {
    fontFamily: 'SofiaProRegular',
    color: Colors.skyBlue,
    fontSize: 18,
    width: 250,
  },
  seenTime: {
    color: Colors.darkGray,
    fontSize: 16,
    fontFamily: 'SofiaProRegular',
  },
  separator: {
    marginHorizontal: 15,
  },
  data: {
    marginVertical: 15,
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    fontFamily: 'SofiaProRegular',
    color: Colors.darkGray,
    fontSize: 16,
    backgroundColor: '#ebf2f7',
  },
});

export default SingleNotification;
