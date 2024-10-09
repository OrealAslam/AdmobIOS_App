import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Platform,
  Text,
  View,
} from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';
import { NATIVE_AD_ID } from './AdManager';

export const AdView = React.memo(() => {
  const nativeAdViewRef = useRef(NativeAdView);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      ref={nativeAdViewRef}
      adUnitID={NATIVE_AD_ID}
      style={{
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
      }}
      videoOptions={{
        customControlsRequested: true,
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#4387A3',
          justifyContent: 'center',
          padding: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>

        <View
          style={{
            height: 100,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
          }}>
          <IconView
            style={{
              width: 60,
              height: 60,
            }}
          />
          <View
            style={{
              flexGrow: 1,
              flexShrink: 1,
              paddingHorizontal: 6,
            }}>
            <HeadlineView
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#fff',
              }}
            />
            <TaglineView
              numberOfLines={2}
              style={{
                fontSize: 11,
              }}
            />
            <AdvertiserView
              style={{
                fontSize: 10,
                color: 'gray',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <StoreView
                style={{
                  fontSize: 12,
                }}
              />
              <StarRatingView
                style={{
                  width: 65,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            height: 40,
            alignItems: 'center',
            width: 150,
            backgroundColor: '#FB8C2E',
            borderRadius: 50,
          }}>
          <CallToActionView
            style={{
              height: 40,
              alignItems: 'center',
              width: 150,
              backgroundColor: '#FFFFFF',
              borderRadius: 50,
            }}
            allCaps
            textStyle={{
              fontSize: 13,
              flexWrap: 'wrap',
              textAlign: 'center',
              color: '#436F81',
            }}
          />
        </View>
      </View>
    </NativeAdView>
  );
});
