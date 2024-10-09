import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {set_async_data} from '../Helper/AppHelper';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
const ratio = (width - 5) / 1440;

const ITEM_WIDTH = width / 2 - 30;
const BUTTON_RATIO = ITEM_WIDTH / 608;

const RateUs = (props: any) => {
  const [rating, setRating] = useState(0);

  const rateApp = async () => {
    props.showrate(false);
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.healthapps.digitalhealthkit',
    );
  };

  return (
    <Animatable.View
      style={styles.maskContainer}
      animation="bounceInUp"
      duration={1700}>
      <ImageBackground
        style={styles.container}
        source={require('../assets/images/rateus.png')}>
        <View style={styles.ratingContainer}>
          <StarRating
            rating={rating}
            onChange={setRating}
            onRatingEnd={async () => {
              console.log('rated');
            }}
            starStyle={{borderRadius: 20}}
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => props.showrate(false)}>
            <Image
              style={styles.btn}
              source={require('../assets/images/cancel.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={rateApp}>
            <Image
              style={styles.btn}
              source={require('../assets/images/rate.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  maskContainer: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: `rgba(0,0,0,0.3)`,
  },
  container: {
    width: width - 5,
    height: 1180 * ratio,
    // position: 'relative',
    marginTop: '90%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  ratingContainer: {
    width: width * 0.88,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%',
  },
  bottomContainer: {
    width: width * 0.88,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 15,
  },
  btn: {
    width: ITEM_WIDTH,
    height: 192 * BUTTON_RATIO,
  },
});
export default RateUs;
