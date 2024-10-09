import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const CalenderNavigatorStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 7,
  },
  navigationArea: {
    width: '44%',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  monthyear: {
    color: '#2A2A2E',
    fontSize: 14,
    fontWeight: '700',
  },
  weekdayscontainer: {
    backgroundColor: '#5F45FE',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 55,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
