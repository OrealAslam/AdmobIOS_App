import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const {width} = Dimensions.get('window');
import {lang} from '../../global';
import {useIsFocused} from '@react-navigation/native';
const ITEM_WIDTH = width - 30;
const ITEM_RATIO = ITEM_WIDTH / 1440;

const CommingSoon = (props: any) => {
  const isFocused = useIsFocused();
  const [language, setlanguage] = useState({main: {okay: ''}});
  const [btntitle, setbtntitle] = useState('Okay');
  useEffect(() => {
    (async () => {
      let lan = await lang();
      setlanguage(lan);
    })();
  }, [isFocused]);
  useEffect(() => {
    setbtntitle(language?.main.okay);
  }, [language]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/soon.png')}
        style={styles.icon}>
        <TouchableOpacity onPress={props.backAction} style={styles.button}>
          <Text style={styles.btnText}>{btntitle}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width,
    height: '100%',
    backgroundColor: `rgba(0,0,0,0.5)`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ITEM_WIDTH,
    height: 1180 * ITEM_RATIO,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#5F45FE',
    width: '60%',
    borderRadius: 8,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
export default CommingSoon;
