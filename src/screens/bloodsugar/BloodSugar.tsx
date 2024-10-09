import React, {useState, useEffect} from 'react';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import {
  duration,
  errorMessage,
  roundNearestAfterDecimal,
  set_async_data,
} from '../../Helper/AppHelper';
// import analytics from '@react-native-firebase/analytics';
import {addFormStyle} from '../../Helper/StyleHelper';
import DateTimeComponent from '../../components/DateTimeComponent';
import SaveButton from '../../components/SaveButton';
import PageHeader from './components/PageHeader';
import DropDownSelection from './components/DropDownSelection';
import {Banner, INTERSITIAL_AD_ID} from '../../Helper/AdManager';
// import LoadingAnimation from '../../components/LoadingAnimation';
// import ResultScreen from './ResultScreen';
import {lang} from '../../../global';
// import ZoomAnimation from '../../components/ZoomAnimation';
import DisplayAd from '../../components/DisplayAd';
const {width, height} = Dimensions.get('window');
const itemWidth = width - 65;
const ratio = itemWidth / 1140;

const iconWidth = width - width * 0.7;
const iconRatio = iconWidth / 372;

export default function BloodSugar({navigation}: {navigation: any}) {
  const today = moment(new Date()).format('YYYY-MM-DD');
  const {container, form, label} = addFormStyle;
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [unit, setunit] = useState('mg/dl');

  const [sugarconcentration, setSugarConcentration] = useState(
    unit == 'mg/dl' ? '51' : '3',
  );
  const [selectedTime, setSelectedTime] = useState('After Sleep');
  const [notes, setnotes] = useState('');
  const [time, setTime] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [message, setmessage] = useState(false);
  const [result, setresult] = useState('Normal');
  const [chartPercentage, setchartPercentage] = useState(36);
  // const [loader, setloader] = useState(false);
  const [closeloader, setcloseloader] = useState(false);
  const [disablesavebtn, setdisablesavebtn] = useState(false);
  const [show, setshow] = useState(false);
  const [save, setsave] = useState(false);
  const [language, setlanguage] = useState({
    dashobard: {bs: '', SugarConcentration: ''},
    main: {
      date: '',
      time: '',
      systolic: '',
      diastolic: '',
      pulse: '',
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
    dashobard: {bs: '', SugarConcentration: ''},
    main: {
      date: '',
      time: '',
      systolic: '',
      diastolic: '',
      pulse: '',
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

  const backAction = () => {
    setcloseloader(true);
    // navigation.navigate('HomeScreen', {tab: 'home'});
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const onChangeTime = (event: DateTimePickerEvent, value: any) => {
    const {type} = event;
    setTimePicker(false);
    if (type === 'set') {
      setTime(value);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('add_blood_sugar_screen');
        let lan = await lang();
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  useEffect(() => {
    let value = parseInt(sugarconcentration);
    if (unit == 'mg/dl') {
      if (value < 50) {
        setresult('Low'); //'11%'
        setchartPercentage(11);
      }
      if (value >= 50 && value <= 115) {
        setresult('Normal'); //36%
        setchartPercentage(36);
      }
      if (value > 115 && value <= 180) {
        setresult('Pre-Diabetes'); //61%
        setchartPercentage(61);
      }
      if (value > 180) {
        setresult('High'); //85%
        setchartPercentage(85);
      }
    } else {
      if (value < 2.6) {
        setresult('Low'); //11%
        setchartPercentage(11);
      }

      if (value >= 2.6 && value <= 6.3) {
        setresult('Normal'); //36%
        setchartPercentage(36);
      }
      if (value >= 6.4 && value <= 10) {
        setresult('Pre-Diabetes'); //61%
        setchartPercentage(61);
      }
      if (value > 10) {
        setresult('High'); //85%
        setchartPercentage(85);
      }
    }
  }, [sugarconcentration]);

  const changeDate = (date: any) => {
    setSelectedDate(date);
    setTimeout(() => {
      setModalVisible(false);
    }, 700);
  };

  const changeUnit = () => {
    if (unit == 'mg/dl') {
      setunit('mmol/L');
      let currentValue = parseInt(sugarconcentration);
      let calculate = currentValue / 18;
      let calculated = roundNearestAfterDecimal(calculate.toFixed(2));
      setSugarConcentration(calculated.toString());
    }
    if (unit == 'mmol/L') {
      setunit('mg/dl');
      let currentValue = parseInt(sugarconcentration);
      let calculate = currentValue * 18;
      let calculated = roundNearestAfterDecimal(calculate.toFixed(2));
      setSugarConcentration(calculated.toString());
    }
  };

  const setSugarLevel = (number: any) => {
    let value = number.replace(/\s/g, '');
    value = value;
    if (value.length == 0) {
      setdisablesavebtn(true);
    } else {
      setdisablesavebtn(false);
    }
    setSugarConcentration(number);
  };

  const _continue = async () => {
    try {
      setcloseloader(false);
      if(save == true) {
        setsave(false);
        navigation.navigate('ResultScreen');
      } else{ // press on close btn
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
          screenTitle={langstr.dashobard.bs}
          setcloseloader={setcloseloader}     
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
        <View style={form}>
          <View style={{marginBottom: 0}}>
            <Text style={label}>{langstr.dashobard.SugarConcentration}</Text>
          </View>
        </View>

        <View style={styles.inputContainar}>
          <View style={{width: '55%'}}>
            <TextInput
              onChangeText={text => setSugarLevel(text)}
              style={styles.input}
              maxLength={3}
              keyboardType="decimal-pad"
              value={sugarconcentration}
            />
          </View>
          <View style={{width: '40%'}}>
            <TouchableOpacity onPress={changeUnit}>
              <Image
                style={styles.icon}
                source={
                  unit == 'mg/dl'
                    ? require('../../assets/icons/bsmeasure_2.png')
                    : require('../../assets/icons/bsmeasure_!.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              width: (90 / 100) * width,
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                marginBottom: 20,
                backgroundColor: '#F4F5F6',
                paddingVertical: 15,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 18,
                  color: '#2E2E2E',
                  marginVertical: 15,
                }}>
                {result}
              </Text>
              <Image
                style={{
                  alignSelf: 'center',
                  width: itemWidth,
                  height: 68 * ratio,
                }}
                source={require('../../assets/images/sugarbarchart.png')}
              />
              <Image
                style={{
                  width: 15,
                  height: 13,
                  position: 'relative',
                  top: 7,
                  left: chartPercentage + `%`,
                }}
                source={require('../../assets/images/polygon.png')}
              />
            </View>

            <TouchableOpacity
              onPress={() => setshow(true)}
              style={styles.selectBox}>
              <Text>{selectedTime}</Text>
              <Image
                style={{
                  width: 10.57,
                  height: 6.53,
                }}
                source={require('../../assets/images/downarrow.png')}
              />
            </TouchableOpacity>
          </View>

          {message && errorMessage()}
        </ScrollView>
        
        <SaveButton
          return={navigation}
          screenname={'BloodSugar'}
          sugarconcentration={sugarconcentration}
          selectedTime={selectedTime}
          selectedDate={selectedDate}
          setmessage={setmessage}
          notes={unit}
          today={today}
          time={time}
          // setloader={setloader}
          setsave={setsave}
          result={result}
          disablesavebtn={disablesavebtn}
          langstr={langstr}
        />
      </SafeAreaView>
      <Banner />
      {/* {loader && <LoadingAnimation iconType={'tick'} />} */}

      {show && (
        <DropDownSelection
          duration={duration}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
          setshow={setshow}
          langstr={langstr}
        />
      )}

      {closeloader == true|| save == true ? (<DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID}/>) : (<></>)}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainar: {
    borderBottomWidth: 3,
    borderBottomColor: '#000',
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  input: {
    color: '#2E2E2E',
    fontSize: 55,
    fontFamily: 'Montserrat-Bold',
    paddingHorizontal: 15,
  },
  icon: {
    width: iconWidth,
    height: 150 * iconRatio,
    alignSelf: 'flex-end',
  },
  selectBox: {
    width: width * 0.88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F4F5F6',
    borderRadius: 8,
    padding: 12,
  },
});
