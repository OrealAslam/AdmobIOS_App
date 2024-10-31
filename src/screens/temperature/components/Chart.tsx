import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { get_chart_data } from '../../../Helper/AppHelper';
// import {
//   VictoryChart,
//   VictoryLine,
//   VictoryScatter,
//   VictoryAxis,
// } from 'victory-native';
import { LineChart } from 'react-native-gifted-charts';
import moment from 'moment';

const { width } = Dimensions.get('window');

const Chart = () => {
  const isFocused = useIsFocused();
  const [dataArray, setdataArray] = useState([{ value: 0, label: 0 }]);
  
  useEffect(() => {
    (async () => {
      let temperature = await get_chart_data('temperature');
      if (temperature.data.length < 1) {
        let date = moment().format('YYYY-MM-DD H:mm:ss');
        useApiData({
          data: [73, 73, 73, 73, 73],
          label: [
            date,
            moment().subtract(1, 'days').format('YYYY-MM-DD H:mm:ss'),
            moment().subtract(2, 'days').format('YYYY-MM-DD H:mm:ss'),
            moment().subtract(3, 'days').format('YYYY-MM-DD H:mm:ss'),
            moment().subtract(4, 'days').format('YYYY-MM-DD H:mm:ss'),
          ],
          message: 'Successfully Retrieved',
          status: 'success',
        });
      } else {
        useApiData(temperature);
      }
    })();
  }, [isFocused]);

  const useApiData = (data: any) => {
    let length = data.data.length;
    let array = [];
    for (let i = 0; i < length; i++) {
      const dateObj = new Date(data.label[i]);
      let desiredObject = {
        value: parseInt(data.data[i]),
        label: `${dateObj.getDate()} - ${dateObj.getMonth() + 1}`,
      };
      array.push(desiredObject);
    }
    setdataArray(array.reverse());
  };

  return (
    <LineChart
      spacing={55}
      data={dataArray}
      adjustToWidth={true}
      width={310}
      yAxisColor="#0BA5A4"
      xAxisColor="#0BA5A4"
      color="#0BA5A4"
      isAnimated
      onDataChangeAnimationDuration={400}
      initialSpacing={20}
      dashGap={2}
      focusEnabled
      thickness={3}
      yAxisTextStyle={{fontSize: 10, color: '#2A5B1B'}}
      dataPointsColor={'#2A5B1B'}
      backgroundColor={'#F0FEF0'}
      xAxisLabelTextStyle={{ fontSize: 9, color: '#2A5B1B' }}
      yAxisLabelContainerStyle={{paddingHorizontial: 7,backgroundColor: '#F0FEF0'}}
    />
  );
}
export default Chart;