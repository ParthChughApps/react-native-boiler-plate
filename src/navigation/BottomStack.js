import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native-ui-lib';
import {DrawerStack} from './DrawerStack';
import {VideoStack} from './VideoStack';
import {PDFNavigator} from './PDFStack';
import {ExamStack} from './ExamStack';
import {ProfileNavigator} from './ProfileStack';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Videos') {
            iconName = 'videocamera';
          } else if (route.name === 'PDF') {
            iconName = 'pdffile1';
          } else if (route.name === 'Exam') {
            iconName = 'book';
          } else if (route.name === 'Me') {
            iconName = 'user';
          }
          return <AntDesign name={iconName} size={21} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: footerTabstyles.footerHref,
        activeTintColor: Colors.skyBlue,
        tabStyle: {paddingVertical: 10},
        style: {height: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={DrawerStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Videos"
        component={VideoStack}
        options={{
          tabBarLabel: 'Videos',
        }}
      />
      <Tab.Screen
        name="PDF"
        component={PDFNavigator}
        options={{
          tabBarLabel: 'PDF',
          tabBarBadgeStyle: footerTabstyles.footerCount,
        }}
      />
      <Tab.Screen
        name="Exam"
        component={ExamStack}
        options={{
          // tabBarBadge: '2',
          tabBarLabel: 'Exam',
          tabBarBadgeStyle: footerTabstyles.footerCount,
        }}
      />
      <Tab.Screen
        name="Me"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Me',
        }}
      />
    </Tab.Navigator>
  );
};
const footerTabstyles = StyleSheet.create({
  footerHref: {
    fontSize: 11,
    marginTop: 2,
    textTransform: 'uppercase',
    fontFamily: 'SofiaProRegular',
  },
  footerIconImg: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    marginBottom: 3,
    position: 'relative',
    height: 23,
  },
  footerCount: {
    width: 18,
    height: 18,
    color: '#FFF',
    borderRadius: 50,
    top: -5,
    right: -10,
    fontSize: 9,
  },
});
