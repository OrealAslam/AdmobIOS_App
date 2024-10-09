import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');

const AverageComponent = (props: any) => {
  const options = () => {
    let data = ['After meal', 'Before meal', 'After sleep', 'Fasting', 'Other'];
    let record = data.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.btn,
            props.selected === item
              ? {backgroundColor: '#5F45FE'}
              : {backgroundColor: '#F4F5F6'},
          ]}
          onPress={() => {
            props.setselected(item);
            props.setaveragemodal(false);
          }}>
          <Text
            style={[
              styles.btntxt,
              props.selected === item ? {color: '#fff'} : {color: '#000'},
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
    return record;
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity
          style={[
            styles.btn,
            props.selected === 'After meal'
              ? {backgroundColor: '#5F45FE'}
              : {backgroundColor: '#F4F5F6'},
          ]}
          onPress={() => {
            props.setselected('After meal');
            props.setaveragemodal(false);
          }}>
          <Text
            style={[
              styles.btntxt,
              props.selected === 'After meal' ? {color: '#fff'} : {color: '#000'},
            ]}>
            After meal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            props.selected === 'Before meal'
              ? {backgroundColor: '#5F45FE'}
              : {backgroundColor: '#F4F5F6'},
          ]}
          onPress={() => {
            props.setselected('Before meal');
            props.setaveragemodal(false);
          }}>
          <Text
            style={[
              styles.btntxt,
              props.selected === 'Before meal' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Before meal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            props.selected === 'After sleep'
              ? {backgroundColor: '#5F45FE'}
              : {backgroundColor: '#F4F5F6'},
          ]}
          onPress={() => {
            props.setselected('After sleep');
            props.setaveragemodal(false);
          }}>
          <Text
            style={[
              styles.btntxt,
              props.selected === 'After sleep' ? {color: '#fff'} : {color: '#000'},
            ]}>
            After sleep
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            props.selected === 'Fasting'
              ? {backgroundColor: '#5F45FE'}
              : {backgroundColor: '#F4F5F6'},
          ]}
          onPress={() => {
            props.setselected('Fasting');
            props.setaveragemodal(false);
          }}>
          <Text
            style={[
              styles.btntxt,
              props.selected === 'Fasting' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Fasting
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            props.selected === 'Other'
              ? {backgroundColor: '#5F45FE'}
              : {backgroundColor: '#F4F5F6'},
          ]}
          onPress={() => {
            props.setselected('Other');
            props.setaveragemodal(false);
          }}>
          <Text
            style={[
              styles.btntxt,
              props.selected === 'Other' ? {color: '#fff'} : {color: '#000'},
            ]}>
            Fasting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: width * 0.85,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  btn: {
    marginHorizontal: 8,
    marginBottom: 13,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 22,
  },
  btntxt: {
    fontWeight: '600',
    fontSize: 16,
  },
});
export default AverageComponent;
