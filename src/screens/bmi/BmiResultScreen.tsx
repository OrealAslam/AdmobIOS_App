import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import React, { useState, useEffect } from 'react';
import { REPORT_TYPES, disableAds, get_report, set_async_data } from '../../Helper/AppHelper';
import PageHeader from './components/PageHeader';
import { NativeAd150 } from '../../Helper/NativeAd150';
import LineChartAdComponent from './components/LineChartAdComponent';
import PieChartAdComponent from './components/PieChartAdComponent';
import Recomandations from '../../components/Recomandations';
import { useIsFocused } from '@react-navigation/native';
import { lang } from '../../../global';
import {
  INTERSITIAL_AD_ID,
  NATIVE_AD_ID_ONE,
  NATIVE_AD_ID_TWO,
  REWARED_AD_ID,
} from '../../Helper/AdManager';
import DisplayRewardedAd from '../../components/DisplayRewardedAd';
import DisplayAd from '../../components/DisplayAd';

const { width, height } = Dimensions.get('window');
const itemWidth = width - 80;
const ratio = itemWidth / 1140;

const BmiResultScreen = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
  // const [hidead, sethidead] = useState(true);
  const [chartPercentage, setchartPercentage] = useState(72);
  const [pressurelevel, setpressurelevel] = useState('Normal');
  const [data, setdata] = useState(77.9);
  const [loader, setloader] = useState(false);
  const [language, setlanguage] = useState({
    dashobard: { bmi: '', bmirestitle: '' },
    main: { add: '', unlock: '' },
    tracker: {
      bmiChartText: '',
      bmiCharAddtText: '',
    },
  });
  const [langstr, setlangstr] = useState({
    dashobard: { bmi: '', bmirestitle: '' },
    main: { add: '', unlock: '' },
    tracker: {
      bmiChartText: '',
      bmiCharAddtText: '',
    },
  });

  const adjustBar = (number: any) => {
    if (number <= 16.4) {
      setchartPercentage(5);
    }
    if (number >= 16.5 && number <= 18.4) {
      setchartPercentage(19);
    }
    if (number >= 18.5 && number <= 24.9) {
      setchartPercentage(35);
    }
    if (number >= 25.0 && number <= 29.9) {
      console.log('obese level');
      setchartPercentage(48);
    }
    if (number >= 30.0 && number <= 34.9) {
      setchartPercentage(61);
    }
    if (number >= 35.0 && number <= 39.9) {
      setchartPercentage(75);
    }
  };

  useEffect(() => {
    adjustBar(data);
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('bmi_result_screen');
        let lan = await lang();
        // let res = await disableAds();
        // sethidead(res);
        setlanguage(lan);
        let response = await get_report(REPORT_TYPES.bmi);
        if (response) {
          if (response.length > 0) {
            let status = response[0].status;
            setpressurelevel(status);
            let bmi = response[0].bmi;
            setdata(bmi);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  const backAction = () => {
    return navigation.navigate('HomeScreen', { tab: 'tracker' });
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName, { tab: 'insight' });
  };
  const _continue = async () => {
    setloader(false);
    navigation.navigate('BmiResultScreen');
  };
  const showAd = async (type: any) => {
    await set_async_data('hide_ad', 'hide'); // purposly to hide tary ad
    setloader(true);
    if (type == 'line') {
      await set_async_data('line_chart_bmi_ad', 'seen');
    } else {
      await set_async_data('pie_chart_bmi_ad', 'seen');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <PageHeader
          return={navigation}
          screenname={'HomeScreen'}
          screenTitle={langstr.dashobard.bmi}
          navigation={navigation}
          // hidead={hidead}
        />
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
            <Text style={styles.title}>{langstr.dashobard.bmirestitle}</Text>
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
                source={require('../../assets/images/bmichart.png')}
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
          />
          <View style={styles.NativeAd}>
            {/* {!hidead ? <NativeAd150 /> : <></>} */}
          </View>
          <PieChartAdComponent
            navigation={navigation}
            langstr={langstr}
            showAd={showAd}
            loader={loader}
            // hidead={hidead}
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
    color: '#2E2E2E',
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

export default BmiResultScreen;
