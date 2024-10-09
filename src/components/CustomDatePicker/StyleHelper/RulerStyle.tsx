import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  scale: {
    width: 600,
    height: 50,
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
    paddingVertical: 30,
    backgroundColor: '#e8e0e0',
    alignSelf: 'center',
    overflowX: 'scroll',
  },
  scalePrint: {
    width: 2,
    backgroundColor: '#CCCCCC',
    marginRight: 5.6,
  },
  pointer: {
    width: 0,
    height: 30,
    borderWidth: 1,
    borderColor: '#4489D2',
    backgroundColor: '#4489D2',
    zIndex: 1,
    position: 'absolute',
    left: '50%',
    right: '50%',
  },
});
