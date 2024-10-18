import React, { useEffect, useState } from 'react';
import MainRoute from './src/route/MainRoute';
import Route from './src/route/Route';
import { NavigationContainer } from '@react-navigation/native';
import { useNetInfo } from "@react-native-community/netinfo";
import { fetchAvailablePurchases, get_async_data, set_async_data } from './src/Helper/AppHelper';
// import crashlytics from '@react-native-firebase/crashlytics';
import { withIAPContext } from 'react-native-iap';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import SplashScreen from 'react-native-splash-screen';
import { useAppOpenAd } from 'react-native-google-mobile-ads';
import { APPOPEN_AD_ID } from './src/Helper/AdManager';
import { Text, View } from 'react-native';
import { lang } from './global';

const App = () => {
  const { isConnected } = useNetInfo();
  const [firstTime, setfirstTime] = useState(true);
  const [splashClosed, setsplashClosed] = useState(false);
  const [showappopen, setshowappopen] = useState(null);
  const { isLoaded, isClosed, load, show, error } = useAppOpenAd(APPOPEN_AD_ID, {
    requestNonPersonalizedAdsOnly: true,
  });
  const [loadAttempts, setLoadAttempts] = useState(0);

  useEffect(() => {
    (async () => {
      SystemNavigationBar.stickyImmersive();

      // CHECK FOR SUBSCRIPTION HERE
      let purchaseHistory = await fetchAvailablePurchases(isConnected);
      // FIRST TIME / REGULAR USER 
      // console.log('PURCHASES :- ', purchaseHistory.length.toString());
      let onboard = await get_async_data('on_board');

      if (purchaseHistory.length > 0) {
        // It's mean subscription already buy
        if (onboard != null) { // check for a regular user
          setfirstTime(false);
        }
        SplashScreen.hide();
        setsplashClosed(true);
      } else {
        // IT'S MEAN USER DIDN'T BUY SUBSCRIPTION YET
        console.log('subs not buy yet');
        if (!isLoaded && loadAttempts < 2) {
          load();
          setLoadAttempts(loadAttempts + 1);
        }
      }

    })()
  }, [])

  useEffect(() => {
    displayContent();
  }, [splashClosed]);

  useEffect(() => {
    if (loadAttempts < 2) {
      load();
    }
  }, [load]);

  useEffect(() => {
    (async () => {
      if (isClosed) {
        await set_async_data('hide_ad', 'hide');
        setsplashClosed(true);
        // SplashScreen.hide();
      }
    })();
  }, [isClosed]);

  useEffect(() => {
    if (error && loadAttempts >= 2) {
      console.log(`Facing ${loadAttempts} error while displaying App Open Ad`, error);
      SplashScreen.hide();
      setsplashClosed(true);
    } else {
      console.log(`Facing ${loadAttempts} error while displaying App Open Ad`, error);
      load();
      setsplashClosed(false);
      SplashScreen.show();
    }
  }, [error]);

  useEffect(() => {
    console.log('LOAD STATUS :', isLoaded);
    if (isLoaded) {
      show();
      SplashScreen.hide();
      setsplashClosed(true);
    }
  }, [isLoaded]);

  const displayContent = () => {
    if (splashClosed == true) {
      if (firstTime == false) {
        return <MainRoute></MainRoute>;
      } else {
        return <Route></Route>;
      }
    } else {
      return <View style={{ flex: 1, backgroundColor: '#f00', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 38, color: 'red' }}>Loading App</Text>
      </View>;
    }
  };

  return (
    <>
      <NavigationContainer>{displayContent()}</NavigationContainer>
    </>
  );
};

export default withIAPContext(App);