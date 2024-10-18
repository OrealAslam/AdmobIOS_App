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
          width: '80%',
          alignSelf: 'center',
          
        }}>
        <View style={{width: '45%'}}>
          <Text
            style={[
              label,
              {textAlign: 'center', marginLeft: 20},
            ]}>
            {props.langstr?.main.date}
          </Text>
        </View>
        <View style={{width: '45%'}}>
          <Text style={[label, {textAlign: 'center', marginLeft: 10}]}>{props.langstr?.main.time}</Text>
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
              backgroundColor: '#ffffff',
              alignItems: 'center',
              borderRadius: 12,
              width: '46%',
              borderWidth: 1,
              borderColor: '#C9E9BC'
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
              backgroundColor: '#C9E9BC',
              left: 7,
              zIndex: 1
            }}>
            <Text> </Text>
          </View>
          <Text
            style={{
              color: '#5E9368',
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
              backgroundColor: '#ffffff',
              alignItems: 'center',
              borderRadius: 12,
              width: '46%',
              borderWidth: 1,
              borderColor: '#C9E9BC'
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
              backgroundColor: '#C9E9BC',
              left: 7,
            }}>
            <Text> </Text>
          </View>
          <Text
            style={{
              color: '#5E9368',
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
