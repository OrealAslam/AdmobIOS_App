import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { set_async_data, languageAssets } from '../Helper/AppHelper';
// import { NativeAd150 } from '../Helper/NativeAd150';
// import analytics from '@react-native-firebase/analytics';
const { width, height } = Dimensions.get('screen');
import { lang as language } from '../../global';
import { translation } from '../../locales/translation';

const BoardingLanguageScreen = ({ navigation }: { navigation: any }) => {
  const [selectedLang, setselectedLang] = useState('');
  const [langobj, setlangobj] = useState({});

  useEffect(() => {
    (async () => {
      // await analytics().logEvent('boarding_language_screen');
      let l = await language();
      if (l == undefined) {
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

      await set_async_data('line_chart_heart_ad', 'unseen');
      await set_async_data('pie_chart_heart_ad', 'unseen');
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
      Alert.alert(
        'Select a Language first'
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
              ? { backgroundColor: '#6BD459' }
              : { backgroundColor: '#F0FEF0' },
          ]}>
          <Image style={styles.icon} source={item.icon} />
          <Text
            style={[
              styles.language,
              selectedLang == item.type ? { color: '#fff' } : { color: '#5F9368' },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    });
    return language;
  }

  return (
    <SafeAreaView style={{ width: width, height: height, backgroundColor: '#F8FFF8', }}>
      <View style={styles.header}>
        <Text style={styles.heading}>Select {`\n`}Language</Text>
      </View>

      <View style={{ width: width, marginBottom: 'auto' }}>
        <ScrollView
          style={{
            width: width,
            height: 68 / 100 * height
          }}>
          <View style={styles.languageContainer}>
            {displayLanguages()}
          </View>
        </ScrollView>
      </View>

      <LinearGradient colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 2 }}>
        <TouchableOpacity onPress={navigate}>
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
      </LinearGradient>
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
    color: '#2A5B1A',
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
  btn: {
    width: width * 0.8,
    paddingVertical: 20,
    borderRadius: 35,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
  },
});
export default BoardingLanguageScreen;