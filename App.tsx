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
  const [firstTime, setfirstTime] = useState(true);
  const [splashClosed, setsplashClosed] = useState(false);
  const [adDisable, setadDisable] = useState(false);
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
        setsplashClosed(true);
        SplashScreen.hide();
      }
    })();
  }, [isClosed]);

  useEffect(() => {
    (async () => {
      if (isLoaded) {
        if(adDisable) {
          setsplashClosed(true);
          SplashScreen.hide();
        } else{
          console.log('Ad Loaded inside App.js');
          show();
          setsplashClosed(true);
        }
      } else {
        console.log('Ad not Loaded inside App.js', error);
        // if(adDisable) {
        //   setsplashClosed(true);
        //   SplashScreen.hide();
        // }
        if (error != undefined && loadAttempts >= 2) {
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
    (async () => {
      SystemNavigationBar.stickyImmersive();

      // CHECK FOR SUBSCRIPTION HERE
      let purchaseHistory = await fetchAvailablePurchases(isConnected);
      console.log('purchaseHistory :', purchaseHistory, purchaseHistory.length);
      if(purchaseHistory.length > 0) {
        setadDisable(true);
      }
      // crashlytics().log('App crashes');
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
      return (
        <View style={{ flex: 1, backgroundColor: '#F8FFF8', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>);
    }
  };

  return (
    <>
      <NavigationContainer>{displayContent()}</NavigationContainer>
    </>
  );
};

export default App;