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
import {
  REPORT_TYPES,
  filter_report,
  get_report,
} from '../../../Helper/AppHelper';
import {lang} from '../../../../global';
import LineChartAdComponent from '../components/LineChartAdComponent';
import { NativeAd150 } from '../../../Helper/NativeAd150';
import Chart from '../components/Chart';
import PieChartAdComponent from '../components/PieChartAdComponent';
import PieChartComponent from '../components/PieChartComponent';
import { NATIVE_AD_ID_ONE } from '../../../Helper/AdManager';
// import analytics from '@react-native-firebase/analytics';
const {width, height} = Dimensions.get('window');

const AddNewBloodPressureScreen = ({navigation}: {navigation: any}) => {
  const [averagemodal, setaveragemodal] = useState(false);
  const [selected, setselected] = useState('Latest');
  const [language, setlanguage] = useState({
    dashobard: {bp: 'Blood Pressure'},
    main: {add: '', unlock: ''},
    tracker: {
      bpChartText: '',
      bpCharAddtText: '',
      bsChartText: '',
      bsCharAddtText: '',
      bmiChartText: '',
      bmiChartAddText: '',
    },
  });
  const [filterdata, setfilterdata] = useState({
    avg_24: {},
    Average: {},
    minimum: {},
    maximum: {},
    Last_Insert_data: {},
  });
  const [carddata, setcarddata] = useState({});
  const [card, setcard] = useState(<></>);
  const back = () => {
    navigation.navigate('HomeScreen', {tab: 'tracker'});
  };

  useEffect(() => {
    (async () => {
      try {
        let lan = await lang();
        const filter = await filter_report();
        // await analytics().logEvent('bp_new_screen');
        setlanguage(lan);
        setfilterdata(filter);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    switch (selected) {
      case 'avg_24':
        setfilterdata(filterdata);
        setcard(displayCard(filterdata?.avg_24));
        break;
      case 'Average':
        // console.log('avg sleted', filterdata)
        setcarddata(filterdata.Average);
        setcard(displayCard(filterdata?.Average));
        break;
      case 'Latest':
        // console.log('LATEST', filterdata);
        setcarddata(filterdata);
        setcard(displayCard(filterdata?.Last_Insert_data));
        break;
      case 'Max':
        setcarddata(filterdata.maximum);
        setcard(displayCard(filterdata?.maximum));
        break;
      case 'Min':
        setcarddata(filterdata.minimum);
        setcard(displayCard(filterdata?.minimum));
        break;
      default:
        setcarddata(filterdata.Last_Insert_data);
        setcard(displayCard(filterdata?.Last_Insert_data));
    }
  }, [filterdata, selected, carddata]);

  const displayCard = (data: any) => {
    return (
      <>
        <View style={[styles.row, {width: '80%', marginTop: '5%'}]}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Systolic</Text>
            <View style={styles.cardrow}>
              <Text style={styles.cardedesc}>{data.systolic_pressure}</Text>
              <Text style={styles.unit}>mmHg</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Diastolic</Text>
            <View style={styles.cardrow}>
              <Text style={styles.cardedesc}>{data.diastolic_pressure}</Text>
              <Text style={styles.unit}>mmHg</Text>
            </View>
          </View>
        </View>

        <View style={[styles.row, {width: '82%'}]}>
          <View
            style={[
              styles.card,
              {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.cardTitle}>Pulse</Text>
            <View style={styles.cardrow}>
              <Text style={styles.cardedesc}>{selected == 'Latest' ? data.pulse : 70}</Text>
              <Text style={styles.unit}>BPM</Text>
            </View>
          </View>
        </View>
      </>
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
            style={styles.bpbag}
            source={require('../../../assets/icons/bpbag.png')}
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

        {card}

        {/* Graph Container */}
        <View style={styles.graphContainer}>
          <Chart />
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
          navigation.navigate('BloodPressure');
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
    top: '10%',
    height: '90%',
    paddingVertical: 20,
  },
  bpbag: {
    width: 58,
    height: 82.17,
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
  NativeAd: {
    width: width * 0.87,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 15,
  },
});
export default AddNewBloodPressureScreen;
