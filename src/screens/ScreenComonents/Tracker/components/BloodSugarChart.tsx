import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  REPORT_TYPES,
  get_async_data,
  get_report,
  set_async_data,
} from '../../../../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';
import {get_chart_data} from '../../../../Helper/AppHelper';
// import {
//   VictoryChart,
//   VictoryLine,
//   VictoryScatter,
//   VictoryAxis,
// } from 'victory-native';
import {LineChart} from 'react-native-gifted-charts';
import moment from 'moment';
const {width} = Dimensions.get('window');

const adImgWidth = width - 50;
const adImgRatio = adImgWidth / 1260;

const btnWidth = width - 100;
const btnRatio = btnWidth / 1256;

const BloodSugarChart = (props: any) => {
  const isFocused = useIsFocused();
  const [adSeen, setadSeen] = useState('');
  const [btnType, setbtnType] = useState('Add');

  const [dataArray, setdataArray] = useState([{value: 0, label: '0'}]);

  useEffect(() => {
    (async () => {
      try {
        let adSeen = await get_async_data('line_chart_bs_ad');
        let sugarChart = await get_chart_data('sugar');
        if (sugarChart.data.length < 1) {
          let date = moment().format('YYYY-MM-DD H:mm:ss');
          useApiData({
            data: [73, 73, 73, 73, 73],
            label: [
              date,
              moment().subtract(1, 'days').format('YYYY-MM-DD H:mm:ss'),
              moment().subtract(2, 'days').format('YYYY-MM-DD H:mm:ss'),
              moment().subtract(3, 'days').format('YYYY-MM-DD H:mm:ss'),
              moment().subtract(4, 'days').format('YYYY-MM-DD H:mm:ss'),
            ],
            message: 'Successfully Retrieved',
            status: 'success',
          });
        } else {
          useApiData(sugarChart);
        }
        setadSeen(adSeen);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused, adSeen]);

  useEffect(() => {
    (async () => {
      // change button according to record (added or not)
      let bpAdded = await get_async_data('record_bs');
      if (bpAdded == null) {
        setbtnType('Add');
      } else {
        // record added already
        setbtnType('Unlock');
      }
    })();
  }, [isFocused]);

  const useApiData = (data: any) => {
    let length = data.data.length;
    let array = [];

    for (let i = 0; i < length; i++) {
      const dateObj = new Date(data.label[i]);
      let desiredObject = {
        value: parseInt(data.data[i]),
        label: `${dateObj.getDate()} - ${dateObj.getMonth() + 1}`,
      };
      array.push(desiredObject);
    }
    if (length > 1) {
      setdataArray(array.reverse());
    } else {
      setdataArray(array);
    }
  };
  return (
    <>
      {adSeen == 'seen' ? (
        <>
          <View style={styles.chartContainer}>
            {/* <VictoryChart
              polar={false}
              width={width - 35}
              height={210}
              padding={25}>
              <VictoryAxis
                label=""
                style={{
                  axis: {stroke: 'transparent'},
                  axisLabel: {fontSize: 9, padding: 0},
                  grid: {stroke: ''},
                  ticks: {stroke: '#000', size: 5},
                  tickLabels: {fontSize: 10, padding: 0},
                }}
                domainPadding={25}
              />
              <VictoryAxis
                label=""
                style={{
                  axis: {stroke: 'transparent'},
                  axisLabel: {fontSize: 20, padding: 0},
                  grid: {stroke: '#DCDCDC', size: 10},
                  ticks: {stroke: 'transparent', size: 28},
                  tickLabels: {fontSize: 10, padding: 0},
                }}
                offsetX={48}
                dependentAxis
              />
              <VictoryLine
                interpolation="linear"
                data={dataArray}
                style={{data: {stroke: '#000000', strokeWidth: 1}}}
              />
              <VictoryScatter
                data={dataArray}
                size={5}
                style={{
                  data: {
                    fill: '#7CABFF',
                    borderWidth: 2,
                    borderColor: '#3980FF',
                  },
                }}
              />
            </VictoryChart> */}
            <LineChart
              spacing={55}
              data={dataArray}
              adjustToWidth={true}
              width={310}
              yAxisColor="#0BA5A4"
              xAxisColor="#0BA5A4"
              color="#0BA5A4"
              isAnimated
              onDataChangeAnimationDuration={400}
              initialSpacing={20}
              dashGap={2}
              focusEnabled
              thickness={2}
              dataPointsColor={'#00b8e6'}
              backgroundColor={'#F4F5F6'}
              xAxisLabelTextStyle={{fontSize: 10}}
            />
          </View>
          {/* <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              props.navigation.navigate('AddNewBloodSugarScreen');
            }}>
            <Text style={styles.addbtnText}>{props.langstr.main.add}</Text>
          </TouchableOpacity> */}
        </>
      ) : (
        <ImageBackground
          style={styles.adImage}
          source={require('../../../../assets/icons/line_chart_ad.png')}>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.btnText}>
              {btnType == 'Add'
                ? props.langstr.tracker.bsCharAddtText
                : props.langstr.tracker.bsChartText}
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
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.navigate('BloodSugar')}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.btnText}>
                {props.langstr.main.add}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={props.showAd}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.btnText}>
                {props.langstr.main.unlock}
              </Text>
            </TouchableOpacity>
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
  btn: {
    width: btnWidth,
    height: 176 * btnRatio,
    alignSelf: 'center',
    backgroundColor: `rgba(0, 159,139, 0.7)`,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#f4f5f6',
    borderRadius: 10,
  },
  horizontialTextStyle: {
    fontSize: 12,
  },
  labeltext: {
    fontSize: 9,
    color: '#363636',
  },
  xBorder: {
    borderWidth: 1,
  },
  imageContainer: {
    justifyContent: 'center',
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
  Img: {
    width: 78.7,
    height: 73.15,
    alignSelf: 'center',
  },
});
export default BloodSugarChart;
