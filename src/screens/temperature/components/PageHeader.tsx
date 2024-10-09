import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');

export default function PageHeader(props: any) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{paddingHorizontal: 5}}
        accessibilityLabel="Back"
        onPress={()=>props.setcloseloader(true)}>
        <Image
          style={{width: 14, height: 14}}
          source={require('../../../assets/images/dashboard_icons/navigate_back_new.png')}
        />
      </TouchableOpacity>

      <Text style={styles.heading}>{props.screenTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
