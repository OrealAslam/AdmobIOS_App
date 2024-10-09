import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import InterstitialFlooring from '../Helper/InterstitialFlooring';
import {useRoute} from '@react-navigation/native';
import ZoomAnimation from '../components/ZoomAnimation';
import {INTERSITIAL_AD_ID_OLD} from '../Helper/AdManager';

export default function AdLoading(props: any) {
  const route = useRoute();
  const [adLoadStatus, setadLoadStatus] = useState(false);
  const [adId, setadId] = useState('');
  const [text, settext] = useState('Ad Loading...');
  const [tab, settab] = useState('home');
  var nextScreen = 'LandingScreen';
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

      setadId(INTERSITIAL_AD_ID_OLD);
    })();
  }, [adLoadStatus]);

  const _loadStatus = (status: boolean) => {
    if (status) {
      setadLoadStatus(true);
    } else {
      console.log('AD not available move to next');
      props.navigation.navigate(nextScreen, {tab: tab});
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
      {/* <Image
        style={styles.hearticon}
        source={require('../assets/icons/heartbeatgif.gif')}
      /> */}
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
    backgroundColor: `rgba(0,0,0,0.5)`,
  },
  hearticon: {
    width: 121,
    height: 102.18,
  },
});
