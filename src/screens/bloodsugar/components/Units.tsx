import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {addFormStyle} from '../../../Helper/StyleHelper';

const {width} = Dimensions.get('window');

const Units = (props: any) => {
  const {container, form, label, input} = addFormStyle;
  return (
    <View
      style={{
        width: (90 / 100) * width,
        alignSelf: 'center',
        top: 10,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
      }}>
      <TouchableOpacity
        onPress={() => props.setunit('mg/dl')}
        style={[
          addFormStyle.unitStyle,
          {backgroundColor: props.unit == 'mg/dl' ? '#509AE9' : '#FFFFFF'},
        ]}>
        <Text
          style={{
            color: props.unit == 'mg/dl' ? '#FFFFFF' : '#8A8A90',
            fontSize: 12,
            fontWeight: '600',
          }}>
          mg/dl
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.setunit('mmol/L')}
        style={[
          addFormStyle.unitStyle,
          {backgroundColor: props.unit == 'mmol/L' ? '#509AE9' : '#FFFFFF'},
        ]}>
        <Text
          style={{
            color: props.unit == 'mmol/L' ? '#FFFFFF' : '#8A8A90',
            fontSize: 12,
            fontWeight: '600',
          }}>
          mmol/L
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Units;
