import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarChart, yAxisSides} from 'react-native-gifted-charts';
import {get_chart_data} from '../../../Helper/AppHelper';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

function Chart(props: any) {
  const isFocused = useIsFocused();
  const [stackData, setstackData] = useState([
    {
      value: 21,
      frontColor: '#13CC5D',
      label: moment().format('DD-MM')
    },
  ]);
  useEffect(() => {
    (async () => {
      let chartData = await get_chart_data('bmi');
      let dataArr = [];
      let limit =
        chartData.data.length > 5
          ? 5
          : chartData.data.length;
      for (let index = 0; index < limit; index++) {
        
        let barcolor = '#F13F07';
        if (
          chartData.result[index] == 'Severely underweight'
        ) {
          barcolor = '#0CB3FE'; // Serversly Underweight
        }
        else if (
          chartData.result[index] == 'Underweight'
        ) {
          barcolor = '#0CB3FE';  //Underweight
        }
        else if (
          chartData.result[index] == 'Normal'
        ) {
          barcolor = '#13CC5D'; // Normal
        }
        else if (
          chartData.result[index] == 'OverWeight'
        ) {
          barcolor = '#FFC35C'; // OverWeight
        }
        else if (
          chartData.result[index] == 'Obese class 1'
        ) {
          barcolor = '#FF9046'; // Obese class 1
        } else{
          barcolor = '#F13F07' // Obese class 2
        }

        // {value: 15, frontbarcolor: '#f00'}
        let obj = {
          value: parseFloat(chartData.data[index]),
          frontColor: barcolor,
          label: moment(chartData.label[index]).format('MM-DD')
        }
        dataArr.push(obj);
      }
      setstackData(dataArr.reverse());
    })();
  }, [isFocused]);

  return (
    <>
      <BarChart
        width={width - 125}
        barWidth={20}
        capColor={'red'}
        spacing={30}
        noOfSections={4}
        barBorderRadius={15}
        data={stackData}
        showXAxisIndices
        xAxisThickness={1}
        xAxisIndicesColor={'#000'}
        xAxisColor={'#DCDCDC'}
        xAxisIndicesHeight={6}
        xAxisIndicesWidth={1}
        yAxisThickness={0}
        stepHeight={38}
        horizontalRulesStyle={styles.horizontialTextStyle}
        initialSpacing={15}
        yAxisTextStyle={styles.labeltext}
        xAxisLabelTextStyle={styles.labeltext}
        dashGap={2}
      />
    </>
  );
}

const styles = StyleSheet.create({
  horizontialTextStyle: {
    fontSize: 12,
  },
  labeltext: {
    fontSize: 9,
    color: '#363636',
  },
  xBorder: {
    borderWidth: 1,
  },
});

export default Chart;