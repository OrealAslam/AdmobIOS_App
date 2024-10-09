import {PieChart} from 'react-native-gifted-charts';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {REPORT_TYPES, get_report} from '../../../Helper/AppHelper';
const {width} = Dimensions.get('window');
const itemWidth = width - 80;
const ratio = itemWidth / 1040;

const PieChartComponent = () => {
  const [recordLength, setrecordLength] = useState(0);
  const [record, setrecord] = useState([{value: 0, color: '#2EB100'}]);

  useEffect(() => {
    (async () => {
      try {
        let response = await get_report(REPORT_TYPES.bmi);
        if (response) {
          if (response.length > 0) {
            sortData(response);
            setrecordLength(response.length);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const sortData = (arr: any) => {
    let finalChartData = [
      {
        color: '#1AB7FD',
        value: arr.filter((item: any) => item.status == 'Severely underweight')
          .length,
      },
      {
        color: '#0CB3FE',
        value: arr.filter((item: any) => item.status == 'Underweight').length,
      },
      {
        color: '#13CC5D',
        value: arr.filter((item: any) => item.status == 'Normal').length,
      },
      {
        color: '#FFC35C',
        value: arr.filter((item: any) => item.status == 'OverWeight').length,
      },
      {
        color: '#FF9046',
        value: arr.filter((item: any) => item.status == 'Obese class 1').length,
      },
      {
        color: '#F13F07',
        value: arr.filter((item: any) => item.status == 'Obese class 2').length,
      },
    ];
    setrecord(finalChartData);
  };

  return (
    <View style={styles.pieChartContainer}>
      <PieChart
        donut
        innerRadius={35}
        radius={70}
        data={record}
        focusOnPress={true}
        onLabelPress={(item: any) => {
          console.log(item);
        }}
        textColor="#000"
        showTextBackground
        textBackgroundRadius={12}
        textBackgroundColor="#fff"
        showValuesAsLabels={true}
        labelsPosition="outward"
        showText
        textSize={10}
        centerLabelComponent={() => {
          return (
            <>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                  alignSelf: 'center',
                }}>
                {recordLength}
              </Text>
              <Text
                style={{
                  color: '#2E2E2E',
                  fontSize: 15,
                  fontWeight: '400',
                  alignSelf: 'center',
                }}>
                Total
              </Text>
            </>
          );
        }}
      />

      <Image
        style={styles.measure_chart}
        source={require('../../../assets/images/measure_chart_bmi.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pieChartContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  measure_chart: {
    width: itemWidth,
    height: 486 * ratio,
  },
});
export default PieChartComponent;
