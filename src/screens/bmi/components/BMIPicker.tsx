import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import WheelPicker from 'react-native-wheely';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');
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
        <LinearGradient colors={['#7ADC57', '#5DC983']} style={{
          borderRadius: 12,
          width: itemWidth,
        }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
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
              backgroundColor: 'transparent',
              borderRadius: 12,
              width: itemWidth,
            }}
            selectedIndicatorStyle={{
              backgroundColor: '#2A5B1B',
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            visibleRest={1}
          />
        </LinearGradient>
        <Text
          style={{
            color: '#2A5B1B',
            fontSize: 14,
            fontFamily: 'Montserrat-Bold',
            marginTop: 5,
          }}>
          {props.langstr.main.weight}
        </Text>
        <Text style={{ color: '#9F9F9F', fontSize: 12, fontFamily: 'Raleway-Medium' }}>kg</Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <LinearGradient colors={['#7ADC57', '#5DC983']} style={{
          borderRadius: 12,
          width: itemWidth,
        }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
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
              backgroundColor: 'transparent',
              borderRadius: 12,
              width: itemWidth,
            }}
            selectedIndicatorStyle={{
              backgroundColor: '#2A5B1B',
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            visibleRest={1}
          />
        </LinearGradient>
        <Text
          style={{
            color: '#2A5B1B',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 5,
          }}>
          {props.langstr.main.height}
        </Text>
        <Text style={{ color: '#5E9368', fontSize: 12 }}>cm</Text>
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
