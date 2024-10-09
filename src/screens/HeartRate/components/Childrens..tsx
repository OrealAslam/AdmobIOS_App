import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');
const BTN_WIDTH = width / 2 - 50;
const BTN_RATIO = BTN_WIDTH / 568;

const Childrens = (props: any) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.setshowmodal('state');
          }}>
          <ImageBackground
            style={styles.button}
            source={require('../../../assets/images/heart_rate_icons/button.png')}>
            <Text style={{fontWeight: '500', fontSize: 14}}>{props.option}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.setshowmodal('gender');
          }}>
          <ImageBackground
            style={styles.button}
            source={require('../../../assets/images/heart_rate_icons/button.png')}>
            <Text style={{fontWeight: '500', fontSize: 14}}>{props.gender}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.setshowmodal('age');
          }}>
          <ImageBackground
            style={styles.button}
            source={require('../../../assets/images/heart_rate_icons/button.png')}>
            <Text style={{fontWeight: '500', fontSize: 14}}>{props.age}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: BTN_WIDTH,
    height: 176 * BTN_RATIO,
    paddingLeft: 10,
    justifyContent: 'center',
    marginBottom: 15,
  },
});
export default Childrens;
