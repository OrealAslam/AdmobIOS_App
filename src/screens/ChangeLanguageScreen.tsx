import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NativeAd150 } from '../Helper/NativeAd150';
import { languageAssets, set_async_data } from '../Helper/AppHelper';
import { lang } from '../../global';
import { LANGUAGE_NATIVE_AD_ID } from '../Helper/AdManager';
const { width } = Dimensions.get('screen');

const ChangeLanguageScreen = ({ navigation }: { navigation: any }) => {
  const [selectedLang, setselectedLang] = useState('en');
  const [title, settitle] = useState('Language');
  const [language, setlanguage] = useState({ setting: { language: '' } });

  useEffect(() => {
    (async () => {
      let lan = await lang();
      setlanguage(lan);
    })();
  }, []);
  useEffect(() => {
    settitle(language?.setting.language);
  }, [language]);

  const displayLanguages = () => {
    let language = languageAssets.map((item: any, index: any) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => setselectedLang(item.type)}
          activeOpacity={0.9}
          style={[
            styles.languageBox,
            selectedLang == item.type
              ? { backgroundColor: '#009F8B' }
              : { backgroundColor: '#EBEBEC' },
          ]}>
          <Image style={styles.icon} source={item.icon} />
          <Text
            style={[
              styles.language,
              selectedLang == item.type ? { color: '#fff' } : { color: '#000' },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    });
    return language;
  };

  const backAction = () => {
    navigation.navigate('HomeScreen');
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const navigate = async () => {
    await set_async_data('selected_lang', selectedLang);
    navigation.navigate('HomeScreen', { tab: 'setting' });
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.col}>
          <TouchableOpacity
            style={{ paddingHorizontal: 10, paddingVertical: 5 }}
            onPress={() => navigation.navigate('HomeScreen', { tab: 'setting' })}
            accessibilityLabel="Back">
            <Image
              style={{ width: 14, height: 14 }}
              source={require('../assets/images/dashboard_icons/navigate_back_new.png')}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>{title}</Text>
        </View>
        <TouchableOpacity onPress={navigate}>
          <Image
            style={{ width: 38, height: 34 }}
            source={require('../assets/icons/tickbtn.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: width, height: width, overflow: 'scroll' }}>
        <View style={styles.languageContainer}>{displayLanguages()}</View>
      </ScrollView>
      <View style={styles.nativeAd}>
        <NativeAd150 adId={LANGUAGE_NATIVE_AD_ID} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingTop: 25,
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
  languageContainer: {
    width: width,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageBox: {
    width: (width - 40) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
  icon: {
    width: 19,
    height: 19
  },
  language: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    marginLeft: 15
  },
  nativeAd: {
    width: width * 0.895,
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    top: '8%',
    elevation: 2,
    borderRadius: 12,
  },
});
export default ChangeLanguageScreen;