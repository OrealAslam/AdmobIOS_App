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
  const [adDisable, setAdDisable] = useState(false);
  const { isLoaded, isClosed, load, show, error } = useAppOpenAd(APPOPEN_AD_ID, {
    requestNonPersonalizedAdsOnly: true,
  });
  const [loadAttempts, setLoadAttempts] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      console.log('initializing app');
      // Fetch purchase history and determine ad status
      let purchaseHistory = await fetchAvailablePurchases(isConnected);
      console.log('purchaseHistory', purchaseHistory);
      const hasPurchase = purchaseHistory.length > 0;
      setAdDisable(hasPurchase);

      // Proceed with showing ads or bypassing based on purchase status
      if (hasPurchase) {
        setSplashClosed(true);
        SplashScreen.hide();
      } else {
        SystemNavigationBar.stickyImmersive();

        let onboard = await get_async_data('on_board');
        let rate = await get_async_data('alreadyrate');
        if (rate && rate === 'rated') {
          await set_async_data('alreadyrate', 'rated');
        } else {
          await set_async_data('alreadyrate', '');
        }
        if (onboard != null) {
          setFirstTime(false);
        }
        // If no purchase history, try to load the AppOpenAd only if internet connection...
        if (!isConnected) {
          SplashScreen.hide();
          setSplashClosed(true);
        } else {
          if (!isLoaded && loadAttempts < 2) {
            load();
            setLoadAttempts(loadAttempts + 1);
          }
        }
      }
    };

    // Initialize app only after purchase history is fetched
    initializeApp();
  }, []);

  useEffect(() => {
    // Display ad only if it’s loaded and no purchase found
    if (isLoaded && !adDisable) {
      show();
      setSplashClosed(true);
    } else if (error && loadAttempts >= 2 || adDisable) {
      setSplashClosed(true);
      SplashScreen.hide();
    }
  }, [isLoaded, adDisable, error]);

  useEffect(() => {
    if (isClosed) {
      setSplashClosed(true);
      SplashScreen.hide();
    }
  }, [isClosed]);

  useEffect(() => {
    if (error && loadAttempts >= 2) {
      setSplashClosed(true);
      SplashScreen.hide();
    }
  }, [error]);

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

  return (
    <NavigationContainer>{displayContent()}</NavigationContainer>
  );
};

export default App;
