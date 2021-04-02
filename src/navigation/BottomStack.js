import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DrawerStack} from './DrawerStack';
import {VideoStack} from './VideoStack';
import {PDFNavigator} from './PDFStack';
import {ExamStack} from './ExamStack';
import {ProfileNavigator} from './ProfileStack';


const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: footerTabstyles.footerHref,
        inactiveTintColor: '#000000',
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
    fontSize: 9,
    color: '#000',
    fontWeight: '600',
    textTransform: 'uppercase',
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
