import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { CalenderNavigatorStyle } from '../StyleHelper/CalenderNavigatorStyle';
import { styles } from '../StyleHelper/Style';
import DaysComponent from './DaysComponent';
import { months } from '../../../Helper/AppHelper';

const CalenderNavigator = (props: any) => {

  return (
    <View style={CalenderNavigatorStyle.container}>
      <View style={CalenderNavigatorStyle.navigationArea}>
        <TouchableOpacity onPress={() => { props.previousMonth() }} style={{ padding: 2 }}>
          <Image
            style={{ width: 6, height: 9 }}
            source={require('../../../assets/images/navigateback.png')}
          />
        </TouchableOpacity>

        <Text style={[styles.fontStyle, CalenderNavigatorStyle.monthyear]}>
          {months[props.month]} {props.year}
        </Text>

        <TouchableOpacity onPress={() => { props.nextMonth() }} style={{ padding: 2 }}>
          <Image
            style={{ width: 6, height: 9}}
            source={require('../../../assets/images/navigateright.png')}
          />
        </TouchableOpacity>
      </View>

      <DaysComponent />
    </View>
  );
};

export default CalenderNavigator;
