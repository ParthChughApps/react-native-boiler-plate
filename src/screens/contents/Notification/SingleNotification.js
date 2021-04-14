/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-ui-lib';
import ImageZoom from 'react-native-image-pan-zoom';
import {WebView} from 'react-native-webview';

import Separator from '../../../components/Separator';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SingleNotification = ({route}) => {
  const notification = route.params.notification;

  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpeg')}
      style={styles.container}>
      <View style={styles.marginHorizontal10}>
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{notification.month}</Text>
            <Text style={styles.date}>{notification.date}</Text>
            <Text style={styles.time}>{notification.time}</Text>
          </View>
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
      {notification.image !== '' && (
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={400}
          imageHeight={400}
          style={{marginTop: -120}}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/logo.jpg')}
          />
        </ImageZoom>
      )}
      <View>
        {notification.pdf !== '' && (
          <View style={styles.pdf}>
            <WebView
              source={{
                uri: 'https://example.com/abc.pdf',
              }}
            />
          </View>
        )}
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
  dateContainer: {
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.lightBlue,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 5,
    height: 80,
    alignSelf: 'center',
  },
  date: {
    textAlign: 'center',
    fontSize: 15,
    color: Colors.gray,
    fontFamily: 'SofiaProMedium',
  },
  time: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.gray,
    fontFamily: 'SofiaProMedium',
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
    marginVertical: 20,
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontFamily: 'SofiaProRegular',
    color: Colors.darkGray,
    fontSize: 16,
    backgroundColor: Colors.blueGray,
  },
  image: {
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  pdf: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: width - 20,
    height: 250,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
  },
});

export default SingleNotification;
