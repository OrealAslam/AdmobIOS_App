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
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { disableAds, generateFCM, set_async_data } from '../Helper/AppHelper';
import { INTERSITIAL_AD_ID } from '../Helper/AdManager';
import DisplayAd from '../components/DisplayAd';
import SystemNavigationBar from 'react-native-system-navigation-bar';
// import analytics from '@react-native-firebase/analytics';

const { width, height } = Dimensions.get('screen');

const VECTOR_WIDTH = width - 120;
const VECTOR_RATIO = VECTOR_WIDTH / 1064;

const BoardingDesclaimer = ({ navigation }: { navigation: any }) => {
  const route = useRoute();
  const [loader, setloader] = useState(false);
  const [hidead, sethidead] = useState(true);

  useEffect(() => {
    (async () => {
      const barColor = await SystemNavigationBar.setBarMode('dark');
      let res = await disableAds();
      sethidead(res);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FFF8' }}>
      <View style={{ width: width, height: height * 0.45, justifyContent: 'center' }}>
        <Image style={{ width: VECTOR_WIDTH, height: 1260 * VECTOR_RATIO, position: 'absolute', alignSelf: 'center' }} resizeMode='contain' source={require('../assets/icons/warning.png')} />
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
        <LinearGradient colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 2 }}>
          <TouchableOpacity onPress={() => {
            if(hidead.toString() == 'false') {
              setloader(true);
            } else{
              _continue(); 
            }
            console.log(hidead)
          }}>
            <Text style={styles.text}>{route.params?.lang.boarding.letsgo}</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
      {loader && <DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: '#2A5B1A',
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    fontStyle: 'normal',
    top: 20
  },
  disclaimerText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    lineHeight: 18,
    color: '#5f9369',
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
    top: 32
  },
  btn: {
    width: width * 0.8,
    paddingVertical: 20,
    borderRadius: 35,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '5%'
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
  },
});
export default BoardingDesclaimer;