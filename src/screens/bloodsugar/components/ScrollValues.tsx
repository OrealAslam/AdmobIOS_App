import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';

const {width} = Dimensions.get('window');
const itemWidth = width / 6 + 13;

const ScrollValues = (props: any) => {
  const [scrollValue, setScrollValue] = useState([10, 20, 30, 40, 50, 60]);

  useEffect(() => {
    populateArray(props.dynamic);
  }, [props.dynamic]);

  const populateArray = (number: any) => {
    let updatedNumber = parseInt(number);
    let newArr = [
      updatedNumber - 30,
      updatedNumber - 20,
      updatedNumber - 10,
      updatedNumber + 50,
      updatedNumber + 50,
    ];
    setScrollValue(newArr);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        width: width,
        position: 'absolute',
        bottom: 5,
      }}>
      {scrollValue.map((val, index) => {
        return (
          <View
            style={{
              width: itemWidth,
              height: 20,
              top: 7,
              backgroundColor: 'transparent',
            }}
            key={index}>
            <Text
              style={{
                color: '#8A8A90',
                fontFamily: 'Roboto',
                fontWeight: '700',
                fontSize: 10,
              }}>
              {val}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ScrollValues;
