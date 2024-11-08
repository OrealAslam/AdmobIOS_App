import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import { disableAds, errorMessage, set_async_data } from '../../Helper/AppHelper';
import CommingSoon from "../../components/CommingSoon";
import { addFormStyle } from '../../Helper/StyleHelper';
import PageHeader from './components/PageHeader';
import { lang } from '../../../global';
import DateTimeComponent from '../../components/DateTimeComponent';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import SaveButton from '../../components/SaveButton';
import { Banner, INTERSITIAL_AD_ID } from '../../Helper/AdManager';
import DisplayAd from '../../components/DisplayAd';
import StateModal from './components/StateModal';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width / 2;
const ITEM_RATIO = ITEM_WIDTH / 544;

const POPUP_IMG = width * 0.92;
const POPUP_RATIO = POPUP_IMG / 1440;

const itemWidth = width - 45;
const ratio = itemWidth / 1140;

const RecordHeartRate = ({ navigation }: { navigation: any }) => {
  const route = useRoute();
  const today = moment(new Date()).format('YYYY-MM-DD');
  const [language, setlanguage] = useState({
    dashobard: { heartRate: '' },
    main: {
      date: '',
      time: '',
      save: '',
      note: '',
      okay: '',
      cancel: '',
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
      AfterSleep: '',
      Fasting: '',
      Other: '',
    },
  });
  const [langstr, setlangstr] = useState({
    dashobard: { heartRate: '' },
    main: {
      date: '',
      time: '',
      save: '',
      note: '',
      okay: '',
      cancel: '',
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
      AfterSleep: '',
      Fasting: '',
      Other: '',
    },
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [option, setoption] = useState('Resting');
  const [notes, setnotes] = useState('');
  const [time, setTime] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [message, setmessage] = useState(false);
  const [result, setresult] = useState('Normal');
  const [chartPercentage, setchartPercentage] = useState(36);
  // const [loader, setloader] = useState(false);
  const [disablesavebtn, setdisablesavebtn] = useState(false);
  const [show, setshow] = useState(false);
  const [save, setsave] = useState(false);
  // const [hidead, sethidead] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [heartRate, setheartRate] = useState('65');
  const [loader, setloader] = useState(false);
  const { container, form, label } = addFormStyle;

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('add_blood_sugar_screen');
        let lan = await lang();
        setlanguage(lan);
        // let res = await disableAds();
        // sethidead(res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

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

  const _continue = async () => {
    try {
      if (save == true) {
        setsave(false);
        navigation.navigate('ResultHeartRate');
      } else { // press on close btn
        navigation.navigate('ResultHeartRate');
      }
    } catch (e) {
      console.log('catch error', e);
      return;
    }
  };

  return (
    <>
      <SafeAreaView style={container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>

            <PageHeader
              screenTitle={langstr.dashobard.heartRate}
              navigation={navigation}
              // hidead={hidead}
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

            <View style={[form, { marginTop: 40 }]}>
              <View style={{ marginBottom: 0 }}>
                <Text style={label}>Record Heart Rate</Text>
              </View>
            </View>

            <View style={styles.inputContainar}>
              <View style={{ width: '55%' }}>
                <TextInput
                  onChangeText={setheartRate}
                  style={styles.input}
                  maxLength={3}
                  keyboardType="decimal-pad"
                  value={heartRate}
                  cursorColor={'#2A5B1B'}
                />
              </View>
            </View>

            <View style={{ marginTop: '12%', width: '85%', alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={() => setshow(true)}
                style={styles.selectBox}>
                <Text style={{ color: '#5E9368', fontSize: 16 }}>{option}</Text>
                <Image
                  style={{
                    width: 10.57,
                    height: 6.53,
                  }}
                  source={require('../../assets/images/downarrow.png')}
                />
              </TouchableOpacity>

              {message && errorMessage()}
            </View>

            <SaveButton
              return={navigation}
              screenname={'HeartRate'}
              heartRate={heartRate}
              selectedTime={option}
              selectedDate={selectedDate}
              setmessage={setmessage}
              today={today}
              time={time}
              _continue={_continue}
              // hidead={hidead}
              setsave={setsave}
              result={result}
              disablesavebtn={disablesavebtn}
              setloader={setloader}
              langstr={langstr}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* {!hidead ? <Banner /> : <></>} */}

      {show && (
        <StateModal
          duration={option}
          setoption={setoption}
          option={option}
          setshow={setshow}
          langstr={langstr}
        />
      )}
      {save && (<DisplayAd _continue={_continue} setloader={setloader} adId={INTERSITIAL_AD_ID} />)}
    </>
  );
};
const styles = StyleSheet.create({
  inputContainar: {
    borderBottomWidth: 3,
    borderBottomColor: '#2A5B1B',
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    // marginTop: 20
  },
  input: {
    color: '#2A5B1B',
    fontSize: 55,
    fontFamily: 'Montserrat-Bold',
    paddingHorizontal: 15,
  },
  selectBox: {
    width: width * 0.88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F0FEF0',
    borderWidth: 1,
    borderColor: '#c9e9bc',
    borderRadius: 8,
    padding: 12,
    paddingVertical: 15
  },
});
export default RecordHeartRate;
