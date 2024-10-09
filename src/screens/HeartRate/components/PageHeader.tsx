import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';
import {addFormStyle} from '../../../Helper/StyleHelper';

const {width} = Dimensions.get('screen');

export default function PageHeader(props: any) {
  const {header, headerHeading, cancelBtn, saveBtn} = addFormStyle;

  const navigateToHome = async () => {
    props.return.navigate(props.screenname, {tab: 'tracker'});
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={{paddingHorizontal: 5}} accessibilityLabel="Back" onPress={navigateToHome}>
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
    fontWeight: '700',
    marginLeft: 15,
  },
});
