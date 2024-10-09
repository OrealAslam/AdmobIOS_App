import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import WheelPicker from 'react-native-wheely';
import { pulse_rate_measurement } from '../../../Helper/AppHelper';
import {
  systolicValues,
  diastolicValues,
  pulseValues,
} from '../../../Helper/AppHelper';

const {width, height} = Dimensions.get('window');

const itemWidth = width / 3 - 40;
const ratio = itemWidth / 334;

const SystolicComponent = (props: any) => {
  const systolicArr = systolicValues();
  const diastolicArr = diastolicValues();
  const pulseArr = pulseValues();

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WheelPicker
          decelerationRate={'normal'}
          selectedIndex={35}
          options={systolicArr}
          onChange={(index) => {props.setSystolicPressure(systolicArr[index])}}
          itemTextStyle={{
            color: '#FFFFFF',
            fontSize: 19,
            fontWeight: '800',
            fontStyle: 'normal',
            fontFamily: 'Raleway-Medium',
          }}
          containerStyle={{
            backgroundColor: '#009F8B',
            borderRadius: 12,
            width: itemWidth,
          }}
          selectedIndicatorStyle={{
            backgroundColor: '#00b39b',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          visibleRest={1}
        />
        <Text
          style={{
            color: '#2A2A2E',
            fontSize: 16,
            fontFamily: 'Montserrat-Bold',
            marginTop: 5,
          }}>
          {props.langstr?.main.systolic}
        </Text>
        <Text style={{color: '#9F9F9F',fontSize:12,fontFamily: 'Raleway-Medium',}}>mmHg</Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WheelPicker
          decelerationRate={'normal'}
          selectedIndex={50}
          options={diastolicArr}
          onChange={(index) => {props.setdiastolicpressure(diastolicArr[index])}}
          itemTextStyle={{
            color: '#FFFFFF',
            fontSize: 19,
            fontWeight: '800',
            fontStyle: 'normal',
            fontFamily: 'Raleway-Medium',
          }}
          containerStyle={{
            backgroundColor: '#009F8B',
            borderRadius: 12,
            width: itemWidth,
          }}
          selectedIndicatorStyle={{
            backgroundColor: '#00b39b',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          visibleRest={1}
        />
        <Text
          style={{
            color: '#2A2A2E',
            fontSize: 16,
            fontFamily: 'Montserrat-Bold',
            marginTop: 5,
          }}>
          {props.langstr?.main.diastolic}
        </Text>
        <Text style={{color: '#9F9F9F',fontSize:12,fontFamily: 'Raleway-Medium',}}>mmHg</Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WheelPicker
          decelerationRate={'normal'}
          selectedIndex={10}
          options={pulseArr}
          onChange={(index)=>{props.setpulse(pulseArr[index])}}
          itemTextStyle={{
            color: '#FFFFFF',
            fontSize: 19,
            fontFamily: 'Montserrat-Bold',
          }}
          containerStyle={{
            backgroundColor: '#009F8B',
            borderRadius: 12,
            width: itemWidth,
          }}
          selectedIndicatorStyle={{
            backgroundColor: '#00b39b',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          visibleRest={1}
        />
        <Text
          style={{
            color: '#2A2A2E',
            fontSize: 16,
            fontFamily: 'Montserrat-Bold',
            marginTop: 5,
          }}>
          {props.langstr?.main.pulse}
        </Text>
        <Text style={{color: '#9F9F9F',fontSize:12,fontFamily: 'Raleway-Medium'}}>BPM</Text>
      </View>
    </View>
  );
};

export default SystolicComponent;
