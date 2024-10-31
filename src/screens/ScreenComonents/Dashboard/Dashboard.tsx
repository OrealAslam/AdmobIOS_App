import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import DashboardContent from './components/DashboardContent';
import Recomandations from '../../../components/Recomandations';
import { useIsFocused } from '@react-navigation/native';
// import analytics from '@react-native-firebase/analytics';
const { width, height } = Dimensions.get('screen');
import { lang } from '../../../../global';
import { disableAds } from '../../../Helper/AppHelper';
// import CalorieButton from '../../../components/CalorieButton';
// import { calorieButtonArray } from '../../../Helper/AppHelper';

const Dashboard = (props: any) => {
  const isFocused = useIsFocused();
  const [hidead, sethidead] = useState(false);
  const [selectedmenu, setselectedmenu] = useState('home');
  const [language, setlanguage] = useState({ main: { homeTitle: '' } });
  const [langstr, setlangstr] = useState({ main: { homeTitle: '' } });

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('home_tab');
        let lan = await lang();
        let res = await disableAds();
        sethidead(res);
        setlanguage(lan);
        setselectedmenu('home');
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      setlangstr(language);
    })();
  }, [language]);

  return (
    <ScrollView
      style={styles.mainContainer}
      decelerationRate={'fast'}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.heading}>{langstr?.main.homeTitle}</Text>
        {
          !hidead ? 
        <TouchableOpacity onPress={() => props.navigateScreen('Subscription')}>
          <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../../assets/images/premium.png')} />
        </TouchableOpacity> : (<></>)
        }
      </View>
      <DashboardContent navigate={props.navigateScreen} />
      <Recomandations setselectedmenu={props.setselectedmenu} putScreen={''} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    width: width,
    padding: 10,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  heading: {
    color: '#241B5B',
    fontSize: 26,
    left: '20%',
    marginTop: 0,
    marginBottom: 15,
    fontFamily: 'Roboto',
    fontWeight: '600'
  },
  cloudImg: {
    width: 30.51,
    height: 23,
    bottom: '10%',
  },
  mainContainer: {
    backgroundColor: '#ffffff',
    maxHeight: height * 0.81,
    marginTop: 0,
    paddingTop: 0,
  },
});
export default Dashboard;