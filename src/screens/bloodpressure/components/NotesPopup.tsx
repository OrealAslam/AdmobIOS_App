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

const NotesPopup = (props: any) => {
  const [selectedopt, setselectedopt] = useState('');
  const options = [
    props.langstr.options.AfterMeal,
    props.langstr.options.BeforeMeal,
    props.langstr.options.medication,
    props.langstr.options.Sitting,
    props.langstr.options.Peroid,
    props.langstr.options.Walking,
    props.langstr.options.Lying,
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
          <Text style={styles.heading}></Text>
          <TouchableOpacity onPress={() => props.setshowremarksmodal(false)}>
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
              selectedopt == 'After Meal' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('After Meal')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'After Meal' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.AfterMeal}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Before Meal' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Before Meal')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Before Meal' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.BeforeMeal}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Medication' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Medication')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Medication' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.medication}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Sitting' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Sitting')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Sitting' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.Sitting}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Peroid' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Peroid')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Peroid' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.Peroid}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Walking' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Walking')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Walking' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.Walking}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Lying' ? {backgroundColor: '#009F8B'} : {},
            ]}
            onPress={() => setselectedopt('Lying')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Lying' ? {color: '#fff'} : {},
              ]}>
              {props.langstr.options.Lying}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => props.setshowremarksmodal(false)}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Raleway-Medium',
                color: '#5B5B5B',
              }}>
              {props.langstr.main.cancel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setnote(selectedopt);
              props.setshowremarksmodal(false);
            }}
            style={[styles.bottomButton, {backgroundColor: '#009F8B'}]}>
            <Text
              style={{textAlign: 'center', color: '#fff', fontFamily: 'Raleway-Medium',}}>
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
    fontWeight: '700',
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
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
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
export default NotesPopup;
