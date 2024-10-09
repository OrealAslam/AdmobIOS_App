import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const ExitModel = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.heading}>Exit editing now?</Text>
        <Text style={styles.subheading}>
          The edited content cannot be saved after exiting
        </Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: '#DDDDFF',
              width: '45%',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderRadius: 7,
            }}
            onPress={() => props.setcloseloader(false)}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#009F8B',
              width: '45%',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderRadius: 7,
            }}
            onPress={() => props.navigation.navigate('HomeScreen')}>
            <Text style={[styles.btnText, {color: '#fff'}]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(0,0,0,0.4)`,
  },
  box: {
    width: width * 0.85,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 13,
    width: width * 0.6,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Raleway-Medium',
  },
  btnContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 25,
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: '#000'
  }
});
export default ExitModel;
