import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import LineChartAdComponent from './components/LineChartAdComponent';
import PieChartAdComponent from './components/PieChartAdComponent';
import Recomandations from '../../components/Recomandations';
// import { NativeAd150 } from '../../Helper/NativeAd150';
import { REPORT_TYPES, disableAds, get_report, set_async_data } from '../../Helper/AppHelper';
// import analytics from '@react-native-firebase/analytics';
import { lang } from '../../../global';
import {
  INTERSITIAL_AD_ID,
  NATIVE_AD_ID_ONE,
  REWARED_AD_ID,
  // NATIVE_AD_ID_TWO,
} from '../../Helper/AdManager';
import DisplayRewardedAd from '../../components/DisplayRewardedAd';
import RateUs from '../../components/RateUs';
import DisplayAd from '../../components/DisplayAd';

const { width, height } = Dimensions.get('window');
const itemWidth = width - 80;
const ratio = itemWidth / 1140;

const BpResultScreen = ({ navigation }: { navigation: any }) => {
  // const [hidead, sethidead] = useState(true);
  const [chartPercentage, setchartPercentage] = useState(8);
  const [pressurelevel, setpressurelevel] = useState('Normal');
  const [data, setdata] = useState(['', '']);
  const [loader, setloader] = useState(false);
  const [unlockadtype, setunlockadtype] = useState('');
  const [back, setback] = useState(false);
  const [rate, showrate] = useState(false);
  const [language, setlanguage] = useState({
    dashobard: { bp: '', bprestitle: '', recommended: '' },
    main: { add: '', unlock: '' },
    tracker: {
      bpChartText: '',
      bpCharAddtText: '',
      bsChartText: '',
      bsCharAddtText: '',
      bmiChartText: '',
      bmiChartAddText: '',
    },
    article: { articledata: {} },
  });
  const [langstr, setlangstr] = useState({
    dashobard: { bp: '', bprestitle: '', recommended: '' },
    main: { add: '', unlock: '' },
    tracker: {
      bpChartText: '',
      bpCharAddtText: '',
      bsChartText: '',
      bsCharAddtText: '',
      bmiChartText: '',
      bmiChartAddText: '',
    },
    article: { articledata: {} },
  });

  const adjustBar = useMemo(() => {
    let sys = parseInt(data[0]);
    let dis = parseInt(data[1]);

    if (sys > 180 || dis > 120) {
      setpressurelevel('Hypertensive');
      setchartPercentage(78);
      return;
    }else if ((sys >= 140 && sys <= 180) || (dis >= 90 && dis <= 120)) {
      setpressurelevel('Hypertension-Stage 2');
      setchartPercentage(63);
      return;
    } else if ((sys >= 130 && sys <= 139) || (dis >= 80 && dis <= 89)) {
      setpressurelevel('Hypertension-Stage 1');
      setchartPercentage(49);
      return;
    } else if (sys >= 120 && sys <= 129 && dis >= 60 && dis <= 79) {
      setpressurelevel('Elevated');
      setchartPercentage(34);
      return;
    } else if (sys >= 90 && sys <= 119 && dis >= 60 && dis <= 79) {
      setchartPercentage(18);
      setpressurelevel('Normal');
      return;
    } else {
      setpressurelevel('Hypotension');
      setchartPercentage(3);
      return;
    }
  }, [data]);


  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('bp_result_screen');
        let lan = await lang();
        // let res = await disableAds();
        // sethidead(res);
        setlanguage(lan);
        let response = await get_report(REPORT_TYPES.bp);
        if (response) {
          if (response.length > 0) {
            setdata([
              response[response.length - 1].systolic_pressure,
              response[response.length - 1].diastolic_pressure,
            ]);
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
    if (back == true) {
      setback(false);
      navigation.navigate('HomeScreen', { tab: 'home' });
    } else {
      navigation.navigate('BpResultScreen');
      showrate(true);
    }
  };

  const showAd = async (type: any) => {
    await set_async_data('hide_ad', 'hide'); // purposly to hide tary ad
    setloader(true);
    if (type == 'line') {
      await set_async_data('line_chart_bp_ad', 'seen');
    } else {
      await set_async_data('pie_chart_bp_ad', 'seen');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          {/* {!hidead && (<TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
            <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../assets/images/premium.png')} />
          </TouchableOpacity>)} */}
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.colouredBg}>
            <TouchableOpacity
              style={styles.ibutton}
              onPress={() =>
                Linking.openURL('https://medlineplus.gov/vitalsigns.html')
              }>
              <Image
                style={{ width: 25, height: 20 }}
                source={require('../../assets/images/ibutton.png')}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{langstr.dashobard.bprestitle}</Text>
            <View style={{ marginVertical: 25 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 18,
                  color: '#5F5F5F',
                  marginBottom: 15,
                }}>
                {pressurelevel}
              </Text>
              <Image
                style={{
                  alignSelf: 'center',
                  width: itemWidth,
                  height: 68 * ratio,
                }}
                source={require('../../assets/images/barchart.png')}
              />
              <Image
                style={{
                  width: 17,
                  height: 14,
                  marginLeft: 23,
                  position: 'relative',
                  top: 7,
                  left: `${chartPercentage}%`,
                }}
                source={require('../../assets/icons/pointer.png')}
              />
            </View>
          </View>

          <LineChartAdComponent
            navigation={navigation}
            langstr={langstr}
            showAd={showAd}
            loader={loader}
            // hidead={hidead}
            rate={rate}
          />
          <View style={styles.NativeAd}>
            {/* {!hidead && <NativeAd150 />} */}
          </View>
          <PieChartAdComponent
            navigation={navigation}
            langstr={langstr}
            showAd={showAd}
            loader={loader}
            // hidead={hidead}
            rate={rate}
          />

          <View style={styles.recomandation}>
            <Recomandations
              putScreen={'HomeScreen'}
              navigateScreen={navigateScreen}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {loader && (
        // <DisplayRewardedAd _continue={_continue} adId={REWARED_AD_ID} />
        <DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID} />
      )}
      {rate && <RateUs showrate={showrate} />}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#F8FFF8',
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
    backgroundColor: '#F0FEF0',
    borderRadius: 12,
    paddingTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#C9E9BC'
  },
  title: {
    alignSelf: 'center',
    color: '#5E9368',
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
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
  ibutton: {
    alignSelf: 'flex-end',
    top: -9,
  },
});
export default BpResultScreen;