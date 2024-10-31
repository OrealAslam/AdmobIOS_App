import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
const { width } = Dimensions.get('screen');

export default function PageHeader(props: any) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.heading}>{props.screenTitle}</Text>
      {
        !props.hidead ?
          <TouchableOpacity onPress={() => props.navigation.navigate('Subscription')}>
            <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../../assets/images/premium.png')} />
          </TouchableOpacity> : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  heading: {
    color: '#2E2E2E',
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 15,
  },
});
