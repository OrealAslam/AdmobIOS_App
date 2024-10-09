import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-modern-datepicker';
import {getMonthName} from '../Helper/AppHelper';
import {View, Image, Text, TouchableOpacity, Modal} from 'react-native';
import React from 'react';
import moment from 'moment';
import { addFormStyle, ModelPickerStyle as styles, headerStyle } from '../Helper/StyleHelper';
const {datetime, col1, label, calanderIC, clockIC} = addFormStyle;
import DatePickerCustom from './CustomDatePicker/DatePickerCustom';

const DateTimeComponent = (props: any) => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5,
          width: '98%',
          alignSelf: 'center',
        }}>
        <View style={{width: '45%'}}>
          <Text
            style={[
              label,
              {textAlign: 'left', marginLeft: 20, marginBottom: 6},
            ]}>
            {props.langstr?.main.date}
          </Text>
        </View>
        <View style={{width: '45%'}}>
          <Text style={[label, {textAlign: 'left', marginLeft: 10}]}>{props.langstr?.main.time}</Text>
        </View>
      </View>

      <View style={datetime}>
        <TouchableOpacity
          onPress={() => {
            props.setModalVisible(true);
          }}
          style={[
            col1,
            {
              backgroundColor: '#F4F5F6',
              alignItems: 'center',
              borderRadius: 6,
              width: '46%',
            },
          ]}
          accessibilityLabel="PickDate">
          <Image
            style={calanderIC}
            source={require('../assets/images/calender.png')}
          />
          <View
            style={{
              width: 1.5,
              height: 32,
              backgroundColor: '#D9D9D9',
              left: 7,
              zIndex: 1
            }}>
            <Text> </Text>
          </View>
          <Text
            style={{
              color: '#2E2E2E',
              marginLeft: 10,
              alignSelf: 'center',
              fontSize: 14,
              fontFamily: 'Raleway-Medium',
              left: 5,
            }}>
            {props.selectedDate == ''
              ? getMonthName(props.today)
              : getMonthName(props.selectedDate)}
          </Text>
          <Image
            source={require('../assets/images/downarrow.png')}
            style={{
              width: 10.57,
              height: 6.53,
              alignSelf: 'center',
              marginLeft: 'auto',
            }}
          />
          {props.modalVisible && (
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}>
                <View style={styles.centeredView}>
                  <DatePickerCustom
                    changeDate={props.changeDate}
                    modalVisible={props.setModalVisible}
                  />
                </View>
              </Modal>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.setTimePicker(true);
          }}
          accessibilityLabel="PickTime"
          style={[
            col1,
            {
              backgroundColor: '#F4F5F6',
              alignItems: 'center',
              borderRadius: 6,
              width: '46%',
            },
          ]}>
          <Image
            style={clockIC}
            source={require('../assets/images/clock.png')}
          />
          <View
            style={{
              width: 1.5,
              height: 32,
              backgroundColor: '#D9D9D9',
              left: 7,
            }}>
            <Text> </Text>
          </View>
          <Text
            style={{
              color: '#2E2E2E',
              marginLeft: 10,
              alignSelf: 'center',
              left: 5,
            }}>
            {moment(props.time).format('hh:mm a')}
          </Text>
          <Image
            source={require('../assets/images/downarrow.png')}
            style={{
              width: 10.57,
              height: 6.53,
              alignSelf: 'center',
              marginLeft: 'auto',
            }}
          />
          {props.timePicker && (
            <DateTimePicker
              value={props.time}
              mode="time"
              display={'default'}
              headerStyle={{backgroundColor: '#5F45FE'}}
              is24Hour={false}
              onChange={props.onChangeTime}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DateTimeComponent;
