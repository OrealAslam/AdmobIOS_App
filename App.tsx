import React, { useEffect, useRef } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import mobileAds,{BannerAd, TestIds, BannerAdSize, GAMBannerAd} from 'react-native-google-mobile-ads';
import AppOpen from "./src/AppOpen";
import Interstitial from "./src/Interstitial";
import { NativeAd } from "./src/NativeAd";

export default function App(){
  const bannerRef = useRef<BannerAd>(null);
  
  mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
    console.log('Ads initilized', adapterStatuses);
  });

  return(
    <SafeAreaView style={{flex:1,backgroundColor:`rgba(0,0,0,0.5)`}}>
      <Text style={{color: '#fff', fontSize: 26, textAlign: 'center', marginBottom: 70, marginTop: 30}}>RNAdmob Application</Text>
      <Interstitial />

      <AppOpen />

      <View style={{marginVertical: 20,backgroundColor: 'pink'}}>
        <NativeAd />
      </View>

      {/* BANNER AD */}
      <View style={{position: 'absolute', bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
        {/* <BannerAd ref={bannerRef} unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} /> */}
        <GAMBannerAd unitId={TestIds.BANNER} sizes={[BannerAdSize.FULL_BANNER]} />
      </View>
    </SafeAreaView>
  )
}