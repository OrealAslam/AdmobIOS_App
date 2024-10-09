import React, {useState, useEffect} from 'react';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {errorMessage, get_async_data} from '../../Helper/AppHelper';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import {addFormStyle} from '../../Helper/StyleHelper';
import {Banner, INTERSITIAL_AD_ID} from '../../Helper/AdManager';
import DateTimeComponent from '../../components/DateTimeComponent';
import SaveButton from '../../components/SaveButton';
import SystolicComponent from './components/SystolicComponent';
import PageHeader from './components/PageHeader';
// import LoadingAnimation from '../../components/LoadingAnimation';
import NotesPopup from './components/NotesPopup';
import {useIsFocused} from '@react-navigation/native';
import {lang} from '../../../global';
import DisplayAd from '../../components/DisplayAd';
import ExitModel from './components/ExitModel';

const {width, height} = Dimensions.get('window');
const today = moment(new Date()).format('YYYY-MM-DD');
const itemWidth = width - 80;
const ratio = itemWidth / 1140;

export default function BloodPressure({navigation}: {navigation: any}) {
  const isFocused = useIsFocused();
  const {container, form} = addFormStyle;
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
  // const [loader, setloader] = useState(false);
  const [closeloader, setcloseloader] = useState(false);
  const [save, setsave] = useState(false);
  const [language, setlanguage] = useState({
    dashobard: {bp: ''},
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
    dashobard: {bp: ''},
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
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    adjustBar();
  }, [systolicpressure, diastolicpressure]);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  const onChangeTime = (event: DateTimePickerEvent, value: any) => {
    const {type} = event;
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

  const adjustBar = () => {
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
  };

  const backAction = () => {
    // navigation.navigate('HomeScreen');
    setcloseloader(true);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );
  const _continue = async () => {
    try {
      setcloseloader(false);
      if(save == true) {
        setsave(false);
        navigation.navigate('BpResultScreen');
      } else{
        navigation.navigate('HomeScreen', {tab: 'home'});
      }
    } catch(e) {
      console.log('catch error', e);
      return ;
    }
  };
  return (
    <>
      <SafeAreaView style={container}>
        <PageHeader
          setcloseloader={setcloseloader}
          screenTitle={langstr.dashobard.bp}
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
              backgroundColor: '#F5F8FF',
              borderRadius: 10,
              width: (92 / 100) * width,
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

          <View style={{marginTop: 20}}>
            <Text style={styles.pressurelevel}>{pressurelevel}</Text>
            <Image
              style={styles.scale}
              source={require('../../assets/images/barchart.png')}
            />
            <Image
              style={[styles.pointerIndicator, {left: `${chartPercentage}%`}]}
              source={require('../../assets/images/polygon.png')}
            />
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.title}>{langstr.main.note}</Text>
          <Text
            style={[
              styles.title,
              {fontWeight: '300', fontSize: 13, alignSelf: 'center', textTransform: 'lowercase'},
            ]}>
            {note != '' ? `1 ${langstr.main.note}` : ''}
          </Text>
          <TouchableOpacity onPress={() => setshowremarksmodal(true)}>
            <Image
              style={{width: 32, height: 32}}
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
          // setloader={setloader}
          setsave={setsave}
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

    {save && (<DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID}/>)}
    {closeloader && (<ExitModel setcloseloader={setcloseloader} navigation={navigation} />)}
    </>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    backgroundColor: '#F4F5F6',
    width: width - 40,
    padding: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 9,
    marginVertical: 15,
  },
  title: {
    color: '#2E2E2E',
    fontSize: 18,
    fontWeight: '600',
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
