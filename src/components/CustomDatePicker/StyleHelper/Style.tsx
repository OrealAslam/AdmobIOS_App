import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textTransform: 'capitalize',
    color: '#fff',
  },
  calenderContainer: {
    width: (90 / 100) * width,
    backgroundColor: '#fff', 
   borderRadius: 24, 
   paddingBottom: 15
  },
  calendarHeader: {
    backgroundColor: '#3980FF',
    flexDirection: 'column',
    padding: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  }
});
