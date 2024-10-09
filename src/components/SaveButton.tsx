import {
  TouchableOpacity,
  Vibration,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  REPORT_TYPES,
  add_report,
  get_async_data,
  set_async_data,
} from '../Helper/AppHelper';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
const itemWidth = width - 55;
const ratio = itemWidth / 1232;

const btnWidth = width - 50;
const btnratio = itemWidth / 1256;

export default function SaveButton(props: any) {
  const [loader, setloader] = useState(false);

  const navigateToHome = async () => {
    props.return.navigation.navigate('AdLoading', { screen: props.screenname });
  };

  const saveRecord = async () => {
    setloader(true);
    if (props.screenname == 'BloodPressure') {
      // if ((props.systolicpressure < props.diastolicpressure) || (props.systolicpressure == props.diastolicpressure)) {
      //   Vibration.vibrate();
      //   // props.setmessage(true);
      //   setloader(false);
      //   ToastAndroid.showWithGravity(
      //     'Systolic must be larger than Diastolic',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.CENTER,
      //   );
      // } else {
        props.setmessage(false);
        let choosenDate =
          props.selectedDate == '' ? props.today : props.selectedDate;
        let datetime =
          choosenDate + ' ' + moment(props.time).format('HH:mm:ss');

        let data = {
          report_type: REPORT_TYPES.bp,
          systolic_pressure: props.systolicpressure,
          diastolic_pressure: props.diastolicpressure,
          pulse: props.pulse,
          note: props.note,
          datetime: datetime,
          status: props.pressurelevel,
        };
        let response = await add_report(data);
        if (response) {
          await set_async_data('record_entry', 'record_entered');
          let sys = props.systolicpressure.toString();
          let dis = props.diastolicpressure.toString();
          let saveData = sys + `/` + dis;
          props.setsave(true);
          await set_async_data('record_bp', saveData.toString());
          setloader(false);
        } else {
          props.setsave(true);
        }
      // }
    }
    if (props.screenname == 'BloodSugar') {
      props.setmessage(false);
      // props.setloader(true);
      let choosenDate =
        props.selectedDate == '' ? props.today : props.selectedDate;
      let datetime = choosenDate + ' ' + moment(props.time).format('HH:mm:ss');
      let data = {
        report_type: REPORT_TYPES.sugar,
        sugar_concentration: props.sugarconcentration,
        sugar_check: props.selectedTime ? props.selectedTime : 'After meal',
        note: props.notes ? props.notes : '',
        datetime: datetime,
        status: props.result,
      };
      let response = await add_report(data);
      if (response) {
        props.setsave(true);
        await set_async_data('record_entry', 'record_entered');
        await set_async_data('record_bs', props.sugarconcentration.toString());
        setloader(false);
      }
    }
    if (props.screenname == 'Temperature') {
      if (props.temperature.match(/^\s*$/)) {
        Vibration.vibrate();
        props.setmessage(true);
        setloader(false);
      } else {
        props.setmessage(false);
        // props.setloader(true);
        if (props.tempunit == '°C') {
          if (props.temperature > 38 || props.temperature < 36) {
            ToastAndroid.showWithGravity(
              'Must be within 36.1 ~ 38',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            // props.setloader(false);
            setloader(false);
          } else {
            let choosenDate =
              props.selectedDate == '' ? props.today : props.selectedDate;
            let datetime =
              choosenDate + ' ' + moment(props.time).format('HH:mm:ss');
            let data = {
              report_type: REPORT_TYPES.temperature,
              temperature: props.temperature,
              note: props.tempunit,
              datetime: datetime,
            };

            let response = await add_report(data);
            if (response) {
              // props.setloader(false);
              setloader(false);
              props.setsave(true);
              let e = props.temperature + props.tempunit;
              await set_async_data('record_temp', e.toString());
              props.return.navigate('TemperatureResultScreen');
            }
          }
        }
        if (props.tempunit == '°F') {
          if (props.temperature > 104 || props.temperature < 96) {
            ToastAndroid.showWithGravity(
              'Must be within 96 ~ 104',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            // props.setloader(false);
            setloader(false);
          } else {
            let choosenDate =
              props.selectedDate == '' ? props.today : props.selectedDate;
            let datetime =
              choosenDate + ' ' + moment(props.time).format('HH:mm:ss');
            let data = {
              report_type: REPORT_TYPES.temperature,
              temperature: props.temperature,
              note: props.tempunit,
              datetime: datetime,
              status: props.status,
            };
            let response = await add_report(data);
            if (response) {
              // props.setloader(false);
              setloader(false);
              props.setsave(true);
              let e = props.temperature + props.tempunit;
              await set_async_data('record_temp', e.toString());
              props.return.navigate('TemperatureResultScreen');
            }
          }
        }
      }
    }
    if (props.screenname == 'Bmi') {
      // props.setloader(true);
      let data = {
        report_type: REPORT_TYPES.bmi,
        sugar_concentration: '',
        sugar_check: '',
        note: '',
        status: props.pressurelevel,
        bmi: props.bmi,
        datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      let response = await add_report(data);
      if (response) {
        props.setsave(true);
        await set_async_data('record_entry', 'record_entered');
        await set_async_data('record_bmi', props.bmi.toString());
        setloader(false);
      }
    }
  };

  return (
    <>
      {loader == true ? (
        <ActivityIndicator
          size={`small`}
          color={`#000000`}
          style={{ marginTop: 40 }}
        />
      ) : (
        <TouchableOpacity
          disabled={props.disablesavebtn}
          onPress={saveRecord}
          style={{
            width: btnWidth,
            height: 200 * btnratio,
            alignSelf: 'center',
            position: 'absolute',
            bottom: '10%',
            backgroundColor: '#009f8b',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
          }}>
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            {props.langstr.main.save}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
