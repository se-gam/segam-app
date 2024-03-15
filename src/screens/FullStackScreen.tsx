import WebViewContainer from 'component/WebViewContainer';
import React from 'react';
import {FullStackProps} from 'types/types';

export default function FullStackScreen({route, navigation}: FullStackProps) {
  const url = route.params?.url;
  if (!url) {
    return null;
  }
  return <WebViewContainer url={url} navigation={navigation} />;
}
