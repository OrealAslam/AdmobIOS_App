import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Text,
  SafeAreaView,View
} from 'react-native';
import {useRoute} from '@react-navigation/native';
// import analytics from '@react-native-firebase/analytics';

const {width, height} = Dimensions.get('window');

const itemWidth = width - 55;
const ratioBoardingBG = width / 360;
const ratio = itemWidth / 1232;

const BUTTON_WIDTH = width - 90;
const BUTTON_RATIO = BUTTON_WIDTH / 1016;

export default function Screen1(props) {
  const route = useRoute();
  const [loader, setloader] = useState(false);
  const [slide1, setslide1] = useState({
    headText: route.params?.lang.boarding.slide1title,
    subText: route.params?.lang.boarding.slide1subtitle,
  });
  const [slide2, setslide2] = useState({headText: route.params?.lang.boarding.slide2title,
    subText: route.params?.lang.boarding.slide2subtitle,});
  const [slide3, setslide3] = useState({headText: route.params?.lang.boarding.slide3title,
    subText: route.params?.lang.boarding.slide3subtitle,});
  const flatListRef = useRef(null);
  const [data, setdata] = useState([{
    id: 0,
    bgImg: require('../assets/images/boardingScreens/screen1.png'),
    headText: 'All in one -Health Kit',
    subText: 'Track your fitness, monitor health metrics, set goals. Stay active, live well.',
  },
  {
    id: 1,
    bgImg: require('../assets/images/boardingScreens/screen2.png'),
    headText: 'Record your health data',
    subText: 'Monitor BP, glucose levels, heart rate, and BMI for optimal health.',
  },
  {
    id: 2,
    bgImg: require('../assets/images/boardingScreens/screen3.png'),
    headText: 'Data trends',
    subText: 'Monitor BP, glucose levels, heart rate, and BMI for optimal health.',
  },])

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('boarding_1');
        setdata([
          {
            id: 0,
            bgImg: require('../assets/images/boardingScreens/screen1.png'),
            headText: slide1.headText,
            subText: slide1.subText,
          },
          {
            id: 1,
            bgImg: require('../assets/images/boardingScreens/screen2.png'),
            headText: slide2.headText,
            subText: slide2.subText,
          },
          {
            id: 2,
            bgImg: require('../assets/images/boardingScreens/screen3.png'),
            headText: slide3.headText,
            subText: slide3.subText,
          },
        ]);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const press = async (id) => {
    if (id == 0) {
      let index = 1;
      flatListRef.current.scrollToIndex({index, animated: true});
    }
    if (id == 1) {
      let index = 2;
      flatListRef.current.scrollToIndex({index, animated: true});
    }
    if (id == 2) {
      props.navigation.navigate('DesclaimerScreen', {lang: route.params?.lang});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        ref={flatListRef}
        data={data}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => (
          <ImageBackground
            style={{width: width, height: height}}
            source={item.bgImg}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.navigation.navigate('DesclaimerScreen', {lang: route.params?.lang})}>
              <Text style={styles.skip}>
                {route.params?.lang.boarding.skip}
              </Text>
            </TouchableOpacity>

            <View style={{width: width * 0.87, alignSelf: 'center'}}>
              <Text style={styles.headText}>{item.headText}</Text>
              <Text style={styles.subText}>{item.subText}</Text>
            </View>
            
            <TouchableOpacity
              onPress={() => {
                press(item.id);
              }}
              style={[styles.button, styles.cardBtn]}>
              {item.id == 2 ? (
                loader == true ? (
                  <ActivityIndicator size={'large'} color={'#120909'} />
                ) : (
                  <Text style={styles.text}>
                    {route.params?.lang.boarding.nextButton}
                  </Text>
                )
              ) : (
                <Text style={styles.text}>
                  {route.params?.lang.boarding.nextButton}
                </Text>
              )}
            </TouchableOpacity>
          </ImageBackground>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  skip: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 'auto',
    top: 10,
    marginRight: 18,
    padding: 10,
  },
  button: {
    width: BUTTON_WIDTH,
    height: 191 * BUTTON_RATIO,
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  cardBtn: {
    backgroundColor: '#5F45FE',
    position: 'absolute',
    bottom: (11 / 100) * height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  headText: {
    textAlign: 'center',
    marginTop: 55,
    fontSize: 26,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#FFFFFF',
    width: width * 0.88
  },
  subText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#DBD6FF',
    fontSize: 15,
    maxWidth: width*0.77,
    alignSelf: 'center',
    lineHeight: 23,
    width: width * 0.97,
  },
});
