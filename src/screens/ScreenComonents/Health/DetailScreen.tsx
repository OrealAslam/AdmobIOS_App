import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  BackHandler,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {data} from '../../../../globalData';
import {NativeAd150} from '../../../Helper/NativeAd150';
import {lang} from '../../../../global';
import {useIsFocused} from '@react-navigation/native';
import {ARTICLE_AD_ID} from '../../../Helper/AdManager';
const {width, height} = Dimensions.get('window');
const ITEM_WIDTH = width;
const ITEM_RATIO = ITEM_WIDTH / 1440;

const btnWidth = width - 50;
const btnRatio = btnWidth / 1256;

const DetailScreen = ({navigation}: {navigation: any}) => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const scrollRef = useRef(null);
  const [quesid, setquesid] = useState(null);
  const [category, setcategory] = useState('');
  const [background, setbackground] = useState(
    require('../../../assets/blogImages/backgroundImages/bp1.png'),
  );
  const [title, settitle] = useState('');
  const [subtitle, setsubtitle] = useState('');
  const [referenceTitle, setreferenceTitle] = useState('');
  const [referenceLink, setreferenceLink] = useState('');
  const [subdescription, setsubdescription] = useState([]);
  const [btntxt, setbtntxt] = useState('More');
  const [language, setlanguage] = useState({
    main: {more: ''},
    article: {
      articledata: {
        bp: {
          questions: [
            {
              title: '',
              contentTitle: '',
              contentDescription: [],
              background: require('../../../assets/blogImages/backgroundImages/bp1.png'),
            },
          ],
        },
        bs: {
          questions: [
            {
              title: '',
              contentTitle: '',
              contentDescription: [],
              background: require('../../../assets/blogImages/backgroundImages/bp1.png'),
            },
          ],
        },
        heart: {
          questions: [
            {
              title: '',
              contentTitle: '',
              contentDescription: [],
              background: require('../../../assets/blogImages/backgroundImages/bp1.png'),
            },
          ],
        },
      },
    },
  });

  useEffect(() => {
    let key = route.params?.category;
    let id = route.params?.quesNo;
    setcategory(key);
    setquesid(id);
  }, [route]);

  useEffect(() => {
    setbtntxt(language?.main.more);
    if (category == 'bp') {
      if (
        quesid != null &&
        language?.article.articledata?.bp.questions[quesid] != undefined
      ) {
        settitle(language?.article.articledata?.bp.questions[quesid].title);
        setsubtitle(
          language?.article.articledata?.bp.questions[quesid].contentTitle,
        );
        setbackground(
          language?.article.articledata?.bp.questions[quesid].background,
        );
        setsubdescription(
          language?.article.articledata?.bp.questions[quesid]
            .contentDescription,
        );
        setreferenceLink(
          language?.article.articledata?.bp.questions[quesid].referenceLink,
        );
        setreferenceTitle(
          language?.article.articledata?.bp.questions[quesid].referenceTitle,
        );
      }
    }
    if (category == 'heart') {
      if (
        quesid != null &&
        language?.article.articledata?.heart.questions[quesid] != undefined
      ) {
        settitle(language?.article.articledata?.heart.questions[quesid].title);
        setsubtitle(
          language?.article.articledata?.heart.questions[quesid].contentTitle,
        );
        setbackground(
          language?.article.articledata?.heart.questions[quesid].background,
        );
        setsubdescription(
          language?.article.articledata?.heart.questions[quesid]
            .contentDescription,
        );
        setreferenceLink(
          language?.article.articledata?.heart.questions[quesid].referenceLink,
        );
        setreferenceTitle(
          language?.article.articledata?.heart.questions[quesid].referenceTitle,
        );
      }
    }
    if (category == 'bs') {
      if (
        quesid != null &&
        language?.article.articledata?.bs.questions[quesid] != undefined
      ) {
        settitle(language?.article.articledata?.bs.questions[quesid].title);
        setsubtitle(
          language?.article.articledata?.bs.questions[quesid].contentTitle,
        );
        setbackground(
          language?.article.articledata?.bs.questions[quesid].background,
        );
        setsubdescription(
          language?.article.articledata?.bs.questions[quesid]
            .contentDescription,
        );
        setreferenceLink(
          language?.article.articledata?.bs.questions[quesid].referenceLink,
        );
        setreferenceTitle(
          language?.article.articledata?.bs.questions[quesid].referenceTitle,
        );
      }
    }
  }, [quesid, category, language]);

  useEffect(() => {
    (async () => {
      try {
        let lan = await lang();
        setlanguage(lan);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  const backAction = () => {
    navigation.navigate('HomeScreen', {tab: 'health'});
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const showSubDescription = () => {
    if (subdescription != null) {
      let jsx = subdescription.map((item: any, index: any) => {
        return (
          <View style={{marginBottom: 10}} key={index}>
            <Text style={styles.subHeading}>{item.heading}</Text>
            <Text style={styles.subdescription}>{item.description}</Text>
          </View>
        );
      });
      return jsx;
    }
  };

  const navigateToDetail = (id: any) => {
    navigation.navigate('DetailScreen', {
      quesNo: id,
      category: category,
    });
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const customLoop = () => {
    let jsx = language?.article.articledata?.bp.questions.map(
      (item: any, index: any) => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigateToDetail(index)}
            style={styles.card}
            key={index}>
            <View style={styles.col1}>
              {item?.icon && (
                <Image
                  style={[item.styles, {alignSelf: 'center'}]}
                  source={item?.icon}
                />
              )}
            </View>
            <View style={styles.col2}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <View style={styles.col3}></View>
          </TouchableOpacity>
        );
      },
    );
    return jsx;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 0}}>
      <ImageBackground style={styles.background} source={background}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              navigation.navigate('HomeScreen', {tab: 'insight'});
            }}>
            <Image
              style={styles.icon}
              source={require('../../../assets/icons/whiteicon.png')}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
      <View style={styles.mainContainer}>
        <ScrollView
          ref={scrollRef}
          style={{paddingBottom: 20, maxHeight: '75%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.nativeContainer}>
            <NativeAd150 adId={ARTICLE_AD_ID} />
          </View>
          <Text style={styles.description}>{subtitle}</Text>
          <View style={styles.subDescriptionContainer}>
            {showSubDescription()}

            <View style={styles.reference}>
              <Text style={styles.refTitle}>{referenceTitle}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(referenceLink)}>
                <Text style={styles.url}>{referenceLink}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {customLoop()}
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen', {tab: 'insight'})}
            style={{
              alignSelf: 'center',
              marginVertical: 20,
              width: btnWidth,
              height: 176 * btnRatio,
              backgroundColor: `rgba(0, 159,139, 0.7)`,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.btntxt}>{btntxt}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    height: width * 0.3,
    flexDirection: 'row',
    zIndex: 1,
  },
  nativeContainer: {
    width: width * 0.895,
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 12,
    elevation: 3,
  },
  background: {
    width: width,
    height: 960 * ITEM_RATIO,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: width * 0.88,
    alignSelf: 'center',
    backgroundColor: '#F0EEF9',
    paddingHorizontal: 0,
    paddingVertical: 15,
    borderRadius: 12,
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
  icon: {
    width: 21,
    height: 20,
  },
  back: {
    width: width * 0.08,
    position: 'absolute',
    top: 15,
    left: 5,
    padding: 15,
    marginBottom: 10,
  },
  header: {
    maxWidth: width * 0.83,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    marginTop: 'auto',
    marginLeft: '15%',
  },
  mainContainer: {
    width: width,
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#91A7DE',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 3,
    top: '-13%',
  },
  description: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 21,
  },
  subDescriptionContainer: {
    width: width * 0.95,
    padding: 10,
    marginTop: 15,
  },
  subHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
  },
  subdescription: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 18,
    fontFamily: 'Raleway-Medium',
  },
  btntxt: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  reference: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  refTitle: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },
  url: {
    fontSize: 12,
    color: '#0000e6',
    textDecorationLine: 'underline',
  },
});
export default DetailScreen;
