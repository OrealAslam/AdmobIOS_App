import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { lang } from '../../global';
import { useIsFocused } from '@react-navigation/native';
// import {NativeAd150} from '../Helper/NativeAd150';
import { NATIVE_AD_ID_TWO } from '../Helper/AdManager';
const { width } = Dimensions.get('window');

const cardWidth = width - 50;
const cardRatio = cardWidth / 1504;

const btnWidth = width - 30;
const btnRatio = btnWidth / 1256;

const Recomandations = (props: any) => {
  const isFocused = useIsFocused();
  const [language, setlanguage] = useState({
    dashobard: { recommended: '' },
    recommended: { heartDisease: '', BloodGlucose: '', heartDiseaseTypes: '' },
    main: { more: '' },
  });
  const [str, setstr] = useState({
    dashobard: { recommended: '' },
    recommended: { heartDisease: '', BloodGlucose: '', heartDiseaseTypes: '' },
    main: { more: '' },
  });

  const myFunction = (screen: any) => {
    try {
      if (screen != '') {
        props.navigateScreen(screen, 'insight');
      } else {
        props.setselectedmenu('insight');
      }
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    (async () => {
      let lan = await lang();
      setlanguage(lan);
    })();
  }, [isFocused]);

  useEffect(() => {
    setstr(language);
  }, [language]);

  return (
    <>
      <View style={styles.header}>
        <Image
          style={styles.icon}
          source={require('../assets/icons/recomandations.png')}
        />
        <Text style={[styles.title, { fontSize: 18, fontWeight: '700' }]}>{str.dashobard.recommended}</Text>
      </View>

      <View style={styles.articleContainer}>
        <TouchableOpacity onPress={() => myFunction(props.putScreen)}>
          <ImageBackground
            style={styles.articleCard}
            source={require('../assets/images/article_images/heartdisease.png')}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.title, { maxWidth: '60%', fontFamily: 'Raleway-Regular', marginLeft: 0, fontWeight: '500' }]}>
              {str.recommended.heartDisease}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => myFunction(props.putScreen)}>
          <ImageBackground
            style={styles.articleCard}
            source={require('../assets/images/article_images/bloodglucose.png')}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.title, { maxWidth: '60%', fontFamily: 'Raleway-Regular', fontWeight: '500' }]}>
              {str.recommended.BloodGlucose}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* <View
          style={[styles.nativeContainer, {marginLeft: 10, marginBottom: 15}]}>
          <NativeAd150 adId={NATIVE_AD_ID_TWO} />
        </View> */}
        <TouchableOpacity onPress={() => myFunction(props.putScreen)}>
          <ImageBackground
            style={styles.articleCard}
            source={require('../assets/images/article_images/heart_disease_type.png')}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.title, { maxWidth: '60%', fontFamily: 'Raleway-Regular', fontWeight: '500' }]}>
              {str.recommended.heartDiseaseTypes}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <LinearGradient colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 2 }}>
          <TouchableOpacity onPress={() => myFunction(props.putScreen)}>
            <Text style={styles.buttonText}>{str.main.more}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width * 0.95,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    width: 17,
    height: 22.35,
    marginLeft: 0,
  },
  title: {
    color: '#2A5B1B',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: 10,
    marginVertical: 15
  },
  articleContainer: {
    width: width * 0.88,
    flexDirection: 'column',
    paddingBottom: 30,
    alignSelf: 'center'
  },
  articleCard: {
    width: cardWidth,
    height: 336 * cardRatio,
    alignSelf: 'center',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nativeContainer: {
    width: width * 0.88,
    alignSelf: 'center',
  },
  btn: {
    width: width * 0.92,
    paddingVertical: 20,
    borderRadius: 35,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff', fontSize: 16, fontFamily: 'Raleway-ExtraBold',textAlign: 'center'
  },
});

export default Recomandations;
