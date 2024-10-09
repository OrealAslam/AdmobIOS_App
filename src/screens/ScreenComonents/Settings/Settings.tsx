import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SettingCards from './components/SettingCards';
import RateUs from '../../../components/RateUs';
import {useIsFocused} from '@react-navigation/native';
// import analytics from '@react-native-firebase/analytics';
import { lang } from '../../../../global';

const {width} = Dimensions.get('window');

const Settings = (props:any) => {
  const isFocused = useIsFocused();
  const [rate, showrate] = useState(false);
  const [selectedmenu, setselectedmenu] = useState('setting');
  const [language, setlanguage] = useState({main: {settingTitle: ''}});
  const [screentitle, setscreentitle] = useState('Setting');

  useEffect(() => {
    (async()=>{
      setselectedmenu('profile');
      // await analytics().logEvent('setting_tab');
      let lan = await lang();
      setlanguage(lan);
    })()
  }, [isFocused]);

  useEffect(() => {
    (async()=>{
      setscreentitle(language?.main.settingTitle);
    })()
  }, [language]);

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#F4F4FE', flex: 1}}>
        <View style={styles.header}>
          <View style={styles.col}>
            <Text style={styles.heading}>{screentitle}</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
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
    color: '#2E2E2E',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
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
    backgroundColor: '#F4F4FE',
  },
});
export default Settings;
