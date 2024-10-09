import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = width;
const RATIO = ITEM_WIDTH / 1440;

const BoardingHeartRate2 = ({navigation}: {navigation: any}) => {
  const backAction = () => {
    navigation.navigate('BoardingHeartRate1');
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <View style={styles.col}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.navigate('HomeScreen')}
            accessibilityLabel="Back">
            <Image
              style={{width: 14, height: 14}}
              source={require('../../assets/images/dashboard_icons/navigate_back_new.png')}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Heart Rate</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Image
          style={styles.heart}
          source={require('../../assets/icons/heart.png')}
        />
        <Text style={styles.desc}>Start your first Heart Rate Measurement</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('MeasuringScreen')}>
        <Text style={styles.btnText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  heart: {
    width: ITEM_WIDTH,
    height: 608 * RATIO,

  },
  contentContainer: {
    width: width,
    height: 1.5 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    color: '#727272',
    position: 'absolute',
    bottom: 15
  },
  btn: {
    width: width * 0.88,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#5F45FE',
    alignSelf: 'center',
    borderRadius: 6,
    marginVertical: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default BoardingHeartRate2;
