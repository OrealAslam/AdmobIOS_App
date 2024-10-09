import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  BackHandler,
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

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 60;
const RATIO = ITEM_WIDTH / 1256;

const FeedBackScreen = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
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

  const backAction = () => {
    navigation.navigate('Settings');
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* KeyboardAvoidingView handles keyboard interactions */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <View style={styles.col}>
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
                <Text style={styles.heading}>{title}</Text>
              </View>
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

            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.healthapps.digitalhealthkit',
                )
              }
            >
              <Text style={styles.btntxt}>{title}</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* BANNER AD */}
        <View style={styles.bannerContainer}>
          <Banner />
        </View>
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
    color: '#2E2E2E',
    fontSize: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0, 159,139, 1)`,
    borderRadius: 10,
    marginTop: 20,
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
    borderColor: '#009F8B',
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
