import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import QuitAppModal from './QuitAppModal';
const { width } = Dimensions.get('window');
const ICON_WIDTH = width / 5 - 40;
const ICON_RATIO = ICON_WIDTH / 193;

const BottomMenu = (props: any) => {
  const [tab, settab] = useState('home');
  const [quit, setquit] = useState(false);

  useEffect(() => {
    switch (props.selectedmenu) {
      case 'home':
        settab('home');
        break;
      case 'tracker':
        settab('tracker');
        break;
      case 'calorie':
        settab('calorie');
        break;
      case 'insight':
        settab('insight');
        break;
      case 'profile':
        settab('profile');
        break;
      default:
        settab('home');
    }
  }, [props.selectedmenu]);

  const menu = () => {
    let js = (
      <View style={styles.menuContainer}>
        <TouchableOpacity
          onPress={() => changeTab('home')}
          style={styles.column}>
          <Image style={styles.icon} source={tab == 'home' ? require('../assets/menu/home_selected.png') : require('../assets/menu/home_unselected.png')} />
          <Text style={styles.menuTxt}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeTab('calorie')}
          style={styles.column}>
          <Image style={styles.icon} source={tab == 'calorie' ? require('../assets/menu/tracker_selected.png') : require('../assets/menu/tracker_unselected.png')} />
          <Text style={styles.menuTxt}>Cal Assitant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          //onPress={() => changeTab('insight')}
          onPress={() => changeTab('tracker')}
          style={styles.column}>
          {/* <Image style={styles.icon} source={tab == 'insight' ? require('../assets/menu/insight_selected.png') : require('../assets/menu/insight_unselected.png')} /> */}
          <Image style={styles.icon} source={tab == 'tracker' ? require('../assets/menu/insight_selected.png') : require('../assets/menu/insight_unselected.png')} />
          <Text style={styles.menuTxt}>Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeTab('profile')}
          style={styles.column}>
          <Image style={styles.icon} source={tab == 'profile' ? require('../assets/menu/profile_selected.png') : require('../assets/menu/profile_unselected.png')} />
          <Text style={styles.menuTxt}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
    return js;
  };

  const changeTab = (tabmenu: any) => {
    if (tabmenu == 'home') {
      settab('home');
    }
    if (tabmenu == 'tracker') {
      settab('tracker');
    }
    if (tabmenu == 'calorie') {
      settab('tracker');
    }
    if (tabmenu == 'health') {
      settab('insight');
    }
    if (tabmenu == 'profile') {
      settab('profile');
    }
    props.setselectedmenu(tabmenu);
  };

  return (
    <>
      <View
        style={{
          height: 'auto',
          width: width,
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#ffffff',
          paddingBottom: 15
        }}>
        {menu()}
      </View>
      {quit == true ? <QuitAppModal setquit={setquit} /> : <></>}
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: width,
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderTopWidth: 1,
    borderTopColor: '#7ADC57'
  },
  column: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    width: ICON_WIDTH,
    height: 176 * ICON_RATIO,
  },
  menuTxt: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#5E9368'
  }
});
export default BottomMenu;