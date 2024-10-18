import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
const { width } = Dimensions.get('screen');

export default function PageHeader(props: any) {

  const navigateToHome = async () => {
    props.return.navigate(props.screenname, { tab: 'tracker' });
  };

  return (
    <View style={styles.headerContainer}>
      {
        props.hidead.toString() == 'false' ?
          <TouchableOpacity onPress={() => props.navigateScreen('Subscription')}>
            <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../../assets/images/premium.png')} />
          </TouchableOpacity> : (<></>)
      }
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
  }
});
