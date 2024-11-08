import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
// import analytics from '@react-native-firebase/analytics';
import { lang } from '../../global';
import { useIsFocused } from '@react-navigation/native';
import { Banner } from '../Helper/AdManager';
import LinearGradient from 'react-native-linear-gradient';
import { disableAds } from '../Helper/AppHelper';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 60;
const RATIO = ITEM_WIDTH / 1256;

const FeedBackScreen = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
  // const [hidead, sethidead] = useState(true);
  const [feedback, setfeedback] = useState('');
  const [language, setlanguage] = useState({
    setting: { feedback: '', suggestion: '' },
  });
  const [title, settitle] = useState('');
  const [placeholder, setplaceholder] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('feedback_screen');
        let lan = await lang();
        // let res = await disableAds();
        // sethidead(res);
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    settitle(language?.setting.feedback);
    setplaceholder(language?.setting.suggestion);
  }, [language]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FFF8' }}>
        {/* KeyboardAvoidingView handles keyboard interactions */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              {/* <View style={styles.col}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                  onPress={() => navigation.navigate('HomeScreen')}
                  accessibilityLabel="Back"
                >
                  <Image
                    style={{ width: 14, height: 14 }}
                    source={require('../assets/images/dashboard_icons/navigate_back_new.png')}
                  />
                </TouchableOpacity>
              </View> */}
              <Text style={styles.heading}>{title}</Text>
              {/* {!hidead ?
                <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
                  <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../assets/images/premium.png')} />
                </TouchableOpacity> : <></>
              } */}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setfeedback(text)}
                maxLength={500}
                placeholder={placeholder}
                keyboardType="twitter"
                multiline
              />
            </View>
            <LinearGradient onTouchEnd={() => Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.healthapps.digitalhealthkit',
            )} colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 2 }}>
              <Text style={styles.btntxt}>{title}</Text>
            </LinearGradient>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* BANNER AD */}
        {/* <View style={styles.bannerContainer}>
          {!hidead ? <Banner /> : <></>}
        </View> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
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
  btn: {
    width: ITEM_WIDTH,
    height: 200 * RATIO,
    alignSelf: 'center',
    top: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btntxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    width: width * 0.89,
    height: width * 1.25,
    borderWidth: 2,
    borderColor: '#C9E9BC',
    borderRadius: 9,
    alignSelf: 'center',
  },
  input: {
    color: '#989898',
    fontSize: 14,
    paddingHorizontal: 15,
    width: width * 0.89,
    height: undefined,
    fontFamily: 'Raleway-Medium',
  },
  bannerContainer: {
    height: 'auto',
    width: width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#F4F4FE',
  },
});

export default FeedBackScreen;
