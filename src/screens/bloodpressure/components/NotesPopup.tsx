import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState } from 'react';
const { width, height } = Dimensions.get('screen');

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
            selectedopt == item ? { backgroundColor: '#009F8B' } : {},
          ]}
          onPress={() => setselectedopt(item)}>
          <Text
            style={[
              styles.btnText,
              selectedopt == item ? { color: '#fff' } : {},
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
          <Text style={styles.heading}>BP Notes</Text>
        </View>

        <View style={styles.mainArea}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'After Meal' ? { backgroundColor: '#2A5B1B' } : {},
            ]}
            onPress={() => setselectedopt('After Meal')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'After Meal' ? { color: '#fff' } : {},
              ]}>
              {props.langstr.options.AfterMeal}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Before Meal' ? { backgroundColor: '#2A5B1B' } : {},
            ]}
            onPress={() => setselectedopt('Before Meal')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Before Meal' ? { color: '#fff' } : {},
              ]}>
              {props.langstr.options.BeforeMeal}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Medication' ? { backgroundColor: '#2A5B1B' } : {},
            ]}
            onPress={() => setselectedopt('Medication')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Medication' ? { color: '#fff' } : {},
              ]}>
              {props.langstr.options.medication}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Sitting' ? { backgroundColor: '#2A5B1B' } : {},
            ]}
            onPress={() => setselectedopt('Sitting')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Sitting' ? { color: '#fff' } : {},
              ]}>
              {props.langstr.options.Sitting}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Peroid' ? { backgroundColor: '#2A5B1B' } : {},
            ]}
            onPress={() => setselectedopt('Peroid')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Peroid' ? { color: '#fff' } : {},
              ]}>
              {props.langstr.options.Peroid}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Walking' ? { backgroundColor: '#2A5B1B' } : {},
            ]}
            onPress={() => setselectedopt('Walking')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Walking' ? { color: '#fff' } : {},
              ]}>
              {props.langstr.options.Walking}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedopt == 'Lying' ? { backgroundColor: '#2A5B1B' } : {},
            ]}
            onPress={() => setselectedopt('Lying')}>
            <Text
              style={[
                styles.btnText,
                selectedopt == 'Lying' ? { color: '#fff' } : {},
              ]}>
              {props.langstr.options.Lying}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: '#C9E9BC' }]}
            onPress={() => props.setshowremarksmodal(false)}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Raleway-Medium',
                color: '#5E9368',
                fontSize: 14
              }}>
              {props.langstr.main.cancel}
            </Text>
          </TouchableOpacity>

          <LinearGradient colors={['#7ADC57', '#5DC983']} style={[styles.bottomButton, { backgroundColor: '#009F8B' }]} start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 2 }}>
            <TouchableOpacity
              onPress={() => {
                props.setnote(selectedopt);
                props.setshowremarksmodal(false);
              }}
            >
              <Text
                style={{ textAlign: 'center', color: '#fff', fontFamily: 'Raleway-Medium', }}>
                {props.langstr.main.okay}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
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
    borderRadius: 15,
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
    color: '#2A5B1B',
    fontWeight: '700',
    fontSize: 21,
  },
  mainArea: {
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: '#F0FEF0',
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: '#5E9368',
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
  },
  buttonContainer: {
    width: '90%',
    marginTop: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    width: '30%',
    alignSelf: 'center',
    borderRadius: 27,
    paddingHorizontal: 5,
    paddingVertical: 14,
    marginBottom: 10,
  },
});
export default NotesPopup;
