import {View, Text} from 'react-native';
import React from 'react';
import {CalenderNavigatorStyle} from '../StyleHelper/CalenderNavigatorStyle';
import { styles } from '../StyleHelper/Style';

const DaysComponent = () => {
  return (
    <View style={CalenderNavigatorStyle.weekdayscontainer}>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>S</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>M</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>T</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>W</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>T</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>F</Text>
      <Text style={[styles.fontStyle, CalenderNavigatorStyle.dayText]}>S</Text>
    </View>
  );
};

export default DaysComponent;
