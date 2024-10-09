import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {get_chart_data} from '../../../Helper/AppHelper';
// import {
//   VictoryChart,
//   VictoryLine,
//   VictoryScatter,
//   VictoryAxis,
// } from 'victory-native';
import {LineChart} from 'react-native-gifted-charts';
import moment from 'moment';

const {width} = Dimensions.get('window');

function Chart(props: any) {
  const isFocused = useIsFocused();
  const [dataArray, setdataArray] = useState([{value: 0, label: '0'}]);
  useEffect(() => {
    (async () => {
      let sugarChart = await get_chart_data('sugar');
      console.log('sugar chart data', sugarChart);
      if (sugarChart.data.length < 1) {
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
        useApiData(sugarChart);
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
    // <VictoryChart polar={false} width={width - 35} height={210} padding={25}>
    //   <VictoryAxis
    //     label=""
    //     style={{
    //       axis: {stroke: 'transparent'},
    //       axisLabel: {fontSize: 9, padding: 0},
    //       grid: {stroke: ''},
    //       ticks: {stroke: '#000', size: 5},
    //       tickLabels: {fontSize: 10, padding: 0},
    //     }}
    //     domainPadding={25}
    //   />
    //   <VictoryAxis
    //     label=""
    //     style={{
    //       axis: {stroke: 'transparent'},
    //       axisLabel: {fontSize: 20, padding: 0},
    //       grid: {stroke: '#DCDCDC', size: 10},
    //       ticks: {stroke: 'transparent', size: 28},
    //       tickLabels: {fontSize: 10, padding: 0},
    //     }}
    //     offsetX={49}
    //     dependentAxis
    //   />
    //   <VictoryLine
    //     interpolation="linear"
    //     data={dataArray}
    //     style={{data: {stroke: '#000000', strokeWidth: 1}}}
    //   />
    //   <VictoryScatter
    //     data={dataArray}
    //     size={5}
    //     style={{
    //       data: {fill: '#7CABFF', borderWidth: 2, borderColor: '#3980FF'},
    //     }}
    //   />
    // </VictoryChart>

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
      thickness={2}
      dataPointsColor={'#00b8e6'}
      backgroundColor={'#F4F5F6'}
      xAxisLabelTextStyle={{fontSize: 10}}
    />
  );
}

export default Chart;
