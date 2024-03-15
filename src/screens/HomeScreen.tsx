import React, {useEffect, useState} from 'react';
import WebViewContainer from 'component/WebViewContainer';
import messaging from '@react-native-firebase/messaging';
import {NEXT_URL} from '@env';

export default function HomeScreen({navigation}: {navigation: any}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    const hasPermission = async () => {
      const authStatus = await messaging().hasPermission();
      switch (authStatus) {
        //승인
        case messaging.AuthorizationStatus.AUTHORIZED ||
          messaging.AuthorizationStatus.PROVISIONAL:
          setUrl(`${NEXT_URL}/check`);
          break;
        default:
          setUrl(`${NEXT_URL}`);
          break;
      }
    };
    const onAppBootstrap = async () => {
      await hasPermission();
      setIsLoading(false);
    };
    onAppBootstrap();
  }, []);

  if (isLoading) {
    return null;
  }
  return <WebViewContainer navigation={navigation} url={url} />;
}
