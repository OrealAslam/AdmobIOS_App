import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import { Style } from '../StyleHelper/CalenderHeaderStyle';
import { styles } from '../StyleHelper/Style';
import { days } from '../../../Helper/AppHelper';

const CalenderHeader = (props:any) => {
  
  return (
    <View style={Style.calendarHeader}>
      <View style={Style.yearContainer}>
        <Text style={[styles.fontStyle, Style.year]}>{props.year}</Text>
        <TouchableOpacity onPress={()=>[props.returnData()]}>
          <Text style={{color: '#fff',fontSize :13}}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={Style.dateContainer}>
        <Text style={[styles.fontStyle, Style.date]}>{props.relevantDay}, {props.month} {props.date}</Text>
      </View>
    </View>
  );
};

export default CalenderHeader;
