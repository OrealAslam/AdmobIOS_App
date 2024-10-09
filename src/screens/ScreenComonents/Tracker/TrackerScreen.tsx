import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import BlobUtil from 'react-native-blob-util';

import BloodPressureChart from './components/BloodPressureChart';
import BloodSugarChart from './components/BloodSugarChart';
import BMIChart from './components/BMIChart';
import { NativeAd150 } from '../../../Helper/NativeAd150';
import { lang } from '../../../../global';
import { set_async_data } from '../../../Helper/AppHelper';
import { NATIVE_AD_ID_ONE, NATIVE_AD_ID_TWO, REWARED_AD_ID } from '../../../Helper/AdManager';
import DisplayRewardedAd from '../../../components/DisplayRewardedAd';
import RateUs from '../../../components/RateUs';
const { width } = Dimensions.get('window');

const btnWidth = width - 100;
const btnRatio = btnWidth / 1256;

const TrackerScreen = (props: any) => {
  const isFocused = useIsFocused();
  const bpchartRef = useRef(<></>);
  const bschartRef = useRef(<></>);
  const bmichartRef = useRef(<></>);
  // const [bpchartImage, setbpChartImage] = useState('');
  // const [bschartImage, setbsChartImage] = useState('');
  // const [bmichartImage, setbmiChartImage] = useState('');
  const [selectedmenu, setselectedmenu] = useState('tracker');
  const [rewardadseen, setrewardadseen] = useState(0);
  const [rate, showrate] = useState(false);
  const [language, setlanguage] = useState({
    main: { trackerTitle: '', add: '', unlock: '' },
    dashobard: { bp: '', bs: '', bmi: '' },
    tracker: {
      bpChartText: '',
      bpCharAddtText: '',
      bsChartText: '',
      bsCharAddtText: '',
      bmiChartText: '',
      bmiChartAddText: '',
    },
    menu: { home: '', tracker: '', health: '', profile: '' },
  });
  const [langstr, setlangstr] = useState({
    main: { trackerTitle: '', add: '', unlock: '' },
    dashobard: { bp: '', bs: '', bmi: '' },
    tracker: {
      bpChartText: '',
      bpCharAddtText: '',
      bsChartText: '',
      bsCharAddtText: '',
      bmiChartText: '',
      bmiChartAddText: '',
    },
  });

  useEffect(() => {
    (async () => {
      let lan = await lang();
      setlanguage(lan);
      setselectedmenu('tracker');
    })();
  }, [isFocused, rewardadseen]);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  const showAd = async (type: any) => {
    await set_async_data('hide_ad', 'hide'); // purposly to hide tary ad
    props.setloader(true);
    if (type == 'bp') {
      await set_async_data('line_chart_bp_ad', 'seen');
    }
    if (type == 'bs') {
      await set_async_data('line_chart_bs_ad', 'seen');
    }
    if (type == 'bmi') {
      await set_async_data('line_chart_bmi_ad', 'seen');
    }
  };

  const _continue = async () => {
    props.setloader(false);
    showrate(true);
    setrewardadseen(rewardadseen + 1);
  };

  const generatePDF = async () => {
    try {
      // BP IMAGE CREATION
      const bpuri = await bpchartRef.current.capture(); // Capture the image
      const bpbase64Image = await BlobUtil.fs.readFile(bpuri, 'base64'); // Convert image to base64
      const bpbase64Data = `data:image/png;base64,${bpbase64Image}`; // Prefix it with base64 data URI
      // setbpChartImage(bpbase64Data); // Set the base64 chart image

      // BS IMAGE CREATION
      const bsuri = await bschartRef.current.capture(); // Capture the image
      const bsbase64Image = await BlobUtil.fs.readFile(bsuri, 'base64'); // Convert image to base64
      const bsbase64Data = `data:image/png;base64,${bsbase64Image}`; // Prefix it with base64 data URI
      // setbsChartImage(bsbase64Data); // Set the base64 chart image

      // BMI IMAGE CREATION
      const bmiuri = await bmichartRef.current.capture(); // Capture the image
      const bmibase64Image = await BlobUtil.fs.readFile(bmiuri, 'base64'); // Convert image to base64
      const bmibase64Data = `data:image/png;base64,${bmibase64Image}`; // Prefix it with base64 data URI
      // setbmiChartImage(bmibase64Data); // Set the base64 chart image

      createAndSharePDF(bpbase64Data, bsbase64Data, bmibase64Data); // Pass the base64 image to the PDF function
    } catch (error) {
      console.error('Error capturing chart image:', error);
    }
  };

  const createAndSharePDF = async (bpchart:any, bschart:any, bmichart:any) => {
    // console.log('bpchartImage inside', bpchartImage);
    let options = {
      html: `<div style="flex:1;align-item:'center';justify-content:'center';">
        <h1 style="font-weight: 700; font-size: 32px; text-align: center;">Application Name Here ...</h1>
        <p style="font-weight: 500; font-size: 22px; text-align: center;">
          Here is the complete graphical report
        </p>
        <img src="${bpchart}" style="width: 500px; height: 444px; margin-top: 25px; resize-mode: contain; align-self:'center';" />
        <img src="${bschart}" style="width: 500px; height: 444px; margin-top: 25px; resize-mode: contain;align-self:'center';" />
        <img src="${bmichart}" style="width: 500px; height: 444px; margin-top: 25px; resize-mode: contain;align-self:'center';" />
    </div>`,
      fileName: 'testDownload',
      directory: 'Documents',
    };

    try {
      // Generate the PDF file
      let file = await RNHTMLtoPDF.convert(options);

      // Define the destination path for iOS (within app's Documents directory)
      const documentDir = BlobUtil.fs.dirs.DocumentDir; // iOS app-specific Documents directory
      const date = new Date();
      const formattedDate = `${date.getFullYear()}_${String(date.getMonth() + 1).padStart(2, '0')}_${String(date.getDate()).padStart(2, '0')}`;
      const filePath = `${documentDir}/report_${formattedDate}.pdf`;

      // Check if file exists and delete if it does
      BlobUtil.fs.exists(filePath).then((exists) => {
        if (exists) {
          // Delete the existing file before copying the new one
          BlobUtil.fs.unlink(filePath).then(() => {
            console.log('Existing file deleted');
            copyAndSharePDF(file.filePath, filePath);
          }).catch((error) => {
            console.error('Error deleting file:', error);
          });
        } else {
          // If file doesn't exist, just copy it
          copyAndSharePDF(file.filePath, filePath);
        }
      });
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Error', 'There was an issue creating the PDF.');
    }
  };

  const copyAndSharePDF = (sourcePath: string, destinationPath: string) => {
    BlobUtil.fs
      .cp(sourcePath, destinationPath)
      .then(() => {
        console.log('File copied to:', destinationPath);

        // Share the file using the iOS share dialog
        BlobUtil.ios.openDocument(destinationPath);
      })
      .catch((error) => {
        console.error('Error copying file:', error);
        Alert.alert('Error', 'Failed to copy the PDF.');
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.col}>
            <Text style={styles.heading}>{langstr.main.trackerTitle}</Text>
          </View>
          <Button title="Generate PDF" onPress={generatePDF} />
        </View>
        <ScrollView style={styles.mainContainer}>
          {/* Blood Pressure */}
          <ViewShot ref={bpchartRef} options={{ format: 'png', quality: 0.9 }}>
            <View style={styles.box}>
              <View style={styles.head}>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/icons/bloodpressure.png')}
                />
                <Text style={styles.title}>{langstr.dashobard.bp}</Text>
              </View>
              <BloodPressureChart
                navigation={props.navigation}
                langstr={langstr}
                rewardadseen={rewardadseen}
                showAd={() => {
                  showAd('bp');
                }}
              />
            </View>
          </ViewShot>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                props.navigation.navigate('BloodPressure'); //AddBloodPressure
              }}>
              <Text style={styles.addbtnText}>{langstr.main.add}</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.nativeContainer}>
            <NativeAd150 adId={NATIVE_AD_ID_ONE}/>
          </View> */}

          {/* Blood Sugar */}
          <ViewShot ref={bschartRef} options={{ format: 'png', quality: 0.9 }}>
            <View style={[styles.box, { marginBottom: 20 }]}>
              <View style={styles.head}>
                <Image
                  style={{ width: 14, height: 17.95, marginRight: 8 }}
                  source={require('../../../assets/icons/bloodsugar.png')}
                />
                <Text style={styles.title}>{langstr.dashobard.bs}</Text>
              </View>
              <BloodSugarChart
                navigation={props.navigation}
                langstr={langstr}
                rewardadseen={rewardadseen}
                showAd={() => {
                  showAd('bs');
                }}
              />
            </View>
          </ViewShot>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              props.navigation.navigate('AddNewBloodSugarScreen');
            }}>
            <Text style={styles.addbtnText}>{langstr.main.add}</Text>
          </TouchableOpacity>


          {/* <View style={styles.nativeContainer}>
            <NativeAd150 adId={NATIVE_AD_ID_TWO}/>
          </View> */}

          {/* BMI Chart */}
          <ViewShot ref={bmichartRef} options={{ format: 'png', quality: 0.9 }}>
            <View style={[styles.box, { marginVertical: '5%' }]}>
              <View style={styles.head}>
                <Image
                  style={{ width: 14, height: 17.95, marginRight: 8 }}
                  source={require('../../../assets/icons/bloodsugar.png')}
                />
                <Text style={styles.title}>{langstr.dashobard.bmi}</Text>
              </View>
              <BMIChart
                navigation={props.navigation}
                langstr={langstr}
                rewardadseen={rewardadseen}
                showAd={() => {
                  showAd('bmi');
                }}
              />
            </View>
          </ViewShot>
          <View style={[styles.btnContainer, {marginBottom: '15%'}]}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                props.navigation.navigate('BmiRecordScreen');
              }}>
              <Text style={styles.addbtnText}>{langstr.main.add}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {props.loader && (<DisplayRewardedAd _continue={_continue} adId={REWARED_AD_ID} />)}
      {rate && <RateUs showrate={showrate} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4FE',
  },
  nativeContainer: {
    width: width * 0.91,
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    elevation: 5,
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  mainContainer: {
    width: width,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 16,
    maxHeight: 1.70 * width,
    backgroundColor: '#F4F4FE',
  },
  box: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  head: {
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  icon: {
    width: 17,
    height: 13.14,
    marginRight: 8,
  },
  title: {
    color: '#2E2E2E',
    fontSize: 16,
    fontWeight: '600',
  },
  btnContainer: {
    marginBottom: 15,
  },
  btn: {
    width: btnWidth,
    height: 176 * btnRatio,
    alignSelf: 'center',
    backgroundColor: `rgba(0, 159,139, 1)`,
    borderRadius: 10,
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
});
export default TrackerScreen;