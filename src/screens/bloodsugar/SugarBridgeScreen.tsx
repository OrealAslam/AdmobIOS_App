import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {lang} from '../../../global';
const {width} = Dimensions.get('screen');

const BANNER_IMG = width - 40;
const BANNER_RATIO = BANNER_IMG / 1320;

const SugarBridgeScreen = ({navigation}: {navigation: any}) => {
  const [language, setlanguage] = useState({
    dashobard: {bs: ''},
    main: {bridgetext: ''},
  });
  const backAction = () => {
    return navigation.navigate('HomeScreen', {tab: 'home'});
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  useEffect(() => {
    (async () => {
      let lan = await lang();
      setlanguage(lan);
    })();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{padding: 5}}
          accessibilityLabel="Back"
          onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            style={{width: 14, height: 14}}
            source={require('../../assets/images/dashboard_icons/navigate_back_new.png')}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>{language.dashobard.bs}</Text>
      </View>
      <Image
        style={styles.bannerImg}
        source={require('../../assets/images/dashboard_icons_new/bs_static.png')}
      />
      <Text style={styles.description}>
        {language.main.bridgetext}
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('BloodSugar')}>
        <Text style={styles.btnText}>+ &nbsp; Record Now</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 15,
  },
  bannerImg: {
    width: BANNER_IMG,
    height: 688 * BANNER_RATIO,
    alignSelf: 'center',
    marginTop: 50,
  },
  description: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    position: 'absolute',
    bottom: 150,
    alignSelf: 'center',
  },
  btn: {
    width: width * 0.8,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#457EE4',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 17,
    color: '#fff',
  },
});
export default SugarBridgeScreen;
