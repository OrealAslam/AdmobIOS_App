import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TabManu from './components/TabManu';
const {width} = Dimensions.get('window');
import {useIsFocused} from '@react-navigation/native';
import {data} from '../../../../globalData';
// import analytics from '@react-native-firebase/analytics';
import {useRoute} from '@react-navigation/native';
import {lang} from '../../../../global';
import {get_async_data, set_async_data} from '../../../Helper/AppHelper';
import DisplayAd from '../../../components/DisplayAd';
import {INTERSITIAL_AD_ID} from '../../../Helper/AdManager';

const ITEM_WIDTH = width / 4 - 10;
const ITEM_RATIO = ITEM_WIDTH / 1440;

const HealthScreen = (props: any) => {
  const route = useRoute();
  const [category, setcategory] = useState('bp');
  const [selectedmenu, setselectedmenu] = useState('health');
  const [cards, setcards] = useState(<></>);
  const [quit, setquit] = useState(false);
  // const [showad, setshowad] = useState(false);
  const [language, setlanguage] = useState({
    main: {healthTitle: ''},
    article: {
      articledata: {
        bp: {questions: []},
        bs: {questions: []},
        heart: {questions: []},
      },
    },
  });
  const [langstr, setlangstr] = useState({
    main: {healthTitle: ''},
    article: {
      articledata: {
        bp: {questions: []},
        bs: {questions: []},
        heart: {questions: []},
      },
    },
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    setlangstr(language);
  }, [language]);

  useEffect(() => {
    setlangstr(language);
    if (category == 'bp') {
      displayData(langstr?.article.articledata?.bp.questions);
    }
    if (category == 'bs') {
      displayData(langstr?.article.articledata?.bs.questions);
    }
    if (category == 'heart') {
      displayData(langstr?.article.articledata?.heart.questions);
    }
  }, [category, langstr]);

  useEffect(() => {
    (async () => {
      try {
        // await analytics().logEvent('article_tab');
        let lan = await lang();
        setlanguage(lan);
        setselectedmenu('health');
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  const displayData = (data: any) => {
    let card = data.map((item: any, index: any) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigateToDetail(index)}
          style={styles.card}
          key={index}>
          <View style={styles.col1}>
            <Image
              style={[item.styles, {alignSelf: 'center'}]}
              source={item.icon}
            />
          </View>
          <View style={styles.col2}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.cardTitle}>
              {item.title}
            </Text>
          </View>
          <View style={styles.col3}>
            <Image
              style={styles.arrow}
              source={require('../../../assets/images/navigateright.png')}
            />
          </View>
        </TouchableOpacity>
      );
    });
    setcards(card);
  };

  const navigateToDetail = async (id: any) => {
    // sho ad after 4th click
    // await checkforad();
    // await incrementclickcount();
    // await incrementclickcount();
    props.navigation.navigate('DetailScreen', {
      quesNo: id,
      category: category,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.col}>
            <Text style={styles.heading}>{langstr.main.healthTitle}</Text>
          </View>
        </View>

        <View style={styles.tabMenu}>
          <TabManu setcategory={setcategory} category={category} />
        </View>
        <ScrollView
          style={{
            maxHeight: 1.33 * width,
            backgroundColor: '#F4F4FE',
            paddingTop: 10,
          }}>
          {cards}
        </ScrollView>
      </SafeAreaView>

      {/* {showad == true ? (<DisplayAd _continue={()=>{setshowad(false)}} adId={INTERSITIAL_AD_ID}/>) : (<></>)} */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4FE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
  },
  tabMenu: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  card: {
    width: width * 0.93,
    alignSelf: 'center',
    backgroundColor: '#F0EEF9',
    paddingHorizontal: 0,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  col1: {width: '22%', justifyContent: 'center'},
  col2: {width: '70%'},
  col3: {width: '8%', justifyContent: 'flex-end', alignItems: 'center'},
  cardImg: {
    width: 46,
    height: 45.56,
    alignSelf: 'center',
  },
  cardTitle: {
    color: '#2E2E2E',
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
  },
  arrow: {
    width: 4,
    height: 7.33,
  },
  message: {
    color: '#6C6C6C',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 150,
  },
});
export default HealthScreen;
