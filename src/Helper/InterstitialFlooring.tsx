import React, { useEffect, useState } from 'react';
import { useInterstitialAd } from 'react-native-google-mobile-ads';

export default function InterstitialFlooring(props: any) {
  const [errorStatus, seterrorStatus] = useState(false);

  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    props.AD_ID,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  useEffect(() => {
    console.log('Loading Interstitial Ad');
    load();
  }, [load]);
  
  useEffect(() => {
    console.log('Interstitial Ad error', error);
    // load();
  }, [error]);

  useEffect(() => {
    (async () => {
      if (error) {
        console.log('Intertitial Ad error', error);
        if (props.adType == 'low') {
          props.continue();
        }
        props._loadStatus(false);
        seterrorStatus(true);
      } else {
        seterrorStatus(false);
      }
    })()
  }, [error]);
  
  useEffect(() => {
    if (isClosed) {
      props._loadStatus(true);
    }
  }, [isClosed]);

  useEffect(() => {
    (async () => {
      if (isLoaded && !errorStatus) {
        show();
      }
      if (errorStatus) {
        console.log('error occured', errorStatus)
      }
    })();
  }, [isLoaded]);

  return <></>;
}
