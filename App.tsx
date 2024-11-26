import React, { useEffect, useState } from 'react';
import MainRoute from './src/route/MainRoute';
import Route from './src/route/Route';
import { NavigationContainer } from '@react-navigation/native';
import { get_async_data, set_async_data } from './src/Helper/AppHelper';
import SplashScreen from 'react-native-splash-screen';
import { ActivityIndicator, View } from 'react-native';

const App = () => {
  const [firstTime, setFirstTime] = useState(true);
  const [splashClosed, setSplashClosed] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    (async () => {
      // Retrieve data asynchronously
      let onboard = await get_async_data('on_board');
      let rate = await get_async_data('alreadyrate');

      // Set 'alreadyrate' if it's empty or null
      if (rate === '' || rate == null) {
        await set_async_data('alreadyrate', '');
      }

      // Determine if it's the user's first time
      if (onboard != null) {
        setFirstTime(false);
      }

      // Wait for at least 3 seconds before hiding the splash screen
      timeoutId = setTimeout(() => {
        console.log('setTimeout called');
        setSplashClosed(true);
      }, 3000);
    })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (splashClosed) {
      try {
        console.log('Hiding Splash Screen -> inside useEffect');
        SplashScreen.hide();
      } catch (error) {
        console.error('Error hiding splash screen:', error);
      }
    }
  }, [splashClosed]);

  const displayContent = () => {
    if (splashClosed) {
      return firstTime ? <Route /> : <MainRoute />;
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  return (
    <NavigationContainer>{displayContent()}</NavigationContainer>
  );
};

export default App;
