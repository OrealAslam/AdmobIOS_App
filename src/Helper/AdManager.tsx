import React, { useState } from 'react';
import { View } from 'react-native';
import {
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  BannerAd,
  BannerAdSize,
  AppOpenAd,
} from 'react-native-google-mobile-ads';
import { fetchAvailablePurchases } from './AppHelper';
// // import analytics from '@react-native-firebase/analytics';

// LIVE APPID: ca-app-pub-3781511156022357~6826036258
// LIVE AD ID's
// export const APPOPEN_AD_ID = 'ca-app-pub-3781511156022357/6653773722';
// export const BANNER_AD_ID = 'ca-app-pub-3781511156022357/6941586328';
// export const INTERSITIAL_AD_ID = 'ca-app-pub-3781511156022357/9111617346'; // save & graph ad id 
// export const INTERSITIAL_AD_ID_OLD = 'ca-app-pub-3781511156022357/6542093089'; // close
// export const REWARED_AD_ID = 'ca-app-pub-3781511156022357/8209433946';
// export const REWARED_INTERSTITIAL_AD_ID = 'ca-app-pub-3781511156022357/9359828115';
// export const NATIVE_AD_ID = 'ca-app-pub-3781511156022357/3002341317';

// export const LANGUAGE_NATIVE_AD_ID = 'ca-app-pub-3781511156022357/7644102324';
// export const NATIVE_AD_ID_ONE = 'ca-app-pub-3781511156022357/2064742085';
// export const NATIVE_AD_ID_TWO = 'ca-app-pub-3781511156022357/3245460808';
// export const ARTICLE_AD_ID = 'ca-app-pub-3781511156022357/1918322292';

// TEST AD ID's
export const APPOPEN_AD_ID = 'ca-app-pub-3940256099942544/9257395921';
export const BANNER_AD_ID = 'ca-app-pub-3940256099942544/6300978111';
export const REWARED_AD_ID = 'ca-app-pub-3781511156022357/8209433946';
export const REWARED_INTERSTITIAL_AD_ID = 'ca-app-pub-3940256099942544/5354046379';
export const NATIVE_AD_ID = 'ca-app-pub-3940256099942544/2247696110';
export const INTERSITIAL_AD_ID = 'ca-app-pub-3940256099942544/1033173712';
export const INTERSITIAL_AD_ID_OLD = 'ca-app-pub-3940256099942544/1033173712';

export const LANGUAGE_NATIVE_AD_ID = 'ca-app-pub-3940256099942544/2247696110';
export const NATIVE_AD_ID_ONE = 'ca-app-pub-3940256099942544/2247696110';
export const NATIVE_AD_ID_TWO = 'ca-app-pub-3940256099942544/2247696110';
export const ARTICLE_AD_ID = 'ca-app-pub-3940256099942544/2247696110';

export var AD_LOADED = false;
// Initialize
const appOpenAd = AppOpenAd.createForAdRequest(APPOPEN_AD_ID, {
  requestNonPersonalizedAdsOnly: true,
});
const interstitial = InterstitialAd.createForAdRequest(INTERSITIAL_AD_ID);
const rewarded = RewardedAd.createForAdRequest(REWARED_AD_ID, {
  requestNonPersonalizedAdsOnly: true,
});

// App open ad
export const update_ad_load = async (loadStatus: boolean) => {
  AD_LOADED = loadStatus;
};

export const load_app_open = async () => {
  appOpenAd.load();
};

export const show_app_open = async () => {
  appOpenAd.show();
  // // await analytics().logEvent('appopen_ad');
};

// Banner ad
export const Banner = () => {
  return (
    <BannerAd
      onAdLoaded={async () => {
      //  await analytics().logEvent('banner_ad_impression');
      }}
      onAdFailedToLoad={(error) => {
        console.log('banner not loaded', error);
      }}      
      unitId={BANNER_AD_ID}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{requestNonPersonalizedAdsOnly: true,  networkExtras: {
        collapsible: 'top'
      }}}></BannerAd>
  );
};
export const Bannerfull = () => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
      }}>
      <BannerAd
        unitId={BANNER_AD_ID}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}></BannerAd>
    </View>
  );
};

export const Bannerlarge = () => {
  return (
    <BannerAd
      unitId={BANNER_AD_ID}
      size={BannerAdSize.LARGE_BANNER}
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}></BannerAd>
  );
};

export const BannerMediumRactangle = () => {
  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      <BannerAd
        unitId={BANNER_AD_ID}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}></BannerAd>
    </View>
  );
};

// Interstitial Ad
export const load_interstitial = async () => {
  const unsubscribe = interstitial.addAdEventListener(
    AdEventType.LOADED,
    () => {
      AD_LOADED = true;
    },
  );
  interstitial.load();
  // return unsubscribe;
};

export const show_interstitial = async () => {
  console.log('interstitial showed');
  interstitial.show();
  // await analytics().logEvent('interstitial_ad_impression');
};

// Rewared Ad
export const load_rewarded = async (load_state: Function) => {
  const unsubscribeLoaded = rewarded.addAdEventListener(
    RewardedAdEventType.LOADED,
    () => {
      load_state();
    },
  );
  const unsubscribeEarned = rewarded.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    reward => {
      console.log('User earned reward of ', reward);
    },
  );

  rewarded.load();
  return () => {
    unsubscribeLoaded();
    unsubscribeEarned();
  };
};

export const show_rewarded = async () => {
  rewarded.show();
  // await analytics().logEvent('rewarded_ad_impression');
};
