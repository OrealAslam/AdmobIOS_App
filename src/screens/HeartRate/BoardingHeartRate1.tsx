import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import { set_async_data } from '../../Helper/AppHelper';
import CommingSoon from "../../components/CommingSoon";

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width / 2;
const ITEM_RATIO = ITEM_WIDTH / 544;

const POPUP_IMG = width * 0.92;
const POPUP_RATIO = POPUP_IMG / 1440;

const BoardingHeartRate1 = ({navigation}: {navigation: any}) => {
  const backAction = () => {
    navigation.navigate('HomeScreen', {tab: 'home'});
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  useEffect(() => {
    (async () => {
      // await analytics().logEvent('heart_rate_boarding');
    })();
  }, []);

  const next = async () => {
    await set_async_data('heart_boarding', 'seen');
    navigation.navigate('BoardingHeartRate2');
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/icons/camera.png')}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          In order to achieve heart measurement, Allow us to access the camera
          please, which will not cause any disclosure of your privacy. Please
          rest assured to use it.
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={next}>
          <Text style={styles.btnText}>Allow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#EBEBEC'}]}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={[styles.btnText, {color: '#2E2E2E', fontWeight: '400'}]}>
            Refuse
          </Text>
        </TouchableOpacity>
      </View>

      <CommingSoon backAction={backAction} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  overlayContainer: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: `rgba(0,0,0,0.6)`,
    justifyContent: 'center',
  },
  modalContainer: {
    width: width * 0.92,
    height: 1180 * POPUP_RATIO,
    alignSelf: 'center',
    padding: 15,
    justifyContent: 'flex-end',
  },
  image: {
    width: ITEM_WIDTH,
    height: 486 * ITEM_RATIO,
  },
  textContainer: {
    width: width * 0.7,
    alignSelf: 'center',
    marginVertical: 30,
    paddingVertical: 20,
  },
  text: {
    color: '#727272',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  btn: {
    width: width * 0.4,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#725DF2',
    alignSelf: 'center',
    borderRadius: 6,
    marginVertical: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  popup: {
    width: width * 0.92,
  },
});
export default BoardingHeartRate1;
