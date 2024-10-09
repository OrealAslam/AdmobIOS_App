import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const Header = (props:any) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.col}>
        <TouchableOpacity onPress={()=>{props.back()}} style={styles.backBtn}>
          <Image
            style={{width: 17, height: 16}}
            source={require('../../../../assets/icons/whiteicon.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{props.language.dashobard.bp}</Text>
      </View>

      <View style={styles.col}>
        {/* <TouchableOpacity style={{marginLeft: 'auto'}}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../../assets/icons/history.png')}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#5F45FE',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  col: {
    width: width * 0.46,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: width * 0.14,
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
export default Header;
