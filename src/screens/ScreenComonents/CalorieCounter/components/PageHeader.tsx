import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import React from 'react';
const { width } = Dimensions.get('screen');

export default function PageHeader(props: any) {

  return (
    <View style={styles.headerContainer}>
      {/* {
        !props.hidead ?
      <TouchableOpacity onPress={()=>props.navigation.navigate('Subscription')}>
        <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../../../assets/images/premium.png')} />
      </TouchableOpacity> : <></>
      } */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
