import {
  ImageBackground,
  Share,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import LandingScreen from '../../../LandingScreen';
import { useIsFocused } from '@react-navigation/native';
import { lang } from '../../../../../global';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 50;
const RATIO = ITEM_WIDTH / 1256;

const SettingCards = (props: any) => {
  const isFocused = useIsFocused();
  const [language, setlanguage] = useState({
    setting: {
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
    }
  });
  const [lan, setlan] = useState('Language');
  const [meaure, setmeaure] = useState('How to measure heart rate');
  const [disc, setdisc] = useState('Discliamer');
  const [rate, setrate] = useState('Rate Us');
  const [share, setshare] = useState('Share');
  const [feedback, setfeedback] = useState('Feedback');
  const [about, setabout] = useState('About');

  useEffect(() => {
    (async () => {
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
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigateScreen('ChangeLanguageScreen')}>
        <Image
          style={styles.img}
          source={require('../../../../assets/settings/language.png')}
        />
        <Text style={styles.cardText}>{lan}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigateScreen('DisclaimerScreen')}>
        <Image
          style={styles.img}
          source={require('../../../../assets/settings/disclaimer.png')} />
        <Text style={styles.cardText}>{disc}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => props.showrate(true)}>
        <Image
          style={styles.img}
          source={require('../../../../assets/settings/rateus.png')} />
        <Text style={styles.cardText}>{rate}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onShare}>
        <Image
          style={styles.img}
          source={require('../../../../assets/settings/share.png')} />
        <Text style={styles.cardText}>{share}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigateScreen('FeedBackScreen')}>
        <Image
          style={styles.img}
          source={require('../../../../assets/settings/feedback.png')} />
        <Text style={styles.cardText}>{feedback}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigateScreen('AboutUs')}>
        <Image
          style={styles.img}
          source={require('../../../../assets/settings/about.png')} />
        <Text style={styles.cardText}>{about}</Text>
      </TouchableOpacity>

      {/* SUBSCRIPTION TAB */}
      {/* <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigateScreen('Subscription')}>
        <Image
          style={styles.img}
          source={require('../../../../assets/settings/subscription.png')} />
        <Text style={styles.cardText}>Subscription</Text>
      </TouchableOpacity> */}
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: 198 * RATIO,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F8FFF8'
  },
  img: {
    width: 24,
    height: 24,
  },
  cardText: {
    color: '#515151',
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    marginLeft: '6%',
  },
});

export default SettingCards;
