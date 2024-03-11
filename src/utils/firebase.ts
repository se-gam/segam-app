import {TEST_URL} from '@env';
import CookieManager from '@react-native-cookies/cookies';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

export const getToken = async () => {
  try {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
    const fcmToken = await messaging().getToken();
    const os = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
    CookieManager.set(TEST_URL, {
      name: 'pushToken',
      value: fcmToken,
      path: '/',
    });
    CookieManager.set(TEST_URL, {
      name: 'os',
      value: os,
      path: '/',
    });
  } catch (e) {}
};
