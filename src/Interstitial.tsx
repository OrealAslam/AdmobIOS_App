import React, { useEffect } from "react";
import { Button, View } from "react-native";
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';


export default function Interstitial() {

    const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
        TestIds.INTERSTITIAL,
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

    return (
        <View>
            <Button onPress={() => {
                if (isLoaded) {
                    show();
                } else { load(); }
            }} title="Show Interstitial Ad" />
        </View>
    )
}