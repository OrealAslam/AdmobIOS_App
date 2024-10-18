import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');

const StateModal = (props: any) => {
  const data = [
    {
      title: 'Resting',
      image: require('../../../assets/images/heart_rate_icons/resting.png'),
      imgSize: {
        width: 17.53,
        height: 16.51,
      },
    },
    {
      title: 'Sitting',
      image: require('../../../assets/images/heart_rate_icons/sitting.png'),
      imgSize: {
        width: 14.82,
        height: 20.06,
      },
    },
    {
      title: 'Running',
      image: require('../../../assets/images/heart_rate_icons/running.png'),
      imgSize: {
        width: 17.98,
        height: 22.55,
      },
    },
    {
      title: 'Exercising',
      image: require('../../../assets/images/heart_rate_icons/exercising.png'),
      imgSize: {
        width: 16.86,
        height: 27.76,
      },
    },
    {
      title: 'Walking',
      image: require('../../../assets/images/heart_rate_icons/walking.png'),
      imgSize: {
        width: 16.19,
        height: 23.77,
      },
    },
    {
      title: 'Lying',
      image: require('../../../assets/images/heart_rate_icons/lying.png'),
      imgSize: {
        width: 27.88,
        height: 7.21,
      },
    },
    {
      title: 'Standing',
      image: require('../../../assets/images/heart_rate_icons/standing.png'),
      imgSize: {
        width: 9.6,
        height: 26.87,
      },
    },
  ];

  const displayOptions = () => {
    let options = data.map((item: any, index: any) => {
      let title = item.title;
      return (
        <TouchableOpacity
          onPress={() => props.setoption(item.title)}
          style={[
            styles.button,
            props.option == title ? {backgroundColor: '#2A5B1B'} : {},
          ]}
          key={index}>
          <View style={styles.col1}>
            <Image style={styles.imgSize} source={item.image} />
          </View>
          <View style={styles.col2}>
            <Text
              style={
                [styles.btnText, props.option == title ? {color: '#fff', fontWeight: '600'} : {}]
              }>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
    return options;
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>What is your Current State?</Text>
        </View>
        {displayOptions()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: '#C9E9BC' }]}
            onPress={() => props.setshow(false)}>
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
                props.setshow(false);
                props.setshow(false);
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
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: `rgba(0,0,0,0.5)`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
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
    paddingHorizontal: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  heading: {
    color: '#2A5B1B',
    fontWeight: '700',
    fontSize: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FEF0',
    marginBottom: 7,
    paddingVertical: 15,
    paddingHorizontal: 7,
    borderRadius: 8,
  },
  btnText: {
    color: '#5E9368',
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
  },
  col1: {
    width: '19%',
    alignItems: 'center',
  },
  imgSize: {
    width: 17.53,
    height: 16.51,
  },
  col2: {
    width: '81%',
    paddingLeft: 10,
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
export default StateModal;
