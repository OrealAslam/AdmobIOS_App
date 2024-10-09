import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const CalenderDateStyle = StyleSheet.create({
  container: {
    width: '85%',
    borderWidth: 1,
    borderColor: '#D2D1D1',
    alignSelf: 'center',
    marginTop: 13,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  dateContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
  },
  date: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 10
  },
  dateText: {
    fontSize: 13,
    color: '#2A2A2E',
    fontWeight: '700'
  },    
  selectedDate: {
    backgroundColor: '#2861C6',
  },
  dateTextSelected: {
    color: '#fff'
  }
});
