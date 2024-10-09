import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import AverageComponent from './components/AverageComponent';
import {REPORT_TYPES, get_report} from '../../../Helper/AppHelper';
import {lang} from '../../../../global';
import LineChartAdComponent from '../components/LineChartAdComponent';
import Chart from '../components/Chart';
import PieChartAdComponent from '../components/PieChartAdComponent';
import PieChartComponent from '../components/PieChartComponent';
import {NativeAd150} from '../../../Helper/NativeAd150';
import { NATIVE_AD_ID_ONE } from '../../../Helper/AdManager';
const {width, height} = Dimensions.get('window');

const AddNewBloodSugarScreen = ({navigation}: {navigation: any}) => {
  const [averagemodal, setaveragemodal] = useState(false);
  const [selected, setselected] = useState('After sleep');
  const [apidata, setapidata] = useState([]);
  const [language, setlanguage] = useState({
    dashobard: {bs: 'Blood Sugar'},
    main: {add: '', unlock: ''},
    tracker: {
      bsChartText: '',
      bsCharAddtText: '',
    },
  });
  const [recent, setrecent] = useState(null);
  const [average, setaverage] = useState(null);
  const back = () => {
    navigation.navigate('HomeScreen', {tab: 'tracker'});
  };

  useEffect(() => {
    (async () => {
      try {
        let lan = await lang();
        let response = await get_report('sugar');
        setapidata(response);
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    sortRecentRecord();
    calculateAverage();
  }, [apidata, selected]);

  const sortRecentRecord = () => {
    // Filter records where sugar_check is "After sleep"
    const filterRecords = apidata.filter(record => {
      return record.sugar_check == selected;
    });
    // console.log('filtered data', afterSleepRecords);
    // Sort filtered records by datetime in descending order
    let filter = filterRecords.sort(
      (a, b) => new Date(b?.datetime) - new Date(a?.datetime),
    );
    setrecent(filter[0]);
    // Return the most recent record
    // return afterSleepRecords[0];
  };

  const calculateAverage = () => {
    const record = apidata.filter(record => {
      return record.sugar_check == selected;
    });

    const totalSugarConcentration = record.reduce((total, record) => total + record?.sugar_concentration, 0);
    // console.log('record :', record);
    const averageSugarConcentration = totalSugarConcentration / record.length;
    setaverage(averageSugarConcentration);
  }

  const displayCard = () => {
    return (
      <View style={[styles.row, {width: '85%', marginTop: '5%'}]}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent</Text>
          <View style={styles.cardrow}>
            <Text style={styles.cardedesc}>
              {recent ? recent?.sugar_concentration : '0'}
            </Text>
            <Text style={styles.unit}>mgd/L</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Average</Text>
          <View style={styles.cardrow}>
            <Text style={styles.cardedesc}>{average ? average : '0'}</Text>
            <Text style={styles.unit}>mgd/L</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Header back={back} language={language} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <View style={styles.row}>
          <Image
            style={styles.sugarbag}
            source={require('../../../assets/icons/sugar.png')}
          />
          <TouchableOpacity onPress={() => setaveragemodal(true)}>
            <ImageBackground
              style={{
                width: 128,
                height: 34,
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}
              source={require('../../../assets/icons/average.png')}>
              <Text style={styles.avgtext}>{selected}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        {displayCard()}
        <View style={styles.clr}></View>
        {/* Graph Container */}
        <View style={styles.graphContainer}>
          <View style={{backgroundColor: '#F4F5F6', borderRadius: 12}}>
            <Chart />
          </View>
          <View style={styles.clr}></View>
          <View style={styles.NativeAd}>
            <NativeAd150 adId={NATIVE_AD_ID_ONE}/>
          </View>

          <PieChartComponent />
          <View style={[styles.clr, {marginBottom: 40}]}></View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BloodSugar');
        }}
        style={{
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          elevation: 5,
        }}>
        <Image
          style={styles.addIcon}
          source={require('../../../assets/icons/add.png')}
        />
      </TouchableOpacity>

      {averagemodal && (
        <AverageComponent
          setselected={setselected}
          selected={selected}
          setaveragemodal={setaveragemodal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '25%',
    borderBottomLeftRadius: 60,
    borderBottomEndRadius: 60,
    backgroundColor: '#5F45FE',
    padding: 15,
  },
  scrollContainer: {
    width: width,
    position: 'absolute',
    top: '7%',
    height: '90%',
    paddingVertical: 20,
  },
  sugarbag: {
    width: 47.13,
    height: 77.52,
  },
  NativeAd: {
    width: width * 0.86,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  row: {
    width: width * 0.85,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  avgtext: {
    fontWeight: '600',
  },
  card: {
    width: '47%',
    backgroundColor: '#F4F5F6',
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 19,
    color: '#000',
    fontWeight: '600',
  },
  cardrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardedesc: {
    color: '#000',
    fontSize: 36,
    fontWeight: '800',
  },
  unit: {
    fontSize: 13,
    color: '#000',
    fontWeight: '300',
    marginHorizontal: 15,
    verticalAlign: 'bottom',
    alignSelf: 'flex-end',
  },
  graphContainer: {
    width: width * 0.88,
    alignSelf: 'center',
  },
  clr: {
    width: width,
    marginVertical: 15,
  },
  addIcon: {
    width: 65.28,
    height: 65.28,
  },
});
export default AddNewBloodSugarScreen;
