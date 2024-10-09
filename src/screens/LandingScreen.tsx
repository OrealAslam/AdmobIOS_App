import { View, AppState, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import BottomMenu from '../components/BottomMenu';
import { useIsFocused } from '@react-navigation/native';
// import TimeZone from 'react-native-timezone';
import { useRoute } from '@react-navigation/native';
// import Screens here ...
import Dashboard from './ScreenComonents/Dashboard/Dashboard';
import TrackerScreen from './ScreenComonents/Tracker/TrackerScreen';
import CalorieTab from './ScreenComonents/CalorieCounter/CalorieTab';
import HealthScreen from './ScreenComonents/Health/HealthScreen';
import Settings from './ScreenComonents/Settings/Settings';
import DisplayAd from '../components/DisplayAd';
import { get_async_data, set_async_data, weather_api_request } from '../Helper/AppHelper';
import { INTERSITIAL_AD_ID } from '../Helper/AdManager';
import { AppOpenAd } from '../Helper/AppOpenAd';

const LandingScreen = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);
  const route = useRoute();
  const [selectedmenu, setselectedmenu] = useState('home');
  const [loader, setloader] = useState(false);
  const [temperature, settemperature] = useState('');
  const [trayad, settrayad] = useState(false);
  const navigateScreen = (screenName: any, menu: any) => {
    try {
      navigation.navigate(screenName);
    } catch (error) {
      console.log('error', error);
      return;
    }
  };

  useEffect(() => {
    (async () => {
      // await set_async_data('hide_ad', 'unhide');
      // await set_async_data('hide_ad', 'hide');
      // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // if (timeZone != null || timeZone != undefined) {
      //   let area = timeZone.split('/');
      //   let res = await weather_api_request(area[1]);
      //   settemperature(res.current.temp_f);
      // }
    })();
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    if (route.params != undefined) {
      let selectedTab = route.params?.tab;

      if (selectedTab != '') {
        setselectedmenu(selectedTab);
      } else {
        setselectedmenu('insight');
      }
    } else {
      console.log('bottom menu placed');
    }
  }, [isFocused]);

  useEffect(() => {
    component();
  }, [selectedmenu]);

  const handleAppStateChange = async (nextAppState: any) => {
    let adStatus = await get_async_data('hide_ad');
    if (nextAppState === 'active') {
      if (adStatus == 'hide') {
        console.log('hide tha unhide hogya');
        await set_async_data('hide_ad', 'unhide');
        settrayad(false);
      }
      if (adStatus == 'unhide') {
        settrayad(true);
      }
    }
  };

  const component = () => {
    switch (selectedmenu) {
      case 'home':
        return (
          <Dashboard
            navigateScreen={navigateScreen}
            setselectedmenu={setselectedmenu}
            temperature={temperature}
          />
        );
        break;
      case 'tracker':
        return (
          <TrackerScreen
            navigation={navigation}
            setloader={setloader}
            loader={loader}
          />
        );
        break;
      case 'calorie':
        return (
          <CalorieTab
            navigation={navigation}
            setloader={setloader}
            loader={loader}
          />
        );
        break;
      case 'insight':
        return <HealthScreen navigation={navigation} />;
        break;
      case 'profile':
        return <Settings navigateScreen={navigateScreen} />;
        break;
      default:
        return (
          <Dashboard
            navigateScreen={navigateScreen}
            setselectedmenu={setselectedmenu}
            temperature={temperature}
          />
        );
    }
  };

  const _continue = async () => {
    setloader(false);
    navigation.navigate('HomeScreen', { tab: 'tracker' });
  };

  return <>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {component()}
      <BottomMenu
        setselectedmenu={setselectedmenu}
        selectedmenu={selectedmenu}
      />
    </SafeAreaView>
    {loader && <DisplayAd setloader={setloader} _continue={_continue} />}
    {trayad && (
      <DisplayAd _continue={() => settrayad(false)} adId={INTERSITIAL_AD_ID} />
      // <AppOpenAd settrayad={settrayad} _continue={()=>navigation.navigate('HomeScreen', { tab: 'home' })}/>
    )}
  </>;
};
export default LandingScreen;
