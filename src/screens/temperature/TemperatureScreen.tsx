import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import PageHeader from './components/PageHeader';
import DateTimeComponent from '../../components/DateTimeComponent';
import { lang } from '../../../global';
// import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import { addFormStyle } from '../../Helper/StyleHelper';
import { Banner, INTERSITIAL_AD_ID } from '../../Helper/AdManager';
import LoadingAnimation from '../../components/LoadingAnimation';
import SaveButton from '../../components/SaveButton';
import DisplayAd from '../../components/DisplayAd';
import { disableAds } from '../../Helper/AppHelper';

const { width, height } = Dimensions.get('window');
const itemWidth = width - 60;
const ratio = itemWidth / 1100;

const TemperatureScreen = ({ navigation }: { navigation: any }) => {
  const { container, form, label, input } = addFormStyle;
  const [language, setlanguage] = useState({
    dashobard: { temperature: '' },
    main: {
      date: '',
      time: '',
      save: '',
      Normal: 'Normal',
    },
  });
  const [langstr, setlangstr] = useState({
    dashobard: { temperature: '' },
    main: {
      date: '',
      time: '',
      save: '',
      Normal: 'Normal',
    },
  });
  const [temperature, settemperature] = useState('97');
  const [time, setTime] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [message, setmessage] = useState('Normal');
  // const [loader, setloader] = useState(false);
  const [disablesavebtn, setdisablesavebtn] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [unit, setunit] = useState('°F');
  const [chartPercentage, setchartPercentage] = useState(26);
  const [save, setsave] = useState(false);
  const [hidead, sethidead] = useState(true);
  const today = moment(new Date()).format('YYYY-MM-DD');
  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('add_blood_sugar');
        let lan = await lang();
        let res = await disableAds();
        sethidead(res);
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
    let temp = parseInt(temperature);
    if (unit == '°F') {
      if (temp > 100) {
        setmessage('Potential Illness');
        setchartPercentage(75);
      } else { setmessage('Normal'); setchartPercentage(26); }
    }
    else {
      if (temp > 38) {
        setmessage('Potential Illness');
        setchartPercentage(75);
      } else { setmessage('Normal'); setchartPercentage(26); }
    }
  }, [temperature]);

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

  const setTemperature = (number: any) => {
    let value = number.replace(/\s/g, '');
    value = value;
    if (value.length == 0) {
      setdisablesavebtn(true);
    } else {
      setdisablesavebtn(false);
    }
    settemperature(value);
  };

  const changeUnit = (unit: any) => {
    setunit(unit);
    if (unit == '°F') {
      if (temperature.length == 0) {
        settemperature('98.6');
      } else {
        console.log('convert this into Fernhiet', temperature);
        let temp = parseInt(temperature);
        temp = (9 / 5 * temp) + 32;
        temp = temp.toFixed(1);
        temp > 100 ? setmessage('Potential Illness') : setmessage('Normal');
        settemperature(temp.toString());
      }
    }
    if (unit == '°C') {
      if (temperature.length == 0) {
        settemperature('37');
      } else {
        let temp = parseInt(temperature);
        temp = (temp - 32) * 5 / 9;
        temp = temp.toFixed(1);
        temp >= 38 ? setmessage('Potential Illness') : setmessage('Normal');
        settemperature(temp.toString());
      }
    }
  };

  const _continue = async () => {
    try {
      if (save == true) {
        setsave(false);
        navigation.navigate('TemperatureResultScreen');
      } else {
        navigation.navigate('TemperatureResultScreen');
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
              screenTitle={langstr.dashobard.temperature}
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

            <View style={form}>
              <View style={{ marginBottom: 0 }}>
                <Text style={label}>{langstr.dashobard.temperature}</Text>
              </View>
            </View>

            <View style={styles.inputContainar}>
              <View style={{ width: '60%' }}>
                <TextInput
                  onChangeText={text => setTemperature(text)}
                  style={styles.input}
                  maxLength={5}
                  keyboardType="decimal-pad"
                  value={temperature != null ? temperature : ''}
                />
              </View>

              <View style={{ width: '40%' }}>
                <SelectDropdown
                  data={['°C', '°F']}
                  onSelect={(selectedItem: any, index: any) => {
                    changeUnit(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem: any, index: any) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item: any, index: any) => {
                    return item;
                  }}
                  defaultValue={unit}
                  buttonStyle={[
                    input,
                    {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: '#F4F5F6',
                    },
                  ]}
                  dropdownIconPosition="right"
                  dropdownStyle={{
                    width: '30%',
                    borderRadius: 6,
                    height: 100,
                    marginTop: -20,
                    marginLeft: 20,
                  }}
                  rowStyle={{
                    borderBottomWidth: 0,
                    alignItems: 'center',
                    alignContent: 'flex-end',
                    marginBottom: 0,
                    paddingBottom: 0,
                  }}
                  rowTextStyle={{
                    textAlign: 'left',
                    fontSize: 20,
                    paddingLeft: 7,
                    fontWeight: '500',
                  }}
                  buttonTextStyle={{
                    color: '#515151',
                    textAlign: 'left',
                    fontSize: 28,
                    fontWeight: '600',

                  }}
                />
              </View>
            </View>

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
                  fontWeight: '700',
                  fontSize: 18,
                  color: '#2E2E2E',
                  marginVertical: 15,
                }}>
                {message}
              </Text>
              <Image
                style={{
                  alignSelf: 'center',
                  width: itemWidth,
                  height: 48 * ratio,
                }}
                source={require('../../assets/images/temp_chart.png')}
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

            <SaveButton
              return={navigation}
              screenname={'Temperature'}
              temperature={temperature}
              selectedDate={selectedDate}
              setmessage={setmessage}
              tempunit={unit}
              today={today}
              time={time}
              // setloader={setloader}
              disablesavebtn={disablesavebtn}
              langstr={langstr}
              _continue={_continue}
              hidead={hidead}
              setsave={setsave}
              status={message}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {hidead.toString() == 'false' ? <Banner /> : <></>}
      {save == true ? (<DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID} />) : (<></>)}
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
    alignItems: 'center'
  },
  input: {
    color: '#2A5B1B',
    fontSize: 50,
    fontWeight: '700',
    paddingHorizontal: 15,
  },
});
export default TemperatureScreen;