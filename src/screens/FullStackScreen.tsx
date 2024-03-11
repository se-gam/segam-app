import WebViewContainer from 'component/WebViewContainer';
import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {FullStackProps} from 'types/types';

export default function FullStackScreen({route, navigation}: FullStackProps) {
  const url = route.params?.url;
  if (!url) {
    return null;
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
      <WebViewContainer url={url} navigation={navigation} />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
