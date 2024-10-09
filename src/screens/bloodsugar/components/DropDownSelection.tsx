import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Image,
} from 'react-native';
import React, {useState} from 'react';
const {width, height} = Dimensions.get('screen');
const DropDownSelection = (props: any) => {
  const [selectedopt, setselectedopt] = useState('');
  const options = [
    props.langstr.options.AfterMeal,
    props.langstr.options.BeforeMeal,
    props.langstr.options.AfterSleep,
    props.langstr.options.Fasting,
    props.langstr.options.Other,
  ];

  const displayButons = () => {
    let output = options.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedopt == item ? {backgroundColor: '#009F8B'} : {},
          ]}
          onPress={() => setselectedopt(item)}>
          <Text
            style={[
              styles.btnText,
              selectedopt == item ? {color: '#fff'} : {},
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
    return output;
  };

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>{props.langstr.main.note}</Text>
          <TouchableOpacity onPress={() => props.setshow(false)}>
            <Image
              style={{width: 14, height: 14}}
              source={require('../../../assets/images/dashboard_icons/navigate_back_new.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.mainArea}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'After meal' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('After meal')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'After meal' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.AfterMeal}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Before meal' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Before meal')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Before meal' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.BeforeMeal}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'After sleep' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('After sleep')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'After sleep' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.AfterSleep}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Fasting' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Fasting')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Fasting' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.Fasting}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Other' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Other')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Other' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.Other}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => props.setshow(false)}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Montserrat-Bold',
                color: '#5B5B5B',
              }}>
              {props.langstr.main.cancel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setSelectedTime(selectedopt);
              props.setshow(false);
            }}
            style={[styles.bottomButton, {backgroundColor: '#009F8B'}]}>
            <Text
              style={{textAlign: 'center', color: '#fff', fontFamily: 'Montserrat-Bold',}}>
              {props.langstr.main.okay}
            </Text>
          </TouchableOpacity>
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
    top: 0,
    left: 0,
    backgroundColor: `rgba(0,0,0,0.3)`,
    justifyContent: 'center',
  },
  container: {
    width: width * 0.92,
    padding: 15,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    bottom: 50,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  heading: {
    color: '#2E2E2E',
    fontFamily: 'Montserrat-Bold',
    fontSize: 21,
  },
  mainArea: {
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: '#F4F5F6',
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: '#5B5B5B',
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    width: '45%',
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: '#F4F5F6',
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginBottom: 10,
  },
});
export default DropDownSelection;
