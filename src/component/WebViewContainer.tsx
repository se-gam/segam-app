import React, {useContext, useEffect, useRef, useState} from 'react';
import {StackActions} from '@react-navigation/native';
import {KeyboardAvoidingView, StyleSheet, ViewStyle} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {PermissionsAndroid} from 'react-native';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {getToken} from 'utils/firebase';
import CookieManager from '@react-native-cookies/cookies';
import AppContext from 'AppContext';

function WebViewContainer({
  navigation,
  url,
}: {
  url: string;
  navigation: any;
  containerStyle?: ViewStyle;
}) {
  const [currentUrl, setCurrentUrl] = useState<string>(url);
  const {isUpdated, setIsUpdated} = useContext(AppContext) || {}; // Add null check
  const requestIOSUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      return getToken();
    }
  };
  const requestAndroidUserPermission = async () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return getToken();
  };
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      return requestIOSUserPermission();
    } else {
      return requestAndroidUserPermission();
    }
  };

  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);
    switch (nativeEvent.type) {
      case 'PUSH':
        const path: string = nativeEvent.path;
        const screen: string = nativeEvent.screen;
        if (screen === 'inquiry') {
          const pushAction = StackActions.push('FullStack', {
            url: `${path}`,
            isStack: true,
          });
          navigation.dispatch(pushAction);
          return;
        }
        let pushAction = StackActions.push('FullStack', {
          url: `${path}`,
          isStack: true,
        });
        navigation.dispatch(pushAction);
        return;
      case 'BACK':
        const popAction = StackActions.pop();
        navigation.dispatch(popAction);
        return;
      case 'UPDATE':
        const pop = StackActions.pop();
        setIsUpdated(true);
        navigation.dispatch(pop);
        return;
      case 'PERMISSION':
        await requestUserPermission();
        setCurrentUrl(nativeEvent.path);
        return;
      case 'LOGOUT':
        setCurrentUrl(nativeEvent.path);
        CookieManager.clearAll();
        return;

      default:
        return;
    }
  };
  const ref = useRef<WebView>(null);
  useEffect(() => {
    if (isUpdated) {
      ref.current?.reload();
      setIsUpdated(false);
    }
  }, [isUpdated, setIsUpdated]);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <WebView
        source={{
          uri: currentUrl,
        }}
        ref={ref}
        style={styles.container}
        onMessage={requestOnMessage}
        startInLoadingState={true}
        sharedCookiesEnabled={true}
        scrollEnabled={false}
        overScrollMode="never"
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default WebViewContainer;
