import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import GenderModal from './GenderModal';
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
            props.option == title ? {backgroundColor: '#5F45FE'} : {},
          ]}
          key={index}>
          <View style={styles.col1}>
            <Image style={styles.imgSize} source={item.image} />
          </View>
          <View style={styles.col2}>
            <Text
              style={
                props.option == title ? {color: '#fff', fontWeight: '600'} : {}
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
          {/* <TouchableOpacity
            onPress={() => {
              props.setstate(false);
            }}>
            <Image
              style={{width: 14, height: 14}}
              source={require('../../../assets/images/dashboard_icons/navigate_back_new.png')}
            />
          </TouchableOpacity> */}
          <Text style={styles.heading}>What is your Current State?</Text>
        </View>
        {displayOptions()}

        <TouchableOpacity
          onPress={()=>props.setshowmodal('')}
          style={[styles.bottomButton, {backgroundColor: '#5F45FE'}]}>
          <Text style={{textAlign: 'center', color: '#fff', fontWeight: '500'}}>
            Ok
          </Text>
        </TouchableOpacity>
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
    width: width * 0.88,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
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
    color: '#2E2E2E',
    fontWeight: '700',
    fontSize: 17,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EEF9',
    marginBottom: 7,
    paddingVertical: 15,
    paddingHorizontal: 7,
    borderRadius: 8,
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
  bottomButton: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: '#5F45FE',
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 20,
  },
});
export default StateModal;
