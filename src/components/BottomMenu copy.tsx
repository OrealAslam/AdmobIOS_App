import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Banner} from '../Helper/AdManager';
import QuitAppModal from './QuitAppModal';
import {lang} from '../../global';
import { useIsFocused } from '@react-navigation/native';
const {width} = Dimensions.get('window');

const iconWidth = (width - 190) / 5.3;
const iconRatio = iconWidth / 138;

const BottomMenu = (props: any) => {
  const isFocused = useIsFocused();
  const [quit, setquit] = useState(false);
  const [language, setlanguage] = useState({
    menu: {
      home: '',
      tracker: '',
      health: '',
      profile: '',
    },
  });
  const [langstr, setlangstr] = useState({
    menu: {
      home: '',
      tracker: '',
      health: '',
      profile: '',
    },
  });
  const backAction = () => {
    setquit(true);
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  useEffect(() => {
    (async () => {
      let lan = await lang();
      setlanguage(lan);
    })();
  },[isFocused]);
  useEffect(() => {
    setlangstr(language);
  },[language]);

  return (
    <>
      <View
        style={{height: 'auto', width: width, position: 'absolute', bottom: 0}}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              props.setselectedmenu('home');
            }}
            style={styles.card}>
            <Image
              style={styles.icon}
              source={
                props.selectedmenu == 'home'
                  ? require('../assets/icons/home_selected.png')
                  : require('../assets/icons/home_unselected.png')
              }
            />
            <Text
              style={[
                styles.menuTitle,
                props.selectedmenu == 'home'
                  ? {color: '#725DF2'}
                  : {color: '#A6A6A6'},
              ]}>
              {langstr.menu.home}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              props.setselectedmenu('tracker');
            }}
            style={styles.card}>
            <Image
              style={styles.icon}
              source={
                props.selectedmenu == 'tracker'
                  ? require('../assets/icons/tracker_selected.png')
                  : require('../assets/icons/tracker_unselected.png')
              }
            />
            <Text
              style={[
                styles.menuTitle,
                props.selectedmenu == 'tracker'
                  ? {color: '#725DF2'}
                  : {color: '#A6A6A6'},
              ]}>
              {langstr.menu.tracker}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              props.setselectedmenu('health');
            }}
            style={styles.card}>
            <Image
              style={styles.icon}
              source={
                props.selectedmenu == 'health'
                  ? require('../assets/icons/health_info_selected.png')
                  : require('../assets/icons/health_info_unselected.png')
              }
            />
            <Text
              style={[
                styles.menuTitle,
                props.selectedmenu == 'health'
                  ? {color: '#725DF2'}
                  : {color: '#A6A6A6'},
              ]}>
              {langstr.menu.health}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              props.setselectedmenu('setting');
            }}
            style={styles.card}>
            <Image
              style={styles.icon}
              source={
                props.selectedmenu == 'setting'
                  ? require('../assets/icons/profile_selected.png')
                  : require('../assets/icons/profile_unselected.png')
              }
            />
            <Text
              style={[
                styles.menuTitle,
                props.selectedmenu == 'profile'
                  ? {color: '#725DF2'}
                  : {color: '#A6A6A6'},
              ]}>
              {langstr.menu.profile}
            </Text>
          </TouchableOpacity>
        </View>
        <Banner />
      </View>
      {quit == true ? <QuitAppModal setquit={setquit} /> : <></>}
    </>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    width: width * 0.98,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  adContainer: {
    width: width,
    height: 'auto',
  },
  card: {
    width: iconWidth,
    alignSelf: 'center',
    verticalAlign: 'middle',
    height: undefined,
  },
  icon: {
    width: iconWidth,
    height: 124 * iconRatio,
  },
  menuTitle: {
    fontSize: 8,
    fontWeight: '400',
    textAlign: 'center',
    width: '100%',
  },
});
export default BottomMenu;
