import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  Button,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { BarChart, yAxisSides } from 'react-native-gifted-charts';
import {
  get_async_data,
  get_chart_data,
  set_async_data,
} from '../../../../Helper/AppHelper';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');

const adImgWidth = width - 50;
const adImgRatio = adImgWidth / 1260;

const btnWidth = width - 100;
const btnRatio = btnWidth / 1256;

const BloodPressureChart = (props: any) => {
  const isFocused = useIsFocused();
  const chartRef = useRef(); // Ref for the chart component
  const [chartImage, setChartImage] = useState(null); // Store the base64 chart image
  const [adSeen, setadSeen] = useState('');
  const [btnType, setbtnType] = useState('Add');
  const [stackData, setstackData] = useState([
    {
      stacks: [
        { value: 80, color: 'transparent' },
        { value: 120, color: '#38D73F', marginBottom: 2 },
      ],
      label: '9am',
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        let bpAdded = await get_async_data('record_bp');

        if (bpAdded == null) {
          setbtnType('Add');
        } else {
          // record added already
          setbtnType('Unlock');
        }
        if (!props.hidead) {
          let adSeen = await get_async_data('line_chart_bp_ad');
          setadSeen(adSeen);
        } else {
          await set_async_data('line_chart_bp_ad', 'seen');
          setadSeen('seen');
        }
        let chartData = await get_chart_data('bp');
        let dataArr = [];
        let limit =
          chartData.diastolic_pressure.length > 5
            ? 5
            : chartData.diastolic_pressure.length;
            for (let index = 0; index < limit; index++) {
              let color = '#F13F07';
              if (
                (parseInt(chartData.systolic_pressure[index]) > 180 || parseInt(chartData.diastolic_pressure[index]) > 120)
              ) {
                color = '#F13F07'; // Hypertensive
              }else if (
                (parseInt(chartData.systolic_pressure[index]) >= 140 &&
                  parseInt(chartData.systolic_pressure[index]) <= 180) ||
                (parseInt(chartData.diastolic_pressure[index]) >= 90 &&
                  parseInt(chartData.diastolic_pressure[index]) <= 120)
              ) {
                color = '#EC7F00'; // Hyper. Stage-2
              } else if (
                (parseInt(chartData.systolic_pressure[index]) >= 130 &&
                  parseInt(chartData.systolic_pressure[index]) <= 139) ||
                (parseInt(chartData.diastolic_pressure[index]) >= 80 &&
                  parseInt(chartData.diastolic_pressure[index]) <= 89)
              ) {
                color = '#FF9A24'; // Hyper. Stage-1
              } else if (
                parseInt(chartData.systolic_pressure[index]) >= 120 &&
                parseInt(chartData.systolic_pressure[index]) <= 129 &&
                parseInt(chartData.diastolic_pressure[index]) >= 60 &&
                parseInt(chartData.diastolic_pressure[index]) <= 79
              ) {
                color = '#FEB056'; // Elevated
              } else if (
                (parseInt(chartData.systolic_pressure[index]) >= 90 &&
                parseInt(chartData.systolic_pressure[index]) <= 119 )&&
                (parseInt(chartData.diastolic_pressure[index]) >= 60 &&
                parseInt(chartData.diastolic_pressure[index]) <= 79)
              ) {
                color = '#2EB100'; // Normal
              } else {
                // color = '#F13F07'
                color = '#3980FF'; //Hypotension
              }
      
              let stack = {
                stacks: [
                  {
                    value: parseInt(chartData.diastolic_pressure[index]),
                    color: 'transparent',
                  },
                  {
                    value:
                    parseInt(chartData.systolic_pressure[index]) -
                    parseInt(chartData.diastolic_pressure[index]),
                    color: color,
                    marginBottom: 2,
                  },
                ],
                label: moment(chartData.label[index]).format('MM-DD'),
              };
              dataArr.push(stack);
            }
        setstackData(dataArr.reverse());
      } catch (e) {
        console.log('error', e);
      }
    })();
  }, [isFocused, props.loader, props.hidead]);

  // Capture the chart as an image
  const captureChart = async () => {
    chartRef.current.capture().then((uri:any) => {
      setChartImage(uri); // Set the captured image URI
      console.log('Captured chart image URI:', uri);
    });
  };

  return (
    <>
      {adSeen == 'seen' || props.hidead ? (
        <>
          <View style={styles.chartContainer}>
            <BarChart
              width={width - 125}
              barWidth={20}
              capColor={'red'}
              spacing={30}
              noOfSections={4}
              barBorderRadius={15}
              stackData={stackData}
              showXAxisIndices
              xAxisThickness={1}
              xAxisIndicesColor={'#0BA5A4'}
              yAxisColor={"#0BA5A4"}
              xAxisColor={"#0BA5A4"}
              xAxisIndicesHeight={6}
              xAxisIndicesWidth={1}
              yAxisThickness={0}
              stepHeight={38}
              horizontalRulesStyle={styles.horizontialTextStyle}
              initialSpacing={15}
              yAxisTextStyle={styles.labeltext}
              xAxisLabelTextStyle={styles.labeltext}
              dashGap={2}
            />
          </View>
          <View style={styles.btnContainer}>
            <LinearGradient onTouchEnd={() => { props.navigation.navigate('BloodPressure') }} colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }} end={{ x: 2, y: 2 }}>
              <Text style={styles.addbtnText}>{props.langstr.main.add}</Text>
            </LinearGradient>
          </View>
        </>
      ) : (
        <ImageBackground
          style={styles.adImage}
          source={require('../../../../assets/icons/bp_line_chart.png')}>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.btnText}>
              {btnType == 'Add'
                ? props.langstr.tracker.bpCharAddtText
                : props.langstr.tracker.bpChartText}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            {btnType == 'Add' ? (
              <Image
                style={styles.Img}
                source={require('../../../../assets/icons/img.png')}
              />
            ) : (
              <Image
                style={styles.lockImg}
                source={require('../../../../assets/icons/lock.png')}
              />
            )}
          </View>
          {btnType == 'Add' ? (
            <LinearGradient onTouchEnd={() => { props.navigation.navigate('BloodPressure') }} colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 2 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.btnText}>
                {props.langstr.main.add}
              </Text>
            </LinearGradient>

          ) : (
            <LinearGradient onTouchEnd={props.showAd} colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 2 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.btnText}>
                {props.langstr.main.unlock}
              </Text>
            </LinearGradient>

          )}
        </ImageBackground>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  adImage: {
    width: adImgWidth,
    height: 896 * adImgRatio,
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
  btn: {
    width: btnWidth,
    height: 186 * btnRatio,
    alignSelf: 'center',
    backgroundColor: `rgba(0, 159,139, 1)`,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'bottom',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  addbtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  chartContainer: {
    width: width * 0.86,
    alignSelf: 'center',
    overflow: 'scroll',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#F0FEF0',
    borderRadius: 10,
  },
  horizontialTextStyle: {
    fontSize: 12,
    color: '#2A5B1B'
  },
  labeltext: {
    fontSize: 9,
    color: '#2A5B1B',
  },
  xBorder: {
    borderWidth: 1,
  },
  lockImg: {
    width: 49,
    height: 70.02,
    alignSelf: 'center',
  },
  Img: {
    width: 78.7,
    height: 73.15,
    alignSelf: 'center',
  },
});
export default BloodPressureChart;
