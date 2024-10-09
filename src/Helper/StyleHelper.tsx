import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const win = Dimensions.get('window');
const ratioBoardingBG = win.width / 360;

export const headerStyle = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#3980FF',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto-Medium'
  },
  backBtn: {
    position: 'absolute',
    left: 25,
    width: 25,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnImg: {width: 7.01, height: 13.84},
  headerHeading: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#2E2E2E',
  },
  addNewWrap: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    position: 'absolute',
    bottom: 0,
  },
  symptonHeading: {
    color: '#41403F',
    fontStyle: 'normal',
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 10,
    fontSize: 15
  },
});

export const historyListStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainArea: {
    paddingLeft:25,
    paddingRight:25
  },
  card: {
    borderRadius: 15,
    width: '100%',
    backgroundColor: '#ECF5FF',
    marginBottom: 15,
    padding: 3,
  },
  cardHeader: {
    backgroundColor: '#ECF5FF',
    // backgroundColor: 'red',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 34,
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardheaderText: {
    fontFamily: 'Mont',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    color: '#515151',
    alignSelf: 'center',
    marginLeft: -3,
  },
  cardBody: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  description: {
    fontFamily: 'Roboto Light',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#515151',
    marginTop: 0,
  },
  measures: {
    color: '#515151',
    fontWeight: '600',
    fontSize: 27,
    textAlign: 'center',
    alignSelf: 'center',
  },
  unit: {
    color: '#2E2E2E',
    fontSize: 18,
    textAlign: 'center',
  },
  pageLoader: {
    marginTop: '30%',
  },
  delIcon: {
    width: 10.91,
    height: 14,
    position: 'relative',
    alignSelf: 'center',
    right: 0,
  },
  normal: {
    color: '#38D73F',
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'left',
  },
  preD: {
    color: '#FF9F47',
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'left',
  },
  high: {
    color: '#F30C0C',
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'left',
  },
  prediab: {
    color: '#FF9F47',
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'left',
  },
  low: {
    color: '#009DE0',
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'left',
  },
  unitHigh: {
    color: '#F30C0C',
    textAlign: 'center',
    fontSize: 26,
  },
  unitLow: {
    color: '#009DE0',
    fontSize: 26,
    textAlign: 'center',
  },
  unitNormal: {
    color: '#38D73F',
    fontSize: 26,
    textAlign: 'center',
  },
  unitPre: {
    color: '#FF9F47',
    fontSize: 26,
    textAlign: 'center',
  },
  topText: {
    textAlign: 'left',
    color: '#515151',
    fontSize: 12,
    marginLeft: 30,
    fontFamily: 'Roboto Light',
    fontWeight: '600',
    top: 5
  },
});

export const addFormStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    width: width,
    height: 100,
    backgroundColor: '#3980FF',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  headerHeading: {
    fontFamily: 'Montserrat-Bold',
    fontStyle: 'normal',
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  cancelBtn: {
    fontFamily: 'Montserrat-Bold',
    fontStyle: 'normal',
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#FFFFFF',
    marginTop: 12,
    left: -17,
  },
  saveBtn: {
    fontFamily: 'Montserrat-Bold',
    fontStyle: 'normal',
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#FFFFFF',
    marginTop: 12,
    right: -17,
  },
  datetime: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingRight: 1,
  },
  col1: {
    flexDirection: 'row',
    padding: 10,
  },
  form: {
    padding: 15,
    marginTop: 20,
  },
  label: {
    fontFamily: 'Montserrat-Bold',
    fontStyle: 'normal',
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#2E2E2E',
    marginLeft: 10,
    marginBottom: 0,
  },
  input: {
    height: 52,
    marginLeft: 0,
    marginTop: 8,
    padding: 10,
    paddingRight: 10,
    paddingLeft: 12,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F5F8FF',
    color: '#515151',
    textAlign: 'left',
    fontSize: 15,
  },
  foodContainer: {
    padding: 10,
    width: '100%',
  },
  foodIC: {
    width: 67,
    height: 67,
  },
  foodtypes: {
    width: '100%',
    marginTop: 25,
  },
  showFoodTypes: {
    backgroundColor: '#5E98B2',
    padding: 12,
    borderRadius: 6,
  },
  calanderIC: {width: 22, height: 22, transform: [{scale: 0.9}]},
  clockIC: {width: 23, height: 23},
  dateTimeText: {
    color: '#515151',
    marginLeft: 10,
    alignSelf: 'center',
    fontSize: 14,
  },
  foodTypeText: {
    alignSelf: 'center',
    fontFamily: 'Mont',
    fontSize: 14,
    color: '#2E2E2E',
    marginLeft: 6,
  },
  pulseinput: {
    paddingLeft: 15,
  },
  unitStyle: {
    width: 70,
    height: 30,
    flexShrink: 0,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    elevation: 2.1,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginHorizontal: 15
  },
  picker: {
    backgroundColor: '#457EE4',
    height: 156,
    color: '#FFFFFF',
    borderRadius: 15,
  },
});

export const boardingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: 800 * ratioBoardingBG,
    padding: 15,
  },
  row: {flex: 2},
  row1: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  row2: {},
  row3: {
    justifyContent: 'flex-end',
  },
  nextTick: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headingText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#588DB1',
  },

  ageSlot: {width: '100%', height: 56, marginBottom: 5},
});

export const ModelPickerStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.55)',
  },
  modalView: {
    width: (92 / 100) * width,
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export const DailyStepsStyle = StyleSheet.create({
  stepContainer: {
    backgroundColor: '#F5F8FF',
    width: (92 / 100) * width,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'column',
  },
  col1: {flexDirection: 'row', alignItems: 'center'},
  stepsCount: {
    color: '#343434',
    fontSize: 22,
    fontStyle: 'normal',
    fontFamily: 'Montserrat-Bold',
  },
  column: {
    flexDirection: 'column',
    padding: 10,
    width: '48%',
    backgroundColor: '#F5F8FF',
    borderRadius: 10,
  },
  distanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: (98 / 100) * width,
    alignSelf: 'center',
  },
  graphContainer: {
    width: (92 / 100) * width,
    padding: 8,
    paddingTop: 0,
    backgroundColor: '#EFF5FF',
    alignSelf: 'center',
    borderRadius: 15,
  },
});

export const WaterIntakeStyle = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#3980FF'},
  header: {
    backgroundColor: '#3980FF',
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {color: '#FFFFFF', fontSize: 14, fontWeight: '700'},
  sideBtn: {color: '#FFFFFF', fontSize: 14},
  body: {
    backgroundColor: '#FFFFFF',
    flex: 7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentWrap: {
    width: '70%',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 100,
    position: 'absolute',
    zIndex: 999,
  },
  heading: {
    fontSize: 36,
    color: '#464647',
    fontWeight: '600',
    marginBottom: 15,
    width: '50%',
  },
  subHeading: {
    fontSize: 16,
    color: '#2A2A2E',
    fontWeight: '600',
    marginBottom: 15,
    width: '50%',
  },
  qtyVal: {fontSize: 14, color: '#515151', marginBottom: 10, width: '50%', backgroundColor:'#F4F5F6', borderRadius: 10,padding: 15, flexDirection: 'row', justifyContent:'space-between'},
  fillBox: {
    backgroundColor: '#03ACF3',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 0
  },
  buttonsWrap: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  editIcon: {width: 13, height: 13},
  minusIcon: {width: 48, height: 48},
  plusIcon: {width: 71, height: 71},
  glassIcon: {width: 48, height: 48},
  floatingEmoji: {
    position: 'absolute',
    width: 100,
    justifyContent: 'space-around',
    flexDirection: 'row',
  }
});
