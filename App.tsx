import React, { useEffect, useState } from 'react';
import MainRoute from './src/route/MainRoute';
import Route from './src/route/Route';
import { NavigationContainer } from '@react-navigation/native';
import { disableAds, fetchAvailablePurchases, get_async_data, set_async_data } from './src/Helper/AppHelper';
import SplashScreen from 'react-native-splash-screen';
import { useAppOpenAd } from 'react-native-google-mobile-ads';
import { APPOPEN_AD_ID } from './src/Helper/AdManager';
import { ActivityIndicator, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const MAX_LOAD_ATTEMPTS = 2; // Maximum ad loading attempts

const App = () => {
  const [firstTime, setFirstTime] = useState(true);
  const [splashClosed, setSplashClosed] = useState(false);
  const [subscribed, setsubscribed] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [adDisable, setAdDisable] = useState(false);

  const { isLoaded, isClosed, load, show, error } = useAppOpenAd(APPOPEN_AD_ID, {
    requestNonPersonalizedAdsOnly: true,
  });

  const main = async () => {
    const state = await NetInfo.fetch();
    let onboard = await get_async_data('on_board');
    let rate = await get_async_data('alreadyrate');
    let activeSubscription = await get_async_data('subscription_active');
    setsubscribed(activeSubscription);
    if (rate === '' || rate == null) {
      await set_async_data('alreadyrate', '');
    }
    if (onboard != null) {
      setFirstTime(false);
    }
    
    if (!state.isConnected || subscribed == true) {
      setSplashClosed(true);
      SplashScreen.hide();
    } else {
      let purchaseHistory = await fetchAvailablePurchases();
      setTimeout(() => {
        if (purchaseHistory) {
          setAdDisable(true);
          setSplashClosed(true);
          SplashScreen.hide();
        } else {
          loadAdWithRetry(); // Attempt to load the ad
        }
      }, 4000);
    }
  };

  const loadAdWithRetry = () => {
    if (isLoaded) {
      show();
    } else {
      if (!isLoaded && loadAttempts < MAX_LOAD_ATTEMPTS) {
        setLoadAttempts(loadAttempts + 1);
        load();
        console.log(`loading again`);
      }
      if (error || error == undefined && loadAttempts > MAX_LOAD_ATTEMPTS) {
        setSplashClosed(true);
        SplashScreen.hide();
      }
    }
  };

  useEffect(() => {
    main();
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

    // console.log('----------------------------------');
    // console.log(isLoaded, adDisable, error, loadAttempts);
    // console.log('----------------------------------');
    if(!isClosed) {
      loadAdWithRetry();
    }
  }, [isLoaded, adDisable, error, load]);

  useEffect(() => {
    if (isClosed) {
      setSplashClosed(true);
      SplashScreen.hide();
    }
  }, [isClosed]);

  return (
    <NavigationContainer>{displayContent()}</NavigationContainer>
  );
};

export default App;
