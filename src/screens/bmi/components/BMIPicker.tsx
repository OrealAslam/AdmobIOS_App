import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import WheelPicker from 'react-native-wheely';
const {width} = Dimensions.get('window');
const itemWidth = width / 3 - 40;
const ratio = itemWidth / 334;

const BMIPicker = (props: any) => {
  const weight = useMemo(() => {
    let arr = [];
    for (let i = 40; i <= 210; i++) {
      arr.push(i.toString());
    }
    return arr;
  }, []);

  const height = useMemo(() => {
    let arr = [];
    for (let i = 40; i <= 250; i++) {
      arr.push(i.toString());
    }
    console.log('rerender height arr');
    return arr;
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WheelPicker
          decelerationRate={'normal'}
          selectedIndex={30}
          options={weight}
          onChange={index => {
            props.setweight(weight[index]);
          }}
          itemTextStyle={{
            color: '#FFFFFF',
            fontSize: 19,
            fontWeight: '800',
            fontStyle: 'normal',
          }}
          containerStyle={{
            backgroundColor: '#009f8b',
            borderRadius: 12,
            width: itemWidth,
          }}
          selectedIndicatorStyle={{
            backgroundColor: '#00ccb1',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          visibleRest={1}
        />
        <Text
          style={{
            color: '#2A2A2E',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 5,
          }}>
          {props.langstr.main.weight}
        </Text>
        <Text style={{color: '#9F9F9F', fontSize: 12}}>kg</Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WheelPicker
          decelerationRate={'normal'}
          selectedIndex={131}
          options={height}
          onChange={index => {
            props.setheight(height[index]);
          }}
          itemTextStyle={{
            color: '#FFFFFF',
            fontSize: 19,
            fontWeight: '800',
            fontStyle: 'normal',
          }}
          containerStyle={{
            backgroundColor: '#009f8b',
            // backgroundColor: '#04AA6D',
            borderRadius: 12,
            width: itemWidth,
          }}
          selectedIndicatorStyle={{
            backgroundColor: '#00ccb1',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          visibleRest={1}
        />
        <Text
          style={{
            color: '#2A2A2E',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 5,
          }}>
          {props.langstr.main.height}
        </Text>
        <Text style={{color: '#9F9F9F', fontSize: 12}}>cm</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width * 0.5,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});
export default BMIPicker;
