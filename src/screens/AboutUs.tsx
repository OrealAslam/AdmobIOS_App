import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
// import analytics from '@react-native-firebase/analytics';
import { lang } from '../../global';
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width - 150;
const RATIO = ITEM_WIDTH / 192;

const AboutUs = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
  const [feedback, setfeedback] = useState('');
  const [language, setlanguage] = useState({
    setting: { about: '', suggestion: '', privacy: '', terms: '' },
  });
  const [title, settitle] = useState('');
  const [term, setterm] = useState('');
  const [priv, setpriv] = useState('');
  useEffect(() => {
    (async () => {
      try {
        let lan = await lang();
        // await analytics().logEvent('about_screen');
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    settitle(language?.setting.about);
    setterm(language?.setting.terms);
    setpriv(language?.setting.privacy);
  }, [language]);

  const backAction = () => {
    navigation.navigate('Settings');
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return (
    <SafeAreaView style={{ width: width, height: height, backgroundColor: '#F8FFF8' }}>
      <View style={styles.header}>
        {/* <View style={styles.col}>
          <TouchableOpacity
            style={{ paddingHorizontal: 8, paddingVertical: 5 }}
            onPress={() => navigation.navigate('HomeScreen', { tab: 'setting' })}
            accessibilityLabel="Back">
            <Image
              style={{ width: 14, height: 14 }}
              source={require('../assets/images/dashboard_icons/navigate_back_new.png')}
            />
          </TouchableOpacity>
        </View> */}
          <Text style={styles.heading}>{title}</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Subscription')}>
            <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../assets/images/premium.png')} />
          </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/aboutusimage.png')}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://plancare.pk/care/drinking-water-privacy-policy/',
          )
        }
        style={styles.btn}>
        <Text style={styles.pp}>{priv}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://plancare.pk/care/drinking-water-privacy-policy/',
          )
        }
        style={[styles.btn, { bottom: 50 }]}>
        <Text style={styles.ts}>{term}</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  heading: {
    color: '#241B5B',
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 15,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    width: width * 0.8,
    height: width * 1.22,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    height: 192 * RATIO,
    alignSelf: 'center',
  },
  pp: {
    color: '#5E9368',
    textDecorationLine: 'underline',
    fontFamily: 'Raleway-Medium',
  },
  ts: {
    color: '#5E9368',
    textDecorationLine: 'underline',
    fontFamily: 'Raleway-Medium',
  },
  btn: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
  },
});
export default AboutUs;
