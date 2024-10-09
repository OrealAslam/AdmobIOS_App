import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import {mgdl, mmol} from '../../../Helper/AppHelper';

const {width, height} = Dimensions.get('window');

const RulerPicker = (props: any) => {
  const [scales, setscales] = useState(mgdl);
  const [scrollPosition, setscrollPosition] = useState(0);
  const [selectedItem, setselectedItem] = useState(50);
  const [scalecount, setscalecount] = useState(10);
  const [min, setmin] = useState(20);
  const [max, setmax] = useState(450);

  useEffect(() => {
    if (props.unit == 'mg/dl') {
      setscales(mgdl);
      setscalecount(10);
      setmin(20);
      setmax(450);
    }
    if (props.unit == 'mmol/L') {
      setscalecount(10);
      setmin(0);
      setmax(80);
      setscales(mmol);
    }
  }, [props.unit]);

  useEffect(() => {
    // console.log('MIN',min)
    let scrollPos = scrollPosition;
    let newStartPosition = scrollPos / 8 + min;
    const center = width / 2 / 8 + newStartPosition;
    setselectedItem(center);
    // console.log(selectedItem)
    props.setSugarLevel(center);
  }, [scrollPosition, min]);

  const printScales = () => {
    let scale = scales.map((item:any, index:any) => {
      if (props.unit == 'mg/dl') {
        return (
          <View
            style={
              index % scalecount === 0
                ? [styles.scalePrint, {height: 32}]
                : styles.scalePrint
            }
            key={index}>
            {index % scalecount === 0 && (
              <Text style={styles.scaleData}>{item}</Text>
            )}
          </View>
        );
      } else {
        return (
          <View
            style={
              index % scalecount === 5
                ? [styles.scalePrint, {height: 32}]
                : styles.scalePrint
            }
            key={index}>
            {index % scalecount === 5 && (
              <Text style={styles.scaleData}>{item}</Text>
            )}
          </View>
        );
      }
    });

    return scale;
  };

  return (
    <>
      <Text style={styles.selected}>{Math.round(selectedItem)}</Text>
      <View style={styles.container}>
        <ScrollView
          onScroll={(event: Object) => {
            setscrollPosition(event.nativeEvent.contentOffset.x);
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.rulerContainer}>
          {printScales()}
        </ScrollView>
        <View style={styles.pointer}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fefefe'
  },
  rulerContainer: {
    width: (100 / 100) * width,
    height: (11 / 100) * height,
    backgroundColor: '#F5F8FF',
    alignSelf: 'center',
    flexDirection: 'row',
    overflow: 'scroll'
  },
  scalePrint: {
    width: 2,
    height: 16,
    backgroundColor: '#CCCCCC',
    marginRight: 6
  },
  pointer: {
    width: 0,
    height: 32,
    borderWidth: 1,
    borderColor: '#4489D2',
    backgroundColor: '#4489D2',
    zIndex: 1,
    position: 'absolute',
    left: '50%'
  },
  scaleData: {
    position: 'relative',
    top: 36,
    fontSize: 12,
    color: '#8A8A90',
    width: 26,
    left: -4
  },
  selected: {
    textAlign: 'center',
    fontSize: 31,
    paddingVertical: 10,
    color: '#5394DA',
    fontWeight: '700'
  },
});

export default RulerPicker;
