import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import {useState, useEffect} from 'react';
const {width, height} = Dimensions.get('screen');
import NativeAdView from 'react-native-admob-native-ads';
import {ARTICLE_AD_ID, NATIVE_AD_ID} from '../Helper/AdManager';
import {NativeAd150} from '../Helper/NativeAd150';
import {lang} from '../../global';
import {useIsFocused} from '@react-navigation/native';

const QuitAppModal = (props: any) => {
  const [language, setlanguage] = useState({
    main: {cancel: '', okay: ''},
    quit: {desc: '', quitBtn: ''},
  });
  const [langstr, setlangstr] = useState({
    main: {cancel: '', okay: ''},
    quit: {desc: '', quitBtn: ''},
  });

  useEffect(() => {
    (async () => {
      let lan = await lang();
      setlanguage(lan);
    })();
  }, [useIsFocused]);
  useEffect(() => {
    setlangstr(language);
  }, [language]);
  return (
    <View style={styles.overlayContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{langstr.quit.desc}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btnColumn, {backgroundColor: '#04AA6D'}]}
            onPress={() => props.setquit(false)}>
            <Text style={[styles.title, {fontSize: 14, color: '#fff'}]}>
              {langstr.main.cancel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => BackHandler.exitApp()}
            style={[styles.btnColumn, {backgroundColor: '#ff3333'}]}>
            <Text style={[styles.title, {fontSize: 14, color: '#fff'}]}>
              {langstr.quit.quitBtn}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.nativeAd}>
          <NativeAd150 adId={ARTICLE_AD_ID} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  overlayContainer: {
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 9,
    top: 0,
    left: 0,
    backgroundColor: `rgba(0,0,0,0.3)`,
  },
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '19%',
    padding: 20,
    borderRadius: 15,
    // borderTopEndRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#2E2E2E',
    fontSize: 20,
    fontWeight: '400',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    width: width * 0.78,
  },
  btnColumn: {
    width: '44%',
    backgroundColor: '#E0EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 7,
  },
  nativeAd: {
    width: width * 0.80,
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    elevation: 2,
    borderRadius: 12,
  },
});
export default QuitAppModal;
