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
        let response = await get_report(REPORT_TYPES.temperature);
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
        color: '#2EB100',
        value: arr.filter((item: any) => item.status == 'Normal').length,
      },
      {
        color: '#E78039',
        value: arr.filter((item: any) => item.status == 'Potential Illness').length,
      },
    ];
    setrecord(finalChartData);
  };

  return (
    <View style={styles.pieChartContainer}>
      <PieChart
        donut
        innerRadius={37}
        radius={70}
        data={record}
        focusOnPress={true}
        onLabelPress={(item:any)=>{console.log(item)}}
        textColor="#000"
        showTextBackground
        textBackgroundRadius={12}
        textBackgroundColor='#fff'
        showValuesAsLabels={true}
        labelsPosition='outward'
        showText
        textSize={10}
        centerLabelComponent={() => {
          return (
            <>
              <Text style={{color: '#000', fontSize: 16, fontWeight: '700',alignSelf: 'center'}}>
                {recordLength}
              </Text>
              <Text style={{color: '#2E2E2E', fontSize: 15, fontWeight: '400',alignSelf: 'center'}}>
                Total
              </Text>
            </>
          );
        }}
      />

      {/* <Image
        style={styles.measure_chart}
        source={require('../../../assets/images/measure_chart_bs.png')}
      /> */}
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
    height: 290 * ratio,
  },
});
export default PieChartComponent;
