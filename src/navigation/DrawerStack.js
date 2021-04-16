import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeNavigator} from './HomeStack';
import {VideoStack} from './VideoStack';
import {PDFNavigator} from './PDFStack';
import {ExamStack} from './ExamStack';
import {ProfileNavigator} from './ProfileStack';
import CustomSidebarMenu from './CustomSidebarMenu';

import {Colors} from 'react-native-ui-lib';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: Colors.skyBlue,
        labelStyle: {
          fontFamily: 'SofiaProRegular',
          fontSize: 15,
        },
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Videos" component={VideoStack} />
      <Drawer.Screen name="PDF" component={PDFNavigator} />
      <Drawer.Screen name="Exam" component={ExamStack} />
      <Drawer.Screen name="Profile" component={ProfileNavigator} />
    </Drawer.Navigator>
  );
};
