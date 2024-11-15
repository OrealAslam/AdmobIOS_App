import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import SettingCards from './components/SettingCards';
import RateUs from '../../../components/RateUs';
import { useIsFocused } from '@react-navigation/native';
// import analytics from '@react-native-firebase/analytics';
import { lang } from '../../../../global';

const { width } = Dimensions.get('window');
const IMG_WIDTH = width - 40;
const IMG_RATIO = IMG_WIDTH / 1480;

const Settings = (props: any) => {
  const isFocused = useIsFocused();
  const [rate, showrate] = useState(false);
  const [selectedmenu, setselectedmenu] = useState('setting');
  const [language, setlanguage] = useState({ main: { settingTitle: '' } });
  const [screentitle, setscreentitle] = useState('Setting');

  useEffect(() => {
    (async () => {
      setselectedmenu('profile');
      // await analytics().logEvent('setting_tab');
      let lan = await lang();
      setlanguage(lan);
    })()
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      setscreentitle(language?.main.settingTitle);
    })()
  }, [language]);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#F8FFF8', flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.col}>
            <Text style={styles.heading}>{screentitle}</Text>
          </View>
          {/* <TouchableOpacity onPress={()=>props.navigateScreen('Subscription')}>
            <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../../assets/images/premium.png')} />
          </TouchableOpacity> */}
        </View>
        <ScrollView style={styles.scrollContainer}>
          {/* <ImageBackground style={{width: IMG_WIDTH, height: 576 * IMG_RATIO, alignSelf: 'center'}} source={require('../../../assets/images/premium_ubscribe.png')}>

          </ImageBackground> */}

          <SettingCards navigation={props.navigateScreen} showrate={showrate} />
        </ScrollView>
      </SafeAreaView>
      {rate && <RateUs showrate={showrate} />}
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: '#241B5B',
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 20,
  },
  adContainer: {
    width: '100%',
    height: 64,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'yellow',
  },
  scrollContainer: {
    width: width,
    maxHeight: width * 1.53,
    backgroundColor: '#F8FFF8',
  },
});
export default Settings;