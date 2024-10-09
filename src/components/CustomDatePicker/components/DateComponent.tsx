import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CalenderDateStyle } from '../StyleHelper/CalenderDateStyle';
import { styles } from '../StyleHelper/Style';
import { globalDate } from '../../../Helper/AppHelper';
const DateComponent = (props: any) => {
  const [data, setdata] = useState([1]);
  const [prepend, setprepend] = useState([0]);

  useEffect(() => {
    let arr = [];
    let prep = [];
    for (let i = 1; i <= props.days; i++) {
      arr.push(i);
    }
    setdata(arr);

    for (let i = 0; i < props.prependDays; i++) {
      prep.push(i);
    }
    setprepend(prep);
  }, [props.days]);

  const printDays = () => {
    let jsx = data.map((item, index) => {
      return (
        <TouchableOpacity onPress={() => { props.setdatepressed(item) }} style={[CalenderDateStyle.date, props.datepressed == item ? { backgroundColor: '#5F45FE' } : {}]} key={index}>
          <Text style={[styles.fontStyle, CalenderDateStyle.dateText, props.datepressed == item ? CalenderDateStyle.dateTextSelected : {}]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
    return jsx;
  };

  const prependDays = () => {
    let append = prepend.map((item, index) => {
      return (
        <TouchableOpacity style={CalenderDateStyle.date} key={index}>
          <Text style={[styles.fontStyle, CalenderDateStyle.dateText]}>
          </Text>
        </TouchableOpacity>
      )
    });
    return append;
  }

  return (
    <View style={CalenderDateStyle.container}>
      <View style={CalenderDateStyle.dateContainer}>
        {prependDays()}
        {printDays()}</View>
    </View>
  );
};

export default DateComponent;
