import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Style } from '../StyleHelper/CalenderHeaderStyle';
import { styles } from '../StyleHelper/Style';
import { days } from '../../../Helper/AppHelper';
import LinearGradient from 'react-native-linear-gradient';

const CalenderHeader = (props: any) => {

  return (
    <LinearGradient colors={['#7ADC57', '#5DC983']} style={Style.calendarHeader} start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 2 }}>
      <View style={Style.yearContainer}>
        <Text style={[styles.fontStyle, Style.year]}>{props.year}</Text>
        <TouchableOpacity onPress={() => [props.returnData()]}>
          <Text style={{ color: '#fff', fontSize: 13 }}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={Style.dateContainer}>
        <Text style={[styles.fontStyle, Style.date]}>{props.relevantDay}, {props.month} {props.date}</Text>
      </View>
    </LinearGradient>
  );
};

export default CalenderHeader;
