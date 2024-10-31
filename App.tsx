import React, { useEffect, useState } from 'react';
import MainRoute from './src/route/MainRoute';
import Route from './src/route/Route';
import { NavigationContainer } from '@react-navigation/native';
import { disableAds, fetchAvailablePurchases, get_async_data, set_async_data } from './src/Helper/AppHelper';
// import crashlytics from '@react-native-firebase/crashlytics';
import SplashScreen from 'react-native-splash-screen';
import { useAppOpenAd } from 'react-native-google-mobile-ads';
import { APPOPEN_AD_ID } from './src/Helper/AdManager';
import { ActivityIndicator, Text, View } from 'react-native';
import { lang } from './global';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useNetInfo } from '@react-native-community/netinfo';

const App = () => {
  const { isConnected } = useNetInfo();
  const [firstTime, setFirstTime] = useState(true);
  const [splashClosed, setSplashClosed] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [adDisable, setAdDisable] = useState(false);

  const { isLoaded, isClosed, load, show, error } = useAppOpenAd(APPOPEN_AD_ID, {
    requestNonPersonalizedAdsOnly: true,
  });

  const myFunc = async () => {
    let onboard = await get_async_data('on_board');
    let rate = await get_async_data('alreadyrate');
    if (rate === '' || rate == null) {
      await set_async_data('alreadyrate', '');
    }
    if (onboard != null) {
      setFirstTime(false);
    }

    if (!isConnected) {
      setTimeout(() => {
        setSplashClosed(true);
        SplashScreen.hide();
      }, 3000);
    } else {
      let purchaseHistory = await fetchAvailablePurchases();
      console.log('purchaseHistory 123:', purchaseHistory);
      if (purchaseHistory) {
        setAdDisable(true);
        setSplashClosed(true);
        SplashScreen.hide();
      } else {
        // USER NOT BUY ANY SUBSCRIPTION LOAD APP_OPEN AD
        load();
        setLoadAttempts((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await myFunc();
    })();
  }, []);

  const displayContent = () => {
    if (splashClosed) {
      return firstTime ? <Route /> : <MainRoute />;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#F8FFF8', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  };

  useEffect(() => {
    if (error && loadAttempts >= 3) {
      setSplashClosed(true);
      SplashScreen.hide();
    }

    if (adDisable) {
      setSplashClosed(true);
      SplashScreen.hide();
    }

    if (isLoaded) {
      show();
    }

  }, [isLoaded, adDisable, error, loadAttempts]);

  useEffect(() => {
    if (isClosed) {
      SplashScreen.hide();
      setSplashClosed(true);
    }
  }, [isClosed]);

  return (
    <NavigationContainer>{displayContent()}</NavigationContainer>
  );
};

export default App;
