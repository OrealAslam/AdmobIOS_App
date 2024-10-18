import {View, Text} from 'react-native';
import React from 'react';
import {CalenderNavigatorStyle} from '../StyleHelper/CalenderNavigatorStyle';
import { styles } from '../StyleHelper/Style';
import LinearGradient from 'react-native-linear-gradient';

const DaysComponent = () => {
  return (
    <LinearGradient colors={['#7ADC57', '#5DC983']} start={{ x: 0, y: 0 }} style={CalenderNavigatorStyle.weekdayscontainer}>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>S</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>M</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>T</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>W</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>T</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>F</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>S</Text>
    </LinearGradient>
  );
};

export default DaysComponent;
