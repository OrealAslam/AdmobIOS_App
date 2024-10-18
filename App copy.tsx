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
    console.log('use first stmt : ', showappopen)
    if (showappopen == false) {
      // hide AppOpen if user buy subscription
      SplashScreen.hide();
      setsplashClosed(true);
    } else {
      if (!isLoaded && loadAttempts < 2) {
        load();
        console.log('loadAttempts', loadAttempts);
        setLoadAttempts(loadAttempts + 1);
        console.log(error)
      } else {
        if(isLoaded) {
          show();
        }
      }
    }
  }, [load, isLoaded, loadAttempts, showappopen]);

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
    (async () => {
      if (isLoaded && showappopen) {
        // console.log('Ad Loaded inside App.js');
        show();
        setsplashClosed(true);
      } else {
        console.log('Ad not Loaded inside App.js', error);
        if (error != undefined || loadAttempts >= 2 || showappopen == false) {
          setsplashClosed(true);
          SplashScreen.hide();
        }
      }
    })();
  }, [isLoaded, showappopen]);

  useEffect(() => {
    if (error != undefined && loadAttempts >= 2) {
      console.log('app opn error', error);
      setsplashClosed(true);
      // SplashScreen.hide();
    }
  }, [error]);

  useEffect(() => {
    (async () => {
      SystemNavigationBar.stickyImmersive();
      let purchaseHistory = await fetchAvailablePurchases(isConnected);
      console.log('SUBSCRIBE LENGTH', purchaseHistory.length)
      // crashlytics().log('App crashes');
      if (purchaseHistory.length > 0) { // for testing purpose set it to == 0
        setshowappopen(false);
        setsplashClosed(true);
      } else{
        setshowappopen(true);
        setsplashClosed(false);
      }
      let onboard = await get_async_data('on_board');
      let rate = await get_async_data('alreadyrate');
      if (rate && rate == 'rated') {
        await set_async_data('alreadyrate', 'rated');
      } else {
        await set_async_data('alreadyrate', '');
      }
      if (onboard != null) {
        setfirstTime(false);
      }
    })();
  }, []);

  useEffect(() => {
    displayContent();
  }, [splashClosed]);

  const displayContent = () => {
    if (splashClosed == true) {
      if (firstTime == false) {
        return <MainRoute></MainRoute>;
      } else {
        return <Route></Route>;
      }
    } else {
      return <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 38, color: 'red' }}>Here is blank screen</Text>
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