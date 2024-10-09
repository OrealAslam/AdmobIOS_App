import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const Style = StyleSheet.create({
  calendarHeader: {
    backgroundColor: '#5F45FE',
    flexDirection: 'column',
    padding: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  yearContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  dateContainer: {
    padding: 5,
  },
  date: {
    fontSize: 30,
    fontWeight: '800',
  },
  year: {
    fontSize: 12,
  },
});
