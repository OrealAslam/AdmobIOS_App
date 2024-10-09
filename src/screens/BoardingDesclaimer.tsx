import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { generateFCM, set_async_data } from '../Helper/AppHelper';
import { INTERSITIAL_AD_ID } from '../Helper/AdManager';
import DisplayAd from '../components/DisplayAd';
import SystemNavigationBar from 'react-native-system-navigation-bar';
// import analytics from '@react-native-firebase/analytics';

const { width, height } = Dimensions.get('screen');
const btnWidth = width - 60;
const btnRatio = btnWidth / 1016;

const VECTOR_WIDTH = width;
const VECTOR_RATIO = VECTOR_WIDTH / 1444;

const BoardingDesclaimer = ({ navigation }: { navigation: any }) => {
  const route = useRoute();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    (async () => {
      const barColor = await SystemNavigationBar.setBarMode('dark');
      console.log('barColor', barColor)
      // await analytics().logEvent('boarding_disclaimer_screen');
    })();
  }, []);
  const createUser = async () => {
    await generateFCM();
  };

  const _continue = async () => {
    await createUser();
    setloader(false);
    await set_async_data('report', []);
    await set_async_data('diet_report', [{
      carbohydrates_total_g: 0,
      cholesterol_mg: 0,
      datetime: undefined,
      fat_total_g: 0,
      fiber_g: 5,
      intake: undefined,
      potassium_mg: 0,
      sodium_mg: 0,
      sugar_g: 0
    }]);
    await set_async_data('hide_ad', 'hide');
    navigation.navigate('MainRoute');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ width: width, height: height * 0.45, justifyContent: 'center' }}>
        <Image style={{ width: VECTOR_WIDTH, height: 1488 * VECTOR_RATIO }} source={require('../assets/icons/disclaimerVector.png')} />
        <Image style={{ width: 238, height: 243.06, position: 'absolute', alignSelf: 'center' }} resizeMode='contain' source={require('../assets/icons/warning.png')} />
      </View>

      <Text
        style={[styles.heading, { marginVertical: 10, paddingVertical: 0, alignSelf: 'center' }]}>
        {route.params?.lang.setting.disclaimer}
      </Text>

      <Text style={styles.disclaimerText}>
        {route.params?.lang.boarding.boarding2subtitle}
      </Text>
      {loader == true ? (
        <ActivityIndicator
          size={'large'}
          color={'#f4e1e1'}
          style={{ alignSelf: 'center', top: 15 }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            setloader(true);
          }}
          style={styles.btn}>
          <Text style={styles.text}>
            {route.params?.lang.boarding.letsgo}
          </Text>
        </TouchableOpacity>
      )}
      {loader && <DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID} />}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: '#2E2E2E',
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    fontStyle: 'normal',
    top: 20
  },
  disclaimerText: {
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    lineHeight: 18,
    color: '#868686',
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
    top: 32
  },
  btn: {
    width: btnWidth,
    height: 191 * btnRatio,
    backgroundColor: '#009F8B',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
    top: '12%',
    borderRadius: 40,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
  },
});
export default BoardingDesclaimer;