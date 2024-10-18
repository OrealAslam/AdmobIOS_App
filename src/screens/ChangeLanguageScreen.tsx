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
import { disableAds, languageAssets, set_async_data } from '../Helper/AppHelper';
import { lang } from '../../global';
import { LANGUAGE_NATIVE_AD_ID } from '../Helper/AdManager';
const { width } = Dimensions.get('screen');

const ChangeLanguageScreen = ({ navigation }: { navigation: any }) => {
  const [selectedLang, setselectedLang] = useState('en');
  const [hidead, sethidead] = useState(true);
  const [title, settitle] = useState('Language');
  const [language, setlanguage] = useState({ setting: { language: '' } });

  useEffect(() => {
    (async () => {
      let lan = await lang();
      let res = await disableAds();
      sethidead(res);
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
              ? { backgroundColor: '#6BD459' }
              : { backgroundColor: '#F0FEF0' }
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

  const navigate = async () => {
    await set_async_data('selected_lang', selectedLang);
    navigation.navigate('HomeScreen', { tab: 'setting' });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FFF8' }}>
      <View style={styles.header}>
        <Text style={styles.heading}>{title}</Text>
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
      {hidead.toString() == 'false' ? <View style={styles.nativeAd}>
        <NativeAd150 />
      </View> : (<></>)}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingVertical: 15,
    paddingHorizontal: 25
  },
  heading: {
    color: '#241B5B',
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left'
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
    width: (width - 50) / 2,
    height: width / 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    borderRadius: 14,
    borderColor: '#C9E9BC',
    borderWidth: 2.5
  },
  icon: {
    width: 52,
    height: 34,
    alignSelf: 'flex-start'
  },
  language: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    alignSelf: 'flex-end',
    marginLeft: 'auto'
  },
  nativeAd: {
    width: width * 0.895,
    alignSelf: 'center',
    backgroundColor: '#F0FEF0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C9E9BC'
  },
});
export default ChangeLanguageScreen;