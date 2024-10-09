import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { set_async_data, languageAssets } from '../Helper/AppHelper';
import { NativeAd150 } from '../Helper/NativeAd150';
// import analytics from '@react-native-firebase/analytics';
const { width, height } = Dimensions.get('screen');
import { lang as language } from '../../global';
import { translation } from '../../locales/translation';
import { LANGUAGE_NATIVE_AD_ID } from '../Helper/AdManager';

const BoardingLanguageScreen = ({ navigation }: { navigation: any }) => {
  const [selectedLang, setselectedLang] = useState('');
  const [langobj, setlangobj] = useState({});

  useEffect(() => {
    (async () => {
      // await analytics().logEvent('boarding_language_screen');
      let l = await language();
      if(l == undefined) {
        setselectedLang('');
      }
      await set_async_data('line_chart_bp_ad', 'unseen');
      await set_async_data('pie_chart_bp_ad', 'unseen');

      await set_async_data('line_chart_bs_ad', 'unseen');
      await set_async_data('pie_chart_bs_ad', 'unseen');

      await set_async_data('line_chart_bmi_ad', 'unseen');
      await set_async_data('pie_chart_bmi_ad', 'unseen');

      await set_async_data('line_chart_temp_ad', 'unseen');
      await set_async_data('pie_chart_temp_ad', 'unseen');
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(translation).includes(selectedLang)) {
      const selectedTranslation = translation[selectedLang];
      setlangobj(selectedTranslation);
    }
  }, [selectedLang]);

  const navigate = async () => {
    if (selectedLang == '' || selectedLang == undefined) {
      ToastAndroid.showWithGravity(
        'Select a Language',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      await set_async_data('selected_lang', selectedLang);
      navigation.navigate('BoardingDesclaimer', { lang: langobj });
    }
  };

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
  }

  return (
    <SafeAreaView style={{ width: width, height: height, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text style={styles.heading}>Select Language</Text>
        {selectedLang ? (<TouchableOpacity style={{ padding: 8 }} onPress={navigate}>
          <Image
            style={{ width: 38, height: 34 }}
            source={require('../assets/icons/tickbtn.png')}
          />
        </TouchableOpacity>) : (<></>)}
      </View>

      <View style={{ width: width, height: width + 10, marginTop: '5%' }}>
        <ScrollView
          style={{
            width: width,
          }}>
          <View style={styles.languageContainer}>
            {displayLanguages()}
          </View>
        </ScrollView>
      </View>

      <View style={styles.bannerAd}>
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
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
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
  bannerAd: {
    width: width * 0.88,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#e6e6e6',
    borderColor: '#EBEBEC',
    borderWidth: 1,
    borderRadius: 10
  },
});
export default BoardingLanguageScreen;