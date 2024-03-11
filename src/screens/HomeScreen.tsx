import React, {useEffect, useState} from 'react';
import WebViewContainer from 'component/WebViewContainer';
import messaging from '@react-native-firebase/messaging';
import {TEST_URL} from '@env';
import {getToken} from 'utils/firebase';

export default function HomeScreen({navigation}: {navigation: any}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>(TEST_URL);
  useEffect(() => {
    const hasPermission = async () => {
      const authStatus = await messaging().hasPermission();
      switch (authStatus) {
        // 미 결정
        case messaging.AuthorizationStatus.NOT_DETERMINED:
          setUrl(`${TEST_URL}`);
          return await getToken();
        // 거부
        case messaging.AuthorizationStatus.DENIED:
          setUrl(`${TEST_URL}/dashboard`);
          return;
        //승인
        default:
          setUrl(`${TEST_URL}/check`);
          return await getToken();
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
