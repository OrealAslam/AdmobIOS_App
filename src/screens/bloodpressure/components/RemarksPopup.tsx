import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
const btnWidth = width - 130;
const btnRatio = btnWidth / 1004;
const RemarksPopup = (props: any) => {
  const obj = [
    {
      icon: require('../../../assets/icons/hypertension.png'),
      title: 'Hypertension',
      range: 'SYS < 90 or DIA < 60',
    },
    {
      icon: require('../../../assets/icons/normal.png'),
      title: 'Normal',
      range: 'SYS < 90-119 and DIA 60-79',
    },
    {
      icon: require('../../../assets/icons/elevated.png'),
      title: 'Elevated',
      range: 'SYS 120-129 and DIA 60-79',
    },
    {
      icon: require('../../../assets/icons/stage1.png'),
      title: 'Hypertension-Stage 1',
      range: 'SYS 130-139 or DIA 80-89',
    },
    {
      icon: require('../../../assets/icons/stage2.png'),
      title: 'Hypertension-Stage 2',
      range: 'SYS 140-180 or DIA 90-120',
    },
    {
      icon: require('../../../assets/icons/hypersensitive.png'),
      title: 'Hypersensitive',
      range: 'SYS >180 or DIA > 120',
    },
  ];

  const displayCards = () => {
    let card = obj.map((item, index) => {
      console.log(item.icon);
      return (
        <TouchableOpacity style={styles.card} key={index}>
          <View style={styles.col}>
            <Image style={styles.cardImage} source={item.icon} />
          </View>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubTitle}>{`${item.range}`}</Text>
          </View>
          <View style={styles.col}>
            <Image
              style={{width: 5, height: 9.17}}
              source={require('../../../assets/images/navigateright.png')}
            />
          </View>
        </TouchableOpacity>
      );
    });
    return card;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Title</Text>
        <View style={styles.cardContainer}>
          {displayCards()}
          <TouchableOpacity onPress={() => props.setshowremarksmodal(false)}>
            <Image
              style={styles.btn}
              source={require('../../../assets/icons/getit.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: `rgba(0,0,0,0.5)`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: width * 0.88,
    height: undefined,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    color: '#2E2E2E',
    fontWeight: '700',
  },
  cardContainer: {
    flexDirection: 'column',
    paddingVertical: 15,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  col: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  cardTitleContainer: {
    flexDirection: 'column',
    width: '70%',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  cardTitle: {
    color: '#2E2E2E',
    fontSize: 14,
    fontWeight: '700',
  },
  cardSubTitle: {
    color: '#7E7E7E',
    fontSize: 12,
    fontWeight: '400',
  },
  btn: {
    width: btnWidth,
    height: 200 * btnRatio,
    marginTop: 15,
    alignSelf: 'center',
  },
});
export default RemarksPopup;
