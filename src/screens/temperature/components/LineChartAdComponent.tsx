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
import Chart from './Chart';
import {get_async_data, set_async_data} from '../../../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const adImgWidth = width - 50;
const adImgRatio = adImgWidth / 1260;

const btnWidth = width - 100;
const btnRatio = btnWidth / 1256;

const LineChartAdComponent = (props: any) => {
  const isFocused = useIsFocused();
  const [adSeen, setadSeen] = useState('');
  
  useEffect(() => {
    (async () => {
      try {
        if (props.loader == false) {
          let adSeen = await get_async_data('line_chart_temp_ad');
          setadSeen(adSeen);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused, adSeen, props.loader]);

  return (
    <>
      {adSeen == 'seen' ? (
        <>
          <View style={styles.chartContainer}>
            <Chart />
          </View>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: '#009F8B',
                marginBottom: 10,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => {
              props.navigation.navigate('TemperatureScreen');
            }}>
            <Text style={styles.btnText}>{props.langstr.main.add}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ImageBackground
          style={styles.adImage}
          source={require('../../../assets/icons/line_chart_ad.png')}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.btnText}>
              {props.langstr.tracker.bsChartText}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.lockImg}
              source={require('../../../assets/icons/lock.png')}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.btn,
              {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#009F8B',
                borderRadius: 6,
              },
            ]}
            onPress={()=>props.showAd('line')}>
            <Text style={{color: '#fff', fontSize: 15,fontFamily: 'Raleway-Medium',}}>
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
    width: 323,
    height: 245,
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
    backgroundColor: '#f4f5f6',
    borderRadius: 10,
  },
});
export default LineChartAdComponent;
