import React, { useState, useEffect, useMemo } from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { disableAds, errorMessage, get_async_data } from '../../Helper/AppHelper';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import { addFormStyle } from '../../Helper/StyleHelper';
import { Banner, INTERSITIAL_AD_ID } from '../../Helper/AdManager';
import DateTimeComponent from '../../components/DateTimeComponent';
import SaveButton from '../../components/SaveButton';
import SystolicComponent from './components/SystolicComponent';
import PageHeader from './components/PageHeader';
// import LoadingAnimation from '../../components/LoadingAnimation';
import NotesPopup from './components/NotesPopup';
import { useIsFocused } from '@react-navigation/native';
import { lang } from '../../../global';
import DisplayAd from '../../components/DisplayAd';
import ExitModel from './components/ExitModel';

const { width, height } = Dimensions.get('window');
const today = moment(new Date()).format('YYYY-MM-DD');
const itemWidth = width - 80;
const ratio = itemWidth / 1140;

export default function BloodPressure({ navigation }: { navigation: any }) {
  const isFocused = useIsFocused();
  const { container, form } = addFormStyle;
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [systolicpressure, setSystolicPressure] = useState('99');
  const [diastolicpressure, setdiastolicpressure] = useState('65');
  const [pulse, setpulse] = useState('68');
  const [time, setTime] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [message, setmessage] = useState(false);
  const [chartPercentage, setchartPercentage] = useState(0);
  const [pressurelevel, setpressurelevel] = useState('Normal');
  const [note, setnote] = useState('');
  const [showremarksmodal, setshowremarksmodal] = useState(false);
  const [loader, setloader] = useState(false);
  const [save, setsave] = useState(false);
  const [hidead, sethidead] = useState(true);
  const [language, setlanguage] = useState({
    dashobard: { bp: '' },
    main: {
      date: '',
      time: '',
      systolic: '',
      diastolic: '',
      pulse: '',
      save: '',
      note: '',
      Hypertension: '',
      Normal: 'Normal',
      Elevated: 'Elevated',
      HypertensionStage1: 'Hypertension-Stage 1',
      HypertensionStage2: 'Hypertension-Stage 1',
      Hypersensitive: 'Hypersensitive',
    },
    options: {
      AfterMeal: '',
      BeforeMeal: '',
      medication: '',
      Sitting: '',
      Peroid: '',
      Walking: '',
      Lying: '',
      AfterSleep: '',
      Fasting: '',
      Other: '',
    },
  });
  const [langstr, setlangstr] = useState({
    dashobard: { bp: '' },
    main: {
      date: '',
      time: '',
      systolic: '',
      diastolic: '',
      pulse: '',
      save: '',
      note: '',
      Hypertension: '',
      Normal: 'Normal',
      Elevated: 'Elevated',
      HypertensionStage1: 'Hypertension-Stage 1',
      HypertensionStage2: 'Hypertension-Stage 1',
      Hypersensitive: 'Hypersensitive',
    },
    options: {
      AfterMeal: '',
      BeforeMeal: '',
      medication: '',
      Sitting: '',
      Peroid: '',
      Walking: '',
      Lying: '',
      AfterSleep: '',
      Fasting: '',
      Other: '',
    },
  });

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('add_bp_screen');
        let lan = await lang();
        let res = await disableAds();
        sethidead(res);
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  const onChangeTime = (event: DateTimePickerEvent, value: any) => {
    const { type } = event;
    setTimePicker(false);
    if (type === 'set') {
      setTime(value);
    }
  };

  const changeDate = (date: any) => {
    setSelectedDate(date);
    setTimeout(() => {
      setModalVisible(false);
    }, 700);
  };

  const adjustBar = useMemo(() => {
    let sys = parseInt(systolicpressure);
    let dis = parseInt(diastolicpressure);
    // Perfect Matched
    if (sys > 180 || dis > 120) {
      setpressurelevel('Hypertension');
      setchartPercentage(80);
    } else if ((sys >= 140 && sys <= 180) || (dis >= 90 && dis <= 120)) {
      setpressurelevel('Hypertension-Stage 2');
      setchartPercentage(63);
    } else if ((sys >= 130 && sys <= 139) || (dis >= 80 && dis <= 89)) {
      setpressurelevel('Hypertension-Stage 1');
      setchartPercentage(48);
    } else if (sys >= 120 && sys <= 129 && dis >= 60 && dis <= 79) {
      setpressurelevel('Elevated');
      setchartPercentage(32);
    } else if (sys >= 90 && sys <= 119 && dis >= 60 && dis <= 79) {
      setchartPercentage(15);
      setpressurelevel('Normal');
    } else {
      setpressurelevel('Hypotension');
      setchartPercentage(0);
    }
  }, [systolicpressure, diastolicpressure]);

  const _continue = async () => {
    try {
      setloader(false);
      // if (save == true) {
      //   setsave(false);
      //   navigation.navigate('BpResultScreen');
      // } else {
      navigation.navigate('BpResultScreen');
      // }
    } catch (e) {
      console.log('catch error', e);
      return;
    }
  };
  return (
    <>
      <SafeAreaView style={container}>
        <PageHeader
          screenTitle={langstr.dashobard.bp}
          navigation={navigation}
          hidead={hidead}
        />

        <DateTimeComponent
          selectedDate={selectedDate}
          width={width}
          height={height}
          time={time}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          changeDate={changeDate}
          setTimePicker={setTimePicker}
          timePicker={timePicker}
          onChangeTime={onChangeTime}
          today={today}
          langstr={langstr}
        />

        <View
          style={[
            form,
            {
              backgroundColor: '#f0fef0',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#C9E9BC',
              paddingVertical: 45,
              width: (88 / 100) * width,
              alignSelf: 'center',
            },
          ]}>
          <View>
            <SystolicComponent
              langstr={langstr}
              setpulse={setpulse}
              setdiastolicpressure={setdiastolicpressure}
              setSystolicPressure={setSystolicPressure}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.pressurelevel}>{pressurelevel}</Text>
            <Image
              style={styles.scale}
              source={require('../../assets/images/barchart.png')}
            />
            <Image
              style={[styles.pointerIndicator, { left: `${chartPercentage}%` }]}
              source={require('../../assets/images/polygon.png')}
            />
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.title}>{langstr.main.note}</Text>
          <Text
            style={[
              styles.title,
              { fontWeight: '300', fontSize: 13, alignSelf: 'center', textTransform: 'lowercase' },
            ]}>
            {note != '' ? `1 ${langstr.main.note}` : ''}
          </Text>
          <TouchableOpacity onPress={() => setshowremarksmodal(true)}>
            <Image
              style={{ width: 32, height: 32 }}
              source={require('../../assets/images/add_btn_new.png')}
            />
          </TouchableOpacity>
        </View>
        {message && errorMessage()}
        <SaveButton
          return={navigation}
          screenname={'BloodPressure'}
          systolicpressure={systolicpressure}
          diastolicpressure={diastolicpressure}
          selectedTime={time}
          selectedDate={selectedDate}
          setmessage={setmessage}
          pulse={pulse}
          today={today}
          time={time}
          note={note}
          pressurelevel={pressurelevel}
          _continue={_continue}
          hidead={hidead}
          setsave={setsave}
          setloader={setloader}
          langstr={langstr}
        />
      </SafeAreaView>
      <Banner />
      {/* {loader && <LoadingAnimation iconType={'tick'} />} */}

      {showremarksmodal && (
        <NotesPopup
          langstr={langstr}
          setshowremarksmodal={setshowremarksmodal}
          setnote={setnote}
        />
      )}

      {save && (<DisplayAd _continue={_continue} setloader={setloader} adId={INTERSITIAL_AD_ID} />)}
      {/* {closeloader && (<ExitModel setcloseloader={setcloseloader} navigation={navigation} />)} */}
    </>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    backgroundColor: '#ffffff',
    width: width - 40,
    padding: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 9,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#C9E9BC'
  },
  title: {
    color: '#2A5B1B',
    fontSize: 18,
    fontWeight: '700',
  },
  pressurelevel: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    color: '#5F5F5F',
    marginBottom: 15,
  },
  scale: {
    alignSelf: 'center',
    width: itemWidth,
    height: 68 * ratio,
  },
  pointerIndicator: {
    width: 17,
    height: 14,
    marginLeft: 23,
    position: 'relative',
    top: 7,
  },
});
