import WebViewContainer from 'component/WebViewContainer';
import React, {useEffect} from 'react';
import {StackProps} from 'types/types';
export default function StackScreen({route, navigation}: StackProps) {
  const url = route.params?.url;
  const title = route.params?.title;
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title, navigation]);
  if (!url) {
    return null;
  }
  return <WebViewContainer url={url} navigation={navigation} />;
}
