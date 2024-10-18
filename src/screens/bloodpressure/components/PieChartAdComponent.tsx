import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PieChartComponent from './PieChartComponent';
import {get_async_data, set_async_data} from '../../../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const adImgWidth = width - 50;
const adImgRatio = adImgWidth / 1260;

const btnWidth = width - 100;
const btnRatio = btnWidth / 1256;

const PieChartAdComponent = (props: any) => {
  const isFocused = useIsFocused();
  const [adSeen, setadSeen] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if(props.hidead.toString() == 'false') {
          if (props.loader == false) {
            let adSeen = await get_async_data('pie_chart_bp_ad');
            setadSeen(adSeen);
          }
        } else{
          setadSeen('seen');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused, adSeen, props.loader, props.rate]);

  return (
    <>
      {adSeen == 'seen' ? (
        <>
          <View style={styles.chartContainer}>
            <PieChartComponent />
          </View>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#7ADC57', marginBottom: 10, borderRadius:32, justifyContent: 'center', alignItems: 'center' }]}
            onPress={() => {
              props.navigation.navigate('BloodPressure');
            }}>
            <Text style={styles.btnText}>{props.langstr.main.add}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ImageBackground
          style={styles.adImage}
          source={require('../../../assets/icons/bp_line_chart.png')}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.btnText}>
              {props.langstr.tracker.bpChartText}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.lockImg}
              source={require('../../../assets/icons/lock.png')}
            />
          </View>
          <TouchableOpacity
            onPress={()=>props.showAd('pie')}
            style={[
              styles.btn,
              {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: 32,
              },
            ]}>
            <Text style={{color: '#5E9368', fontSize: 16, fontFamily: 'Raleway-Medium',fontWeight:'600'}}>
              {props.langstr.main.unlock}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  adImage: {
    width: adImgWidth,
    height: 848 * adImgRatio,
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  NativeAd: {
    width: adImgWidth,
    height: 848 * adImgRatio,
    backgroundColor: `rgba(0,0,0,0.3)`,
    alignSelf: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
  },
  btnContainer: {
    marginBottom: 15,
  },
  descriptionContainer: {
    maxWidth: '80%',
    alignSelf: 'center',
  },
  lockImg: {
    width: 49,
    height: 70.02,
    alignSelf: 'center',
  },
  btn: {width: btnWidth, height: 176 * btnRatio, alignSelf: 'center'},
  btnText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  chartContainer: {
    width: width * 0.86,
    alignSelf: 'center',
    overflow: 'scroll',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#F0FEF0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C9E9BC'
  },
});
export default PieChartAdComponent;
