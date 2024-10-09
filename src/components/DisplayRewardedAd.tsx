import React, {useEffect, useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ZoomAnimation from './ZoomAnimation';
// import analytics from '@react-native-firebase/analytics';
import RewardedAd from '../Helper/RewardedAd';

const {width} = Dimensions.get('window');

const DisplayAd = (props: any) => {
  const [adLoadStatus, setadLoadStatus] = useState(false);
  const [adId, setadId] = useState('');

  useEffect(() => {
    setadLoadStatus(false);
  }, [props]);

  useEffect(() => {
    (async () => {
      if (adLoadStatus) {
        setadId('');
        // await analytics().logEvent('interstitial_ad');
        props._continue();
      }
      setadId(props.adId);
    })();
  }, [adLoadStatus]);

  const _loadStatus = (status: boolean) => {
    if (status) {
      setadLoadStatus(true);
    } else {
      console.log('AD not available move to next');
    }
  };

  return (
    <View
      style={{
        width: width,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {adId != '' && !adLoadStatus ? (
        <RewardedAd AD_ID={adId} _loadStatus={_loadStatus} />
      ) : null}
      <ZoomAnimation />
    </View>
  );
};

export default DisplayAd;
