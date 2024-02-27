/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
Platform.OS === 'android' &&
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
messaging().setBackgroundMessageHandler(async msg => {
  console.log(msg);
});

AppRegistry.registerComponent(appName, () => App);
