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
    let data = ['Average', 'Latest', 'Max', 'Min'];
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
            {item == 'avg_24' ? '24h average' : item}
          </Text>
        </TouchableOpacity>
      );
    });
    return record;
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>{options()}</View>
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
    justifyContent: 'flex-start',
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
