import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  NativeModules,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { get_async_data } from '../../../../Helper/AppHelper';
import { lang } from '../../../../../global';
import { NativeAd100 } from '../../../../Helper/NativeAd100';
import LottieView from 'lottie-react-native';
import { NATIVE_AD_ID_ONE } from '../../../../Helper/AdManager';

const { width } = Dimensions.get('window');

const heartcardWidth = width - 30;
const heartcardRatio = heartcardWidth / 1304;

const heartcardIcon = width - 200;
const heartcardIconRatio = heartcardIcon / 651;

const colCardWidth = width / 2 - 23;
const colCardRatio = colCardWidth / 606;

const DashboardContent = (props: any) => {
  const [recentbp, setrecentbp] = useState(null);
  const [recentbs, setrecentbs] = useState(null);
  const [recentbmi, setrecentbmi] = useState(null);
  const [recentheart, setrecentheart] = useState(null);
  const [recenttemp, setrecenttemp] = useState(null);
  const [language, setlanguage] = useState({
    dashobard: {
      bp: '',
      bs: '',
      temperature: '',
      bmi: '',
      addNow: '',
      heartRate: '',
      cardCommit: '',
    },
    main: { more: '' },
  });
  const [cardtitleone, setcardtitleone] = useState('Blood Pressure');
  const [cardtitletwo, setcardtitletwo] = useState('Blood Sugar');
  const [cardtitlethree, setcardtitlethree] = useState('Temperature');
  const [cardtitlefour, setcardtitlefour] = useState('BMI Calculator');
  const [cardtitlefive, setcardtitlefive] = useState('Heart Rate');
  const [measure, setmeasure] = useState('Measure Now');
  const [add, setadd] = useState('Add Now');
  const [str, setstr] = useState('Health Diary');

  useEffect(() => {
    (async () => {
      let bp = await get_async_data('record_bp');
      let bs = await get_async_data('record_bs');
      let bmi = await get_async_data('record_bmi');
      let heart = await get_async_data('record_heart');
      let temp = await get_async_data('record_temp');
      let lan = await lang();

      setrecentbp(bp);
      setrecentbs(bs);
      setrecentbmi(bmi);
      setrecentheart(heart);
      setrecenttemp(temp);
      setlanguage(lan);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setcardtitleone(language?.dashobard.bp);
      setcardtitletwo(language?.dashobard.bs);
      setcardtitlethree(language?.dashobard.temperature);
      setcardtitlefour(language?.dashobard.bmi);
      setcardtitlefive(language?.dashobard.heartRate);
      setstr(language?.dashobard?.cardCommit);
      setadd(language?.dashobard.addNow);
      setmeasure(language?.dashobard.measure);
    })();
  }, [language]);

  return (
    <View style={styles.dashboardCardContainer}>
      <View
        style={[
          styles.dashboardCard,
          { backgroundColor: '#FFEBED', borderRadius: 20 },
        ]}>
        <Image style={styles.heartImage} source={require('../../../../assets/images/dashboard_icons_new/heartrate2.png')} />

        <TouchableOpacity
          style={styles.measurebtn}
          onPress={() => props.navigate('RecordHeartRate')}>
          <Text style={{ fontSize: 14, color: '#ffffff', fontFamily: 'Montserrat-Bold' }}>
            {measure}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.heartInnerContainer}>
        <Text style={styles.badgeFont}>Last Report</Text>
        <Text style={[styles.badgeFont, {fontFamily: 'Montserrat-SemiBold'}]}>History</Text>
      </View> */}

      {/* <View style={styles.header}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/icons/recomandations.png')}
        />
        <Text style={styles.title}>{str}</Text>
      </View> */}

      <View style={[styles.multipleCardContainer, {marginTop: 17}]}>
        <View style={{backgroundColor: '#DADDFF', borderRadius: 12}}>
          <TouchableOpacity onPress={() => props.navigate('BloodPressure')}>
            <ImageBackground
              style={styles.colCard}
              source={require('../../../../assets/images/dashboard_icons_new/bloodpressure_new.png')}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={[
                  styles.cardtitle,
                  {marginLeft: 13, marginVertical: 15, maxWidth: '75%'},
                ]}>
                {cardtitleone}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor: '#D0F3F9', borderRadius: 12}}>
          <TouchableOpacity onPress={() => props.navigate('BloodSugar')}>
            <ImageBackground
              style={styles.colCard}
              source={require('../../../../assets/images/dashboard_icons_new/bloodsugar_new.png')}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={[
                  styles.cardtitle,
                  {marginLeft: 13, marginVertical: 15, maxWidth: '60%'},
                ]}>
                {cardtitletwo}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.nativeContainer}>
        <NativeAd100 />
      </View> */}

      <View style={styles.multipleCardContainer}>
        <View style={{backgroundColor: '#D0F3F9', borderRadius: 12}}>
          {/* <TouchableOpacity onPress={() => props.navigate('TemperatureResultScreen')}> */}
          <TouchableOpacity onPress={() => props.navigate('TemperatureScreen')}>
            <ImageBackground
              style={styles.colCard}
              source={require('../../../../assets/images/dashboard_icons_new/temerature.png')}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={[
                  styles.cardtitle,
                  {marginLeft: 13, marginVertical: 15, maxWidth: '92%'},
                ]}>
                {cardtitlethree}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor: '#F9E9C5', borderRadius: 12}}>
          <TouchableOpacity onPress={() => props.navigate('BmiRecordScreen')}>
            <ImageBackground
              style={styles.colCard}
              source={require('../../../../assets/images/dashboard_icons_new/bmi.png')}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[
                  styles.cardtitle,
                  {marginLeft: 13, marginVertical: 15, maxWidth: '92%'},
                ]}>
                {cardtitlefour}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  dashboardCardContainer: {
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 9,
    borderTopEndRadius: 9,
    width: width
  },
  icon: {
    width: 17,
    height: 22.35,
    marginLeft: 15,
  },
  title: {
    color: '#2E2E2E',
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
    fontFamily: 'Raleway-ExtraBold',
  },
  nativeContainer: {
    width: width * 0.91,
    alignSelf: 'center',
    marginBottom: 15,
    backgroundColor: '#e6e6e6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EBEBEC',
  },
  multipleCardContainer: {
    width: width * 0.91,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    // marginTop: 17,
  },
  colCard: {
    width: colCardWidth,
    height: 532 * colCardRatio,
    alignItems: 'flex-start',
  },
  dashboardCard: {
    width: heartcardWidth,
    height: 396 * heartcardRatio,
  },
  heartInnerContainer: {
    width: '92%',
    backgroundColor: '#F3F3F3',
    paddingVertical: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 11,
    borderRadius: 10,
  },
  cardtitle: {
    color: '#2E2E2E',
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
  },
  result: {
    color: '#fff',
    fontSize: 13,
    position: 'absolute',
    bottom: '8%',
    left: '5%',
  },
  measurebtn: {
    position: 'absolute',
    right: '5%',
    top: '50%',
    width: '42%',
    alignItems: 'center',
    backgroundColor: '#FF4B5F',
    borderRadius: 50,
    paddingVertical: 12,
    elevation: 2,
  },
  badgeFont: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#2E2E2E',
  },
  heartImage: {
    position: 'absolute',
    top: -40,
    width: heartcardIcon,
    height: 651 * heartcardIconRatio,
  }
});
export default DashboardContent;
