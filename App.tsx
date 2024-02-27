import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import messaging from '@react-native-firebase/messaging';

async function onAppBootstrap() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();
  // Get the token
  const token = await messaging().getToken();
  console.log(token);
  // Save the token
  // await postToApi('/users/1234/tokens', {token});
}
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#F7F6F5',
  };
  useEffect(() => {
    onAppBootstrap();
    console.log(Platform.OS);
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#F7F6F5"
      />
      <Text>ddd</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
