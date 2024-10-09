import {
  ImageBackground,
  Share,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LandingScreen from '../../../LandingScreen';
import { useIsFocused } from '@react-navigation/native';
import { lang } from '../../../../../global';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = width - 50;
const RATIO = ITEM_WIDTH / 1256;

const SettingCards = (props: any) => {
  const isFocused = useIsFocused();
  const [language, setlanguage] = useState({setting: {
    language: '',
    condition: '',
    heartRate: '',
    bloodSugar: '',
    unit: '',
    remind: '',
    disclaimer: '',
    rate: '',
    share: '',
    feedback: '',
    about: '',
  }});
  const [lan, setlan] = useState('Language');
  const [meaure, setmeaure] = useState('How to measure heart rate');
  const [disc, setdisc] = useState('Discliamer');
  const [rate, setrate] = useState('Rate Us');
  const [share, setshare] = useState('Share');
  const [feedback, setfeedback] = useState('Feedback');
  const [about, setabout] = useState('About');

  useEffect(() => {
    (async()=>{
      let lan = await lang();
      setlanguage(lan);
    })()
  }, [isFocused]);

  useEffect(() => {
    setlan(language?.setting.language);
    setmeaure(language?.setting.heartRate);
    setdisc(language?.setting.disclaimer);
    setrate(language?.setting.rate);
    setshare(language?.setting.share);
    setfeedback(language?.setting.feedback);
    setabout(language?.setting.about);
  }, [language]);

  const navigateScreen = (screennme: any) => {
    props.navigation(screennme);
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=com.healthapps.digitalhealthkit',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateScreen('ChangeLanguageScreen')}>
        <ImageBackground
          style={styles.card}
          source={require('../../../../assets/settings/language.png')}>
          <Text style={styles.cardText}>{lan}</Text>
        </ImageBackground>
      </TouchableOpacity>
      {/* <TouchableOpacity activeOpacity={0.9}>
        <Image
          style={styles.card}
          source={require('../../../../assets/settings/conditions.png')}
        />
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateScreen('BoardingHeartRate1')}>
        <ImageBackground
          style={styles.card}
          source={require('../../../../assets/settings/heart_rate.png')}>
          <Text style={styles.cardText}>{meaure}</Text>
        </ImageBackground>
      </TouchableOpacity> */}
      {/* <TouchableOpacity activeOpacity={0.9}>
        <Image
          style={styles.card}
          source={require('../../../../assets/settings/sugar__target.png')}
        />
      </TouchableOpacity */}
      {/* <TouchableOpacity activeOpacity={0.9}>
        <Image
          style={styles.card}
          source={require('../../../../assets/settings/sugar_unit.png')}
        />
      </TouchableOpacity> */}
      {/* <TouchableOpacity>
        <Image
          style={styles.card}
          source={require('../../../../assets/settings/remind.png')}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateScreen('DisclaimerScreen')}>
        <ImageBackground
          style={styles.card}
          source={require('../../../../assets/settings/disclaimer.png')}>
          <Text style={styles.cardText}>{disc}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.showrate(true)}>
        <ImageBackground
          style={styles.card}
          source={require('../../../../assets/settings/rateus.png')}>
          <Text style={styles.cardText}>{rate}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} onPress={onShare}>
        <ImageBackground
          style={styles.card}
          source={require('../../../../assets/settings/share.png')}>
          <Text style={styles.cardText}>{share}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateScreen('FeedBackScreen')}>
        <ImageBackground
          style={styles.card}
          source={require('../../../../assets/settings/feedback.png')}>
          <Text style={styles.cardText}>{feedback}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateScreen('AboutUs')}>
        <ImageBackground
          style={styles.card}
          source={require('../../../../assets/settings/about.png')}>
          <Text style={styles.cardText}>{about}</Text>
        </ImageBackground>
      </TouchableOpacity>
      
      {/* SUBSCRIPTION TAB */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateScreen('Subscription')}>
        <ImageBackground
          style={styles.card}
          source={require('../../../../assets/settings/subscription.png')}>
          <Text style={styles.cardText}>Subscription</Text>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: 208 * RATIO,
    alignSelf: 'center',
    marginVertical: 5,
    justifyContent: 'center'
  },
  cardText: {
    color: '#515151',
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    marginLeft: '16%',
  },
});

export default SettingCards;
