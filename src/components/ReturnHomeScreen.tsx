import {View, Text, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

export default function ReturnHomeScreen(props: any) {
  const navigatetoHome = async () => {
    console.log('Not loaded');
    props.return.navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity accessibilityLabel="Back" onPress={navigatetoHome}>
        <Image
          style={{width: 14, height: 14}}
          source={require('../assets/images/dashboard_icons/navigate_back_new.png')}
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
    fontWeight: '700',
    marginLeft: 15,
  },
});
