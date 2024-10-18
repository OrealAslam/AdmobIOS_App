import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Recomandations from '../../components/Recomandations';
import { REPORT_TYPES, disableAds, get_report, set_async_data } from '../../Helper/AppHelper';
import LineChartAdComponent from './components/LineChartAdComponent';
import PieChartAdComponent from './components/PieChartAdComponent';
// import analytics from '@react-native-firebase/analytics';
import { lang } from '../../../global';
import { NativeAd150 } from '../../Helper/NativeAd150';
import { INTERSITIAL_AD_ID, NATIVE_AD_ID_ONE } from '../../Helper/AdManager';
import DisplayAd from '../../components/DisplayAd';

const { width, height } = Dimensions.get('window');
const itemWidth = width - 80;
const ratio = itemWidth / 1140;

const TemperatureResultScreen = ({ navigation }: { navigation: any }) => {
  const [hidead, sethidead] = useState(true);
  const [loader, setloader] = useState(false);
  const [language, setlanguage] = useState({
    dashobard: { temperature: '', bsrestitle: '', recommended: '' },
    main: { add: '', unlock: '' },
    tracker: {
      bsChartText: '',
      bsCharAddtText: '',
    },
    article: { articledata: {} },
  });
  const [langstr, setlangstr] = useState({
    dashobard: { temperature: '', bsrestitle: '', recommended: '' },
    main: { add: '', unlock: '' },
    tracker: {
      bsChartText: '',
      bsCharAddtText: '',
    },
    article: { articledata: {} },
  });
  const [data, setdata] = useState(['', '']);

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('temperature_result_screen');
        let lan = await lang();
        let res = await disableAds();
        sethidead(res);
        setlanguage(lan);
        let response = await get_report(REPORT_TYPES.temperature);
        if (response) {
          if (response.length > 0) {
            let latest = response[0].temperature;
            let unit = response[0].note;
            setdata([latest, unit]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName, {
      tab: 'insight',
    });
  };

  const _continue = async () => {
    setloader(false);
    navigation.navigate('TemperatureResultScreen');
  };
  const showAd = async (type: any) => {
    setloader(true);
    if (type == 'line') {
      await set_async_data('line_chart_temp_ad', 'seen');
    } else {
      await set_async_data('pie_chart_temp_ad', 'seen');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          {hidead.toString() == 'false' ?
            <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
              <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../assets/images/premium.png')} />
            </TouchableOpacity> : <></>
          }
        </View>
        <ScrollView style={{ flex: 1 }}>
          <LineChartAdComponent
            navigation={navigation}
            langstr={langstr}
            showAd={showAd}
            loader={loader}
            hidead={hidead}
          />
          <View style={styles.NativeAd}>
            {hidead.toString() == 'false' ? <NativeAd150 /> : <></>}
          </View>
          <PieChartAdComponent
            navigation={navigation}
            langstr={langstr}
            showAd={showAd}
            loader={loader}
            hidead={hidead}
          />
          {/* <View style={[styles.NativeAd, { marginTop: 20 }]}>
            <NativeAd150 adId={NATIVE_AD_ID_TWO} />
          </View> */}
          <View style={styles.recomandation}>
            <Recomandations
              putScreen={'HomeScreen'}
              navigateScreen={navigateScreen}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {loader && (
        <DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 15,
  },
  colouredBg: {
    width: width * 0.87,
    alignSelf: 'center',
    backgroundColor: '#F4F5F6',
    borderRadius: 12,
    paddingTop: 10,
    marginBottom: 15,
  },
  title: {
    alignSelf: 'center',
    color: '#2E2E2E',
    fontSize: 14,
  },
  NativeAd: {
    width: width * 0.87,
    alignSelf: 'center',
    backgroundColor: '#F0FEF0',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#C9E9BC'
  },
  recomandation: {
    width: width,
    marginBottom: 15,
  },
});
export default TemperatureResultScreen;
