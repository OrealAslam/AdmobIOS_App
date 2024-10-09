import {View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {headerStyle} from '../Helper/StyleHelper';
import {
  AD_LOADED,
  load_interstitial,
  show_interstitial,
} from '../Helper/AdManager';

export default function AddNewButton(props: any) {
  const {addNewWrap} = headerStyle;

  useEffect(() => {
    (async () => {
      await load_interstitial();
    })();
  }, [props.screenname]);

  const RecordScreen = async () => {
    if (AD_LOADED) {
      show_interstitial();
      props.return.navigation.navigate(props.screenname);
    } else {
      console.log('Not loaded');
      props.return.navigation.navigate(props.screenname);
    }
  };

  return (
    <View style={addNewWrap}>
      <TouchableOpacity
        accessibilityLabel="AddRecord"
        onPress={() => RecordScreen()}>
        <Image
          style={{width: 78, height: 78}}
          source={require('../assets/images/add_btn.png')}
        />
      </TouchableOpacity>
    </View>
  );
}
