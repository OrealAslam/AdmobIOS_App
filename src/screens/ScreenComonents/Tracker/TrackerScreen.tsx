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
import LinearGradient from 'react-native-linear-gradient';
import BlobUtil from 'react-native-blob-util';

import BloodPressureChart from './components/BloodPressureChart';
import BloodSugarChart from './components/BloodSugarChart';
import BMIChart from './components/BMIChart';
import { NativeAd150 } from '../../../Helper/NativeAd150';
import { lang } from '../../../../global';
import { disableAds, generate_table_as_pdf, set_async_data } from '../../../Helper/AppHelper';
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
  const [hidead, sethidead] = useState(false);
  const [selectedmenu, setselectedmenu] = useState('tracker');
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
      let res = await disableAds();
      sethidead(res);
      setlanguage(lan);
      setselectedmenu('tracker');
    })();
  }, [isFocused]);

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  const showAd = async (type: any) => {
    await set_async_data('hide_ad', 'hide'); // purposly to hide tary ad
    props.setopengraph(type);
    props.setloader(true);
  };

  // const generatePDF = async () => {
  //   try {
  //     // BP IMAGE CREATION
  //     const bpuri = await bpchartRef.current.capture(); // Capture the image
  //     const bpbase64Image = await BlobUtil.fs.readFile(bpuri, 'base64'); // Convert image to base64
  //     const bpbase64Data = `data:image/png;base64,${bpbase64Image}`; // Prefix it with base64 data URI
  //     // setbpChartImage(bpbase64Data); // Set the base64 chart image

  //     // BS IMAGE CREATION
  //     const bsuri = await bschartRef.current.capture(); // Capture the image
  //     const bsbase64Image = await BlobUtil.fs.readFile(bsuri, 'base64'); // Convert image to base64
  //     const bsbase64Data = `data:image/png;base64,${bsbase64Image}`; // Prefix it with base64 data URI
  //     // setbsChartImage(bsbase64Data); // Set the base64 chart image

  //     // BMI IMAGE CREATION
  //     const bmiuri = await bmichartRef.current.capture(); // Capture the image
  //     const bmibase64Image = await BlobUtil.fs.readFile(bmiuri, 'base64'); // Convert image to base64
  //     const bmibase64Data = `data:image/png;base64,${bmibase64Image}`; // Prefix it with base64 data URI
  //     // setbmiChartImage(bmibase64Data); // Set the base64 chart image

  //     createAndSharePDF(bpbase64Data, bsbase64Data, bmibase64Data); // Pass the base64 image to the PDF function
  //   } catch (error) {
  //     console.error('Error capturing chart image:', error);
  //   }
  // };

  const generatePDF = async () => {
    let data = await generate_table_as_pdf();
    createAndSharePDF(data[0], data[1], data[2]);
  }

  const createAndSharePDF = async (bprecord: any, sugarrecord: any, bmirecord: any) => {
    let options = {
      html: `
        <html>
          <head>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
              }
              th {
                background-color: #f2f2f2;
              }
              div {
                margin-top: 15px;
                margin-bottom: 15px;
              }
            </style>
          </head>
          <body>
            <div>
              <h2>Blood Pressure</h2>
              <table>
                <tr>
                  <th>DateTime</th>
                  <th>Diastolic Pressure</th>
                  <th>Systolic Pressure</th>
                  <th>Status</th>
                </tr>
                ${bprecord.map((record: any) => `
                  <tr>
                    <td>${record.datetime}</td>
                    <td>${record.diastolic_pressure}</td>
                    <td>${record.systolic_pressure}</td>
                    <td>${record.status}</td>
                  </tr>
                `).join('')}
              </table>
            </div>

            <div>
              <h2>Blood Sugar</h2>
              <table>
                <tr>
                  <th>DateTime</th>
                  <th>Sugar Concentration</th>
                  <th>Measuring Unit</th>
                  <th>Status</th>
                </tr>
                ${sugarrecord.map((record: any) => `
                  <tr>
                    <td>${record.datetime}</td>
                    <td>${record.sugar_concentration}</td>
                    <td>${record.note}</td>
                    <td>${record.status}</td>
                  </tr>
                `).join('')}
              </table>
            </div>

            <div>
              <h2>BMI Record</h2>
              <table>
                <tr>
                  <th>DateTime</th>
                  <th>BMI</th>
                  <th>Status</th>
                </tr>
                ${bmirecord.map((record: any) => `
                  <tr>
                    <td>${record.datetime}</td>
                    <td>${record.bmi}</td>
                    <td>${record.status}</td>
                  </tr>
                `).join('')}
              </table>
            </div>


          </body>
        </html>
      `,
      fileName: 'report',
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
        {
          hidead.toString() == 'false' ? (
            <View style={[styles.header, {justifyContent: 'flex-end'}]}>
              <TouchableOpacity onPress={() => props.navigation.navigate('Subscription')}>
                <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../../assets/images/premium.png')} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.header}>
              <Button title="Generate PDF" onPress={generatePDF} />
            </View>
          )
        }
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
                hidead={hidead}
                loader={props.loader}
                showAd={() => {
                  showAd('bp');
                }}
              />
            </View>
          </ViewShot>
          <View style={styles.btnContainer}>
            {/* <LinearGradient onTouchEnd={() => { props.navigation.navigate('BloodPressure') }} colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 2 }}>
              <Text style={styles.addbtnText}>{langstr.main.add}</Text>
            </LinearGradient> */}
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
                hidead={hidead}
                loader={props.loader}
                showAd={() => {
                  showAd('bs');
                }}
              />
            </View>
          </ViewShot>
          {/* <LinearGradient onTouchEnd={() => { props.navigation.navigate('BloodSugar') }} colors={['#7ADC57', '#5DC983']} style={styles.btn} start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 2 }}>
            <Text style={styles.addbtnText}>{langstr.main.add}</Text>
          </LinearGradient> */}

          {/* <View style={styles.nativeContainer}>
            <NativeAd150 adId={NATIVE_AD_ID_TWO}/>
          </View> */}

          {/* BMI Chart */}
          <ViewShot ref={bmichartRef} options={{ format: 'png', quality: 0.9 }}>
            <View style={[styles.box, { marginBottom: 30 }]}>
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
                hidead={hidead}
                loader={props.loader}
                showAd={() => {
                  showAd('bmi');
                }}
              />
            </View>
          </ViewShot>
          <View style={[styles.btnContainer, { marginBottom: '12%' }]}>

          </View>
        </ScrollView>
      </SafeAreaView>

      {rate && <RateUs showrate={showrate} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFF8',
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
    backgroundColor: '#F0FEF0',
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
    color: '#5E9368',
    fontSize: 16,
    fontWeight: '600',
  },
  btnContainer: {
    marginBottom: 15,
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
});
export default TrackerScreen;