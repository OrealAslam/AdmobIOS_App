import React, { useEffect } from "react";
import { Button, View } from "react-native";
import { TestIds, AdEventType, useAppOpenAd } from 'react-native-google-mobile-ads';


export default function AppOpen() {

    const { isLoaded, isClosed, load, show, error } = useAppOpenAd(
        TestIds.APP_OPEN,
        {
            requestNonPersonalizedAdsOnly: true,
        },
    );

    useEffect(() => {
        console.log('Loading AppOpen Ad');
        load();
    }, [load]);

    useEffect(() => {
        console.log('AppOpen Ad error', error);
        // load();
    }, [error]);

    return (
        <View>
            <Button onPress={() => {
                if (isLoaded) {
                    show();
                } else { load(); }
            }} title="Show AppOpen Ad" />
        </View>
    )
}