import {NEXT_URL} from '@env';
import CookieManager from '@react-native-cookies/cookies';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

export const getToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    CookieManager.set(NEXT_URL, {
      name: 'pushToken',
      value: fcmToken,
      path: '/',
    });
    CookieManager.set(NEXT_URL, {
      name: 'os',
      value: Platform.OS.toUpperCase(),
      path: '/',
    });
  } catch (e) {}
};
