import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {lang} from '../../../../../global';
import {useIsFocused} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const TabManu = (props: any) => {
  const isFocused = useIsFocused();
  const [language, setlanguage] = useState({
    dashobard: {bp: '', bs: '', heartRate: ''},
  });
  const [card1, setcard1] = useState('');
  const [card2, setcard2] = useState('');
  const [card3, setcard3] = useState('');
  useEffect(() => {
    (async () => {
      try {
        let lan = await lang();
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    setcard1(language?.dashobard.bp);
    setcard2(language?.dashobard.bs);
    setcard3(language?.dashobard.heartRate);
  }, [language]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.setcategory('bp')}
        style={[
          styles.button,
          props.category == 'bp' ? {backgroundColor: `rgba(0, 159,139, 0.7)`} : {},
        ]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.text, props.category == 'bp' ? {color: '#FFF'} : {}]}>
          {card1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.setcategory('bs')}
        style={[
          styles.button,
          props.category == 'bs' ? {backgroundColor: `rgba(0, 159,139, 0.7)`,} : {},
        ]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.text, props.category == 'bs' ? {color: '#FFF'} : {}]}>
          {card2}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.setcategory('heart')}
        style={[
          styles.button,
          props.category == 'heart' ? {backgroundColor: `rgba(0, 159,139, 0.7)`} : {},
        ]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.text,
            props.category == 'heart' ? {color: '#FFF'} : {},
          ]}>
          {card3}
        </Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    width: width * 0.3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F4F4FE',
  },
  text: {
    color: '#A6A6A6',
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
});
export default TabManu;
