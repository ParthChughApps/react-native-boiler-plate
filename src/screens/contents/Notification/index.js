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
  Button,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-ui-lib';

import Separator from '../../../components/Separator';

const width = Dimensions.get('window').width;

const Notification = ({navigation}) => {
  const [isVisible, setVisible] = useState(false);
  let [selectedFilters, setSelectedFilters] = useState([]);

  // let selectedFilters =[];
  const filters = [
    'Admin',
    'New exam',
    'New video',
    'New PDF',
    'Doubt',
    'General',
    'Holiday',
    'Fees',
  ];

  const notifications = [
    {
      date: '18 JAN 9.30 PM',
      title: 'No Class on 19 Jan 2021',
      attachment: true,
      seen: true,
      seenTime: '10.50 PM. 20 Jan 2021',
      data:
        'Dear Students, please note that there Will be no class on 19th Jan 2021Dear Students, please note that there Will be no class on 19th Jan 2021Dear Students, please note that there Will be no class on 19th Jan 2021Dear Students, please note that there Will be no class on 19th Jan 2021Dear Students, please note that there Will be no class on 19th Jan 2021',
    },
    {
      date: '18 JAN 9.30 PM',
      title:
        'No Class on 19 Jan 2021No Class on 19 Jan 2021No Class on 19 Jan 2021No Class on 19 Jan 2021',
      attachment: true,
      seen: false,
      seenTime: '',
      data:
        'Dear Students, please note that there Will be no class on 19th Jan 2021',
    },
    {
      date: '18 JAN 9.30 PM',
      title: 'No Class on 19 Jan 2021',
      attachment: true,
      seen: true,
      seenTime: '10.50 PM. 20 Jan 2021',
      data:
        'Dear Students, please note that there Will be no class on 19th Jan 2021',
    },
    {
      date: '18 JAN 9.30 PM',
      title:
        'No Class on 19 Jan 2021No Class on 19 Jan 2021No Class on 19 Jan 2021No Class on 19 Jan 2021',
      attachment: true,
      seen: false,
      seenTime: '',
      data:
        'Dear Students, please note that there Will be no class on 19th Jan 2021',
    },
    {
      date: '18 JAN 9.30 PM',
      title:
        'No Class on 19 Jan 2021No Class on 19 Jan 2021No Class on 19 Jan 2021No Class on 19 Jan 2021',
      attachment: true,
      seen: false,
      seenTime: '',
      data:
        'Dear Students, please note that there Will be no class on 19th Jan 2021',
    },
    {
      date: '18 JAN 9.30 PM',
      title:
        'No Class on 19 Jan 2021No Class on 19 Jan 2021No Class on 19 Jan 2021No Class on 19 Jan 2021',
      attachment: true,
      seen: false,
      seenTime: '',
      data:
        'Dear Students, please note that there Will be no class on 19th Jan 2021',
    },
  ];

  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  const toggleFilters = filter => {
    if (selectedFilters.find(selected => selected === filter)) {
      let newArray = [];
      selectedFilters.map(selected => {
        if (selected !== filter) {
          newArray.push(selected);
        }
      });
      setSelectedFilters(newArray);
    } else {
      setSelectedFilters([...selectedFilters, filter]);
      console.log(selectedFilters);
    }
  };

  const count = () => {
    return selectedFilters.length;
  };

  const isInFilters = filter => {
    if (selectedFilters.find(filters => filters === filter)) {
      return true;
    } else {
      return false;
    }
  };

  const FiltersView = () => {
    return (
      <View>
        <Text style={styles.filterText}>Filters</Text>
        <View style={styles.filtersContainer}>
          {filters.map(filter => {
            return (
              <TouchableOpacity onPress={() => toggleFilters(filter)}>
                <Text
                  style={
                    isInFilters(filter)
                      ? styles.activeFilter
                      : styles.inActiveFilter
                  }>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.separator}>
          <Separator />
        </View>
      </View>
    );
  };

  const NotificationView = () => {
    return (
      <View>
        {notifications.map(notification => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SingleNotification', {
                  notification: notification,
                })
              }>
              <View style={styles.notificationCard}>
                <Text style={styles.date}>{notification.date}</Text>
                <View style={styles.titleContainer}>
                  <View style={styles.titleAttachmentSeen}>
                    <Text numberOfLines={1} style={styles.title}>
                      {notification.title}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      {notification.attachment && (
                        <Ionicons
                          name="attach"
                          size={20}
                          color={Colors.darkGray}
                        />
                      )}
                      {notification.seen && (
                        <Ionicons
                          name="checkmark-done"
                          size={20}
                          color={Colors.skyBlue}
                        />
                      )}
                    </View>
                  </View>
                  <Text numberOfLines={2} style={styles.data}>
                    {notification.data}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpeg')}
      style={styles.container}>
      <View style={styles.marginHorizontal10}>
        <View style={styles.textInputAndFilter}>
          <View style={styles.textInput}>
            <AntDesign name="search1" size={20} style={{marginLeft: 5}} />
            <TextInput placeholder="Search Notifications" />
          </View>
          <View>
            <View style={styles.filterIcon}>
              <AntDesign
                name="filter"
                size={25}
                onPress={() => toggleVisible()}
              />
            </View>
            {count() > 0 && <Text style={styles.countText}>{count()}</Text>}
          </View>
        </View>

        {isVisible && <FiltersView />}

        <NotificationView />
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
  textInputAndFilter: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-around',
  },
  textInput: {
    flexDirection: 'row',
    height: 40,
    width: '80%',
    alignItems: 'center',
    borderColor: Colors.darkGray,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: Colors.white,
  },
  filterIcon: {
    borderRadius: 10,
    alignSelf: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    backgroundColor: Colors.white,
  },
  filterText: {
    color: Colors.darkGray,
    fontFamily: 'SofiaProRegular',
    fontSize: 18,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inActiveFilter: {
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.skyBlue,
    color: Colors.darkGray,
    fontFamily: 'SofiaProRegular',
  },
  activeFilter: {
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: Colors.skyBlue,
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.skyBlue,
    color: Colors.white,
    fontFamily: 'SofiaProRegular',
  },
  separator: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  filterCount: {
    backgroundColor: 'red',
    marginTop: -45,
    marginLeft: 20,
    borderRadius: 15,
  },
  countText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    backgroundColor: 'red',
    marginTop: -45,
    marginLeft: 20,
    borderRadius: 15,
  },
  notificationCard: {
    flexDirection: 'row',
    borderColor: Colors.darkGray,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: '#ebf2f7',
  },
  date: {
    textAlign: 'center',
    fontSize: 15,
    width: 40,
    borderColor: Colors.gray,
    borderWidth: 1,
    color: Colors.gray,
    backgroundColor: '#f2f6f9',
    marginVertical: 10,
    marginHorizontal: 15,
    fontFamily: 'SofiaProRegular',
  },
  titleContainer: {
    flex: 1,
    marginVertical: 10,
  },
  title: {
    fontFamily: 'SofiaProRegular',
    color: Colors.skyBlue,
    fontSize: 18,
    width: '85%',
  },
  titleAttachmentSeen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  data: {
    fontFamily: 'SofiaProRegular',
    color: Colors.darkGray,
    fontSize: 16,
    width: '90%',
  },
});

export default Notification;