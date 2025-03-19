import React, { useEffect, useState } from 'react';
import MainRoute from './src/route/MainRoute';
import Route from './src/route/Route';
import { NavigationContainer } from '@react-navigation/native';
import { get_async_data, set_async_data } from './src/Helper/AppHelper';
import SplashScreen from 'react-native-splash-screen';
import { ActivityIndicator, View } from 'react-native';
import { useAppOpenAd } from 'react-native-google-mobile-ads';
import { APPOPEN_AD_ID } from './src/Helper/AdManager';

const App = () => {
  const [firstTime, setFirstTime] = useState(true);
  const [splashClosed, setsplashClosed] = useState(false);
  const { isLoaded, isClosed, load, show, error } = useAppOpenAd(APPOPEN_AD_ID, {
    requestNonPersonalizedAdsOnly: true,
  });
  const [loadAttempts, setLoadAttempts] = useState(0);

  useEffect(() => {
    if (!isLoaded && loadAttempts < 2) {
      load();
      console.log('loadAttempts', loadAttempts);
      setLoadAttempts(loadAttempts + 1);
      console.log(error)
    }
  }, [load, isLoaded, loadAttempts]);

  useEffect(() => {
    (async () => {
      if (isClosed) {
        await set_async_data('hide_ad', 'hide');
        setsplashClosed(true);
        SplashScreen.hide();
      }
    })();
  }, [isClosed]);

  useEffect(() => {
    (async () => {
      if (isLoaded) {
        // console.log('Ad Loaded inside App.js');
        show();
        setsplashClosed(true);
      } else {
        console.log('Ad not Loaded inside App.js', error);
        if (error != undefined || loadAttempts >= 2) {
          setsplashClosed(true);
          SplashScreen.hide();
        }
      }
    })();
  }, [isLoaded]);

  useEffect(() => {
    if (error != undefined && loadAttempts >= 2) {
      console.log('app opn error', error);
      SplashScreen.hide();
      setsplashClosed(true);
    }
  }, [error]);

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
        setsplashClosed(true);
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