/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import messaging from '@react-native-firebase/messaging';
import './i18n';
import {name as appName} from './app.json';

// Register background handler

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
