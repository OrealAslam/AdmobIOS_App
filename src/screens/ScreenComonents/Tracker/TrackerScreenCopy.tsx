import {View, Text} from 'react-native';
import React from 'react';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from 'react-native-gifted-charts';

const TrackerScreen = () => {
  const data = [{value: 50, label: '18-24'}, {value: 80, label: '21-24'}, {value: 90, label: '22-24'}, {value: 70, label: '27-24'}];

  return (
    <View>
      <LineChart spacing={75} data={data} adjustToWidth={true} width={350} isAnimated 
      onDataChangeAnimationDuration={400} initialSpacing={20} color={'#00f'} dashGap={4} focusEnabled thickness={2}
      dataPointsColor={'red'}/>
    </View>
  );
};

export default TrackerScreen;
