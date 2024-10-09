import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import InterstitialFlooring from '../Helper/InterstitialFlooring';
import {useRoute} from '@react-navigation/native';
import {INTERSITIAL_AD_ID} from '../Helper/AdManager';
import ZoomAnimation from '../components/ZoomAnimation';

export default function GraphAdLoading(props: any) {
  const route = useRoute();
  const [adLoadStatus, setadLoadStatus] = useState(false);
  const [adId, setadId] = useState('');
  const [tab, settab] = useState('tracker');
  var nextScreen = 'HomeScreen';
  
  if (props.route.params) {
    nextScreen = props.route.params.nextScreen;
  }
  
  useEffect(() => {
    (async () => {
      let selectedTab = route.params?.tab;
      if (selectedTab != '') {
        settab(selectedTab);
      } else {
        settab('home');
      }
      setadLoadStatus(false);
    })();
  }, [props.route.params]);
  useEffect(() => {
    (async () => {
      if (adLoadStatus) {
        setadId('');
        // await analytics().logEvent('interstitial_ad');
        _continue();
      }

      setadId(INTERSITIAL_AD_ID);
    })();
  }, [adLoadStatus]);

  const _loadStatus = (status: boolean) => {
    if (status) {
      setadLoadStatus(true);
    } else {
      console.log('AD not available move to next');
    }
  };

  const _continue = async () => {
    props.navigation.pop();
    props.navigation.navigate(nextScreen, {tab: tab});
  };
  return (
    <View style={styles.appbg}>
      {adId != '' && !adLoadStatus ? (
        <InterstitialFlooring AD_ID={adId} _loadStatus={_loadStatus} />
      ) : null}
     <ZoomAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  appbg: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0,0,0,0.3)`,
  },
  hearticon: {
    width: 121,
    height: 102.18,
  },
});
