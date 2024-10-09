import {View, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');
const LoadingAnimation = (props: any) => {
  return (
    <View style={styles.container}>
      {props.iconType == 'heart' ? (
        <Image
          style={styles.hearticon}
          source={require('../assets/icons/heartbeatgif.gif')}
        />
      ) : (
        <Image
          style={styles.icon}
          source={require('../assets/icons/tickgif.gif')}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width,
    height: '100%',
    backgroundColor: `rgba(0,0,0,0.5)`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 98.34,
    height: 98.08,
  },
  hearticon: {
    width: 121,
    height: 102.18,
  },
});
export default LoadingAnimation;
